// reducers.ts

import { SocketState, Order } from "./types";
import * as T from "./types";

const initialState: T.SocketState = {
  // shop1: [
  //   {
  //     loginId: "",
  //     orderTime: "2023-10-01T10:00:00Z",
  //     orderNumber: "12345",
  //     storeCapacity: "50",
  //     orderType: "pickup",
  //     contactNumber: "123-456-7890",
  //     shopName: "Shop 1",
  //     shopLoginId: "shop1",
  //     total: "100",
  //     items: ["item1", "item2"],
  //   },
  // ],
  // shop2: [
  //   {
  //     loginId: "user2",
  //     orderTime: "2023-10-01T11:00:00Z",
  //     orderNumber: "67890",
  //     storeCapacity: "30",
  //     orderType: "delivery",
  //     contactNumber: "098-765-4321",
  //     shopName: "Shop 2",
  //     shopLoginId: "shop2",
  //     total: "200",
  //     items: ["item3", "item4"],
  //   },
  // ],
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
    case "@socket/addOrder": {
      // console.log("addOrder action", action.payload.shopLoginId);
      const ownerId = action.payload.shopLoginId;
      if (!state[ownerId]) {
        return {
          ...state,
          [ownerId]: [action.payload],
        };
      } else {
        return {
          ...state,
          [ownerId]: [...state[ownerId], action.payload],
        };
      }
    }

    case "@socket/setDisconnect":

    default:
      return state;
  }
};
