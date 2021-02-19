/*
 * @Description: channel(中介渠道岗模块)接口api
 * @version:
 * @Author: lsj
 * @Date: 2020-12-15 10:10:10
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-18 19:32:05
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

// 客户 --- 编辑客户
export async function editCustomer(data = {}, option = {}) {
  return await postApi('/sales-api/customer/reportCustomer/update', data, option);
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
  return await postApi(url, data, option);
}



/** 添加渠道商银行账户
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postChannelBankAddApi(data = {}, option = {}) {
  let url = `/sales-api/channel/channelBank/add`;
  return await postApi(url, data, option);
}
/** 修改渠道商银行账户
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postChannelBankEditApi(data = {}, option = {}) {
  let url = `/sales-api/channel/channelBank/edit`;
  return await postApi(url, data, option);
}
/** 查询渠道商银行账户详情
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function getChannelBankGetApi(id, option = {}) {
  let url = `/sales-api/channel/channelBank/get/${id}`;
  return await getApi(url, {}, option);
}

/** 查询渠道经纪人列表
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postChannelAgentGetListApi(data = {}, option = {}) {
  let url = `/sales-api/channel/channelAgent/getList`;
  let res = await postApi(url, data, option);
  res.list.forEach(item => item.checked = false)
  return res;
}

/** 新增经纪人
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postChannelAgentAddApi(data = {}, option = {}) {
  let url = `/sales-api/channel/channelAgent/add`;
  return await postApi(url, data, option);
}
/** 修改经纪人
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postChannelAgentEditApi(data = {}, option = {}) {
  let url = `/sales-api/channel/channelAgent/edit`;
  return await postApi(url, data, option);
}
/** 经纪人详情
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function getChannelAgentGetidApi(id, option = {}) {
  let url = `/sales-api/channel/channelAgent/get/${id}`;
  return await getApi(url, {}, option);
}

/** 删除渠道经纪人信息
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postChannelDeleteApi(id, option = {}) {
  let url = `/sales-api/channel/channelAgent/delete/${id}`;
  return await postApi(url, {}, option);
}
/**  查询渠道分销协议列表
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function postDistributionAppletsChannelList(data, option = {}) {
  let url = `/sales-api/contract/distribution/applets/channel/list`;
  return await postApi(url, data, option);
}

/**  中介分销合同详情
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
export async function getDistributionDetailApi(id, option = {}) {
  let url = `/sales-api/contract/distribution/detail/${id}`;
  return await getApi(url, {}, option);
}

/**
 * @description: 查询结佣列表
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function payApplyList(data = {}, option = {}) {
  return await postApi('/sales-api/payoff/payApply/wechat/channel/list', data, option)
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

// 根据渠道商id返回所有的渠道等级的业务开展城市
export async function getGradeCitiesByChannelIdApi(data = {}, option = {}) {
  return await getApi(`/sales-api/channel/channelGrade/getGradeCitiesByChannelId/${data}`, option);
}

// 查询我的报备列表
export async function postCustomerReportListApi(data = {}, option = {}) {
  return await postApi(`/sales-api/customer/report/getReportList`, data, option);
}

// 查询报备成交详情-小程序端
export async function getReportByIdApi(data = {}, option = {}) {
  return await getApi(`/sales-api/customer/report/getReportById/${data}`, option);
}

// 补全客户手机号码
export async function postCustomerMobileApi(data = {}, option = {}) {
  return await postApi(`/sales-api/customer/report/update/mobile`, data, option);
}

// 附件批量上传
export async function postReportAttachmentApi(data = {}, option = {}) {
  return await postApi(`/sales-api/customer/reportAttachment/addAttachment`, data, option);
}

// 成交登记
export async function postAddDealtApi(data = {}, option = {}) {
  return await postApi(`/sales-api/customer/report/addDeal`, data, option);
}

// 查询该报备的所有附件
export async function postReportAttachmentGetAllApi(data = {}, option = {}) {
  return await postApi(`/sales-api/customer/reportAttachment/getAll`, data, option);
}

// 查询报备客户基本信息
export async function getInfoByIdApi(data = {}, option = {}) {
  return await getApi(`/sales-api/customer/reportCustomer/getInfoById/${data}`, option);
}

// 写跟进
export async function postReportCustomerFollowupApi(data = {}, option = {}) {
  return await postApi(`/sales-api/customer/reportCustomerFollowup/add`, data, option);
}

// 查询成交列表
export async function postDealListApi(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/deal/getList`, data, option);
}

// 根据主成交报告编号及渠道商id，查询房产信息、主客户信息及佣金数据；
export async function postdealReportRecordApi(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/deal/dealReportRecord`, data, option);
}

// 查询结佣详情
export async function geiPayApplyDetail(data = {}, option = {}) {
  return await postApi(`/sales-api/payoff/payApply/wechat/detail/${data.id}`, option);
}
