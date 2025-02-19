import type { Action } from "redux";

export type State = string;
export interface SetSocketAction extends Action<"@socket/message"> {
  socketId: string;
  message: string;
}
export interface ConnectSocketAction extends Action<"@socket/connect"> {
  socketId: string;
  message: string;
}
export type Actions = SetSocketAction | ConnectSocketAction;
