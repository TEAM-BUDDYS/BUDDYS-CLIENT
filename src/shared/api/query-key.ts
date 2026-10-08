import type { paths } from '@/types/schema';

type GetQueryParams<Path extends keyof paths> = paths[Path]['get'] extends {
  parameters: {
    query?: infer Query;
  };
}
  ? Query
  : never;

const excludePageParam = <Params extends { page?: unknown }>(
  params?: Params,
) => {
  if (!params) {
    return {};
  }

  const { page: _page, ...restParams } = params;

  return restParams;
};

const excludePageTokenParam = <Params extends { pageToken?: unknown }>(
  params: Params,
) => {
  const { pageToken: _pageToken, ...restParams } = params;

  return restParams;
};

export const AIRLINE_QUERY_KEY = {
  ALL: ['airlines'] as const,
  SEARCH: (params: GetQueryParams<'/api/v1/airlines/search'>) =>
    [...AIRLINE_QUERY_KEY.ALL, 'search', excludePageParam(params)] as const,
};

export const CHAT_ROOM_QUERY_KEY = {
  ALL: ['chat-rooms'] as const,
  INFINITE_LIST_ALL: () =>
    [...CHAT_ROOM_QUERY_KEY.ALL, 'infinite-list'] as const,
  INFINITE_LIST: (params?: GetQueryParams<'/api/v1/chat-rooms'>) =>
    [
      ...CHAT_ROOM_QUERY_KEY.INFINITE_LIST_ALL(),
      excludePageParam(params),
    ] as const,
  DETAIL: (chatRoomId: number) =>
    [...CHAT_ROOM_QUERY_KEY.ALL, 'detail', chatRoomId] as const,
  MESSAGES: (
    chatRoomId: number,
    params?: GetQueryParams<'/api/v1/chat-rooms/{chatRoomId}/messages'>,
  ) =>
    [...CHAT_ROOM_QUERY_KEY.ALL, chatRoomId, 'messages', params ?? {}] as const,
};

export const COUNTRY_QUERY_KEY = {
  ALL: ['countries'] as const,
  LIST: (params?: GetQueryParams<'/api/v1/countries'>) =>
    [...COUNTRY_QUERY_KEY.ALL, 'list', params ?? {}] as const,
  SEARCH: (params: GetQueryParams<'/api/v1/countries/search'>) =>
    [...COUNTRY_QUERY_KEY.ALL, 'search', params] as const,
  CITY_SEARCH: (
    countryId: number,
    params: GetQueryParams<'/api/v1/countries/{countryId}/cities/search'>,
  ) =>
    [...COUNTRY_QUERY_KEY.ALL, countryId, 'cities', 'search', params] as const,
  UNIVERSITY_SEARCH: (
    countryId: number,
    params: GetQueryParams<'/api/v1/countries/{countryId}/universities/search'>,
  ) =>
    [
      ...COUNTRY_QUERY_KEY.ALL,
      countryId,
      'universities',
      'search',
      params,
    ] as const,
};

export const COURSE_QUERY_KEY = {
  ALL: ['courses'] as const,
  LISTS_ALL: () => [...COURSE_QUERY_KEY.ALL, 'list'] as const,
  LIST: (params?: GetQueryParams<'/api/v1/courses'>) =>
    [...COURSE_QUERY_KEY.LISTS_ALL(), params ?? {}] as const,
  INFINITE_LISTS_ALL: () => [...COURSE_QUERY_KEY.ALL, 'infinite-list'] as const,
  INFINITE_LIST: (params?: GetQueryParams<'/api/v1/courses'>) =>
    [
      ...COURSE_QUERY_KEY.INFINITE_LISTS_ALL(),
      excludePageParam(params),
    ] as const,
  BOOKMARKS_ALL: () => [...COURSE_QUERY_KEY.ALL, 'bookmarks'] as const,
  BOOKMARKS: (params?: GetQueryParams<'/api/v1/courses/bookmarks'>) =>
    [...COURSE_QUERY_KEY.BOOKMARKS_ALL(), params ?? {}] as const,
  DETAIL: (courseId: number) =>
    [...COURSE_QUERY_KEY.ALL, 'detail', courseId] as const,
  COMMENTS_ALL: (courseId: number) =>
    [...COURSE_QUERY_KEY.ALL, courseId, 'comments'] as const,
  INFINITE_COMMENTS: (
    courseId: number,
    params?: GetQueryParams<'/api/v1/courses/{courseId}/comments'>,
  ) =>
    [
      ...COURSE_QUERY_KEY.COMMENTS_ALL(courseId),
      'infinite-list',
      excludePageParam(params),
    ] as const,
  BOOKMARKS_INFINITE: (params?: GetQueryParams<'/api/v1/courses/bookmarks'>) =>
    [
      ...COURSE_QUERY_KEY.BOOKMARKS_ALL(),
      'infinite-list',
      excludePageParam(params),
    ] as const,
};

export const MAGAZINE_QUERY_KEY = {
  ALL: ['magazines'] as const,
  BOOKMARKS_ALL: () => [...MAGAZINE_QUERY_KEY.ALL, 'bookmarks'] as const,
  BOOKMARKS_INFINITE: (
    params?: GetQueryParams<'/api/v1/magazines/bookmarks'>,
  ) =>
    [
      ...MAGAZINE_QUERY_KEY.BOOKMARKS_ALL(),
      'infinite-list',
      excludePageParam(params),
    ] as const,
};

export const PLACE_QUERY_KEY = {
  ALL: ['places'] as const,
  NEARBY_ALL: () => [...PLACE_QUERY_KEY.ALL, 'nearby'] as const,
  NEARBY: (params: GetQueryParams<'/api/v1/places/nearby'> | null) =>
    [...PLACE_QUERY_KEY.NEARBY_ALL(), params] as const,
  SEARCH: (params: GetQueryParams<'/api/v1/places/search'>) =>
    [...PLACE_QUERY_KEY.ALL, 'search', excludePageTokenParam(params)] as const,
  BOOKMARKS_ALL: () => [...PLACE_QUERY_KEY.ALL, 'bookmarks'] as const,
  BOOKMARKS: (params?: GetQueryParams<'/api/v1/places/bookmarks'>) =>
    [...PLACE_QUERY_KEY.BOOKMARKS_ALL(), excludePageParam(params)] as const,
  BOOKMARK_MARKERS_ALL: () =>
    [...PLACE_QUERY_KEY.BOOKMARKS_ALL(), 'markers'] as const,
  BOOKMARK_MARKERS: (
    params: GetQueryParams<'/api/v1/places/bookmarks/markers'> | null,
  ) => [...PLACE_QUERY_KEY.BOOKMARK_MARKERS_ALL(), params] as const,
};

export const POST_QUERY_KEY = {
  ALL: ['posts'] as const,
  LIST: (params?: GetQueryParams<'/api/v1/posts'>) =>
    [...POST_QUERY_KEY.ALL, 'list', params ?? {}] as const,
  INFINITE_LIST: (params?: GetQueryParams<'/api/v1/posts'>) =>
    [...POST_QUERY_KEY.ALL, 'infinite-list', excludePageParam(params)] as const,
  CLOSING_SOON: () => [...POST_QUERY_KEY.ALL, 'closing-soon'] as const,
  DETAIL: (postId: number) =>
    [...POST_QUERY_KEY.ALL, 'detail', postId] as const,
  COMMENTS_ALL: (postId: number) =>
    [...POST_QUERY_KEY.ALL, postId, 'comments'] as const,
  COMMENTS: (
    postId: number,
    params?: GetQueryParams<'/api/v1/posts/{postId}/comments'>,
  ) => [...POST_QUERY_KEY.COMMENTS_ALL(postId), params ?? {}] as const,
  INFINITE_COMMENTS: (
    postId: number,
    params?: GetQueryParams<'/api/v1/posts/{postId}/comments'>,
  ) =>
    [
      ...POST_QUERY_KEY.COMMENTS_ALL(postId),
      'infinite-list',
      excludePageParam(params),
    ] as const,
  BOOKMARKS_ALL: () => [...POST_QUERY_KEY.ALL, 'bookmarks'] as const,
  BOOKMARKS_INFINITE: (params?: GetQueryParams<'/api/v1/posts/bookmarks'>) =>
    [
      ...POST_QUERY_KEY.BOOKMARKS_ALL(),
      'infinite-list',
      excludePageParam(params),
    ] as const,
};

export const RECOMMENDATION_QUERY_KEY = {
  ALL: ['recommendations'] as const,
  USERS: (params?: GetQueryParams<'/api/v1/recommendations/users'>) =>
    [...RECOMMENDATION_QUERY_KEY.ALL, 'users', params ?? {}] as const,
  USERS_BY_EXCHANGE_COUNTRY: (
    params?: GetQueryParams<'/api/v1/recommendations/users/exchange-country'>,
  ) =>
    [
      ...RECOMMENDATION_QUERY_KEY.ALL,
      'users',
      'exchange-country',
      params ?? {},
    ] as const,
  POSTS_ALL: () => [...RECOMMENDATION_QUERY_KEY.ALL, 'posts'] as const,
  POSTS: (params?: GetQueryParams<'/api/v1/recommendations/posts'>) =>
    [...RECOMMENDATION_QUERY_KEY.POSTS_ALL(), params ?? {}] as const,
};

export const TAG_QUERY_KEY = {
  ALL: ['tags'] as const,
  LIST: (type: 'ACTIVITY' | 'INTEREST' | 'TRAVEL_STYLE') =>
    [...TAG_QUERY_KEY.ALL, type] as const,
};

export const USER_QUERY_KEY = {
  ALL: ['users'] as const,
  ME: () => [...USER_QUERY_KEY.ALL, 'me'] as const,
  ME_EDIT: () => [...USER_QUERY_KEY.ALL, 'me', 'edit'] as const,
  SEARCH: (params: GetQueryParams<'/api/v1/users/search'>) =>
    [...USER_QUERY_KEY.ALL, 'search', excludePageParam(params)] as const,
  ME_POSTS: (params?: GetQueryParams<'/api/v1/users/me/posts'>) =>
    [...USER_QUERY_KEY.ALL, 'me', 'posts', params ?? {}] as const,
  ME_POSTS_INFINITE: (params?: GetQueryParams<'/api/v1/users/me/posts'>) =>
    [
      ...USER_QUERY_KEY.ALL,
      'me',
      'posts',
      'infinite-list',
      excludePageParam(params),
    ] as const,
  PROFILE: (userId: number) =>
    [...USER_QUERY_KEY.ALL, 'profile', userId] as const,
  NICKNAME_CHECK: (
    params: GetQueryParams<'/api/v1/users/me/nickname-availability'>,
  ) => [...USER_QUERY_KEY.ALL, 'me', 'nickname-availability', params] as const,
  POSTS: (
    userId: number,
    params?: GetQueryParams<'/api/v1/users/{userId}/posts'>,
  ) => [...USER_QUERY_KEY.ALL, userId, 'posts', params ?? {}] as const,
  POSTS_INFINITE: (
    userId: number,
    params?: GetQueryParams<'/api/v1/users/{userId}/posts'>,
  ) =>
    [
      ...USER_QUERY_KEY.ALL,
      userId,
      'posts',
      'infinite-list',
      excludePageParam(params),
    ] as const,
};
