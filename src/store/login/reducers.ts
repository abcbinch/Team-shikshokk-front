import { RootState } from "../rootReducer";
import * as T from "./types";

const initialState: T.AuthState = {
  loginId: null,
  id: null,
  nickname: null,
  type: null,

  storeId: null, // 가게 ID 추가

  phoneNumber: null,
};

export const reducer = (
  state: T.AuthState = initialState,
  action: T.Actions | any
): T.AuthState => {
  switch (action.type) {
    // 유저 로그인 아이디 (Customer user_id)
    case "@auth/setLoginId":
      return {
        ...state,
        loginId: action.payload,
      };

    // 유저 기본키값 (Customer id)
    case "@auth/setUserId":
      return {
        ...state,
        id: action.payload,
      };

    // 유저 닉네임
    case "@auth/setNickname":
      return {
        ...state,
        nickname: action.payload,
      };

    // 유저 타입
    case "@auth/setType":
      return {
        ...state,
        type: action.payload,
      };

    // 로그아웃
    case "@auth/setLogout":
      return {
        ...state,
        loginId: null,
        id: null,
        nickname: null,
        type: null,
        storeId: null, // 로그아웃 시 가게 ID 초기화
      };

    case "@auth/setPhoneNumber":
      return {
        ...state,
        phoneNumber: action.payload,
      };

    default:
      return state;
  }
};
