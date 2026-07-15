'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useState } from 'react';

import {
  AuthSessionProvider,
  useAuthSession,
} from '@/domains/auth/features/auth-session/auth-session-provider';
import { StompProvider } from '@/shared/api/stomp';
import { ToastProvider } from '@/shared/components/ui';

interface ProvidersProps {
  children: ReactNode;
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60,
      },
    },
  });

const AuthenticatedStompProvider = ({ children }: ProvidersProps) => {
  const { status } = useAuthSession();

  return (
    <StompProvider enabled={status === 'authenticated'}>
      {children}
    </StompProvider>
  );
};

export const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        <AuthSessionProvider>
          <AuthenticatedStompProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthenticatedStompProvider>
        </AuthSessionProvider>
      </QueryErrorResetBoundary>

      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};
