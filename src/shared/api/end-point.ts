export const END_POINT = {
  AUTH: {
    KAKAO: 'api/v1/auth/kakao',
    REISSUE: 'api/v1/auth/reissue',
  },
  CHAT_ROOM: {
    LIST: 'api/v1/chat-rooms',
    CREATE: 'api/v1/chat-rooms',
    DETAIL: (chatRoomId: number) => `api/v1/chat-rooms/${chatRoomId}`,
    MESSAGES: (chatRoomId: number) =>
      `api/v1/chat-rooms/${chatRoomId}/messages`,
  },
  COUNTRY: {
    LIST: 'api/v1/countries',
    SEARCH: 'api/v1/countries/search',
    CITY_SEARCH: (countryId: number) =>
      `api/v1/countries/${countryId}/cities/search`,
  },
  IMAGE: {
    PRESIGNED_URL: 'api/v1/images/presigned-url',
  },
  POST: {
    LIST: 'api/v1/posts',
    CREATE: 'api/v1/posts',
    DETAIL: (postId: number) => `api/v1/posts/${postId}`,
    STATUS: (postId: number) => `api/v1/posts/${postId}/status`,
    COMMENTS: (postId: number) => `api/v1/posts/${postId}/comments`,
  },
  RECOMMENDATION: {
    USERS: 'api/v1/recommendations/users',
    USERS_BY_EXCHANGE_COUNTRY: 'api/v1/recommendations/users/exchange-country',
    POSTS: 'api/v1/recommendations/posts',
  },
  TAG: {
    LIST: (type: 'ACTIVITY' | 'INTEREST' | 'TRAVEL_STYLE') =>
      `api/v1/tags/${type}`,
  },
  USER: {
    ME: 'api/v1/users/me',
    ME_POSTS: 'api/v1/users/me/posts',
    ONBOARDING: 'api/v1/users/onboarding',
    PROFILE: (userId: number) => `api/v1/users/${userId}`,
    POSTS: (userId: number) => `api/v1/users/${userId}/posts`,
  },
} as const;
