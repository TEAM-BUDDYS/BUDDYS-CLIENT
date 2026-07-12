import type { paths } from '@/types/schema';

type GetQueryParams<Path extends keyof paths> = paths[Path]['get'] extends {
  parameters: {
    query?: infer Query;
  };
}
  ? Query
  : never;

export const CHAT_ROOM_QUERY_KEY = {
  LIST: () => ['chat-rooms'] as const,
  DETAIL: (chatRoomId: number) => ['chat-room', chatRoomId] as const,
  MESSAGES: (
    chatRoomId: number,
    params?: GetQueryParams<'/api/v1/chat-rooms/{chatRoomId}/messages'>,
  ) => ['chat-room', chatRoomId, 'messages', params ?? {}] as const,
};

export const COUNTRY_QUERY_KEY = {
  LIST: (params?: GetQueryParams<'/api/v1/countries'>) =>
    ['countries', params ?? {}] as const,
  SEARCH: (params: GetQueryParams<'/api/v1/countries/search'>) =>
    ['countries', 'search', params] as const,
  CITY_SEARCH: (
    countryId: number,
    params: GetQueryParams<'/api/v1/countries/{countryId}/cities/search'>,
  ) => ['countries', countryId, 'cities', 'search', params] as const,
};

export const POST_QUERY_KEY = {
  LIST: (params?: GetQueryParams<'/api/v1/posts'>) =>
    ['posts', params ?? {}] as const,
  DETAIL: (postId: number) => ['post', postId] as const,
  COMMENTS: (
    postId: number,
    params?: GetQueryParams<'/api/v1/posts/{postId}/comments'>,
  ) => ['post', postId, 'comments', params ?? {}] as const,
};

export const RECOMMENDATION_QUERY_KEY = {
  USERS: () => ['recommendations', 'users'] as const,
  USERS_BY_EXCHANGE_COUNTRY: (
    params?: GetQueryParams<'/api/v1/recommendations/users/exchange-country'>,
  ) => ['recommendations', 'users', 'exchange-country', params ?? {}] as const,
  POSTS: (params?: GetQueryParams<'/api/v1/recommendations/posts'>) =>
    ['recommendations', 'posts', params ?? {}] as const,
};

export const TAG_QUERY_KEY = {
  LIST: (type: 'ACTIVITY' | 'INTEREST' | 'TRAVEL_STYLE') =>
    ['tags', type] as const,
};

export const USER_QUERY_KEY = {
  ME: () => ['user', 'me'] as const,
  ME_POSTS: (params?: GetQueryParams<'/api/v1/users/me/posts'>) =>
    ['user', 'me', 'posts', params ?? {}] as const,
  PROFILE: (userId: number) => ['user', userId] as const,
  POSTS: (
    userId: number,
    params?: GetQueryParams<'/api/v1/users/{userId}/posts'>,
  ) => ['user', userId, 'posts', params ?? {}] as const,
};
