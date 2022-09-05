// writer : 심영효
import instance from "./index";

/**
 * import {getCartInfo} from "../api/CartAPI";
 * 
 * getCartInfo().then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {{"phone_id":1, "plan_id":1, "color_id": 15}} code 
 * @returns shoppingBasket
 */
export const getCartInfo = async (code) => {
    try {
        const { data } = await instance.get(
            `/shopping-basket/phone/${code.phone_id}/plan/${code.plan_id}/color/${code.color_id}`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }
}