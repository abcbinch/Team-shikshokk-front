// reducers.ts

import { SocketState, Order } from "./types";
import * as T from "./types";

const initialState: T.SocketState = {
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
      const newOrder = action.payload;
      return {
        ...state,
        orders: {
          ...state.orders,

          [newOrder.loginId]: [
            ...(state.orders[newOrder.loginId] ?? []),
            newOrder,
          ],
        },
      };

    case "@socket/setDisconnect":

    default:
      return state;
  }
};
