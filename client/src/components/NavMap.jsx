// writer: 권혁준
import { useNavigate } from "react-router-dom";
import { mapDataArr } from "../assets/navMapData";
import * as Bar from "../styles/barStyle";

export default function NavMap({ nowHover }) {
  const navigate = useNavigate();

  const nowMapData = mapDataArr[nowHover] ?? [];

  const onClick = (d) => {
    if (d.link !== "") {
      navigate(d.link);
    }
  };

  return (
    <Bar.NavMap nowHover={nowHover !== ""}>
      {nowMapData.map((row, i) => (
        <Bar.NavMapCategory key={i}>
          <ul>
            {row.map((d, j) =>
              j === 0 ? (
                <p children={d.name} onClick={() => onClick(d)} key={d.name} />
              ) : (
                <li children={d.name} onClick={() => onClick(d)} key={d.name} />
              )
            )}
          </ul>
        </Bar.NavMapCategory>
      ))}
    </Bar.NavMap>
  );
}
