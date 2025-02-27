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
          if (idx !== action.payload.orderIndex) return order; // 삭제할 주문이 아니라면 그대로 반환

          const newItems = [...order.items];
          newItems.splice(action.payload.itemIndex, 1); // ✅ 해당 인덱스의 메뉴만 삭제

          const newPrice = [...order.price];
          newPrice.splice(action.payload.itemIndex, 1); // ✅ 가격도 함께 삭제

          return {
            ...order,
            items: newItems,
            price: newPrice,
          };
        }),
      };

    case "menu/reset":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};
