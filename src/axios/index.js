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


// 添加请求拦截器
// service.interceptors.request.use(
//     function (config) {
//         // 请求头添加token
//         if (store.state.UserToken) {
//             config.headers.Authorization = store.state.UserToken
//         }
//         return config
//     },
//     function (error) {
//         return Promise.reject(error)
//     }
// )

// 响应拦截器即异常处理
// service.interceptors.response.use(
//     response => {
//         return response.data
//     },
//     err => {
//         if (err && err.response) {
//             switch (err.response.status) {
//                 case 400:
//                     err.message = '请求出错'
//                     break
//                 case 401:
//                     Message.warning({
//                         message: '授权失败，请重新登录'
//                     })
//                     store.commit('LOGIN_OUT')
//                     setTimeout(() => {
//                         window.location.reload()
//                     }, 1000)

//                     return
//                 case 403:
//                     err.message = '拒绝访问'
//                     break
//                 case 404:
//                     err.message = '请求错误,未找到该资源'
//                     break
//                 case 500:
//                     err.message = '服务器端出错'
//                     break
//             }
//         } else {
//             err.message = '连接服务器失败'
//         }
//         Message.error({
//             message: err.message
//         })
//         return Promise.reject(err.response)
//     }
// )


service.interceptors.request.use(config => {
    // console.log(config)
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
    console.log(data, 'datadata')
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
            return data.data;
    }

    return data.data;
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
