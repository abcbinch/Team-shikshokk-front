// store/socket/reducers.ts
import { SOCKET_CONNECT, SOCKET_DISCONNECT, SOCKET_MESSAGE } from "./actions";
import * as T from "./types";
const initialState: T.State = "0";

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case "@socket/message":
      return action.message;
    case "@socket/connect":
      return action.socketId;
    default:
      return state;
  }
};

export default reducer;
