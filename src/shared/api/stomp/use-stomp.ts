'use client';

import { useContext } from 'react';

import { StompContext } from './stomp-provider';

export const useStomp = () => {
  const context = useContext(StompContext);

  if (!context) {
    throw new Error('useStomp must be used within StompProvider');
  }

  return context;
};
