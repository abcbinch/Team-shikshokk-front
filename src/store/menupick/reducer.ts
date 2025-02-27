import * as T from "./types";

const initialState: T.MenuState = {
  items: [],
  price: [],
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
      console.log("🚀 Reducer 실행됨! payload:", action.payload);

      return {
        ...state,
        items: state.items.map((order, idx) => {
          if (idx !== action.payload.orderIndex) return order;

          const newItems = [...order.items];
          newItems.splice(action.payload.itemIndex, 1);

          const newPrice = [...order.price];
          newPrice.splice(action.payload.itemIndex, 1);

          return {
            ...order,
            items: newItems,
            price: newPrice,
          };
        }),
      };

    case "menu/resetMenu":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};
