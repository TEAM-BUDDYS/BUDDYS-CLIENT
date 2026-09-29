'use client';

import { useSyncExternalStore } from 'react';

export type PwaPlatform = 'desktop' | 'ios' | 'android' | 'unknown';

const detectPwaPlatform = (): PwaPlatform => {
  const userAgent = navigator.userAgent;

  if (/Android/i.test(userAgent)) {
    return 'android';
  }

  const isIpadOs = /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1;

  if (/iPhone|iPad|iPod/i.test(userAgent) || isIpadOs) {
    return 'ios';
  }

  if (/Windows NT|Macintosh|X11|Linux/i.test(userAgent)) {
    return 'desktop';
  }

  return 'unknown';
};

// hydration 후 한 번 확인
const subscribe = () => () => {};
const getServerSnapshot = () => null;

export const usePwaPlatform = (): PwaPlatform | null =>
  useSyncExternalStore(subscribe, detectPwaPlatform, getServerSnapshot);
