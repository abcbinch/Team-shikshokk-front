// actions.ts
import type * as T from "./types";
export const setConnect = (payload: T.SocketState): T.SocketConnectAction => ({
  type: "@socket/connect",
  payload,
});

export const addOrder = (payload: T.SocketState): T.SocketAddOrderAction => ({
  type: "@socket/addOrder",
  payload,
});

export const setDisconnect = () => ({
  type: "@socket/setDisconnect",
});
