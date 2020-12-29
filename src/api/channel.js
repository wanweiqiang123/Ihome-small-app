/*
 * @Description: channel(中介渠道岗模块)接口api
 * @version:
 * @Author: lsj
 * @Date: 2020-12-15 10:10:10
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-15 16:30:30
 */
import { getApi, postApi } from '@/common/http';
import { currentEnvConfig } from '@/env-config';

// 图片地址
export function getImgUrl(id = '') {
  if (!id) return ''
  return `${currentEnvConfig['protocol']}://${currentEnvConfig['apiDomain']}/sales-api/sales-document-cover/file/browse/${id}`;
}

// 渠道公司注册 --- 获取临时token
export async function getTempToken(code = '',data = {}, option = {}) {
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

// 获取附件类型
export async function getChannelAttachment(data = {}, option = {}) {
  return await postApi('/sales-api/system/dict/getAllByType', data, option);
}

// 渠道公司注册 --- 注册
export async function channelRegister(data = {}, option = {}) {
  return await postApi('/sales-api/channel/channelRegistUser/regist', data, option);
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
