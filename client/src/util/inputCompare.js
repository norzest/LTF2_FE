// writer: 권혁준
import { getPlanByPlanId } from "../api/PlanAPI";
import { getPublicSupportByPhoneIdAndPlanId } from "../api/PublicSupportAPI";

export async function inputComparePhone(
  phone,
  planId,
  propsList,
  discount,
  installment
) {
  const defaultOpt = async () => {
    const [plan, supportPrice] = await Promise.all([
      getPlanByPlanId(planId).then((data) => data.Plan),
      getPublicSupportByPhoneIdAndPlanId({
        phone_id: phone.phoneId,
        plan_id: planId,
      }).then((data) => {
        if (data.status === 404) {
          return 0;
        } else return data.PublicSupportPrice;
      }),
    ]);
    return {
      registration: "기기변경",
      installment: installment || 24,
      discount: discount || -1,
      supportPrice: supportPrice,
      plan: plan,
    };
  };

  const returnPhoneArr = [...propsList.comparePhoneList];
  const returnDataArr = [...propsList.compareDataList];
  const compareArr = propsList.comparePhoneList.filter((row) => row.phoneId);
  if (
    propsList.comparePhoneList.findIndex(
      (row) => row.phoneId === phone.phoneId
    ) === -1 &&
    compareArr.length < 3
  ) {
    returnPhoneArr[compareArr.length] = phone;
    returnDataArr[compareArr.length] = await defaultOpt();
    propsList.setCompareDataList(returnDataArr);
    propsList.setComparePhoneList(returnPhoneArr);
  } else {
    returnPhoneArr.splice(
      propsList.comparePhoneList.findIndex(
        (row) => row.phoneId === phone.phoneId
      ),
      1
    );
    returnDataArr.splice(
      propsList.comparePhoneList.findIndex(
        (row) => row.phoneId === phone.phoneId
      ),
      1
    );
    propsList.setComparePhoneList([...returnPhoneArr, {}]);
    propsList.setCompareDataList([...returnDataArr, {}]);
  }
}

export function deleteAll(propsList) {
  propsList.setComparePhoneList([{}, {}, {}]);
  propsList.setCompareDataList([{}, {}, {}]);
}

export function deleteOne(idx, propsList) {
  const returnPhoneArray = [...propsList.comparePhoneList];
  const returnDataArray = [...propsList.compareDataList];
  returnPhoneArray.splice(idx, 1);
  returnDataArray.splice(idx, 1);
  returnPhoneArray.push({});
  returnDataArray.push({});
  propsList.setComparePhoneList(returnPhoneArray);
  propsList.setCompareDataList(returnDataArray);
}
