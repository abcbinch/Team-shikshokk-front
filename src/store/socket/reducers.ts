// reducers.ts

import { SocketState, Order } from "./types";
import * as T from "./types";

const initialState: T.SocketState = {
  owners: [
    {
      ownerId: "owner01",
      orders: [
        {
          loginId: "customer01",
          orderTime: "2023-10-01T10:00:00Z",
          orderNumber: "cf358204",
          storeCapacity: "50",
          orderType: "pickup",
          contactNumber: "123-456-7890",
          shopName: "Shop A",
          shopLoginId: "owner01",
          total: "100.00",
          items: ["item1", "item2", "item3"],
        },
      ],
    },
    {
      ownerId: "owner02",
      orders: [
        {
          loginId: "customer02",
          orderTime: "2023-10-02T11:00:00Z",
          orderNumber: "gh530293",
          storeCapacity: "30",
          orderType: "delivery",
          contactNumber: "234-567-8901",
          shopName: "Shop B",
          shopLoginId: "owner02",
          total: "200.00",
          items: ["item1", "item2", "item3"],
        },
      ],
    },
  ],
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
      const newOrder = action.payload;
      console.log(newOrder[0].shopLoginId);
      return {
        ...state,
        owners: state.owners.map((owner) =>
          owner.ownerId === newOrder[0].shopLoginId
            ? {
                ...owner,
                orders: [...owner.orders, newOrder[0]],
              }
            : owner
        ),
      };
    }

    case "@socket/setDisconnect":

    default:
      return state;
  }
};
