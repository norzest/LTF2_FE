/* eslint-disable react-hooks/exhaustive-deps */
// writer: 권혁준
import React, { useEffect, useState } from "react";
import { Row } from "../styles/gridStyle";
import OrderBar from "../components/OrderBar";
import PhoneInfomation from "../components/PhoneInfomation";
import DetailInfomation from "../components/DetailInfomation";
import DetailSideBar from "../components/DetailSideBar";
import { useParams } from "react-router-dom";
import { getPhoneByPhoneId } from "../api/PhoneAPI";
import { getPlansByTelecomTech } from "../api/PlanAPI";
import { getPublicSupportByPhoneIdAndPlanId } from "../api/PublicSupportAPI";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import { priceCalc } from "../util/priceCalc";
import { deleteAll } from "../util/inputCompare";
import PlanModal from "../components/PlanModal";
import PlanBoxModal from "../components/PlanBoxModal";

export default function Detail({
  modalShow,
  setModalShow,
  saveCart,
  propsList,
  plans,
}) {
  // 정보를 조회할 휴대폰의 id
  const { id } = useParams();

  // loading state
  const [loading, setLoading] = useState(true);

  // plan
  const [planList, setPlanList] = useState([]);
  // plan box modal control, row는 내용, show는 modal show toggle
  const [showPlan, setShowPlan] = useState({ row: {}, show: false });
  // 현재 디테일 페이지 내 보여줄 내용 state
  const [active, setActive] = useState({
    nav: "예상 납부금액",
    registration: "기기변경",
    phone: {},
    plan: {},
    color: {},
    ship: "우체국 택배",
    installment: 24,
    supportPrice: 0,
    discount: 24,
    date: new Date(),
    error: false,
  });
  // 가격 정보 state
  const [priceInfo, setPriceInfo] = useState({});
  // 휴대폰 정보 및 요금제, 공시지원금 데이터 받아오기
  const handleData = async (planId) => {
    // 공시지원금 api 요청
    const getPublicSupportPrice = (pId) =>
      getPublicSupportByPhoneIdAndPlanId({
        phone_id: id,
        plan_id: pId,
      }).then((s) => {
        if (s.status === 404) {
          return 0;
        } else {
          return s.PublicSupportPrice;
        }
      });
    // [휴대폰정보, 요금제정보, 요금제 리스트, 공시지원금]
    const [phoneData, planData, planList, supportPrice] =
      // 휴대폰정보 api 요청
      await getPhoneByPhoneId(id).then(async (d) => {
        // 정보 없을 시 error return
        if (d.status === 404) {
          return ["error", "error", "error", "error"];
          // 요금제 리스트가 있을 경우 공시지원금 정보만 받아옴
        } else if (plans.length !== 0) {
          const planArr = plans.filter(
            (row) => row.telecomTech === d.phoneDetail.telecomTech
          );
          const nowPlan = planId
            ? plans.find((row) => row.planId === planId)
            : planArr[0];
          return await Promise.all([
            d.phoneDetail,
            nowPlan,
            planArr,
            nowPlan.planType === "다이렉트"
              ? 0
              : getPublicSupportPrice(nowPlan.planId),
          ]);
        } else {
          // 요금제 리스트가 없을 경우 요금제 명단 및 공시지원금 정보 받아옴
          return await getPlansByTelecomTech(d.phoneDetail.telecomTech).then(
            async (p) => {
              const planArr = p.PlanList;
              const nowPlan = planId
                ? planArr.find((row) => row.planId === planId)
                : planArr[0];
              const values = await Promise.all([
                d.phoneDetail,
                nowPlan,
                planArr,
                nowPlan.planType === "다이렉트"
                  ? 0
                  : getPublicSupportPrice(nowPlan.planId),
              ]);
              return values;
            }
          );
        }
      });
    if (phoneData === "error") {
      return "error";
    } else
      return {
        phone: phoneData,
        color: phoneData.colorList[0],
        plan: planData,
        planList: planList,
        supportPrice: supportPrice,
      };
  };

  const handleFilterOpt = async (key, value) => {
    const isEconomical = (plan, supportPrice) => {
      return plan.monthPrice * 0.25 * 24 > supportPrice ? 24 : -1;
    };

    const values = await handleData(value);
    if (values === "error") {
      setActive({ ...active, error: true });
    } else {
      setActive({
        ...active,
        plan: values.plan,
        supportPrice: values.supportPrice,
        discount:
          planList.find((row) => row.planId === value).planType === "다이렉트"
            ? 0
            : isEconomical(values.plan, values.supportPrice),
      });
    }
  };

  const handleModal = () =>
    setModalShow((prev) => ({ ...prev, plan: !prev.plan }));

  useEffect(async () => {
    deleteAll(propsList);
  }, []);

  useEffect(() => {
    if (active.phone) {
      setPriceInfo(
        priceCalc(
          active.phone,
          active.plan,
          active.supportPrice,
          active.discount,
          active.installment
        )
      );
    }
  }, [active]);

  useEffect(async () => {
    if (loading) {
      const values = await handleData();
      if (values === "error") {
        setActive({ ...active, error: true });
      } else
        setActive({
          ...active,
          phone: values.phone,
          color: values.color,
          plan: values.plan,
          supportPrice: values.supportPrice,
        });
      setPlanList(values.planList);
      setLoading(false);
    }
  }, [loading]);

  return loading ? (
    <Loader />
  ) : active.error ? (
    <NotFound />
  ) : (
    <div>
      <PlanBoxModal showPlan={showPlan} setShowPlan={setShowPlan} />
      <PlanModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        nowPlanId={active.plan.planId}
        handleFilterOpt={handleFilterOpt}
        plans={planList}
      />
      <PhoneInfomation
        active={active}
        setActive={setActive}
        priceInfo={priceInfo}
        saveCart={saveCart}
      />
      <OrderBar active={active} setActive={setActive} />
      <Row justify="center" body>
        <DetailInfomation
          active={active}
          setActive={setActive}
          planList={planList}
          handleModal={handleModal}
          handleFilterOpt={handleFilterOpt}
          setShowPlan={setShowPlan}
        />
        <DetailSideBar
          active={active}
          priceInfo={priceInfo}
          saveCart={saveCart}
        />
      </Row>
    </div>
  );
}
