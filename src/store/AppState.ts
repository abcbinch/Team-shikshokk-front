import * as Clock from "./clock";
import * as Counter from "./counter";
import * as Socket from "./socket";
export interface AppState {
  clock: Clock.State;
  counter: Counter.State;
  socket: Socket.State;
}
