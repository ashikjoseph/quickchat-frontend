import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseUrl"

//signup
export const signupAPI = async (user) => {
    return await commonAPI("post", `${BASE_URL}/chat/signup`, user, "")
}
//login
export const loginAPI = async (reqbody) => {
    return await commonAPI("post", `${BASE_URL}/chat/login`, reqbody, "")
}

//coversations
export const conversationAPI = async (reqHeader) => {
    return await commonAPI('get', `${BASE_URL}/chat/getusers`, '', reqHeader)
}

//send msg
export const senderAPI = async (id, reqbody, reqHeader) => {
    return await commonAPI('post', `${BASE_URL}/chat/send/${id}`, reqbody, reqHeader)
}

//get msg
export const getAPI = async (id, reqHeader) => {
    return await commonAPI('get', `${BASE_URL}/chat/receive/${id}`, "", reqHeader)
}

