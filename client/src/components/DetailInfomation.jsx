/* eslint-disable react-hooks/exhaustive-deps */
// writer: 권혁준
import { DetailPrice } from "./DetailPrice";
import DetailSpec from "./DetailSpec";

export default function DetailInfomation({
  active,
  setActive,
  planList,
  handleModal,
  handleFilterOpt,
  setShowPlan,
}) {
  // active 요소 변경 함수
  const nowActive = (key, value) => setActive({ ...active, [key]: value });

  const changePlan = async (row) => {
    handleFilterOpt("planId", row.planId);
  };

  if (active.nav === "예상 납부금액") {
    return (
      <DetailPrice
        active={active}
        nowActive={nowActive}
        handleModal={handleModal}
        planList={planList}
        changePlan={changePlan}
        setShowPlan={setShowPlan}
      />
    );
  } else if (active.nav === "상품정보") return <DetailSpec active={active} />;
  else return <div style={{ width: "70%" }} />;
}
