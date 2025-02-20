import * as Socket from "./socket";
import * as Counter from "./counter";
export interface AppState {
  socket: Socket.SocketState;
  counter: Counter.State;
}
