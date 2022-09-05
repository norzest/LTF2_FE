// writer : 심영효
import instance from "./index";

/**
 * import {postOrder} from "../api/OrderAPI";
 * const body = {}
 * postOrder(body).then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 *
 * @param {*} body
 * @returns status
 */
export const postOrder = async (body) => {
  try {
    const { data } = await instance.post(`/order`, body);
    return data;
  } catch (e) {
    return { status: e.response.status, message: e.response.data.message };
  }
};
