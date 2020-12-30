/*
 * @Descripttion: api接口
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 10:09:50
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-30 11:17:31
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

/**登录接口,账号密码*/
export async function loginApi(data = { username: '', password: '' }, option = {}) {
    //let url = '/sales-api/sales-oauth2/oauth/token?grant_type=password&client_id=sales-client-dev&client_secret=sales-dev&username=' + data.username + '&password=' + data.password;
    let url = '/sales-api/sales-oauth2/oauth/token?grant_type=password&username=' + data.username + '&password=' + data.password + '&auth_client=V2VjaGF0QXBwOnNhbGVzITIwMjA='
    return await postApi(url, {}, option);
}
/**登录接口,手机验证码*/
export async function loginPhoneApi(data = { phone: '', code: '' }, option = {}) {
    //验证码登录
    // /sales-api/oauth/token?grant_type=sms&mobile_phone=18800000001&sms_code=640720&auth_client=UGM6c2FsZXMhMjAyMA==
    let url = '/sales-api/sales-oauth2/oauth/token?grant_type=sms&mobile_phone=' + data.phone + '&sms_code=' + data.code + '&auth_client=UGM6c2FsZXMhMjAyMA==';
    return await postApi(url, {}, option);
}

/**用户切换*/
export async function userSwitchApi(data = {}, option = {}) {
    let access_token = 'bearer ' + data.access_token;
    let auth_client = 'V2VjaGF0QXBwOnNhbGVzITIwMjA='
    let url = '/sales-api/sales-oauth2/oauth/token?grant_type=change&access_token=' + access_token + '&change_type=' + data.change_type + '&auth_client=' + auth_client;
    return await postApi(url, {}, option);
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

/**字典列表，全部数据*/
export async function getDictGetAllApi(data = {}, option = {}) {
    return await getApi('/sales-api/system/dict/getAll', data, option);
}

/**查询指定类型的所有字典项*/
export async function getAllByTypeApi(data = {}, option = {}) {
    return await postApi('/sales-api/system/dict/getAllByType', data, option);
}
/**获取系统参数，各环境域名*/
export async function getSystemParamApi(data = {}, option = {}) {
    return await getApi('/sales-api/system/sessionUser/getSystemParam', data, option);
}

/**发送手机验证码，用于登录*/
export async function getSessionUserSendSmsApi(mobilePhone, option = {}) {
    return await getApi('/sales-api/system/sessionUser/sendSms/' + mobilePhone, {}, option);
}

/**测试接口睡眠时间*/
export async function getTestApi(time = 2000) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: "http://api.test.zhangdada666.com/api/Test/Sleep?time=" + time,
            method: "get",
            success(res) {
                return resolve(res);
            },
            fail(res) {
                return reject(res);
            },
        });
    })
}
/**PDF转图片*/
export async function getPdf2PicApi(data, option = {}) {
    return await getApi(`/sales-api/sales-document-cover/file/pdf2Pic/${data}`, option);
}