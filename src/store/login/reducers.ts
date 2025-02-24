import { RootState } from "../rootReducer";
import * as T from "./types";

const initialState: T.AuthState = {
  loginId: null,
};

export const reducer = (
  state: T.AuthState = initialState,
  action: T.AuthActions | any
): T.AuthState => {
  switch (action.type) {
    case "@auth/setLoginId":
      return {
        ...state,
        loginId: action.payload,
      };
    default:
      return state;
  }
};
