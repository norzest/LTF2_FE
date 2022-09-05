// writer: 권혁준
import { getPhoneByPhoneId } from "../api/PhoneAPI";
import { getPlanByPlanId } from "../api/PlanAPI";
import { getPublicSupportByPhoneIdAndPlanId } from "../api/PublicSupportAPI";

export default async function sortPhoneList(
  type,
  arr,
  planId,
  discount,
  install,
  setState
) {
  // 가격들 가져옴
  const installment = discount === 12 ? discount : 24;
  const handleData = async (phoneId) => {
    const [phoneData, planData, publicPrice] = await getPhoneByPhoneId(
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
    } else {
      let phone = phoneData;
      let plan = planData;
      let supportPrice = publicPrice;

      const month = installment || 24;

      // 월 할부 이자 (연 이자율 5.9% / 12)
      const monthFee = 0.059 / 12;

      // 정상 휴대폰 가격
      const originalPhone = phone.price || 0;
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
      // 월 지불해야 할 총 금액
      const monthTotalPrice =
        (month === 1 ? 0 : monthPhonePrice) + monthPlanPrice;

      return {
        originalPhone, // 정상 휴대폰 가격
        total: monthTotalPrice, // 월 지불해야 할 총 금액
      };
    }
  };

  const sortArr = async (key, reverse) => {
    const phoneArr = await Promise.all(
      arr.map(async (row) => ({
        value: await handleData(row.phoneId),
        phoneId: row.phoneId,
      }))
    );
    const returnArr = [...phoneArr];
    returnArr.sort((a, b) =>
      reverse ? a.value[key] - b.value[key] : b.value[key] - a.value[key]
    );
    return returnArr.map((row) => row.phoneId);
  };

  const sortDefaultArr = (key, reverse) => {
    const returnArr = [...arr];
    returnArr.sort((a, b) => (reverse ? a[key] - b[key] : b[key] - a[key]));
    return returnArr.map((row) => row.phoneId);
  };

  switch (type) {
    case "priceAsc":
      setState(sortDefaultArr("price", true));
      break;
    case "priceDesc":
      setState(sortDefaultArr("price"));
      break;
    case "actualAsc":
      setState(await sortArr("total", true));
      break;
    case "actualDesc":
      setState(await sortArr("total"));
      break;
    case "orderDesc":
      setState(sortDefaultArr("orderCount"));
      break;
    case "weeklyOrderDesc":
      setState(sortDefaultArr("weeklyOrderCount"));
      break;
    default:
      setState(arr.map((row) => row.phoneId));
  }
}
