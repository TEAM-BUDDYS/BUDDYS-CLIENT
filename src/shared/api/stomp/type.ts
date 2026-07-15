export type StompConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error';

export interface StompContextValue {
  connectionStatus: StompConnectionStatus;

  subscribe: (
    destination: string,
    callback: (body: string) => void,
  ) => () => void;

  publish: (destination: string, body: string) => void;
}
