import type { Action } from 'redux';

// State 타입 정의
export type AuthState = {
  loginId: string | null;
  id: number | null;
  nickname: string | null;
  type: string | null;

  storeId: string | null; // 가게 ID 추가

  phoneNumber: string | null;

};

// Action 타입 정의
export type SetLoginIdAction = Action<'@auth/setLoginId'> & {
  payload: string;
};

export type SetIdAction = Action<'@auth/setUserId'> & {
  payload: number;
};

export type SetNicknameAction = Action<'@auth/setNickname'> & {
  payload: string;
};

export type SetTypeAction = Action<'@auth/setType'> & {
  payload: string;
};

export type SetStoreIdAction = Action<'@auth/setStoreId'> & {
  // 가게 ID 액션 타입 추가
  payload: string;
};

export type SetLogoutAction = Action<'@auth/setLogout'> & {
  payload: null;
};


export type SetUserDataAction = Action<'@auth/setUserData'> & {
  payload: {
    id: number;
    loginId: string;
    nickname: string;
    type: string;
    storeId: string;
  };

export type SetPhoneNumberAction = Action<"@auth/setPhoneNumber"> & {
  payload: string;

};

// 전체 액션 타입 정의
export type Actions =
  | SetLoginIdAction
  | SetIdAction
  | SetNicknameAction
  | SetTypeAction

  | SetStoreIdAction // 가게 ID 액션 추가
  | SetLogoutAction;

  | SetLogoutAction
  | SetPhoneNumberAction;

