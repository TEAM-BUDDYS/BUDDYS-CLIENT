type RouteId = string | number;

export const ROUTES = {
  HOME: '/',
  LANDING: '/landing',
  AUTH: {
    LOGIN: '/login',
    KAKAO_CALLBACK: '/auth/kakao/callback',
  },
  ONBOARDING: '/onboarding',
  CUSTOMIZED_EXPLORE: '/customized-explore',
  POST: {
    ROOT: '/posts',
    DETAIL: (postId: RouteId) => `/posts/${postId}` as const,
  },
  CHAT: {
    ROOT: '/chat',
    DETAIL: (chatRoomId: RouteId) => `/chat/${chatRoomId}` as const,
  },
  PROFILE: {
    ROOT: '/profile',
    DETAIL: (userId: RouteId) => `/profile/${userId}` as const,
    SETTINGS: '/profile/settings',
    EDIT: '/profile/edit',
  },
} as const;
