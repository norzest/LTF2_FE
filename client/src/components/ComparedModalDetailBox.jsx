// writer: 권혁준
import SideFlexRow from "./SideFlexRow";
import * as ModalStyle from "../styles/modalStyle";
import * as Compare from "../styles/compareStyle";
import { priceCalc } from "../util/priceCalc";

export default function ComparedModalDetailBox({ propsList }) {
  const priceInfo = (i) => {
    const dataList = propsList.compareDataList[i];

    const phone = propsList.comparePhoneList[i];
    const plan = dataList.plan;
    const supportPrice = dataList.supportPrice;
    const discount = dataList.discount;
    const installment = dataList.installment;
    return priceCalc(phone, plan, supportPrice, discount, installment);
  };

  const installmentOne = (i) => propsList.compareDataList[i].installment === 1;

  return (
    <ModalStyle.Row>
      {propsList.comparePhoneList.map((row, i) => {
        if (row.phoneId) {
          return (
            <div style={{ display: "block" }} key={"price" + i}>
              <Compare.ModalPhoneDetailBox>
                <Compare.ModalPhoneDetailHeader
                  children={
                    <SideFlexRow
                      left={installmentOne(i) ? "완납 시 가격" : "휴대폰 가격"}
                      right={`${installmentOne(i) ? "" : "월"} ${priceInfo(
                        i
                      ).phone.toLocaleString()}원`}
                      title
                    />
                  }
                />
                <SideFlexRow
                  left="출고가"
                  right={`${row.price.toLocaleString()}원`}
                />
                <SideFlexRow
                  left="공시지원금"
                  right={`${priceInfo(i).supportPrice.toLocaleString()}원`}
                />
                <SideFlexRow
                  left="15% 추가지원금"
                  right={`${priceInfo(i).extraSupportPrice.toLocaleString()}원`}
                />
                <SideFlexRow
                  left="할부수수료(연5.9%)"
                  right={`${priceInfo(i).installmentFee.toLocaleString()}원`}
                />
                <SideFlexRow
                  left="실구매가"
                  right={`${priceInfo(i).actualPrice.toLocaleString()}원`}
                />
              </Compare.ModalPhoneDetailBox>
              <Compare.ModalPhoneDetailBox key={"price" + i}>
                <Compare.ModalPhoneDetailHeader
                  children={
                    <SideFlexRow
                      left="통신료"
                      right={`월 ${priceInfo(i).plan.toLocaleString()}원`}
                      title
                    />
                  }
                />
                <SideFlexRow
                  left="월정액"
                  right={`${priceInfo(i).originalPlan.toLocaleString()}원`}
                />
                <SideFlexRow
                  left="선택약정할인"
                  right={`${priceInfo(i).discountPlan.toLocaleString()}원`}
                />
                <SideFlexRow left="7%추가요금할인" right="0원" />
              </Compare.ModalPhoneDetailBox>
            </div>
          );
        } else
          return (
            <Compare.ModalPhoneDetailBox
              style={{ textAlign: "center" }}
              key={"price" + i}
              children={<p>기기 미선택</p>}
            />
          );
      })}
    </ModalStyle.Row>
  );
}
