
import { postRequest, getRequest, postRequests, postRequestJson } from '@/axios'

export const login = (params) => { //获取默认列表
    return postRequest('/api/login', params)
}