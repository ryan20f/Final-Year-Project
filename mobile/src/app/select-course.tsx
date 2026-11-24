import { GolfPage, SectionLink } from '@/components/golf-layout';
import { carrickHoleOne } from '@/constants/courses';

export default function SelectCourseScreen() {
  return (
    <GolfPage title="Select course" belowHeader>
      <SectionLink
        href="/track-round"
        icon="rounds"
        label={carrickHoleOne.course}
        detail={`Hole ${carrickHoleOne.number} · ${carrickHoleOne.tees}`}
      />
    </GolfPage>
  );
}
