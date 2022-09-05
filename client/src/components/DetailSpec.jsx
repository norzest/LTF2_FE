// writer: 권혁준
import * as DetailInfo from "../styles/detailInfoStyle";
import { arrToString, phoneInfoLabel } from "../util/transform";

export default function DetailSpec({ active }) {
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
    <DetailInfo.Container style={{ display: "flex", flexDirection: "column" }}>
      {active.phone.phoneDesImgList.map((row) => (
        <DetailInfo.Spec key={row} src={row} alt="description-image" />
      ))}
      <table style={{ marginBottom: "100px" }}>
        <tbody>
          <tr>
            <DetailInfo.ImageCell
              children={
                <img
                  src={active.color.phoneImgList[0]}
                  alt="phoneImg"
                  style={{ width: "270px", height: "270px" }}
                />
              }
            />
            <DetailInfo.InfoCell>
              <table style={{ borderTop: "1px solid grey" }}>
                <tbody>
                  {Object.keys(active.phone.phoneInfo)
                    .sort((a, b) => phoneInfoLabel(a).id - phoneInfoLabel(b).id)
                    .filter((row) => phoneInfoLabel(row).name)
                    .map((row) => (
                      <DetailInfo.InfoTr key={row}>
                        <DetailInfo.HeaderCell
                          children={phoneInfoLabel(row).name}
                        />
                        <DetailInfo.SpecCell
                          children={returnStr(row, active.phone.phoneInfo[row])}
                        />
                      </DetailInfo.InfoTr>
                    ))}
                </tbody>
              </table>
            </DetailInfo.InfoCell>
          </tr>
        </tbody>
      </table>
    </DetailInfo.Container>
  );
}
