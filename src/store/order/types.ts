import { Action } from "redux";

export interface Order {
  //  예시
  //   loginId: loginId,
  //   orderTime: clock,
  //   orderNumber: uuidv4(),
  //   orderType: "매장",
  //   storeCapacity: "4",
  //   contactNumber: "010-1234-1234",
  //   shopName: shopName,
  //   shopLoginId: shopLoginId,
  //   total: "85000",
  //   items: [
  //     "매우매우맛있는후라x1",
  //     "매우매우맛있는양념x1",
  //     "매우매우맛있는순살x1",
  //   ],

  loginId?: string;
  orderTime?: string;
  orderNumber?: string;
  orderType?: string;
  guests: number; // 방문 인원
  visitTime: VisitInfo["visitTime"]; // 방문 시각
  visitDate: VisitInfo["visitDate"]; //방문 날짜
  contactNumber?: string;
  shopName?: string;
  shopLoginId?: string;
  total?: string;
  items?: string[];
}

interface VisitInfo {
  visitTime: { hour: string; minute: string };
  visitDate: Date;
}
export interface OrderState {
  orders: Order[];
}

export type AddOrderAction = Action<"order/addOrder"> & {
  payload: OrderState;
};

export type DelOrderAction = Action<"order/delOrder"> & {
  payload: OrderState;
};

export type Actions = AddOrderAction | DelOrderAction;
