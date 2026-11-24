import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { palette } from '@/components/golf-layout';

export const unstable_settings = { initialRouteName: '(tabs)' };

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ contentStyle: { backgroundColor: palette.paper } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="track-round"
          options={{
            title: 'Shot tracker',
            headerTintColor: palette.forest,
            headerStyle: { backgroundColor: palette.paper },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </>
  );
}
