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

import { createStompClient } from './create-stomp-client';
import type { StompConnectionStatus, StompContextValue } from './type';

interface StompProviderProps {
  children: ReactNode;
  enabled: boolean;
}

export const StompContext = createContext<StompContextValue | null>(null);

export const StompProvider = ({ children, enabled }: StompProviderProps) => {
  const clientRef = useRef<ReturnType<typeof createStompClient> | null>(null);

  const [connectionStatus, setConnectionStatus] =
    useState<StompConnectionStatus>('disconnected');

  const publish = useCallback((destination: string, body: string) => {
    const client = clientRef.current;

    if (!client?.connected) {
      throw new Error('STOMP client is not connected');
    }

    client.publish({
      destination,
      body,
    });
  }, []);

  const subscribe = useCallback(
    (destination: string, callback: (body: string) => void) => {
      const client = clientRef.current;

      if (!client?.connected) {
        throw new Error('STOMP client is not connected');
      }

      const subscription = client.subscribe(destination, (message) => {
        callback(message.body);
      });

      return () => {
        if (client.connected) {
          subscription.unsubscribe();
        }
      };
    },
    [],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const client = createStompClient();

    clientRef.current = client;

    queueMicrotask(() => {
      if (clientRef.current === client) {
        setConnectionStatus('connecting');
      }
    });

    client.onConnect = () => {
      if (clientRef.current === client) {
        setConnectionStatus('connected');
      }

      console.info('[STOMP] Connected');
    };

    client.onStompError = (frame) => {
      if (clientRef.current === client) {
        setConnectionStatus('error');
      }

      console.error('[STOMP] Broker error', {
        message: frame.headers.message,
        body: frame.body,
      });
    };

    client.onWebSocketError = () => {
      if (clientRef.current === client) {
        setConnectionStatus('error');
      }

      console.error('[STOMP] WebSocket error');
    };

    client.onWebSocketClose = (event) => {
      if (clientRef.current === client) {
        setConnectionStatus(client.active ? 'connecting' : 'disconnected');
      }

      console.info('[STOMP] WebSocket closed', {
        code: event.code,
        reason: event.reason,
      });
    };

    client.activate();

    return () => {
      if (clientRef.current === client) {
        clientRef.current = null;
      }

      void client.deactivate();
    };
  }, [enabled]);

  const contextValue = useMemo<StompContextValue>(
    () => ({
      connectionStatus: enabled ? connectionStatus : 'disconnected',
      publish,
      subscribe,
    }),
    [connectionStatus, enabled, publish, subscribe],
  );

  return (
    <StompContext.Provider value={contextValue}>
      {children}
    </StompContext.Provider>
  );
};
