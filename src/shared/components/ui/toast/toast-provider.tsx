'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/cn';

import { Toast, type ToastVariant } from './toast';

export interface ToastOptions {
  duration?: number;
  variant?: ToastVariant;
}

interface ToastState {
  id: number;
  message: string;
  variant: ToastVariant;
}

export interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void;
}

interface ToastProviderProps {
  bottomOffsetClassName?: string;
  children: ReactNode;
}

const DEFAULT_TOAST_DURATION = 2000;
const TOAST_TRANSITION_DURATION = 300;

export const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({
  bottomOffsetClassName,
  children,
}: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const animationFrameRef = useRef<number | null>(null);
  const toastIdRef = useRef(0);

  const clearToastTimeout = useCallback(() => {
    if (timeoutRef.current === null) {
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const clearTransitionTimeout = useCallback(() => {
    if (transitionTimeoutRef.current === null) {
      return;
    }

    clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = null;
  }, []);

  const clearToastAnimationFrame = useCallback(() => {
    if (animationFrameRef.current === null) {
      return;
    }

    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  }, []);

  const hideToast = useCallback(() => {
    clearToastAnimationFrame();
    setIsVisible(false);

    transitionTimeoutRef.current = setTimeout(() => {
      setToast(null);
      transitionTimeoutRef.current = null;
    }, TOAST_TRANSITION_DURATION);
  }, [clearToastAnimationFrame]);

  const showToast = useCallback(
    (message: string, options?: ToastOptions) => {
      clearToastTimeout();
      clearTransitionTimeout();
      clearToastAnimationFrame();
      toastIdRef.current += 1;

      setToast({
        id: toastIdRef.current,
        message,
        variant: options?.variant ?? 'primary',
      });
      setIsVisible(false);

      animationFrameRef.current = requestAnimationFrame(() => {
        setIsVisible(true);
        animationFrameRef.current = null;
      });

      timeoutRef.current = setTimeout(() => {
        hideToast();
        timeoutRef.current = null;
      }, options?.duration ?? DEFAULT_TOAST_DURATION);
    },
    [
      clearToastAnimationFrame,
      clearToastTimeout,
      clearTransitionTimeout,
      hideToast,
    ],
  );

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  useEffect(() => {
    return () => {
      clearToastTimeout();
      clearTransitionTimeout();
      clearToastAnimationFrame();
    };
  }, [clearToastAnimationFrame, clearToastTimeout, clearTransitionTimeout]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        className={cn(
          'pointer-events-none fixed right-0 left-0 z-50 flex justify-center px-4',
          bottomOffsetClassName ?? 'bottom-18',
        )}
      >
        {toast && (
          <Toast
            key={toast.id}
            variant={toast.variant}
            className={
              isVisible
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-3 scale-95 opacity-0'
            }
          >
            {toast.message}
          </Toast>
        )}
      </div>
    </ToastContext.Provider>
  );
};
