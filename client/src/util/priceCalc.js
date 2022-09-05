/* eslint-disable react-hooks/exhaustive-deps */
// writer: 권혁준
import { getPhoneByPhoneId } from "../api/PhoneAPI";
import { getPlanByPlanId } from "../api/PlanAPI";
import { getPublicSupportByPhoneIdAndPlanId } from "../api/PublicSupportAPI";

// 휴대폰, 요금제, 공시지원금, 할인유형, 할부개월 수를 파라미터로 받음
export function priceCalc(phone, plan, supportPrice, discount, installment) {
  // 할부(installment) 입력 안 할 시 24로 인식
  const month = installment || 24;

  // 월 할부 이자 (연 이자율 5.9% / 12)
  const monthFee = 0.059 / 12;

  // 정상 휴대폰 가격
  const originalPhone = phone.price || 0;
  // 공시지원금
  const publicSupportPrice =
    discount === -1 ? Math.round(supportPrice / 1.15 / 100) * 100 : 0;
  // 15% 추가 지원금
  const extraSupportPrice =
    discount === -1
      ? Math.round(((supportPrice / 1.15) * 0.15) / 100) * 100
      : 0;
  // 할부원금 (공시지원금 선택 시 공시지원금을 제외한 값)
  const actualPrice = originalPhone - (discount === -1 ? supportPrice : 0);
  // 월 휴대폰 할부금 (완납 결제 선택 시 할부원금 리턴)
  const monthPhonePrice =
    month === 1
      ? actualPrice
      : Math.round(
          (actualPrice * monthFee * Math.pow(1 + monthFee, month)) /
            (Math.pow(1 + monthFee, month) - 1) /
            100
        ) * 100;

  // 정액제
  const originalPlan = plan.monthPrice || 0;
  // 할인되는 요금
  const discountPlan =
    discount > 11 ? Math.round((originalPlan * 0.25) / 100) * 100 : 0;
  // 월 지불해야할 요금
  const monthPlanPrice = originalPlan - discountPlan;
  // 할부 이자의 합
  const totalInstallmentFee =
    month === 1
      ? 0
      : Math.round(
          (((actualPrice * monthFee * Math.pow(1 + monthFee, month)) /
            (Math.pow(1 + monthFee, month) - 1)) *
            month -
            actualPrice) /
            10
        ) * 10;
  // 월 지불해야 할 총 금액
  const monthTotalPrice =
    (month === 1 ? 0 : monthPhonePrice) +
    originalPlan * (discount > 11 ? 0.75 : 1);

  return {
    originalPhone, // 정상 휴대폰 가격
    actualPrice, // 할부원금 (공시지원금 선택 시 공시지원금을 제외한 값)
    supportPrice: publicSupportPrice, // 공시지원금
    extraSupportPrice, // 15% 추가 지원금
    phone: monthPhonePrice, // 월 휴대폰 할부금 (완납 결제 선택 시 할부원금 리턴)
    installmentFee: totalInstallmentFee, // 할부 이자의 합
    originalPlan, // 정액제
    discountPlan, // 할인되는 요금
    plan: monthPlanPrice, // 월 지불해야할 요금
    total: monthTotalPrice, // 월 지불해야 할 총 금액
  };
}

export async function priceCalcbyId(
  phoneId,
  planId,
  discount,
  installment,
  setState
) {
  const handleData = async () => {
    const [phoneData, planData, supportPrice] = await getPhoneByPhoneId(
      phoneId
    ).then(async (d) => {
      if (d.status === 404) {
        return ["error", "error", "error"];
      } else {
        return await getPlanByPlanId(planId).then(async (p) => {
          if (p.Plan.planType === "다이렉트") {
            return [d.phoneDetail, p.Plan, 0];
          } else
            return await Promise.all([
              d.phoneDetail,
              p.Plan,
              getPublicSupportByPhoneIdAndPlanId({
                phone_id: phoneId,
                plan_id: planId,
              }).then((d) => {
                if (d.status === 404) {
                  return 0;
                } else {
                  return d.PublicSupportPrice;
                }
              }),
            ]);
        });
      }
    });
    if (phoneData === "error") {
      return "error";
    } else
      return {
        phone: phoneData,
        plan: planData,
        supportPrice: supportPrice,
      };
  };

  const { phone, plan, supportPrice } = await handleData();

  const month = installment || 24;

  // 월 할부 이자 (연 이자율 5.9% / 12)
  const monthFee = 0.059 / 12;

  // 정상 휴대폰 가격
  const originalPhone = phone.price || 0;
  // 공시지원금
  const publicSupportPrice =
    discount === -1 ? Math.round(supportPrice / 1.15 / 100) * 100 : 0;
  // 15% 추가 지원금
  const extraSupportPrice =
    discount === -1
      ? Math.round(((supportPrice / 1.15) * 0.15) / 100) * 100
      : 0;
  // 할부원금 (공시지원금 선택 시 공시지원금을 제외한 값)
  const actualPrice = originalPhone - (discount === -1 ? supportPrice : 0);
  // 월 휴대폰 할부금 (완납 결제 선택 시 할부원금 리턴)
  const monthPhonePrice =
    month === 1
      ? actualPrice
      : Math.round(
          (actualPrice * monthFee * Math.pow(1 + monthFee, month)) /
            (Math.pow(1 + monthFee, month) - 1) /
            100
        ) * 100;

  // 정액제
  const originalPlan = plan.monthPrice || 0;
  // 할인되는 요금
  const discountPlan =
    discount > 11 ? Math.round((originalPlan * 0.25) / 100) * 100 : 0;
  // 월 지불해야할 요금
  const monthPlanPrice = originalPlan - discountPlan;
  // 할부 이자의 합
  const totalInstallmentFee =
    month === 1
      ? 0
      : Math.round(
          (((actualPrice * monthFee * Math.pow(1 + monthFee, month)) /
            (Math.pow(1 + monthFee, month) - 1)) *
            month -
            actualPrice) /
            10
        ) * 10;
  // 월 지불해야 할 총 금액
  const monthTotalPrice =
    (month === 1 ? 0 : monthPhonePrice) +
    originalPlan * (discount > 11 ? 0.75 : 1);

  setState({
    planName: plan.name,
    originalPhone, // 정상 휴대폰 가격
    actualPrice, // 할부원금 (공시지원금 선택 시 공시지원금을 제외한 값)
    supportPrice: publicSupportPrice, // 공시지원금
    extraSupportPrice, // 15% 추가 지원금
    phone: monthPhonePrice, // 월 휴대폰 할부금 (완납 결제 선택 시 할부원금 리턴)
    installmentFee: totalInstallmentFee, // 할부 이자의 합
    originalPlan, // 정액제
    discountPlan, // 할인되는 요금
    plan: monthPlanPrice, // 월 지불해야할 요금
    total: monthTotalPrice, // 월 지불해야 할 총 금액
  });
}
