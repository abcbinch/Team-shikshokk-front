import * as T from "./types";

const initialState: T.State = new Date().toISOString();
export const reducer = (
  state: T.State = initialState,
  action: T.Actions | any
) => {
  switch (action.type) {
    case "@clock/setClock":
      return action.payload;
    default:
      return state;
  }
};
