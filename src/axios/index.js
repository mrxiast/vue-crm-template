import axios from 'axios';
import Cookies from "js-cookie";
import { Message } from 'element-ui';
import { setStore, getStore } from '@/utils/storage'
const baseURL = process.env.BASE_URL
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export const service = axios.create({
    // "baseURL": baseURL,
    "timeout": 60000
});

service.interceptors.request.use(config => {
    return config;
}, err => {
    Message.error('请求超时');
    return Promise.resolve(err);
});

// http response 拦截器
service.interceptors.response.use(response => {
    const data = response.data;
    if (response.headers.token && response.headers.token != '' && response.headers.token != null) {
        setStore('Authorization', response.headers.token)
    }

    // 根据返回的code值来做不同的处理(和后端约定)
    switch (data.code) {
        case 401:
            // // 未登录 清除已登录状态
            Message.error(data.message);
            Cookies.set('userInfo', '');
            setStore('Authorization', '');
            this.$router.push('/login');
            break;
        case 403:
            // 没有权限
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        case 500:
            // 错误
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        case 100:
            // 错误
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        default:
            return data;
    }

    return data;
}, (err) => {
    return Promise.reject(err);
});

export const postRequest = (url, params) => {
    let Authorization = getStore("Authorization");
    return service({
        "method": 'post',
        "url": url,
        "data": params,
        "transformRequest": [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }],
        "headers": {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': Authorization
        }
    });
};

export const postRequests = (url, params) => {
    let Authorization = getStore("Authorization");
    return service({
        "method": 'post',
        "url": url,
        "data": params,
        "headers": {
            'Authorization': Authorization
        }
    });
};
export const getRequest = (url, params) => {
    let Authorization = getStore('Authorization');
    return service({
        "method": 'get',
        "url": url,
        "params": params,
        "headers": {
            'Authorization': Authorization
        }
    });
};

export const deleteRequest = (url, params) => {
    let Authorization = getStore('Authorization');
    return service({
        "method": 'delete',
        "url": url,
        "params": params,
        "headers": {
            'Authorization': Authorization
        }
    });
};
export const downLoadRequest = (url, params) => {
    let Authorization = getStore('Authorization');
    return service({
        "method": 'post',
        "url": url,
        "data": params,
        "responseType": 'blob',
        "headers": {
            'Authorization': Authorization
        }
    });
};
export const patchRequest = (url, params) => {
    let Authorization = getStore("Authorization");
    return service({
        "method": 'patch',
        "url": url,
        "data": params,
        "transformRequest": [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }],
        "headers": {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': Authorization
        }
    });
};


//以下为个人使用补充
export const putRequest = (url, data) => {
    let Authorization = getStore('Authorization');
    return service({
        "method": 'put',
        "url": url,
        "data": JSON.stringify(data),
        "headers": {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': Authorization
        }
    });
};
export const deletes = (url, params) => {
    let Authorization = getStore('Authorization');
    return service({
        "method": 'delete',
        "url": url + params,
        "headers": {
            'Authorization': Authorization
        }
    });
};
export const postRequestJson = (url, params) => {
    let Authorization = getStore("Authorization");
    return service({
        "method": 'post',
        "url": url,
        "data": params,
        "transformRequest": [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        }],
        "headers": {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': Authorization
        }
    });
};
