/*
 * @Descripttion: api接口
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 10:09:50
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-12 15:13:43
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


/**模拟分页数据*/
export async function testPageApi(data = {
    pageNum: 1,
    pageSize: 10,
}, option = {}) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            let total = 55;
            let list = [];
            for (let index = 0; index < data.pageSize; index++) {
                const item = {
                    id: index - 9 + data.pageNum * data.pageSize,
                    name: '名称',
                    phone: '18812345678',
                    time: '2020-11-12 15:32:45'
                }
                item.name += item.id;
                list.push(item)
            }
            let result = {
                total: total,
                list: list
            }
            return resolve(result);
        }, 500)

    })
}




