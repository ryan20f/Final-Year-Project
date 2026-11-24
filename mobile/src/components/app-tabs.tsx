import { Tabs } from 'expo-router';

import { GolfIcon, palette } from '@/components/golf-layout';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: palette.paper },
        tabBarActiveTintColor: palette.forest,
        tabBarInactiveTintColor: palette.muted,
        tabBarActiveBackgroundColor: palette.sage,
        tabBarItemStyle: { borderRadius: 12, marginHorizontal: 5 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        tabBarStyle: {
          backgroundColor: palette.white,
          borderTopColor: palette.line,
          paddingTop: 5,
          paddingHorizontal: 10,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ focused }) => <GolfIcon name="home" color={focused ? palette.forest : palette.muted} /> }} />
      <Tabs.Screen name="rounds" options={{ title: 'Rounds', tabBarIcon: ({ focused }) => <GolfIcon name="rounds" color={focused ? palette.forest : palette.muted} /> }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress', tabBarIcon: ({ focused }) => <GolfIcon name="progress" color={focused ? palette.forest : palette.muted} /> }} />
      <Tabs.Screen name="stats" options={{ title: 'Stats', tabBarIcon: ({ focused }) => <GolfIcon name="stats" color={focused ? palette.forest : palette.muted} /> }} />
    </Tabs>
  );
}
