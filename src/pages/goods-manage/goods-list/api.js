
import { postRequest, getRequest, postRequests, postRequestJson } from '@/axios'

export const add = (params) => { //添加商品
    return postRequest('/api/addItem', params)
}

export const getList = (params) => {//获取默认列表
    return getRequest('/api/getGoodsList', params)
}

export const del = (params) => { //删除商品
    return postRequest('/api/delItem', params)
}

export const changeItem = (params) => { //添加商品
    return postRequest('/api/changeItem', params)
}