// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import * as S from "./socket";
import * as C from "./counter";
import * as Cl from "./clock";
import * as L from "./login";
// 리듀서를 불러옵니다.
// 각 리듀서의 상태 타입을 정의합니다.
import reviewReducer from "./modules/reviewSlice";

const rootReducer = combineReducers({
  socket: S.socketReducer,
  counter: C.reducer,
  reviews: reviewReducer,
  clock: Cl.reducer,
  login: L.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
