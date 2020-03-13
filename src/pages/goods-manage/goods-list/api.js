
import { postRequest, getRequest, postRequests, postRequestJson } from '@/axios'

export const add = (params) => { //获取默认列表
    return postRequest('/api/addItem', params)
}

export const getList = (params) => {
    return getRequest('/api/getGoodsList', params)
}