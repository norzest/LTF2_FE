// writer: 권혁준
import { SideFlex } from "../styles/detailInfoStyle";

export default function SideFlexRow({ left, right, title }) {
  return title ? (
    <SideFlex>
      <h3
        className="left"
        style={{ width: "35%", color: "#000000" }}
        children={left}
      />
      <h2
        className="right"
        style={{ width: "65%", color: "#000000" }}
        children={right}
      />
    </SideFlex>
  ) : (
    <SideFlex>
      <p className="left" style={{ color: "#000000" }} children={left} />
      <p className="right" style={{ color: "#000000" }} children={right} />
    </SideFlex>
  );
}

export function SideFlexDetailBoldRow({ left, right }) {
  return (
    <SideFlex>
      <h3 className="left" children={left} />
      <h3 className="right" children={right} />
    </SideFlex>
  );
}

export function SideFlexDetailRow({ left, right, discount }) {
  return discount ? (
    <SideFlex>
      <p className="left" style={{ color: "#e6007e" }} children={left} />
      <p className="right" style={{ color: "#e6007e" }} children={right} />
    </SideFlex>
  ) : (
    <SideFlex>
      <p className="left" children={left} />
      <p className="right" children={right} />
    </SideFlex>
  );
}
