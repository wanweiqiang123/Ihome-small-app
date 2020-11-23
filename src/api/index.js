/*
 * @Descripttion: api接口
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 10:09:50
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-23 14:11:15
 */

import { getApi, postApi } from '../common/http.js';

/**模拟分页数据*/
export async function testPageApi(data = {
    pageNum: 1,
    pageSize: 10,
}, option = {}) {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            let total = 25;
            let list = [];
            let len;
            let num = parseInt(total / data.pageSize + 0.99);
            if (data.pageNum == num) {
                len = 5;
            } else if (data.pageNum > num) {
                len = 0;
            } else {
                len = data.pageSize;
            }
            for (let index = 0; index < len; index++) {
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

/**登录接口*/
export async function loginApi(data = {}, option = {}) {
    let url = '/sales-api/sales-oauth2/oauth/token?grant_type=password&client_id=sales-client-dev&client_secret=sales-dev&username=' + data.username + '&password=' + data.password;
    return await postApi(url, data, option);
}

/**查询登录用户信息*/
export async function getUserInfoApi(data = {}, option = {}) {
    return await postApi('/sales-api/system/sessionUser/getUserInfo', data, option);
}

/**查询省市区信息*/
export async function getAreaApi(data = {}, option = {}) {
    return await getApi('/sales-api/system/area/getAll', data, option);
}

/**查询用户列表*/
export async function postUsersApi(data = {}, option = {}) {
    return await postApi('/sales-api/system/user/getList', data, option);
}

/**查询开发商列表*/
export async function postdevepolersApi(data = {}, option = {}) {
    return await postApi('/sales-api/developer/company/getList', data, option);
}






