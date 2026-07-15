import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import {
  apiClient,
  CHAT_ROOM_QUERY_KEY,
  createSearchParams,
  END_POINT,
} from '@/shared/api';

import { convertChatRoomListResponse } from './mapper';
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
  const response = await apiClient
    .get(END_POINT.CHAT_ROOM.LIST, {
      searchParams: createSearchParams(params),
    })
    .json<GetChatRoomsResponse>();

  return convertChatRoomListResponse(response);
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
  INFINITE_LIST: (params?: GetChatRoomsParams) =>
    infiniteQueryOptions({
      queryKey: CHAT_ROOM_QUERY_KEY.INFINITE_LIST(params),
      queryFn: ({ pageParam }) =>
        getChatRooms({
          ...params,
          page: pageParam,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasNext) {
          return undefined;
        }

        return lastPage.page + 1;
      },
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
