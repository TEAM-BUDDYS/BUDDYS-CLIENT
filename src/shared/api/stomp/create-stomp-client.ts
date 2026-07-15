'use client';

import { Client } from '@stomp/stompjs';

import { getAccessToken } from '../auth-token';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

export const createStompClient = () => {
  if (!WEBSOCKET_URL) {
    throw new Error('웹소켓 연결 주소가 설정되지 않았습니다.');
  }

  return new Client({
    brokerURL: WEBSOCKET_URL,

    reconnectDelay: 5000,

    beforeConnect: (client) => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        throw new Error('액세스 토큰을 찾을 수 없습니다.');
      }

      client.connectHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };
    },
  });
};
