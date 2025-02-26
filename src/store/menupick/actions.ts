export const ADD_MENU = "ADD_MENU";
export const REMOVE_MENU = "REMOVE_MENU";

export const addMenu = (menu: { name: string; price: number }) => ({
  type: ADD_MENU,
  payload: menu,
});

export const removeMenu = (name: string) => ({
  type: REMOVE_MENU,
  payload: { name },
});
