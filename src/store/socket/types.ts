// types.ts
import { Action } from "redux";
export interface SocketState {
  connected: boolean;
  loginId: string;
  socketId: string;
  data: any[];
}

export interface RootState {
  socket: SocketState;
}

export interface OrderState {
  loginId: string;
  socketId: string;
  orderTime: string;
  orderNumber: string;
  storeCapacity: string;
  contactNumber: string;
  shopName: string;
  total: string;
  items: string[];
}

export type SocketConnectAction = Action<"@socket/connect"> & {
  payload: {
    connected: boolean;
    loginId: string;
    socketId: string;
    data: any[];
  };
};

export type SocketAddOrderAction = Action<"@socket/addOrder"> & {
  payload: {
    data: any[];
  };
};

export type Actions = SocketConnectAction | SocketAddOrderAction;
