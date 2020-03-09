import { postRequest, getRequest, postRequests, postRequestJson } from '@/axios'

export function fetchPermission () {
    return getRequest('/api/permission')
}