// writer : 심영효
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContainer";
import TitleSection from "../components/TitleSection";
import CartBar from "../components/CartBar";
import * as Styled from "../styles/cartStyle";
import CartProduct from "../components/CartProduct";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { LGButton } from "../components/Button";
import { getCartInfo } from "../api/CartAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Cart({
  cart,
  deleteCart,
  modalShow,
  setModalShow,
  propsList,
  phones,
}) {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState({
    nav: "통신상품",
    item: "전체",
  });

  const [cartArr, setCartArr] = useState([]);
  const navigate = useNavigate();

  const handleData = async () => {
    const pr = await Promise.all(
      cart.data.map(
        async (d, index) =>
          await getCartInfo({
            phone_id: d.phone,
            plan_id: d.plan,
            color_id: d.color,
          })
            .then((data) => {
              const tempArr = {
                id: d.id,
                date: d.date.toString(),
                discount: d.discount,
                info: data.shoppingBasket,
                registration: d.registration,
                installment: d.installment,
                ship: d.ship,
              };
              return tempArr;
            })
            .catch((e) => {})
      )
    );
    return pr;
  };

  const onClickTab = (value) => {
    setActive({
      ...active,
      item: value,
    });
  };

  const onMainBtnClick = () => {
    navigate(`/phone/5G`);
  };

  useEffect(() => {
    setLoading(true);
    setActive({
      nav: "통신상품",
      item: "전체",
    });
  }, []);

  useEffect(async () => {
    const prr = await handleData();
    setCartArr(prr);
  }, [cart]);

  useEffect(async () => {
    if (loading) {
      const prr = await handleData();
      setCartArr(prr);
      setLoading(false);
    }
  }, [loading]);

  return (
    <PageContainer>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ margin: 0, padding: 0 }}>
          <TitleSection />
          <div style={{ textAlign: "center" }}>
            <CartBar active={active} setActive={setActive} />

            <div>
              {active.nav === "통신상품" && cart.data.length >= 1 ? (
                <div>
                  <Styled.CartTabMenuUl>
                    <LGButton
                      variant={
                        active.item === "전체"
                          ? "outline-primary"
                          : "outline-dark"
                      }
                      children={`전체 (${
                        cart.data != null ? cart.data.length : 0
                      })`}
                      onClick={() => onClickTab("전체")}
                      style={{ marginRight: 10 }}
                    />
                    <LGButton
                      variant={
                        active.item === "모바일기기"
                          ? "outline-primary"
                          : "outline-dark"
                      }
                      children={`모바일기기 (${
                        cart.data != null ? cart.data.length : 0
                      })`}
                      onClick={() => onClickTab("모바일기기")}
                      style={{ marginRight: 10 }}
                    />
                    <LGButton
                      variant={
                        active.item === "모바일요금제"
                          ? "outline-primary"
                          : "outline-dark"
                      }
                      children={`모바일요금제 (${
                        cart.plan != null ? cart.plan.length : 0
                      })`}
                      onClick={() => onClickTab("모바일요금제")}
                      style={{ marginRight: 10 }}
                    />
                    <LGButton
                      variant={
                        active.item === "인터넷/IPTV"
                          ? "outline-primary"
                          : "outline-dark"
                      }
                      children={`인터넷/IPTV (${
                        cart.iptv != null ? cart.iptv.length : 0
                      })`}
                      onClick={() => onClickTab("인터넷/IPTV")}
                      style={{ marginRight: 10 }}
                    />
                  </Styled.CartTabMenuUl>

                  {active.item === "모바일기기" ||
                  (active.item === "전체" && cart.data.length >= 1) ? (
                    <div style={{ marginTop: 40 }}>
                      <Styled.CartProductTbl>
                        <Styled.CartProductTblTitle>
                          <p style={{ fontSize: 24, fontWeight: 700 }}>
                            모바일기기
                            <Styled.CartProductEm>
                              {" "}
                              ({cart.data.length})
                            </Styled.CartProductEm>
                          </p>
                        </Styled.CartProductTblTitle>
                        <ul
                          style={{ listStyle: "none", margin: 0, padding: 0 }}
                        >
                          {cartArr.map((c) => (
                            <CartProduct
                              key={c.id}
                              data={c}
                              deleteCart={deleteCart}
                              modalShow={modalShow}
                              setModalShow={setModalShow}
                              propsList={propsList}
                              phones={phones}
                            />
                          ))}
                        </ul>
                      </Styled.CartProductTbl>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div>
                  <Styled.CartImgLayout>
                    <Styled.CartAlertImg />
                  </Styled.CartImgLayout>

                  <Styled.CartLayout>
                    <Styled.CartText>
                      장바구니에 담은 상품이 없습니다.
                    </Styled.CartText>
                  </Styled.CartLayout>
                  <Styled.MvMainBtnLayout>
                    <LGButton
                      size="lg"
                      variant="outline-dark"
                      children="메인 페이지로 이동"
                      onClick={onMainBtnClick}
                    />
                  </Styled.MvMainBtnLayout>
                </div>
              )}

              <div style={{ marginTop: 80 }}>
                <Styled.CartNoticeDl>
                  <Styled.CartNoticeDt>
                    <Styled.CartNoticeImg>
                      <ErrorOutlineIcon />
                    </Styled.CartNoticeImg>
                    이용안내
                  </Styled.CartNoticeDt>
                  <dd>
                    <ul>
                      <Styled.CartNoticeLi>
                        장바구니 저장된 상품은 최대 90일까지 보관 가능합니다.
                      </Styled.CartNoticeLi>
                      <Styled.CartNoticeLi>
                        장바구니 저장된 상품의 지원금 및 정상가 등의 금액이
                        변경될 경우, 페이지 접근 시 최신 금액으로 자동
                        업데이트됩니다.
                      </Styled.CartNoticeLi>
                      <Styled.CartNoticeLi>
                        장바구니 저장된 상품은 지원금 및 정책 변경의 사유로
                        수정/삭제될 수 있습니다.
                      </Styled.CartNoticeLi>
                    </ul>
                  </dd>
                </Styled.CartNoticeDl>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
