import type { CourseDetail, Place } from '@/domains/course/api/type';
import type { CommentSectionItem } from '@/shared/components/ui';

// TODO: Course 상세 API를 연결하면 UI 확인용 fixture 삭제
export interface CourseDetailFixture {
  comments: CommentSectionItem[];
  course: CourseDetail;
  viewerUserId: number;
}

const VIEWER_USER_ID = 99;

const createPlace = (
  placeId: string,
  name: string,
  latitude: number,
  longitude: number,
): Place => ({
  placeId,
  name,
  category: 'TOURISM',
  address: 'Paris, France',
  latitude,
  longitude,
  bookmarked: false,
  googleMapsUrl: 'https://www.google.com/maps',
  country: '프랑스',
  city: '파리',
});

const createCourseDays = (hasFlights: boolean): CourseDetail['days'] => {
  const dates = ['2026-09-10', '2026-09-11', '2026-09-12', '2026-09-13'];

  return dates.map((date, index) => ({
    dayNumber: index + 1,
    date,
    imageUrls: [],
    memo: '파리 성을 구경하고 맛있는 식사를 했다!',
    cost: 300_000,
    places: [
      createPlace(
        `orsay-${index}`,
        '오르세',
        48.86 + index * 0.001,
        2.326 + index * 0.001,
      ),
      createPlace(
        `louvre-${index}`,
        '루브르 박물관',
        48.861 + index * 0.001,
        2.328 + index * 0.001,
      ),
      createPlace(
        `tuileries-${index}`,
        '튈르리 정원',
        48.862 + index * 0.001,
        2.33 + index * 0.001,
      ),
    ],
    flights:
      hasFlights && index === 0
        ? [
            {
              airline: '대한항공',
              flightNumber: 'KE 792',
              departureAirport: 'ICN',
              departureAt: '2026-09-10T09:35:00',
              arrivalAirport: 'CDG',
              arrivalAt: '2026-09-10T11:20:00',
            },
            {
              airline: '대한항공',
              flightNumber: 'KE 792',
              departureAirport: 'ICN',
              departureAt: '2026-09-13T09:35:00',
              arrivalAirport: 'CDG',
              arrivalAt: '2026-09-13T11:20:00',
            },
          ]
        : [],
  }));
};

export const getCourseDetailFixture = (
  courseId: number,
): CourseDetailFixture => {
  const isMine = courseId === 1 || courseId === 2;
  const hasFlights = courseId !== 2;
  const createdAt = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  return {
    viewerUserId: VIEWER_USER_ID,
    course: {
      courseId,
      author: {
        userId: isMine ? VIEWER_USER_ID : 10,
        nickname: '버디버디',
        country: '대한민국',
        age: 24,
        ageRange: '20대',
        gender: 'FEMALE',
      },
      isMine,
      isBookmarked: false,
      title: '파리 3박 4일',
      content:
        '파리 3박 4일 코스로 다녀왔어요~!\n버디즈로 구한 동행 친구와 함께 했어요',
      countries: [{ countryId: 250, name: 'France' }],
      cities: [{ cityId: 1, name: 'Paris', koreanName: '파리' }],
      startDate: '2026-09-10',
      endDate: '2026-09-13',
      tags: [
        { tagId: 1, name: '투어' },
        { tagId: 2, name: '액티비티' },
        { tagId: 3, name: '활발한' },
      ],
      companions: [
        {
          userId: 12,
          nickname: '이버디',
          profileImageUrl: null,
        },
      ],
      days: createCourseDays(hasFlights),
      viewCount: 42,
      commentCount: 2,
      bookmarkCount: 3,
      createdAt,
    },
    comments: [
      {
        commentId: 1,
        writerId: 11,
        writerName: '유저 1',
        content: '저도 관심 있어요! DM 보낼게요.',
        timeAgo: '1시간 전',
      },
      {
        commentId: 2,
        writerId: 12,
        writerName: '유저 1',
        content: '저도 관심 있어요! DM 보낼게요.',
        timeAgo: '1시간 전',
      },
    ],
  };
};
