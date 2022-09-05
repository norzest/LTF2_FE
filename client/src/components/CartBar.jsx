// writer : 심영효
import * as Bar from "../styles/barStyle";

export default function CartBar({ active, setActive }) {
  const navArray = [
    { label: "통신상품", link: "" },
    { label: "액세서리", link: "" },
    { label: "소상공인상품", link: "" },
  ];

  const nowActive = (row) => setActive({ ...active, nav: row.label });

  return (
    <Bar.OrderContainer>
      {navArray.map((row) => {
        return (
          <Bar.OrderItem
            key={row.label}
            children={row.label}
            navId={row.label}
            active={active.nav}
            onClick={() => nowActive(row)}
          />
        );
      })}
    </Bar.OrderContainer>
  );
}
