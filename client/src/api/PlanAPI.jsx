// writer : 심영효
import instance from "./index";

/**
 * import {getPlansAll} from "../api/PlanAPI";
 * 
 * getPlansAll().then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {*} code 
 * @returns PlanList
 */
 export const getPlansAll = async (code) => {
    try {
        const { data } = await instance.get(
            `/plan`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }
}

/**
 * import {getPlansByTelecomTech} from "../api/PlanAPI";
 * 
 * getPlansByTelecomTech("5G").then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {"5G"} code 
 * @returns PlanList
 */
 export const getPlansByTelecomTech = async (code) => {
    try {
        const { data } = await instance.get(
            `/plan/telecom-tech/${code}`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }
}

/**
 * import {getPlanByPlanId} from "../api/PlanAPI";
 * 
 * getPlanByPlanId(1).then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {1} code 
 * @returns Plan
 */
 export const getPlanByPlanId = async (code) => {
    try {
        const { data } = await instance.get(
            `/plan/${code}`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }

}