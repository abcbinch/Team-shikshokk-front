import * as T from "./types";

const initialState: T.MenuState = {
  items: [],
};

export const firstOrderReducer = (
  state = initialState,
  action: T.Actions | any
): T.MenuState => {
  switch (action.type) {
    case "menu/addMenu":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "menu/delMenu":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};
