'use client';

import { useSyncExternalStore } from 'react';

const getCurrentMonth = () => new Date().getMonth() + 1;

// 정적 렌더링 시 빌드 시점의 월로 고정되지 않도록 hydration 후 브라우저 기준으로 확인
const subscribe = () => () => {};
const getServerSnapshot = () => null;

export const useCurrentMonth = (): number | null =>
  useSyncExternalStore(subscribe, getCurrentMonth, getServerSnapshot);
