// types.ts
import { Action } from "redux";
export interface Order {
  loginId: string;
  orderTime: string;
  orderNumber: string;
  storeCapacity: string;
  contactNumber: string;
  shopName: string;
  total: string;
  items: string[];
}

export type SocketState = {
  socketId: string;
  loginId: string;
  orders: Order[];
};
export interface RootState {
  socket: SocketState;
}

export type SocketConnectAction = Action<"@socket/connect"> & {
  payload: SocketState;
};

export type SocketAddOrderAction = Action<"@socket/addOrder"> & {
  payload: Order;
};

export type Actions = SocketConnectAction | SocketAddOrderAction;
