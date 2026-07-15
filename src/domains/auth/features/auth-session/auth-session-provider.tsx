'use client';

import { usePathname } from 'next/navigation';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { setAccessToken, setAccessTokenRefreshHandler } from '@/shared/api';
import { ROUTES } from '@/shared/config';

import { loginWithKakao, reissueAccessToken } from '../../api/query';
import type { AuthSession, AuthStatusTypes } from '../../model/auth';

interface AuthSessionContextValue {
  status: AuthStatusTypes;
  userId: number | null;
  onboardingCompleted: boolean | null;
  authenticateWithKakao: (code: string) => Promise<AuthSession>;
}

interface AuthSessionProviderProps {
  children: ReactNode;
}

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

export const AuthSessionProvider = ({ children }: AuthSessionProviderProps) => {
  const pathname = usePathname();
  const shouldSkipSessionBootstrap = pathname === ROUTES.AUTH.KAKAO_CALLBACK;
  const hasBootstrappedRef = useRef(false);
  const [status, setStatus] = useState<AuthStatusTypes>('initializing');
  const [userId, setUserId] = useState<number | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState<
    boolean | null
  >(null);

  const setAuthenticatedSession = useCallback((loginResponse: AuthSession) => {
    setAccessToken(loginResponse.accessToken);
    setUserId(loginResponse.userId);
    setOnboardingCompleted(loginResponse.onboardingCompleted);
    setStatus('authenticated');

    return loginResponse.accessToken;
  }, []);

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setUserId(null);
    setOnboardingCompleted(null);
    setStatus('unauthenticated');
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const loginResponse = await reissueAccessToken();
      return setAuthenticatedSession(loginResponse);
    } catch (error) {
      clearSession();
      throw error;
    }
  }, [clearSession, setAuthenticatedSession]);

  const authenticateWithKakao = useCallback(
    async (code: string) => {
      try {
        const loginResponse = await loginWithKakao({ code });
        setAuthenticatedSession(loginResponse);
        return loginResponse;
      } catch (error) {
        clearSession();
        throw error;
      }
    },
    [clearSession, setAuthenticatedSession],
  );

  useEffect(() => {
    setAccessTokenRefreshHandler(refreshSession);

    return () => {
      setAccessTokenRefreshHandler(null);
    };
  }, [refreshSession]);

  useEffect(() => {
    queueMicrotask(() => {
      if (hasBootstrappedRef.current) {
        return;
      }

      hasBootstrappedRef.current = true;

      if (shouldSkipSessionBootstrap) {
        clearSession();
        return;
      }

      refreshSession().catch(() => undefined);
    });
  }, [clearSession, refreshSession, shouldSkipSessionBootstrap]);

  const value = useMemo(
    () => ({
      status,
      userId,
      onboardingCompleted,
      authenticateWithKakao,
    }),
    [authenticateWithKakao, onboardingCompleted, status, userId],
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
};

export const useAuthSession = () => {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error('useAuthSession must be used within AuthSessionProvider');
  }

  return context;
};
