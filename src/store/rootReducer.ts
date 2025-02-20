// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import * as S from "./socket";
import * as C from "./counter";
// 리듀서를 불러옵니다.
// 각 리듀서의 상태 타입을 정의합니다.

const rootReducer = combineReducers({
  socket: S.socketReducer,
  counter: C.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
