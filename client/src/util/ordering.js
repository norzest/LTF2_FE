// writer : 전웅재
export const ordering = (type,list,actualPay) => {
  let orderedList = []

  switch (type) {
    case "priceAsc":
      orderedList = sortDefaultArr(list,"price", true);
      break;
    case "priceDesc":
      orderedList = sortDefaultArr(list,"price");
      break;
    case "actualAsc":
      orderedList = sortByActualPrice(list,actualPay,"total", true);
      break;
    case "actualDesc":
      orderedList = sortByActualPrice(list,actualPay,"total");
      break;
    case "orderDesc":
      orderedList = sortDefaultArr(list,"orderCount");
      break;
    default:
      break;
  }

  return orderedList
}

// ******************************

function sortDefaultArr(list,key,reverse) {
  const orderedList = list.sort((a,b) => (reverse ? a[key] - b[key] : b[key] - a[key]))
  return orderedList
}

// ******************************

function sortByActualPrice(list,actualPay,key,reverse) {
    const actualPays = Object.keys(actualPay).map((key) => {
      return {
        phoneId : Number(key),
        total : actualPay[key].total
      }
    });
    
  const orderedIds=  actualPays.sort((a,b) => (reverse ? a[key] - b[key] : b[key] - a[key]))
  const orderedList = orderedIds.map((row) => {return list.find((phone) => phone.phoneId === row.phoneId)})

  return orderedList
}