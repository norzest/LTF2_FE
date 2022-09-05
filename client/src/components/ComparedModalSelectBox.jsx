// writer: 권혁준
import * as ModalStyle from "../styles/modalStyle";
import * as Compare from "../styles/compareStyle";
import DataOptSelect from "./DataOptSelect";
import { getPublicSupportByPhoneIdAndPlanId } from "../api/PublicSupportAPI";

export function ComparedModalSelectBox({ propsList, plans }) {
  const getPlanData = async (i, id) => {
    const phoneId = propsList.comparePhoneList[i].phoneId;
    const changePlan = plans.find((row) => row.planId === id);
    const [planData, supportPrice] = await Promise.all([
      changePlan,
      changePlan.planType === "다이렉트"
        ? 0
        : getPublicSupportByPhoneIdAndPlanId({ phone_id: phoneId, plan_id: id })
            .then((d) => {
              if (d.status === 404) {
                return 0;
              } else return d.PublicSupportPrice;
            })
            .catch((e) => console.log(e)),
    ]);
    return {
      plan: planData,
      supportPrice: supportPrice.PublicSupportPrice,
    };
  };

  const handleChange = (e, i, optKey) => {
    const returnArr = [...propsList.compareDataList];
    returnArr[i][optKey] = e.target.value;
    propsList.setCompareDataList(returnArr);
  };

  const handleFetch = async (e, i) => {
    const returnArr = [...propsList.compareDataList];
    const value = await getPlanData(i, e.target.value);
    returnArr[i].plan = value.plan;
    returnArr[i].supportPrice = value.supportPrice;
    if (value.plan.planType === "다이렉트") {
      returnArr[i].discount = 0;
    } else returnArr[i].discount = -1;
    propsList.setCompareDataList(returnArr);
  };

  return (
    <ModalStyle.Row>
      {propsList.comparePhoneList.map((row, i) => {
        if (row.phoneId) {
          return (
            <Compare.ModalPhoneDetailBox key={"select" + i}>
              <DataOptSelect
                label="가입유형"
                value={propsList.compareDataList[i].registration}
                handleChange={(e) => handleChange(e, i, "registration")}
              />
              <DataOptSelect
                label="할부"
                value={propsList.compareDataList[i].installment}
                handleChange={(e) => handleChange(e, i, "installment")}
              />
              <DataOptSelect
                label="할인유형"
                value={propsList.compareDataList[i].discount}
                handleChange={(e) => handleChange(e, i, "discount")}
                extra={propsList.compareDataList[i].plan.planType}
              />
              <DataOptSelect
                label="요금제"
                value={propsList.compareDataList[i].plan.planId}
                handleChange={(e) => handleFetch(e, i)}
                extra={propsList.comparePhoneList[i].telecomTech}
              />
            </Compare.ModalPhoneDetailBox>
          );
        } else
          return (
            <Compare.ModalPhoneDetailBox
              style={{ textAlign: "center" }}
              key={"select" + i}
              children={<p>기기 미선택</p>}
            />
          );
      })}
    </ModalStyle.Row>
  );
}
