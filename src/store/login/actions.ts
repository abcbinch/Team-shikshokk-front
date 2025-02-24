import type * as T from "./types";

export const setLoginId = (payload: string): T.SetLoginIdAction => ({
  type: "@auth/setLoginId",
  payload,
});
