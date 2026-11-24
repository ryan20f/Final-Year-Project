import * as Location from 'expo-location';
import { useRef, useState } from 'react';
import { ActivityIndicator, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ShotMap from '@/components/shot-map';
import type { Point } from '@/components/shot-map.types';
import { distanceInMetres } from '@/utils/distance';

type Endpoint =
  | { source: 'gps'; point: Location.LocationObject }
  | { source: 'map'; point: Point };

export default function HomeScreen() {
  const [start, setStart] = useState<Location.LocationObject | null>(null);
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const recording = useRef(false);
  const target = endpoint?.source === 'gps' ? endpoint.point.coords : endpoint?.point;
  const distance = start && target ? distanceInMetres(start.coords, target) : null;

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
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      if (start) {
        setEndpoint({ source: 'gps', point: position });
      } else {
        setStart(position);
      }
    } catch {
      setError('Could not get your position. Try again outdoors with a clear view of the sky.');
    } finally {
      recording.current = false;
      setBusy(false);
    }
  }

  function reset() {
    setStart(null);
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

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>GOLF PERFORMANCE</Text>
        <Text style={styles.title}>Measure your shot</Text>
        <Text style={styles.body}>Set a fixed start, then walk to the ball or choose a target on the map.</Text>
        <View style={styles.result}>
          <Text style={styles.eyebrow}>STRAIGHT-LINE DISTANCE</Text>
          <Text style={styles.distance}>{distance === null ? '—' : distance.toFixed(1)} m</Text>
          <Text style={styles.body}>{endpoint?.source === 'gps' ? 'GPS endpoint' : endpoint ? 'Map target' : start ? 'Choose an endpoint.' : 'Set your start to begin.'}</Text>
        </View>
        {start && <ShotMap start={start.coords} endpoint={target ?? null} onSelect={selectTarget} />}
        {start && Platform.OS !== 'web' && (
          <Text style={styles.body}>Tap the map or drag the endpoint pin to adjust your target.</Text>
        )}
        {error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
        {showSettings && (
          <Pressable accessibilityRole="button" style={styles.secondary} onPress={() => { void Linking.openSettings().catch(() => setError('Open phone Settings manually to change location access.')); }}>
            <Text style={styles.secondaryText}>Open settings</Text>
          </Pressable>
        )}
        <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} disabled={busy} style={[styles.button, busy && styles.disabled]} onPress={recordPosition}>
          {busy && <ActivityIndicator color="#ffffff" />}
          <Text style={styles.buttonText}>{busy ? 'Finding your position…' : start ? 'Use my location' : 'Set start'}</Text>
        </Pressable>
        {start && !busy && (
          <Pressable accessibilityRole="button" style={styles.secondary} onPress={reset}><Text style={styles.secondaryText}>Reset start</Text></Pressable>
        )}
        {[{ label: 'Fixed start', position: start }, { label: 'GPS endpoint', position: endpoint?.source === 'gps' ? endpoint.point : null }].map(({ label, position }) => position && (
          <View key={label} style={styles.card}>
            <Text style={styles.cardTitle}>{label}</Text>
            <Text style={styles.body}>Latitude: {position.coords.latitude.toFixed(6)}</Text>
            <Text style={styles.body}>Longitude: {position.coords.longitude.toFixed(6)}</Text>
            <Text style={styles.body}>Reported accuracy: {position.coords.accuracy === null ? 'Unavailable' : `±${Math.round(position.coords.accuracy)} m`}</Text>
            <Text style={styles.body}>Recorded: {new Date(position.timestamp).toLocaleTimeString()}</Text>
          </View>
        ))}
        <Text style={styles.note}>Test outdoors. GPS has uncertainty and is unsuitable for precise putting distances. Positions are held in memory only and clear when the app restarts.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f3f6f1' },
  content: { padding: 24, paddingBottom: 110, gap: 18, width: '100%', maxWidth: 620, alignSelf: 'center' },
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
});
