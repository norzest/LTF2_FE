// writer : 심영효
import instance from "./index";

/**
 * import {getList} from "../api/SearchAPI";
 * 
 * getList("갤럭").then((data) => {console.log(data)}).catch((e) => {console.log(e)});
 * 
 * @param {"갤럭"} code 
 * @returns SearchList
 */
 export const getList = async (code) => {
    try {
        const { data } = await instance.get(
            `/search/${code}`
        );
        return data;
    } catch(e) {
        return {"status": e.response.status,"message" : e.response.data.message};
    }
}