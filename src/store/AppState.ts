import * as Counter from "./counter";
import * as Clock from "./clock";
import * as Order from "./order";
import * as Login from "./login";
export interface AppState {
  counter: Counter.State;
  clock: Clock.State;
  order: Order.OrderState;
  login: Login.AuthState;
}
