export const ROUTES = {
  HOME: '/',
  LANDING: '/landing',
  AUTH: {
    LOGIN: '/login',
    KAKAO_CALLBACK: '/auth/kakao/callback',
    GOOGLE_CALLBACK: '/auth/google/callback',
  },
  VERIFICATION: {
    UNIVERSITY_EMAIL: '/verification/university-email',
    EXCHANGE: '/verification/exchange',
  },
  ONBOARDING: '/onboarding',
  ONBOARDING_INTRO: '/onboarding/intro',
  CUSTOMIZED_EXPLORE: '/customized-explore',
  POST: {
    ROOT: '/posts',
    DETAIL: (postId: number) => `/posts/${postId}` as const,
  },
  COURSE: {
    CREATE: '/course/post',
  },
  CHAT: {
    ROOT: '/chat',
    DETAIL: (chatRoomId: number) => `/chat/${chatRoomId}` as const,
  },
  PROFILE: {
    ROOT: '/profile',
    DETAIL: (userId: number) => `/profile/${userId}` as const,
    SETTINGS: '/profile/settings',
    EDIT: '/profile/edit',
  },
} as const;
