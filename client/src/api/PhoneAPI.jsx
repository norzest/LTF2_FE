// writer : 심영효
import instance from "./index";

/**
 * import {getPhonesAll} from "../api/PhoneAPI";
 * 
 * getPhonesAll().then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {*} code 
 * @returns PhoneList
 */
export const getPhonesAll = async (code) => {
    try {
        const { data } = await instance.get(
            `/phone`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }
}

/**
 * import {getPhonesByTelecomTech} from "../api/PhoneAPI";
 * 
 * getPhonesByTelecomTech("5G").then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {"5G"} code 
 * @returns PhoneList
 */
export const getPhonesByTelecomTech = async (code) => {
    try {
        const { data } = await instance.get(
            `/phone/telecom-tech/${code}`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }
}

/**
 * import {getPhoneByPhoneId} from "../api/PhoneAPI";
 * 
 * getPhoneByPhoneId(1).then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {1} code 
 * @returns phoneDetail
 */
export const getPhoneByPhoneId = async (code) => {
    try {
        const { data } = await instance.get(
            `/phone/${code}`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }

}