import { EmptyCard, GolfPage } from '@/components/golf-layout';

export default function ProgressScreen() {
  return (
    <GolfPage title="Progress">
      <EmptyCard icon="progress" title="Performance trends" detail="Compare your performance as you record more rounds." />
    </GolfPage>
  );
}
