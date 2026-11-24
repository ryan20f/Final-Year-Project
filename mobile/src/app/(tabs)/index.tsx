import { GolfPage, RoundCard, SectionLink } from '@/components/golf-layout';

export default function HomeScreen() {
  return (
    <GolfPage title="Golf Performance" brand>
      <RoundCard home />
      <SectionLink href="/progress" icon="progress" label="Progress" detail="Performance trends across rounds" />
      <SectionLink href="/stats" icon="stats" label="Stats" detail="Shot distances and strokes gained" />
    </GolfPage>
  );
}
