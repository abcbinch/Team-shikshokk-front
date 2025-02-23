import "../styles/shoppingCart.scss";

export default function ShoppingCart() {
  return (
    <div className="cart-container">
      <div className="fold-btn"></div>
      <div className="pay-info">
        <ul>
          <li>주문한 메뉴</li>
          <li>주문한 메뉴</li>
          <li>주문한 메뉴</li>
          <li>주문한 메뉴</li>
        </ul>
        <hr />그 외 주문 옵션 나오는 공간
        <button type="submit">결제하기</button>
      </div>
    </div>
  );
}
