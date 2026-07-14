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

import type { ChatMessageList, ChatRoomDetail } from '../model/chat-room';
import {
  convertChatMessageListResponse,
  convertChatRoomListResponse,
} from './mapper';
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

const getChatRoom = async (chatRoomId: number): Promise<ChatRoomDetail> => {
  const response = await apiClient
    .get(END_POINT.CHAT_ROOM.DETAIL(chatRoomId))
    .json<GetChatRoomResponse>();

  const createdAt = response.data?.createdAt;
  const participantNickname = response.data?.participant?.nickname;

  if (response.success !== true || !createdAt || !participantNickname) {
    throw new Error(
      response.message || '채팅방 상세 응답이 올바르지 않습니다.',
    );
  }

  return {
    createdAt,
    participantNickname,
  };
};

type MessageQueryParams = NonNullable<GetMessagesParams>;

type GetInfiniteMessagesParams = Pick<MessageQueryParams, 'size'>;

type MessagePageParam = Pick<
  MessageQueryParams,
  'cursorSentAt' | 'cursorMessageId'
>;

const INITIAL_MESSAGE_PAGE_PARAM: MessagePageParam = {};

const getMessages = async (
  chatRoomId: number,
  params?: GetMessagesParams,
): Promise<ChatMessageList> => {
  const response = await apiClient
    .get(END_POINT.CHAT_ROOM.MESSAGES(chatRoomId), {
      searchParams: createSearchParams(params),
    })
    .json<GetMessagesResponse>();

  return convertChatMessageListResponse(response);
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
  MESSAGES: (chatRoomId: number, params?: GetInfiniteMessagesParams) =>
    infiniteQueryOptions({
      queryKey: CHAT_ROOM_QUERY_KEY.MESSAGES(chatRoomId, params),

      queryFn: ({ pageParam }) =>
        getMessages(chatRoomId, {
          ...params,
          ...pageParam,
        }),

      initialPageParam: INITIAL_MESSAGE_PAGE_PARAM,

      getNextPageParam: (lastPage): MessagePageParam | undefined => {
        if (!lastPage.hasNext) {
          return undefined;
        }

        if (
          lastPage.nextCursorSentAt === null ||
          lastPage.nextCursorMessageId === null
        ) {
          return undefined;
        }

        return {
          cursorSentAt: lastPage.nextCursorSentAt,
          cursorMessageId: lastPage.nextCursorMessageId,
        };
      },
    }),
};

export const CHAT_MUTATION_OPTIONS = {
  CREATE: () =>
    mutationOptions({
      mutationFn: (body: CreateChatRoomRequest) => createChatRoom(body),
    }),
};
