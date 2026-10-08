export type SettingsConfirmType = 'logout' | 'withdraw';

export const SETTINGS_CONFIRM_MODAL_CONTENT = {
  logout: {
    title: '로그아웃 하시겠습니까?',
    description: '정말 로그아웃 하시겠습니까?',
    confirmLabel: '로그아웃',
  },
  withdraw: {
    title: '회원 탈퇴 하시겠습니까?',
    description: '계정을 삭제하면\n저장된 정보는 되돌릴 수 없습니다.',
    confirmLabel: '탈퇴하기',
  },
} as const;
