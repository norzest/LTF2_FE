/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Header from "./components/Header";
import "./css/App.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { getPhonesAll } from "./api/PhoneAPI";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import ComparedPopup from "./components/ComparedPopup";
import Order from "./pages/Order";
import ComparedModal from "./components/ComparedModal";
import NotFound from "./components/NotFound";
import { getPlansAll } from "./api/PlanAPI";
import Size from "./pages/Size";

function App() {
  const [phones, setPhones] = useState([]);
  const [plans, setPlans] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [cart, setCart] = useState({ count: 0, data: [] });
  const [comparePhoneList, setComparePhoneList] = useState([{}, {}, {}]);
  const [compareDataList, setCompareDataList] = useState([{}, {}, {}]);
  let propsList = {
    comparePhoneList,
    setComparePhoneList,
    compareDataList,
    setCompareDataList,
  };
  const [modalShow, setModalShow] = useState({
    comparePopup: false,
    compare: false,
    plan: false,
  });

  const fetchPhones = async () => {
    const data = await getPhonesAll()
      .then((data) => {
        return data.phoneList;
      })
      .catch((e) => {});
    setPhones(data);
  };

  const fetchPlans = async () => {
    const data = await getPlansAll()
      .then((data) => {
        return data.PlanList;
      })
      .catch((e) => {});
    setPlans(data);
  };

  // 장바구니 데이터 쿠키에서 가져오기
  const getCartDatas = () => {
    // 쿠키에 데이터가 있을 시 가져오기
    if (cookies.cart) {
      setCart(cookies.cart);
    }
  };

  // 장바구니에 저장하기
  const saveCart = (object) => {
    // 장바구니에 저장할 데이터
    // color, phone, plan의 id, 할인 정보(공시지원금, 선택약정), 배송 방법
    const cookieUploadObject = () => ({
      color: object.color.colorId,
      registration: object.registration,
      installment: object.installment,
      discount: object.discount,
      phone: object.phone.phoneId,
      plan: object.plan.planId,
      ship: object.ship,
      date: object.date,
    });

    // 장바구니 내에 같은 데이터가 존재하는 지 여부
    const existSameValueInCart = () => {
      let result = false;
      for (let i of cart.data) {
        if (
          i.registration === cookieUploadObject().registration &&
          i.color === cookieUploadObject().color &&
          i.discount === cookieUploadObject().discount &&
          i.phone === cookieUploadObject().phone &&
          i.plan === cookieUploadObject().plan &&
          i.ship === cookieUploadObject().ship
        ) {
          result = true;
          break;
        }
      }
      return result;
    };
    // 장바구니가 쿠키에 존재하고
    if (cart) {
      // 장바구니에 겹치는 데이터가 없다면
      if (!existSameValueInCart()) {
        // 원래의 장바구니 데이터에 추가로 데이터를 저장
        const newCart = {
          count: cart.count + 1,
          data: [...cart.data, { id: cart.count, ...cookieUploadObject() }],
        };
        const expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 90);
        setCookie("cart", newCart, { path: "/", expires: expiredDate });
        setCart((prev) => newCart);
        return "success";
      } else return "alreadyExist";
    } else return "error";
  };

  // 장바구니 아이템 삭제하기
  const deleteCart = (id) => {
    const returnArray = [...cart.data];
    const deleteId = returnArray.findIndex((row) => row.id === id);
    returnArray.splice(deleteId, 1);
    setCart({ count: cart.count, data: returnArray });
    setCookie("cart", { count: cart.count, data: returnArray });
  };

  useEffect(() => {
    fetchPhones();
    fetchPlans();
    getCartDatas();
  }, []);

  useEffect(() => {
    if (modalShow.compare) {
    }
  }, [modalShow.compare]);

  return (
    <BrowserRouter>
      <div className="App" style={{ minWidth: "1700px", width: "100%" }}>
        <Header />
        <NavBar />
        <ComparedPopup
          modalShow={modalShow}
          setModalShow={setModalShow}
          propsList={propsList}
        />
        <ComparedModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          propsList={propsList}
          plans={plans}
        />
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route
            path="/phone/:tech"
            exact
            element={
              <Home
                phones={phones}
                plans={plans}
                modalShow={modalShow}
                setModalShow={setModalShow}
                saveCart={saveCart}
                propsList={propsList}
              />
            }
          />
          <Route
            path="/detail/:id"
            exact
            element={
              <Detail
                modalShow={modalShow}
                setModalShow={setModalShow}
                saveCart={saveCart}
                propsList={propsList}
                plans={plans}
              />
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <Cart
                cart={cart}
                deleteCart={deleteCart}
                modalShow={modalShow}
                setModalShow={setModalShow}
                propsList={propsList}
                phones={phones}
              />
            }
          />
          <Route path="/order" exact element={<Order />} />
          <Route
            path="/search/:keyword"
            exact
            element={<Search saveCart={saveCart} propsList={propsList} />}
          />
          <Route path="/size" exact element={<Size />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
