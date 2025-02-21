// reducers.ts
import { SocketState } from "./types";
import * as T from "./types";

const initialState: T.SocketState = {
  connected: false,
  loginId: "",
  socketId: "",
  data: [],
};

export const socketReducer = (
  state: SocketState = initialState,
  action: T.Actions | any
): T.SocketState => {
  switch (action.type) {
    case "@socket/connect":
      return {
        ...state,
        connected: action.payload.connected,
        loginId: action.payload.loginId,
        socketId: action.payload.socketId,
        data: action.payload.data,
      };

    case "@socket/addOrder":
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
      };

    default:
      return state;
  }
};
