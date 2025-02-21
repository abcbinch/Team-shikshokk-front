import * as Socket from "./socket";
import * as Counter from "./counter";
import * as Clock from "./clock";
export interface AppState {
  socket: Socket.SocketState;
  counter: Counter.State;
  clock: Clock.State;
}
