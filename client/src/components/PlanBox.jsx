// writer: 권혁준
import * as PlanStyle from "../styles/planStyle";

export default function PlanBox({ row, active, setRadio }) {
  return (
    <PlanStyle.PlanBox>
      <PlanStyle.PlanCol>
        {active && (
          <PlanStyle.PlanRadio
            now={active === row.planId}
            onClick={() => setRadio(row.planId)}
          />
        )}
        <PlanStyle.Title children={row.name + " >"} />
        <PlanStyle.Price
          children={"월 " + row.monthPrice.toLocaleString() + "원"}
        />
      </PlanStyle.PlanCol>
      <PlanStyle.PlanCol>
        <PlanStyle.SpecRow>
          <PlanStyle.SpecCol children={<h2 children={row.data} />} />
          <PlanStyle.SpecCol
            children={<h2 children={row.shareData || "사용가능"} />}
          />
          <PlanStyle.SpecCol children={<h2 children={row.voice} />} />
          <PlanStyle.SpecCol children={<h1 children={row.message} />} />
        </PlanStyle.SpecRow>
        <PlanStyle.SpecRow></PlanStyle.SpecRow>
      </PlanStyle.PlanCol>
    </PlanStyle.PlanBox>
  );
}
