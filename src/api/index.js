/*
 * @Description: api接口
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 10:09:50
 * @LastEditors: lsj
 * @LastEditTime: 2021-04-16 10:23:22
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
export async function loginApi(data = { username: '', password: '', uuid: '' }, option = {}) {
    let url = '/sales-api/sales-oauth2/oauth/token?grant_type=password&username=' + data.username + '&password=' + data.password + '&auth_client=V2VjaGF0QXBwOnNhbGVzITIwMjA=' + '&uuid=' + data.uuid;
    return await postApi(url, {}, option);
}
/**登录接口,手机验证码*/
export async function loginPhoneApi(data = { phone: '', code: '', uuid: '' }, option = {}) {
    let url = '/sales-api/sales-oauth2/oauth/token?grant_type=sms&mobile_phone=' + data.phone + '&sms_code=' + data.code + '&auth_client=UGM6c2FsZXMhMjAyMA==' + '&uuid=' + data.uuid;
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

/* 查询周期列表 */
export async function postTermApi(data = {}, option = {}) {
    return await postApi('/sales-api/project/term/getYdList', data, option);
}

/* 查询项目列表 */
export async function postProjectsApi(data = {}, option = {}) {
    return await postApi('/sales-api/project/project/getList', data, option)
}

/* 查询项目周期列表 */
export async function postAllTermApi(data = {}, option = {}) {
    return await postApi('/sales-api/project/term/getDealList', data, option)
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

/**发送手机验证码，枚举：Login, Register, RegisterAndLogin, RestPassword*/
export async function postSessionUserSendSmsApi(data = {}, option = {}) {
    return await postApi('/sales-api/system/sessionUser/sendSms', data, option);
}
/**验证短信验证码，枚举：Login, Register, RegisterAndLogin, RestPassword*/
export async function postSessionUserCheckSmsApi(data = {}, option = {}) {
    return await postApi('/sales-api/system/sessionUser/checkSms', data, option);
}
/** 重新设置密码*/
export async function postSessionUserGetBackPasswordApi(data = {}, option = {}) {
    return await postApi('/sales-api/system/sessionUser/getBackPassword', data, option);
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

/**获取微信手机号码*/
export async function postGetPhoneNumberApi(data, option = {}) {
    return await postApi('/sales-api/system/wx/getWxOauthToken', data, option)
}

/**查询银行网点信息列表数据 */
export async function postBankBranchApi(data, option = {}) {
    return await postApi('/sales-api/finance/bankBranch/getList', data, option)
}

/**查询客户池列表*/
export async function postReportCustomerApi(data, option = {}) {
    return await postApi('/sales-api/customer/reportCustomer/getList', data, option)
}

/**查询项目列表[移动端接口]*/
export async function getYDProjectListApi(data, option = {}) {
    return await postApi('/sales-api/project/project/getYDProjectList', data, option)
}

/**模糊查询客户报备所属城市项目【移动端接口】*/
export async function getFuzzySearchByCityApi(data, option = {}) {
    return await postApi('/sales-api/project/project/getFuzzySearchByCity', data, option)
}

/**查询银行网点信息列表数据*/
export async function postBankBranchGetListApi(data, option = {}) {
    return await postApi('/sales-api/finance/bankBranch/getList', data, option)
}

/**项目-客户报备项目信息*/
export async function getProDetailBBApi(data, option = {}) {
    return await getApi(`/sales-api/project/project/getProDetailBB/${data}`, option);
}

/**根据渠道商名称模糊查渠道商id、名字分页列表*/
export async function postChannelByNameApi(data, option = {}) {
    return await postApi('/sales-api/channel/channel/getListByName', data, option)
}
/**根据渠道商名称等级城市事业部模糊查渠道商id、名字分页列表[不需要审批通过]*/
export async function postListByCityAndDeptWithoutNoPassApi(data, option = {}) {
    return await postApi('/sales-api/channel/channel/getListByCityAndDeptWithoutNoPass', data, option)
}
/**
 * @description: 查询指定类型的所有字典项
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getAllDictByType(data = {}, option = {}) {
    return await postApi(`/sales-api/system/dict/getAllByTypes`, data, option)
}
/**查询客户列表*/
export async function postCustomerGetCustList(data, option = {}) {
    return await postApi('/sales-api/customer/customer/getCustList', data, option)
}
/**查询客户列表*/
export async function postNoticeDealList(data, option = {}) {
    return await postApi('/sales-api/contract/notice/deal/list', data, option)
}
// 通过项目ID获取已经审核周期列表【移动端】
export async function postTermListByProIdApi(data = {}, option = {}) {
    return await postApi(`/sales-api/project/term/getTermListByProId`, data, option);
}

// 根据渠道商ID查询渠道经纪人列表
export async function getAgentByChannelIdApi(data, option = {}) {
    return await postApi(`/sales-api/channel/channelAgent/getAgentByChannelId`, data, option);
}

// 根据渠道商ID查询渠道经纪人/渠道负责人列表
export async function getAgentAndChannelPersonByChannelIdApi(data, option = {}) {
    return await postApi(`/sales-api/channel/channelAgent/getAgentAndChannelPersonByChannelId`, data, option);
}

// 案场帮录专用项目搜索
export async function getFuzzySearchByCityForAnChangApi(data, option = {}) {
    return await postApi(`/sales-api/project/project/getFuzzySearchByCityForAnChang`, data, option);
}

// 案场帮录专用项目周期搜索
export async function getTermListByProIdApi(data, option = {}) {
    return await postApi(`/sales-api/project/term/getTermListByProId`, data, option);
}

// 员工案场-业绩申报-根据项目周期id选择渠道公司列表 - 外部
export async function getAgencyListApi(data, option = {}) {
    return await postApi(`/sales-api/channel/channel/getListByName`, data, option);
}

// 员工案场-业绩申报-根据项目周期id选择渠道公司列表 - 内部
export async function getAgencyListByInApi(data, option = {}) {
    return await postApi(`/sales-api/system/company/getPage`, data, option);
}

// 员工案场-业绩申报-根据渠道公司id选择经纪人列表
export async function getBrokerListApi(data, option = {}) {
  return await postApi(`/sales-api/channel/channelAgent/getDealChannelAgentList`, data, option);
}

/**
 * @description: 根据周期的项目id、物业类型获取栋座
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postBuildByProId(data = {}, option = {}) {
    return await postApi('/sales-api/project/building/getFuzzySearchByPage', data, option)
}

/**
 * @description: 根据周期的项目id、栋座id获取房号
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postRoomByProId(data = {}, option = {}) {
    return await postApi('/sales-api/project/room/getFuzzySearchByPage', data, option)
}