/*
 * @Description: channel(中介渠道岗模块)接口api
 * @version:
 * @Author: lsj
 * @Date: 2020-12-15 10:10:10
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-02 11:09:41
 */
import { getApi, postApi } from '@/common/http';
import { currentEnvConfig } from '@/env-config';

// 图片地址
export function getImgUrl(id = '') {
  if (!id) return ''
  return `${currentEnvConfig['protocol']}://${currentEnvConfig['apiDomain']}/sales-api/sales-document-cover/file/browse/${id}`;
}

// 渠道公司注册 --- 获取临时token
export async function getTempToken(code = '', data = {}, option = {}) {
  return await getApi(`/sales-api/system/wx/getTemporaryToken/${code}`, data, option);
}

// 渠道公司注册 --- 获取短信验证码
export async function getMessage(data = {}, option = {}) {
  return await postApi(`/sales-api/system/sessionUser/sendSms`, data, option);
}

// 渠道公司注册 --- 获取银行网点列表
export async function getBankBranchList(data = {}, option = {}) {
  return await postApi('/sales-api/finance/bankBranch/getList', data, option);
}

// 获取省市区
export async function getAreaList(data = {}, option = {}) {
  return await getApi('/sales-api/system/area/getAll', data, option);
}

// 获取
export async function getDictByType(data = {}, option = {}) {
  return await postApi('/sales-api/system/dict/getAllByType', data, option);
}

// 渠道公司注册 --- 注册
export async function channelRegister(data = {}, option = {}) {
  return await postApi('/sales-api/channel/channelRegistUser/regist', data, option);
}

// 渠道公司注册 --- 检查成立时间是否大于等于三个月
export async function channelCheckSetupTime(data = {}, option = {}) {
  return await getApi('/sales-api/channel/channel/checkSetupTime', data, option);
}

// 获取渠道商公司信息
export async function getChannelInfo(id = '', data = {}, option = {}) {
  return await getApi(`/sales-api/channel/channel/get/${id}`, data, option);
}

// 修改渠道商公司信息
export async function editChannelInfo(data = {}, option = {}) {
  return await postApi('/sales-api/channel/channel/edit', data, option);
}

// 渠道商公司状态变为草稿
export async function backToDraft(id = '', data = {}, option = {}) {
  return await postApi(`/sales-api/channel/channel/backToDraft/${id}`, data, option);
}

// 获取推荐的项目列表
export async function getRecommendItemList(data = {}, option = {}) {
  return await postApi('/sales-api/project/project/getRecommendProjectList', data, option);
}

// 获取项目(房源、楼盘)详情
export async function getProDetail(id = '', data = {}, option = {}) {
  return await getApi(`/sales-api/project/project/getProDetail/${id}`, data, option);
}

// 获取我的客户列表
export async function getCustomerList(data = {}, option = {}) {
  return await postApi('/sales-api/customer/reportCustomer/getList', data, option);
}

// 客户 --- 录入客户
export async function addCustomer(data = {}, option = {}) {
  return await postApi('/sales-api/customer/reportCustomer/add', data, option);
}

// 客户 --- 查看客户
export async function getCustomerById(id = '', data = {}, option = {}) {
  return await getApi(`/sales-api/customer/reportCustomer/get/${id}`, data, option);
}



//客户管理-我的收藏管理

/** 收藏或者取消项目
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postCollectAddOrUpdateApi(data = {}, option = {}) {
  return await postApi(`/sales-api/customer/collect/addOrUpdate`, data, option);
}
/** 批量取消项目收藏
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postCollectBatchUpdateApi(data = {}, option = {}) {
  return await postApi(`/sales-api/customer/collect/BatchUpdate`, data, option);
}

/** 查询项目收藏列表
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postCollectGetList(data = {}, option = {}) {
  return await postApi(`/sales-api/customer/collect/getList`, data, option);
}

/** 查询渠道商银行账户列表
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function getchannelBankByIdApi(id, option = {}) {
  let url = `/sales-api/channel/channelBank/getAll/${id}`;
  return await getApi(url, {}, option);
}

/** 批量删除银行账户
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postChannelBankBatchDeleteApi(data = {}, option = {}) {
  let url = `/sales-api/channel/channelBank/batchDelete`;
  return await getApi(url, data, option);
}



// 收藏或者取消项目
export async function addOrUpdateApi(data = {}, option = {}) {
  return await postApi('/sales-api/customer/collect/addOrUpdate', data, option);
}

// 新增客户报备
export async function postReportApi(data = {}, option = {}) {
  return await postApi('/sales-api/customer/report/add', data, option);
}

// 户型详情【移动端】
export async function getYDhouseDetail(data = {}, option = {}) {
  return await getApi(`/sales-api/project/houseType/yDhouseDetail/${data}`, option);
}