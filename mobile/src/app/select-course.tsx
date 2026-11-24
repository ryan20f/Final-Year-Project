import { GolfPage, SectionLink } from '@/components/golf-layout';
import { carrickCourse } from '@/constants/courses';

export default function SelectCourseScreen() {
  return (
    <GolfPage title="Select course" belowHeader>
      <SectionLink
        href="/track-round"
        icon="rounds"
        label={carrickCourse.name}
        detail={`${carrickCourse.holes.length} holes · ${carrickCourse.tees}`}
      />
    </GolfPage>
  );
}
