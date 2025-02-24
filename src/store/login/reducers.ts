import { RootState } from "../rootReducer";
import * as T from "./types";

const initialState: T.AuthState = {
  loginId: null,
  id: 0,
  nickname: null,
};

export const reducer = (
  state: T.AuthState = initialState,
  action: T.AuthActions | any
): T.AuthState => {
  switch (action.type) {
    //유저 로그인 아이디 (Customer user_id)
    case "@auth/setLoginId":
      return {
        ...state,
        loginId: action.payload,
      };

    //유저 기본키값  (Customer id)
    case "@auth/setUserId":
      return {
        ...state,
        id: action.payload,
      };

    case "@auth/setNickname":
      return {
        ...state,
        nickname: action.payload,
      };

    default:
      return state;
  }
};
