export const END_POINT = {
  SEARCH: {
    SUGGESTIONS: 'api/v1/search/suggestions',
  },
  AIRLINE: {
    SEARCH: 'api/v1/airlines/search',
  },
  AUTH: {
    KAKAO: 'api/v1/auth/kakao',
    GOOGLE: 'api/v1/auth/google',
    REISSUE: 'api/v1/auth/reissue',
    LOGOUT: 'api/v1/auth/logout',
  },
  VERIFICATION: {
    UNIVERSITY_EMAIL: 'api/v1/verifications/university/email',
    UNIVERSITY_EMAIL_CONFIRM: 'api/v1/verifications/university/email/confirm',
    EXCHANGE: 'api/v1/verifications/exchange',
    EXCHANGE_UPLOAD_URL: 'api/v1/verifications/exchange/upload-url',
  },
  CHAT_ROOM: {
    LIST: 'api/v1/chat-rooms',
    CREATE: 'api/v1/chat-rooms',
    DETAIL: (chatRoomId: number) => `api/v1/chat-rooms/${chatRoomId}`,
    MESSAGES: (chatRoomId: number) =>
      `api/v1/chat-rooms/${chatRoomId}/messages`,
    REPORT: (chatRoomId: number) => `api/v1/chat-rooms/${chatRoomId}/report`,
    BLOCK: (chatRoomId: number) => `api/v1/chat-rooms/${chatRoomId}/block`,
  },
  COUNTRY: {
    LIST: 'api/v1/countries',
    SEARCH: 'api/v1/countries/search',
    CITY_SEARCH: (countryId: number) =>
      `api/v1/countries/${countryId}/cities/search`,
    UNIVERSITY_SEARCH: (countryId: number) =>
      `api/v1/countries/${countryId}/universities/search`,
  },
  COURSE: {
    CREATE: 'api/v1/courses',
    COMMENTS: (courseId: number) => `api/v1/courses/${courseId}/comments`,
    DETAIL: (courseId: number) => `api/v1/courses/${courseId}`,
    BOOKMARK: (courseId: number) => `api/v1/courses/${courseId}/bookmark`,
    BOOKMARKS: 'api/v1/courses/bookmarks',
  },
  IMAGE: {
    PRESIGNED_URL: 'api/v1/images/presigned-url',
  },
  MAGAZINE: {
    BOOKMARKS: 'api/v1/magazines/bookmarks',
  },
  PLACE: {
    BOOKMARK: (placeId: string) =>
      `api/v1/places/${encodeURIComponent(placeId)}/bookmark`,
    NEARBY: 'api/v1/places/nearby',
    SEARCH: 'api/v1/places/search',
    BOOKMARKS: 'api/v1/places/bookmarks',
    BOOKMARK_MARKERS: 'api/v1/places/bookmarks/markers',
    PHOTO: (placeId: string, maxWidth: number) =>
      `api/v1/places/${encodeURIComponent(placeId)}/photo?maxWidth=${maxWidth}`,
  },
  POST: {
    LIST: 'api/v1/posts',
    CREATE: 'api/v1/posts',
    CLOSING_SOON: 'api/v1/posts/closing-soon',
    DETAIL: (postId: number) => `api/v1/posts/${postId}`,
    STATUS: (postId: number) => `api/v1/posts/${postId}/status`,
    COMMENTS: (postId: number) => `api/v1/posts/${postId}/comments`,
    BOOKMARKS: 'api/v1/posts/bookmarks',
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
    NICKNAME_CHECK: 'api/v1/users/me/nickname-availability',
    SEARCH: 'api/v1/users/search',
    PROFILE: (userId: number) => `api/v1/users/${userId}`,
    POSTS: (userId: number) => `api/v1/users/${userId}/posts`,
  },
} as const;
