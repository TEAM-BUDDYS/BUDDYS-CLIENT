import type { components, operations } from '@/types/schema';

export type GetChatRoomsParams =
  operations['getChatRooms']['parameters']['query'];
export type GetChatRoomsResponse =
  components['schemas']['BaseResponseChatRoomListResponse'];

export type CreateChatRoomRequest =
  components['schemas']['CreateChatRoomRequest'];
export type CreateChatRoomResponse =
  components['schemas']['BaseResponseChatRoomResponse'];

export type GetChatRoomResponse =
  components['schemas']['BaseResponseChatRoomResponse'];

export type GetMessagesParams =
  operations['getMessages']['parameters']['query'];
export type GetMessagesResponse =
  components['schemas']['BaseResponseChatMessageListResponse'];

//신고하기
export type ReportChatPartnerRequest =
  components['schemas']['ReportChatPartnerRequest'];

export type ReportChatPartnerResponse =
  components['schemas']['BaseResponseVoid'];

//차단하기
export type BlockChatPartnerResponse =
  components['schemas']['BaseResponseVoid'];
