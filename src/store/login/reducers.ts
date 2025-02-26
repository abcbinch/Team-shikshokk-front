import { RootState } from '../rootReducer';
import * as T from './types';

const initialState: T.AuthState = {
  loginId: null,
  id: 0,
  nickname: null,
  type: null,

  storeId: null, // 가게 ID 추가

  phoneNumber: null,

};

export const reducer = (
  state: T.AuthState = initialState,
  action: T.Actions | any,
): T.AuthState => {
  switch (action.type) {
    // 유저 로그인 아이디 (Customer user_id)
    case '@auth/setLoginId':
      return {
        ...state,
        loginId: action.payload,
      };

    // 유저 기본키값 (Customer id)
    case '@auth/setUserId':
      return {
        ...state,
        id: action.payload,
      };

    // 유저 닉네임
    case '@auth/setNickname':
      return {
        ...state,
        nickname: action.payload,
      };

    // 유저 타입
    case '@auth/setType':
      return {
        ...state,
        type: action.payload,
      };


    // 가게 ID 설정
    case '@auth/setStoreId': // 새로운 액션 타입 추가
      return {
        ...state,
        storeId: action.payload, // 가게 ID를 상태에 저장
      };

    // 로그아웃
    case '@auth/setLogout':

    case "@auth/setPhoneNumber":
      return {
        ...state,
        phoneNumber: action.payload,
      };

    case "@auth/setLogout":

      return {
        ...state,
        loginId: null,
        id: 0,
        nickname: null,
        type: null,
        storeId: null, // 로그아웃 시 가게 ID 초기화
      };

    default:
      return state;
  }
};
