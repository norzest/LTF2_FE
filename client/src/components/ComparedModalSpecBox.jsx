// writer: 권혁준
import * as ModalStyle from "../styles/modalStyle";
import * as Compare from "../styles/compareStyle";
import { arrToString, phoneInfoLabel } from "../util/transform";

export default function ComparedModalSpecBox({ propsList }) {
  const returnStr = (obj, str) => {
    switch (obj) {
      case "colorList":
        return arrToString(str);
      case "storage":
        return `${str.toLocaleString()} mAh`;
      default:
        return str;
    }
  };

  return (
    <ModalStyle.Row>
      {propsList.comparePhoneList.map((row, i) => {
        if (row.phoneId) {
          return (
            <Compare.ModalPhoneDetailBox key={"spec" + i}>
              {Object.keys(row.phoneInfo)
                .sort((a, b) => phoneInfoLabel(a).id - phoneInfoLabel(b).id)
                .filter((row) => phoneInfoLabel(row).name)
                .map((obj, i) => (
                  <Compare.Spec key={"detail" + i}>
                    <h4>{phoneInfoLabel(obj).name}</h4>
                    <p>{returnStr(obj, row.phoneInfo[obj])}</p>
                  </Compare.Spec>
                ))}
            </Compare.ModalPhoneDetailBox>
          );
        } else
          return (
            <Compare.ModalPhoneDetailBox
              style={{ textAlign: "center" }}
              key={"spec" + i}
              children={<p>기기 미선택</p>}
            />
          );
      })}
    </ModalStyle.Row>
  );
}
