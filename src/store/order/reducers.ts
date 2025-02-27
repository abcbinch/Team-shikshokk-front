import * as T from "./types";

const initialState: T.OrderState = {
  orders: [],
};

export const orderReducer = (
  state = initialState,
  action: T.Actions | any
): T.OrderState => {
  switch (action.type) {
    case "order/addOrder":
      return {
        ...state,
        orders: [
          ...state.orders,
          ...(Array.isArray(action.payload)
            ? action.payload
            : [action.payload]),
        ],
      };
    case "order/delOrder":
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
};
