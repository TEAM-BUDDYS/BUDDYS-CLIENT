'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

const DEFAULT_FALLBACK_DELAY_MS = 200;

export interface DelayedFallbackProps {
  children: ReactNode;
  delayMs?: number;
}

interface DelayedFallbackContentProps {
  children: ReactNode;
  delayMs: number;
}

const DelayedFallbackContent = ({
  children,
  delayMs,
}: DelayedFallbackContentProps) => {
  const [isVisible, setIsVisible] = useState(delayMs <= 0);

  useEffect(() => {
    if (delayMs <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [delayMs]);

  return (
    <div
      aria-hidden={isVisible ? undefined : true}
      className={cn(!isVisible && 'invisible')}
    >
      {children}
    </div>
  );
};

export const DelayedFallback = ({
  children,
  delayMs = DEFAULT_FALLBACK_DELAY_MS,
}: DelayedFallbackProps) => {
  return (
    <DelayedFallbackContent key={delayMs} delayMs={delayMs}>
      {children}
    </DelayedFallbackContent>
  );
};
