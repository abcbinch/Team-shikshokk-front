import { Action } from "redux";

export interface firstOrder {
  loginId: string;
  orderTime: string;
  orderNumber: string;
  contactNumber: string;
  shopName: string;
  shopLoginId: string;
  price: string[];
  total: string;
  items: string[];
}
export interface MenuState {
  items: firstOrder[];
  price: firstOrder[];
}

export type AddMenuAction = Action<"menu/addMenu"> & {
  payload: MenuState;
};

export type DelMenuAction = Action<"menu/delMenu"> & {
  payload: MenuState;
};

export type Actions = AddMenuAction | DelMenuAction;
