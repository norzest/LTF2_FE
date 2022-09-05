// writer: 권혁준
export default function sortPlanList(
  type,
  arr, // phoneList
  setState
) {
  const sortArr = (key, reverse) => {
    const returnArr = () => {
      switch (key) {
        case "data":
          return [
            ...arr.map((row) => {
              const regex = /[^0-9.]/g;
              const result = row[key].replace(regex, "");
              return row[key] === "무제한"
                ? { [key]: 200, planId: row.planId }
                : { [key]: Number(result), planId: row.planId };
            }),
          ];
        default:
          return [...arr].map((row) => ({
            [key]: row[key],
            planId: row.planId,
          }));
      }
    };

    const dd = returnArr()
      .sort((a, b) => (reverse ? a[key] - b[key] : b[key] - a[key]))
      .map((row) => row.planId);

    return dd.map((row) => arr.find((obj) => obj.planId === row));
  };

  switch (type) {
    case "dataAsc":
      setState(sortArr("data", true));
      break;
    case "dataDesc":
      setState(sortArr("data"));
      break;
    case "priceAsc":
      setState(sortArr("monthPrice", true));
      break;
    case "priceDesc":
      setState(sortArr("monthPrice"));
      break;
    default:
      setState(arr);
  }
}
