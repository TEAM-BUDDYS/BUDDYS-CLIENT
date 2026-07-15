'use client';

import { useContext } from 'react';

import { StompContext } from './stomp-provider';

export const useStomp = () => {
  const context = useContext(StompContext);

  if (!context) {
    throw new Error('useStomp은 StompProvider 내부에서 사용해야 합니다.');
  }

  return context;
};
