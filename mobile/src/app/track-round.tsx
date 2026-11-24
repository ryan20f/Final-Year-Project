import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ShotMap from '@/components/shot-map';
import type { Point } from '@/components/shot-map.types';
import { carrickCourse, type CourseHole } from '@/constants/courses';
import { distanceInMetres } from '@/utils/distance';

type ShotPosition =
  | { source: 'gps'; point: Location.LocationObject }
  | { source: 'map'; point: Point };

function coordinates(position: ShotPosition) {
  return position.source === 'gps' ? position.point.coords : position.point;
}

export default function TrackRoundScreen() {
  const [holeIndex, setHoleIndex] = useState(0);
  const hole = carrickCourse.holes[holeIndex];
  const lastHoleIndex = carrickCourse.holes.length - 1;

  return (
    <>
      <Stack.Screen options={{
        title: `Hole ${hole.number} · ${carrickCourse.tees}`,
      }} />
      <HoleTracker
        key={hole.number}
        hole={hole}
        onPreviousHole={holeIndex > 0
          ? () => setHoleIndex((index) => Math.max(index - 1, 0))
          : undefined}
        onNextHole={holeIndex < lastHoleIndex
          ? () => setHoleIndex((index) => Math.min(index + 1, lastHoleIndex))
          : undefined}
      />
    </>
  );
}

function HoleTracker({ hole, onPreviousHole, onNextHole }: {
  hole: CourseHole;
  onPreviousHole?: () => void;
  onNextHole?: () => void;
}) {
  const [start, setStart] = useState<ShotPosition>({ source: 'map', point: hole.tee });
  const [endpoint, setEndpoint] = useState<ShotPosition | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const recording = useRef(false);
  const origin = coordinates(start);
  const target = endpoint ? coordinates(endpoint) : null;
  const distance = target ? distanceInMetres(origin, target) : null;

  async function recordPosition() {
    if (recording.current) return;
    recording.current = true;
    setBusy(true);
    setError(null);
    setShowSettings(false);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        setError('Location permission is needed. Enable location access in Settings and try again.');
        setShowSettings(!permission.canAskAgain);
        return;
      }
      if (!(await Location.hasServicesEnabledAsync())) {
        setError('Location Services are off. Enable them in your phone settings and try again.');
        return;
      }
      const point = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      setEndpoint({ source: 'gps', point });
    } catch {
      setError('Could not get your position. Try again outdoors with a clear view of the sky.');
    } finally {
      recording.current = false;
      setBusy(false);
    }
  }

  function reset() {
    setStart({ source: 'map', point: hole.tee });
    setEndpoint(null);
    setError(null);
    setShowSettings(false);
  }

  function selectTarget(point: Point) {
    if (recording.current) return;
    setEndpoint({ source: 'map', point });
    setError(null);
    setShowSettings(false);
  }

  function advanceStart() {
    if (recording.current || !endpoint) return;
    setStart(endpoint);
    setEndpoint(null);
    setError(null);
    setShowSettings(false);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right', 'bottom']}>
      <View style={styles.holeNavigation}>
        {onPreviousHole && (
          <Pressable accessibilityRole="button" style={styles.holeNavigationButton} onPress={onPreviousHole}>
            <Text style={styles.secondaryText}>‹ Previous hole</Text>
          </Pressable>
        )}
        {onNextHole && (
          <Pressable accessibilityRole="button" style={[styles.holeNavigationButton, styles.nextHole]} onPress={onNextHole}>
            <Text style={styles.secondaryText}>Next hole ›</Text>
          </Pressable>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>{carrickCourse.name}</Text>
        <ShotMap
          teeArea={hole.tee}
          fairwayAim={hole.aim}
          greenArea={hole.green}
          start={origin}
          endpoint={target}
          onSelect={selectTarget}
        />
        <Text style={styles.body}>
          {Platform.OS === 'web'
            ? 'Walk to your ball and use your current location to set the endpoint.'
            : 'Walk to your ball and use your location, or tap the map and drag the endpoint pin.'}
        </Text>
        <View style={styles.result}>
          <Text style={styles.eyebrow}>STRAIGHT-LINE DISTANCE</Text>
          <Text style={styles.distance}>{distance === null ? '—' : distance.toFixed(1)} m</Text>
          <Text style={styles.body}>
            {endpoint?.source === 'gps' ? 'GPS endpoint' : endpoint ? 'Map target' : start.point === hole.tee ? 'Starts at the mapped white tee reference.' : 'Choose your next endpoint.'}
          </Text>
          {endpoint?.source === 'gps' && (
            <Text style={styles.body}>
              Reported accuracy: {endpoint.point.coords.accuracy === null ? 'Unavailable' : `±${Math.round(endpoint.point.coords.accuracy)} m`}
            </Text>
          )}
        </View>
        {error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
        {showSettings && (
          <Pressable accessibilityRole="button" style={styles.secondary} onPress={() => { void Linking.openSettings().catch(() => setError('Open phone Settings manually to change location access.')); }}>
            <Text style={styles.secondaryText}>Open settings</Text>
          </Pressable>
        )}
        <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} disabled={busy} style={[styles.button, busy && styles.disabled]} onPress={recordPosition}>
          {busy && <ActivityIndicator color="#ffffff" />}
          <Text style={styles.buttonText}>{busy ? 'Finding your position…' : 'Use my location'}</Text>
        </Pressable>
        {endpoint && (
          <Pressable accessibilityRole="button" disabled={busy} style={styles.secondary} onPress={advanceStart}>
            <Text style={styles.secondaryText}>Use endpoint as next start</Text>
          </Pressable>
        )}
        {(start.point !== hole.tee || endpoint) && !busy && (
          <Pressable accessibilityRole="button" style={styles.secondary} onPress={reset}><Text style={styles.secondaryText}>Reset to white tees</Text></Pressable>
        )}
        {start.source === 'gps' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Current start</Text>
            <Text style={styles.body}>Reported accuracy: {start.point.coords.accuracy === null ? 'Unavailable' : `±${Math.round(start.point.coords.accuracy)} m`}</Text>
            <Text style={styles.body}>Recorded: {new Date(start.point.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
        <Text style={styles.note}>Test outdoors. GPS has uncertainty and is unsuitable for precise putting distances. Positions are held in memory only and clear when the app restarts.</Text>
        <Text accessibilityRole="link" style={styles.attribution} onPress={() => {
          void Linking.openURL('https://www.openstreetmap.org/copyright').catch(() => setError('Could not open the map data attribution.'));
        }}>Hole data © OpenStreetMap contributors</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f3f6f1' },
  holeNavigation: { width: '100%', maxWidth: 620, alignSelf: 'center', flexDirection: 'row', paddingHorizontal: 24 },
  holeNavigationButton: { minHeight: 44, justifyContent: 'center' },
  nextHole: { marginLeft: 'auto' },
  content: { padding: 24, paddingBottom: 32, gap: 18, width: '100%', maxWidth: 620, alignSelf: 'center' },
  eyebrow: { color: '#42634d', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  title: { color: '#173e2a', fontSize: 34, fontWeight: '700' },
  body: { color: '#46564b', fontSize: 16, lineHeight: 24 },
  result: { backgroundColor: '#e2ecdf', padding: 24, borderRadius: 20, gap: 12 },
  distance: { color: '#173e2a', fontSize: 48, fontWeight: '700', fontVariant: ['tabular-nums'] },
  card: { backgroundColor: '#ffffff', padding: 20, borderRadius: 16, gap: 6 },
  cardTitle: { color: '#173e2a', fontSize: 18, fontWeight: '600' },
  button: { backgroundColor: '#205539', minHeight: 56, borderRadius: 14, padding: 16, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 17, fontWeight: '600', textAlign: 'center' },
  disabled: { opacity: 0.65 },
  secondary: { padding: 14, alignItems: 'center' },
  secondaryText: { color: '#205539', fontSize: 16, fontWeight: '600' },
  error: { color: '#a12626', fontSize: 16, lineHeight: 24 },
  note: { color: '#58655d', fontSize: 13, lineHeight: 20 },
  attribution: { color: '#58655d', fontSize: 12, textDecorationLine: 'underline' },
});
