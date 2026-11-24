import { EmptyCard, GolfPage } from '@/components/golf-layout';

export default function StatsScreen() {
  return (
    <GolfPage title="Stats">
      <EmptyCard icon="stats" title="Strokes gained" detail="Performance by shot category will appear here." />
      <EmptyCard icon="rounds" title="Shot distances" detail="Distance summaries will appear here." />
    </GolfPage>
  );
}
