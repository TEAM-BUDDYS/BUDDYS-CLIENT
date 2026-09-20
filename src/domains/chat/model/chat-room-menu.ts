export const CHAT_CONFIRM_MODAL_CONTENT = {
  block: {
    title: '버디를 차단하면\n메시지를 받을 수 없어요.',
    description:
      '상대방은 차단 여부를 알 수 없어요.\n현재는 차단 해제 기능을 지원하지 않아요.',
    confirmLabel: '차단하기',
  },
  report: {
    title: '이 사용자를 신고할까요?',
    description:
      '신고 내용은 검토 후에 조치돼요.\n상대방은 신고 여부를 알 수 없어요.',
    confirmLabel: '신고하기',
  },
} as const;
