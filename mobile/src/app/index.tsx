import * as Location from 'expo-location';
import { useRef, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { distanceInMetres } from '@/utils/distance';

export default function HomeScreen() {
  const [positions, setPositions] = useState<Location.LocationObject[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const recording = useRef(false);
  const distance = positions.length === 2
    ? distanceInMetres(positions[0].coords, positions[1].coords)
    : null;

  async function recordPosition() {
    if (recording.current || positions.length >= 2) return;
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
      setPositions((previous) => [...previous, position]);
    } catch {
      setError('Could not get your position. Try again outdoors with a clear view of the sky.');
    } finally {
      recording.current = false;
      setBusy(false);
    }
  }

  function reset() {
    setPositions([]);
    setError(null);
    setShowSettings(false);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>GOLF PERFORMANCE</Text>
        <Text style={styles.title}>Measure your shot</Text>
        <Text style={styles.body}>Record your starting position, walk to where the ball finished, then record the endpoint. Keep the app open while recording.</Text>
        <View style={styles.result}>
          <Text style={styles.eyebrow}>STRAIGHT-LINE DISTANCE</Text>
          <Text style={styles.distance}>{distance === null ? '—' : distance.toFixed(1)} m</Text>
          <Text style={styles.body}>{positions.length === 0 ? 'Record your first position to begin.' : positions.length === 1 ? 'Walk to the endpoint and record again.' : 'Measurement complete.'}</Text>
        </View>
        {positions.map((position, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{index === 0 ? 'Start position' : 'End position'}</Text>
            <Text style={styles.body}>Latitude: {position.coords.latitude.toFixed(6)}</Text>
            <Text style={styles.body}>Longitude: {position.coords.longitude.toFixed(6)}</Text>
            <Text style={styles.body}>Reported accuracy: {position.coords.accuracy === null ? 'Unavailable' : `±${Math.round(position.coords.accuracy)} m`}</Text>
            <Text style={styles.body}>Recorded: {new Date(position.timestamp).toLocaleTimeString()}</Text>
          </View>
        ))}
        {error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
        {showSettings && (
          <Pressable accessibilityRole="button" style={styles.secondary} onPress={() => { void Linking.openSettings().catch(() => setError('Open phone Settings manually to change location access.')); }}>
            <Text style={styles.secondaryText}>Open settings</Text>
          </Pressable>
        )}
        <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} disabled={busy} style={[styles.button, busy && styles.disabled]} onPress={positions.length === 2 ? reset : recordPosition}>
          {busy && <ActivityIndicator color="#ffffff" />}
          <Text style={styles.buttonText}>{busy ? 'Finding your position…' : positions.length === 2 ? 'Start again' : positions.length === 0 ? 'Record start position' : 'Record end position'}</Text>
        </Pressable>
        {positions.length === 1 && !busy && (
          <Pressable accessibilityRole="button" style={styles.secondary} onPress={reset}><Text style={styles.secondaryText}>Clear measurement</Text></Pressable>
        )}
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
