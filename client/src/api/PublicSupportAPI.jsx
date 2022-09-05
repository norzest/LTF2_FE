// writer : 심영효
import instance from "./index";

/**
 * import {getPublicSupportsByPhoneId} from "../api/PublicSupportAPI";
 * 
 * getPublicSupportsByPhoneId(1).then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {1} code 
 * @returns PlanList
 */
 export const getPublicSupportsByPhoneId = async (code) => {
    try {
        const { data } = await instance.get(
            `/public-support/phone/${code}`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }
}

/**
 * import {getPublicSupportsByPlanId} from "../api/PublicSupportAPI";
 * 
 * getPublicSupportsByPlanId(1).then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {1} code 
 * @returns PhoneList
 */
 export const getPublicSupportsByPlanId = async (code) => {
    try {
        const { data } = await instance.get(
            `/public-support/plan/${code}`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }
}

/**
 * import {getPublicSupportByPhoneIdAndPlanId} from "../api/PublicSupportAPI";
 * 
 * getPublicSupportByPhoneIdAndPlanId({"phone_id":1, "plan_id":1}).then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {{"phone_id":1, "plan_id":1}} code 
 * @returns SupportPrice
 */
 export const getPublicSupportByPhoneIdAndPlanId = async (code) => {
    try {
        const { data } = await instance.get(
            `/public-support/phone/${code.phone_id}/plan/${code.plan_id}`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }
}