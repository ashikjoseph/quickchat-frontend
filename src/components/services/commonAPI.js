import axios from "axios";
export const commonAPI = async (httpRequest, url, reqbody, reqHeader) => {
    const reqConfig = {
        method: httpRequest,
        url: url,
        data: reqbody,
        headers: reqHeader ? reqHeader : { "Content-type": "application/json" }
    }
    return await axios(reqConfig).then((result) => {
        return result;
    }).catch((err) => {
        return err;
    })
}
