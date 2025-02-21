// reducers.ts
import { faL } from "@fortawesome/free-solid-svg-icons";
import { SocketState } from "./types";
import * as T from "./types";

const initialState: T.SocketState = {
  socketId: "",
  loginId: "",
  orders: [],
};

export const socketReducer = (
  state: SocketState = initialState,
  action: T.Actions | any
): T.SocketState => {
  switch (action.type) {
    case "@socket/connect":
      return {
        ...state,
        socketId: action.payload.socketId,
        loginId: action.payload.loginId,
        orders: [...state.orders, ...action.payload.orders],
      };

    case "@socket/addOrder":
      return {
        ...state,
        orders: [...state.orders, action.payload.orders],
      };

    case "@socket/setDisconnect":

    default:
      return state;
  }
};
