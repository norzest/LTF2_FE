// writer: 권혁준
export default function goToCart(
  object,
  saveCart,
  changeModalMsg,
  navigate,
  setOpen
) {
  switch (saveCart(object)) {
    case "success": {
      changeModalMsg(
        "YN",
        "장바구니에 주문이 저장되었습니다.",
        "장바구니로 이동",
        () => navigate("/cart")
      );
      setOpen(true);
      break;
    }
    case "alreadyExist": {
      changeModalMsg("", "이미 존재하는 주문 정보입니다!", "", "");
      setOpen(true);
      break;
    }
    default: {
      changeModalMsg(
        "",
        "알 수 없는 오류가 발생했습니다. \n불편을 드려 죄송합니다.",
        "",
        ""
      );
      setOpen(true);
      break;
    }
  }
}
