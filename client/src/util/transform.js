// writer: 권혁준
export function discountType(num) {
  switch (num) {
    case -1:
      return "공시지원금";
    case 0:
      return "무약정";
    case 12:
      return "선택약정12개월";
    case 24:
      return "선택약정24개월";
    default:
      return "";
  }
}

export function phoneInfoLabel(key) {
  switch (key) {
    case "cpu":
      return { id: 2, name: "CPU" };
    case "display":
      return { id: 3, name: "디스플레이" };
    case "size":
      return { id: 4, name: "사이즈" };
    case "weight":
      return { id: 5, name: "무게" };
    case "camera":
      return { id: 6, name: "카메라" };
    case "memoryDes":
      return { id: 7, name: "메모리" };
    case "storage":
      return { id: 8, name: "배터리" };
    case "waterproof":
      return { id: 9, name: "방수" };
    case "colorList":
      return { id: 1, name: "색상" };
    default:
      return "";
  }
}

export const arrToString = (arr) => {
  let str = "";
  arr.forEach((row, i) => {
    if (i === arr.length - 1) {
      str += row;
    } else str += `${row}, `;
  });
  return str;
};
