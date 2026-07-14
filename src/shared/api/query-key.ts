import type { paths } from '@/types/schema';

type GetQueryParams<Path extends keyof paths> = paths[Path]['get'] extends {
  parameters: {
    query?: infer Query;
  };
}
  ? Query
  : never;

export const CHAT_ROOM_QUERY_KEY = {
  ALL: ['chat-rooms'] as const,
  LIST: (params?: GetQueryParams<'/api/v1/chat-rooms'>) =>
    [...CHAT_ROOM_QUERY_KEY.ALL, 'list', params ?? {}] as const,
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
};

export const POST_QUERY_KEY = {
  ALL: ['posts'] as const,
  LIST: (params?: GetQueryParams<'/api/v1/posts'>) =>
    [...POST_QUERY_KEY.ALL, 'list', params ?? {}] as const,
  DETAIL: (postId: number) =>
    [...POST_QUERY_KEY.ALL, 'detail', postId] as const,
  COMMENTS: (
    postId: number,
    params?: GetQueryParams<'/api/v1/posts/{postId}/comments'>,
  ) => [...POST_QUERY_KEY.ALL, postId, 'comments', params ?? {}] as const,
};

export const RECOMMENDATION_QUERY_KEY = {
  ALL: ['recommendations'] as const,
  USERS: () => [...RECOMMENDATION_QUERY_KEY.ALL, 'users'] as const,
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
  ME_POSTS: (params?: GetQueryParams<'/api/v1/users/me/posts'>) =>
    [...USER_QUERY_KEY.ALL, 'me', 'posts', params ?? {}] as const,
  PROFILE: (userId: number) =>
    [...USER_QUERY_KEY.ALL, 'profile', userId] as const,
  POSTS: (
    userId: number,
    params?: GetQueryParams<'/api/v1/users/{userId}/posts'>,
  ) => [...USER_QUERY_KEY.ALL, userId, 'posts', params ?? {}] as const,
};
