'use client';

import { type ReactNode, useEffect } from 'react';

import { createStompClient } from './create-stomp-client';

interface StompProviderProps {
  children: ReactNode;
  enabled: boolean;
}

export const StompProvider = ({ children, enabled }: StompProviderProps) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const client = createStompClient();

    client.onConnect = () => {
      console.info('[STOMP] Connected');
    };

    client.onStompError = (frame) => {
      console.error('[STOMP] Broker error', {
        message: frame.headers.message,
        body: frame.body,
      });
    };

    client.onWebSocketError = () => {
      console.error('[STOMP] WebSocket error');
    };

    client.onWebSocketClose = (event) => {
      console.info('[STOMP] WebSocket closed', {
        code: event.code,
        reason: event.reason,
      });
    };

    client.activate();

    return () => {
      void client.deactivate();
    };
  }, [enabled]);

  return <>{children}</>;
};
