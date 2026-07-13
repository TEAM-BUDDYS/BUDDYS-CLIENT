'use client';

import { Client } from '@stomp/stompjs';

import { getAccessToken } from '../auth-token';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

export const createStompClient = () => {
  if (!WEBSOCKET_URL) {
    throw new Error('NEXT_PUBLIC_WEBSOCKET_URL is not defined');
  }

  return new Client({
    brokerURL: WEBSOCKET_URL,

    reconnectDelay: 5000,

    beforeConnect: (client) => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        throw new Error('Access token is not available');
      }

      client.connectHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };
    },
  });
};
