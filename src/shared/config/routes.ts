export const ROUTES = {
  HOME: '/',
  PWA: '/pwa',
  LANDING: '/landing',
  AUTH: {
    LOGIN: '/login',
    KAKAO_CALLBACK: '/auth/kakao/callback',
    GOOGLE_CALLBACK: '/auth/google/callback',
  },
  VERIFICATION: {
    UNIVERSITY_EMAIL: '/verification/university-email',
    EXCHANGE_DOCUMENT: '/verification/exchange-document',
  },
  ONBOARDING: '/onboarding',
  ONBOARDING_INTRO: '/onboarding/intro',
  SEARCH: '/search',
  MAGAZINE: '/magazine',
  POST: {
    ROOT: '/posts',
    DETAIL: (postId: number) => `/posts/${postId}` as const,
  },
  COURSE: {
    ROOT: '/course',
    CREATE: '/course/post',
    DETAIL: (courseId: number) => `/course/${courseId}` as const,
    CUSTOMIZED_EXPLORE: '/course/customized-explore',
    SUGGEST_EXPLORE: '/course/customized-explore?type=suggest',
  },
  CHAT: {
    ROOT: '/chat',
    DETAIL: (chatRoomId: number) => `/chat/${chatRoomId}` as const,
  },
  PROFILE: {
    ROOT: '/profile',
    DETAIL: (userId: number) => `/profile/${userId}` as const,
    SETTINGS: '/profile/settings',
    PRIVACY_POLICY: '/profile/settings/privacy-policy',
    TERMS: '/profile/settings/terms',
    EDIT: '/profile/edit',
  },
} as const;
