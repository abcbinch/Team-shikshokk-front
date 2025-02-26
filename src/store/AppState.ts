import * as Counter from "./counter";
import * as Clock from "./clock";
export interface AppState {
  counter: Counter.State;
  clock: Clock.State;
}
