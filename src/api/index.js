/*
 * @Descripttion: api接口
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 10:09:50
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-10 14:49:07
 */
import { getApi, postApi } from '../common/http.js';

/**登录接口*/
export async function loginApi(data = {}, option = {}) {
    let url = '/sales-api/sales-oauth2/oauth/token?grant_type=password&client_id=sales-client-dev&client_secret=sales-dev&username=' + data.username + '&password=' + data.password;
    return await postApi(url, data, option);
}

/**查询登录用户信息*/
export async function getUserInfoApi(data = {}, option = {}) {
    return await postApi('/sales-api/system/sessionUser/getUserInfo', data, option);
}




