// types.ts
import { Action } from "redux";

export interface Order {
  loginId: string;
  orderTime: string;
  orderNumber: string;
  storeCapacity: string;
  orderType: string;
  contactNumber: string;
  shopName: string;
  shopLoginId: string;
  total: string;
  items: string[];
}
export interface Owner {
  ownerId: string;
  orders: Order[];
}

export interface SocketState {
  owners: Owner[];
}

export type SocketConnectAction = Action<"@socket/connect"> & {
  payload: SocketState;
};

export type SocketAddOrderAction = Action<"@socket/addOrder"> & {
  payload: SocketState;
};

export type Actions = SocketConnectAction | SocketAddOrderAction;
