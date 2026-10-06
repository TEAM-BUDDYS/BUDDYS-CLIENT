import { CourseTileCard } from '@/domains/home/components/course-tile-card';
import { SectionHeader } from '@/domains/home/components/section-header/section-header';
import { ROUTES } from '@/shared/config';

// TODO: 관심 국가 코스 API 연동 시 응답 데이터로 교체
const MOCK_INTEREST_COUNTRY = '스페인';

const MOCK_INTEREST_COUNTRY_COURSES = [
  {
    courseId: 1,
    title: '바르셀로나 하루 코스',
    description: '가우디 건축물 집중 탐방',
  },
  {
    courseId: 2,
    title: '마드리드 미술관 투어',
    description: '프라도부터 레이나 소피아까지',
  },
  {
    courseId: 3,
    title: '세비야 골목 산책',
    description: '스페인 광장과 알카사르',
  },
  {
    courseId: 4,
    title: '그라나다 1박 2일',
    description: '알함브라 궁전과 야경 명소',
  },
].map((course) => ({
  ...course,
  thumbnailImageUrl: `https://picsum.photos/seed/interest-course-${course.courseId}/260/260`,
}));

export const InterestCountryCourseSection = () => {
  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title={`${MOCK_INTEREST_COUNTRY}의 코스를 둘러보세요`}
        moreHref={ROUTES.COURSE.CUSTOMIZED_EXPLORE}
      />
      <div className="-mx-4 scrollbar-none overflow-x-auto px-4">
        <div className="flex gap-3">
          {MOCK_INTEREST_COUNTRY_COURSES.map((course) => (
            <CourseTileCard
              key={course.courseId}
              title={course.title}
              description={course.description}
              image={{
                src: course.thumbnailImageUrl,
                alt: `${course.title} 썸네일`,
              }}
              href={ROUTES.COURSE.DETAIL(course.courseId)}
              className="shrink-0"
            />
          ))}
          <div aria-hidden="true" className="w-2 shrink-0" />
        </div>
      </div>
    </section>
  );
};
