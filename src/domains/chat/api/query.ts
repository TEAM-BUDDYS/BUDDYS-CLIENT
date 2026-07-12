import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  apiClient,
  CHAT_ROOM_QUERY_KEY,
  createSearchParams,
  END_POINT,
} from '@/shared/api';

import type {
  CreateChatRoomRequest,
  CreateChatRoomResponse,
  GetChatRoomResponse,
  GetChatRoomsParams,
  GetChatRoomsResponse,
  GetMessagesParams,
  GetMessagesResponse,
} from './type';

const getChatRooms = async (params?: GetChatRoomsParams) => {
  return apiClient
    .get(END_POINT.CHAT_ROOM.LIST, {
      searchParams: createSearchParams(params),
    })
    .json<GetChatRoomsResponse>();
};

const createChatRoom = async (body: CreateChatRoomRequest) => {
  return apiClient
    .post(END_POINT.CHAT_ROOM.CREATE, {
      json: body,
    })
    .json<CreateChatRoomResponse>();
};

const getChatRoom = async (chatRoomId: number) => {
  return apiClient
    .get(END_POINT.CHAT_ROOM.DETAIL(chatRoomId))
    .json<GetChatRoomResponse>();
};

const getMessages = async (chatRoomId: number, params?: GetMessagesParams) => {
  return apiClient
    .get(END_POINT.CHAT_ROOM.MESSAGES(chatRoomId), {
      searchParams: createSearchParams(params),
    })
    .json<GetMessagesResponse>();
};

export const CHAT_QUERY_OPTIONS = {
  LIST: (params?: GetChatRoomsParams) =>
    queryOptions({
      queryKey: CHAT_ROOM_QUERY_KEY.LIST(),
      queryFn: () => getChatRooms(params),
    }),
  DETAIL: (chatRoomId: number) =>
    queryOptions({
      queryKey: CHAT_ROOM_QUERY_KEY.DETAIL(chatRoomId),
      queryFn: () => getChatRoom(chatRoomId),
    }),
  MESSAGES: (chatRoomId: number, params?: GetMessagesParams) =>
    queryOptions({
      queryKey: CHAT_ROOM_QUERY_KEY.MESSAGES(chatRoomId, params),
      queryFn: () => getMessages(chatRoomId, params),
    }),
};

export const CHAT_MUTATION_OPTIONS = {
  CREATE: () =>
    mutationOptions({
      mutationFn: (body: CreateChatRoomRequest) => createChatRoom(body),
    }),
};
