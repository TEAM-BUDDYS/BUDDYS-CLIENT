import type { CourseSummary } from '@/domains/course/api/type';

export type DisplayableCountryCourse = CourseSummary & {
  thumbnailImageUrl: string;
  description: string;
};

export const toDisplayableCountryCourses = (
  courses: CourseSummary[],
): DisplayableCountryCourse[] => {
  return courses.flatMap((course) => {
    const thumbnailImageUrl = course.images[0];

    if (!thumbnailImageUrl) {
      return [];
    }

    return {
      ...course,
      thumbnailImageUrl,
      description:
        course.content ||
        [course.countries, course.cities].filter(Boolean).join(' · '),
    };
  });
};
