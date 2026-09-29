import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ROUTES } from '@/shared/config';

const PWA_PROMPT_DISMISSED_AT_KEY = 'buddys:pwa-prompt-dismissed-at';
const PWA_PROMPT_COOLDOWN_MS = 24 * 60 * 60 * 1000;

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

// 현재 PWA 앱 창으로 실행 중인지 확인
const isRunningStandalone = () => {
  const isStandaloneDisplay = window.matchMedia(
    '(display-mode: standalone)',
  ).matches;

  const isIosStandalone =
    (navigator as NavigatorWithStandalone).standalone === true;

  return isStandaloneDisplay || isIosStandalone;
};

// 지금 안내를 보여줘도 되는지 판단
const shouldShowPwaPrompt = () => {
  if (isRunningStandalone()) {
    return false;
  }

  try {
    const savedValue = localStorage.getItem(PWA_PROMPT_DISMISSED_AT_KEY);

    // 닫은 기록이 없으면 표시
    if (savedValue === null) {
      return true;
    }

    const dismissedAt = Number(savedValue);

    // 잘못된 기록은 기록 없음으로 취급
    if (!Number.isFinite(dismissedAt) || dismissedAt <= 0) {
      return true;
    }

    const elapsed = Date.now() - dismissedAt;

    return elapsed >= PWA_PROMPT_COOLDOWN_MS;
  } catch {
    // 저장소를 읽을 수 없어도 홈 이용은 가능하도록 처리
    return true;
  }
};

// 마지막으로 닫은 시각 저장
const savePwaPromptDismissedAt = () => {
  try {
    localStorage.setItem(PWA_PROMPT_DISMISSED_AT_KEY, String(Date.now()));
  } catch {
    // 저장에 실패하더라도 현재 안내창은 닫을 수 있도록 처리
    return;
  }
};

export const usePwaInstallPrompt = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(shouldShowPwaPrompt);

  const handleDismiss = () => {
    savePwaPromptDismissedAt();
    setIsOpen(false);
  };

  const handleShowGuide = () => {
    savePwaPromptDismissedAt();
    setIsOpen(false);
    router.push(ROUTES.PWA);
  };

  return {
    isOpen,
    handleDismiss,
    handleShowGuide,
  };
};
