import { combineReducers } from "redux";
import * as Clock from "./clock";
import * as Counter from "./counter";
import * as Socket from "./socket";

export const rootReducer = combineReducers({
  clock: Clock.reducer,
  counter: Counter.reducer,
  socket: Socket.reducer,
});
