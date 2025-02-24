import type { Action } from "redux";

// State 타입 정의
export type AuthState = {
  loginId: string | null;
};

// Action 타입 정의
export type SetLoginIdAction = Action<"@auth/setLoginId"> & {
  payload: string;
};

// 전체 액션 타입 정의
export type AuthActions = SetLoginIdAction;
