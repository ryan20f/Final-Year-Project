import { EmptyCard, GolfPage, RoundCard } from '@/components/golf-layout';

export default function RoundsScreen() {
  return (
    <GolfPage title="Rounds">
      <RoundCard />
      <EmptyCard icon="rounds" title="Round history" detail="Saved rounds will appear here." />
    </GolfPage>
  );
}
