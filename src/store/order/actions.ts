import type * as T from "./types";

export const addOrder = (payload: T.OrderState): T.AddOrderAction => ({
  type: "order/addOrder",
  payload,
});

export const delOrder = (payload: T.OrderState): T.DelOrderAction => ({
  type: "order/delOrder",
  payload,
});
