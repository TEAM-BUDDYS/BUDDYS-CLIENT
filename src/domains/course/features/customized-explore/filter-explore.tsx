'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { COURSE_QUERY_OPTIONS } from '@/domains/course/api/course';
import type { GetCoursesParams } from '@/domains/course/api/type';
import { useCourseBrowse } from '@/domains/course/features/course-browse/course-browse-provider';
import { useCourseBookmarkMutation } from '@/domains/course/hook/use-course-bookmark-mutation';
import { COURSE_FILTER_COUNTRIES } from '@/domains/course/model/recommended-course';
import { Header } from '@/shared/components/layout';
import {
  AsyncErrorState,
  AsyncLoadingState,
  CardList,
  ChipButton,
} from '@/shared/components/ui';
import { ROUTES } from '@/shared/config';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';

const COURSE_EXPLORE_PAGE_SIZE = 10;

export const FilterExplore = () => {
  const { selectedRecommendedCountryId, setSelectedRecommendedCountryId } =
    useCourseBrowse();
  const queryParams = {
    size: COURSE_EXPLORE_PAGE_SIZE,
    countryId: selectedRecommendedCountryId,
  } satisfies GetCoursesParams;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchNextPageError,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useInfiniteQuery(COURSE_QUERY_OPTIONS.INFINITE_LIST(queryParams));
  const courseBookmarkMutation = useCourseBookmarkMutation();
  const courses = data?.pages.flatMap((page) => page.content) ?? [];
  const handleIntersect = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useInfiniteScroll<HTMLDivElement>({
    enabled:
      Boolean(hasNextPage) && !isFetchingNextPage && !isFetchNextPageError,
    onIntersect: handleIntersect,
  });

  const handleCountryChange = (countryId: number) => {
    setSelectedRecommendedCountryId((currentCountryId) =>
      currentCountryId === countryId ? undefined : countryId,
    );
  };

  const handleBookmarkChange = (courseId: number, nextBookmarked: boolean) => {
    if (courseBookmarkMutation.isPending) return;

    courseBookmarkMutation.mutate({
      courseId,
      bookmarked: nextBookmarked,
    });
  };

  return (
    <>
      <Header hasBackButton />

      <main className="pb-20">
        <section className="flex flex-col gap-3">
          <h1 className="text-title-b-20 px-4 text-gray-800">
            나에게 딱 맞는 코스를 찾아보세요
          </h1>

          <div className="flex scrollbar-none gap-2 overflow-x-auto overscroll-x-none px-4 [&::-webkit-scrollbar]:hidden">
            {COURSE_FILTER_COUNTRIES.map((country) => (
              <ChipButton
                key={country.id}
                active={selectedRecommendedCountryId === country.id}
                variant="fillMedium"
                onClick={() => handleCountryChange(country.id)}
              >
                {country.name}
              </ChipButton>
            ))}
          </div>

          {isPending ? (
            <AsyncLoadingState
              className="min-h-80"
              title="코스를 불러오고 있어요"
            />
          ) : isError && courses.length === 0 ? (
            <AsyncErrorState
              className="min-h-80"
              title="코스를 불러오지 못했어요"
              onRetry={() => void refetch()}
            />
          ) : courses.length === 0 ? (
            <p className="text-body-m-15 py-20 text-center text-gray-500">
              조건에 맞는 코스가 없어요
            </p>
          ) : (
            <div className="flex flex-col gap-6 px-4 pt-1">
              {courses.map((course) => (
                <CardList
                  key={course.courseId}
                  title={course.title}
                  description={[course.countries, course.cities]
                    .filter(Boolean)
                    .join(' · ')}
                  href={ROUTES.COURSE.DETAIL(course.courseId)}
                  images={course.images}
                  isBookmarked={course.isBookmarked}
                  isBookmarkPending={courseBookmarkMutation.isPending}
                  onBookmarkClick={() =>
                    handleBookmarkChange(course.courseId, !course.isBookmarked)
                  }
                />
              ))}

              <div ref={loadMoreRef} className="h-1" aria-hidden="true" />

              {isFetchingNextPage ? (
                <p className="text-caption-m-12 py-4 text-center text-gray-500">
                  코스를 불러오는 중이에요
                </p>
              ) : null}

              {isFetchNextPageError ? (
                <button
                  type="button"
                  className="text-caption-m-12 text-mint-400 mx-auto py-4"
                  onClick={() => void fetchNextPage()}
                >
                  다시 불러오기
                </button>
              ) : null}
            </div>
          )}
        </section>
      </main>
    </>
  );
};
