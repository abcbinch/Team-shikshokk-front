// reducers.ts
import { faL } from "@fortawesome/free-solid-svg-icons";
import { SocketState } from "./types";
import * as T from "./types";

const initialState: T.SocketState = {
  customerId: "",
  orders: {},
};

export const socketReducer = (
  state: SocketState = initialState,
  action: T.Actions | any
): T.SocketState => {
  switch (action.type) {
    case "@socket/connect":
      return {
        ...state,
      };

    case "@socket/addOrder":
      return {
        ...state,
        customerId: action.payload,
      };

    case "@socket/setDisconnect":

    default:
      return state;
  }
};
