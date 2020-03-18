import { postRequest, getRequest, postRequests, postRequestJson } from '@/axios'

export const register = (params) => { //获取默认列表
    return postRequest('/api/register', params)
}