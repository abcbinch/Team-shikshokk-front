import type * as T from './types';

export const setLoginId = (payload: string): T.SetLoginIdAction => ({
  type: '@auth/setLoginId',
  payload,
});

export const setUserId = (payload: number): T.SetIdAction => ({
  type: '@auth/setUserId',
  payload,
});

export const setNickname = (payload: string): T.SetNicknameAction => ({
  type: '@auth/setNickname',
  payload,
});

export const setType = (payload: string): T.SetTypeAction => ({
  type: '@auth/setType',
  payload,
});

// 가게 ID 설정 액션 생성자 추가
export const setStoreId = (payload: string): T.SetStoreIdAction => ({
  type: '@auth/setStoreId',
  payload,
});

export const setLogout = (): T.SetLogoutAction => ({
  type: '@auth/setLogout',
  payload: null,
});

export const setUserData = (userData: {
  id: number;
  loginId: string;
  nickname: string;
  type: string;
  storeId: string;
}): T.SetUserDataAction => ({
  type: '@auth/setUserData',
  payload: userData,
});
