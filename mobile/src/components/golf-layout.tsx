import { Link, type Href } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const palette = {
  paper: '#f7f6ef',
  white: '#fffefa',
  forest: '#153d30',
  ink: '#1b2a23',
  muted: '#516358',
  line: '#e1e5d9',
  sage: '#e6eddd',
  lime: '#d9efaa',
};

const symbols = {
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  rounds: { ios: 'flag.fill', android: 'flag', web: 'flag' },
  progress: { ios: 'chart.line.uptrend.xyaxis', android: 'trending_up', web: 'trending_up' },
  stats: { ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' },
  arrow: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
} satisfies Record<string, SymbolViewProps['name']>;

type IconName = keyof typeof symbols;

export function GolfIcon({ name, color = palette.forest, size = 22 }: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  return <SymbolView name={symbols[name]} tintColor={color} size={size} />;
}

export function GolfPage({ title, brand, belowHeader, children }: {
  title: string;
  brand?: boolean;
  belowHeader?: boolean;
  children: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.screen} edges={belowHeader ? ['left', 'right', 'bottom'] : ['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heading}>
          {brand && <GolfIcon name="rounds" size={27} />}
          <Text accessibilityRole="header" style={styles.title}>{title}</Text>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function RoundCard({ home = false }: { home?: boolean }) {
  return (
    <View style={styles.hero}>
      <View style={styles.heroIcon}><GolfIcon name="rounds" color={palette.lime} size={24} /></View>
      <Text style={styles.heroTitle}>On the course</Text>
      <Text style={styles.heroBody}>Measure to your ball or pick a target on the map.</Text>
      <Link href={home ? '/rounds' : '/select-course'} asChild>
        <Pressable style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
          <Text style={styles.actionLabel}>{home ? 'Go to rounds' : 'Start round'}</Text>
          <GolfIcon name="arrow" size={18} />
        </Pressable>
      </Link>
    </View>
  );
}

export function SectionLink({ href, icon, label, detail }: {
  href: Href;
  icon: IconName;
  label: string;
  detail: string;
}) {
  return (
    <Link href={href} asChild>
      <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <View style={styles.tile}><GolfIcon name={icon} /></View>
        <View style={styles.rowCopy}>
          <Text style={styles.cardTitle}>{label}</Text>
          <Text style={styles.body}>{detail}</Text>
        </View>
        <GolfIcon name="arrow" color={palette.muted} size={17} />
      </Pressable>
    </Link>
  );
}

export function EmptyCard({ icon, title, detail }: { icon: IconName; title: string; detail: string }) {
  return (
    <View style={styles.empty}>
      <View style={styles.tile}><GolfIcon name={icon} /></View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.body}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.paper },
  content: { width: '100%', maxWidth: 680, alignSelf: 'center', padding: 22, paddingBottom: 32, gap: 14 },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  title: { fontSize: 32, fontWeight: '800', letterSpacing: -1.1, color: palette.ink, flexShrink: 1 },
  hero: { backgroundColor: palette.forest, borderRadius: 26, padding: 24, gap: 11 },
  heroIcon: { alignSelf: 'flex-start', backgroundColor: '#285446', borderRadius: 14, padding: 12, marginBottom: 4 },
  heroTitle: { color: palette.white, fontSize: 32, fontWeight: '800', letterSpacing: -1 },
  heroBody: { color: '#e1ecdb', fontSize: 15, lineHeight: 22 },
  action: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: palette.lime, paddingVertical: 13, paddingHorizontal: 17, borderRadius: 14, marginTop: 6 },
  actionLabel: { color: palette.forest, fontWeight: '800', fontSize: 15 },
  row: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, borderRadius: 18, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 13 },
  rowCopy: { flex: 1, gap: 3 },
  tile: { width: 46, height: 46, borderRadius: 14, backgroundColor: palette.sage, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { color: palette.ink, fontSize: 17, fontWeight: '800' },
  body: { color: palette.muted, fontSize: 14, lineHeight: 21 },
  empty: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, borderRadius: 20, padding: 22, gap: 9 },
  pressed: { opacity: 0.8 },
});
