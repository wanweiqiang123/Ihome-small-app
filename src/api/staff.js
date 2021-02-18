/*
 * @Description: staff的api
 * @version:
 * @Author: ywl
 * @Date: 2020-12-10 15:30:58
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-09 10:10:50
 */
import { getApi, postApi } from '../common/http.js';

/**
 * @description: 报备确认列表
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postReportList(data = {}, option = {}) {
  return await postApi('/sales-api/customer/report/getList', data, option)
}
/**
 * @description: 报备有效无效操作
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function reportValidOrInvalid(data = {}, option = {}) {
  return await postApi('/sales-api/customer/report/reportValidOrInvalid', data, option)
}
/**
 * @description: 获取待业管审核的告知书
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postNoticeListByPending(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/pending/list', data, option)
}
/**
 * @description: 获取优惠告知书列表
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postNoticeList(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/list', data, option)
}
/**
 * @description: 删除优惠告知书附件
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postDelFile(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/annex/${data}`, null, option)
}
/**
 * @description: 获取优惠告知书的优惠方式
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getMannerListByTermId(data = {}, option = {}) {
  return await getApi(`/sales-api/project/preferential/getListByTermId/${data.id}`, null, option)
}
/**
 * @description: 根据周期的项目id获取栋座
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postBuildByProId(data = {}, option = {}) {
  return await postApi('/sales-api/project/building/getFuzzySearch', data, option)
}
/**
 * @description: 根据周期的项目id获取房号
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postRoomByProId(data = {}, option = {}) {
  return await postApi('/sales-api/project/room/getFuzzySearch', data, option)
}
/**
 * @description: 优惠告知书申领
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postNoticeCreate(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/create', data, option)
}
/**
 * @description: 优惠告知书详情
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getNoticeInfo(data = {}, option = {}) {
  return await getApi(`/sales-api/contract/notice/detail/${data.id}`, null, option)
}
/**
 * @description: 确认优惠告知书(业管)
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postNoticeManagement(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/industry/management/determine`, data, option)
}
/**
 * @description: 优惠告知书作废
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postNoticeDelete(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/invalid/${data.id}`, null, option)
}
/**
 * @description: 优惠告知书编辑
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postNoticeUpdate(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/update', data, option)
}
/**
 * @description: 优惠告知书增加附件
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postUploadAnnex(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/annex', data, option)
}
/**
 * @description: 检查是否有同房号的优惠告知书
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postCheckRoom(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/check/${data}`, null, option)
}
/**
 * @description: 小程序查询优惠告知书列表(购房优惠收款列表)
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postWechatNotice(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/wechat/notices', data, option)
}
/**
 * @description: 优惠告知书详情(购房优惠收款详情)
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getWechatNoticeInfoApi(data = {}, option = {}) {
  return await getApi(`/sales-api/contract/notice/wechat/detail/${data.noticeId}`, null, option)
}
/**
 * @description: 查询待审核数据数量
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getNotCheckNumApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getNotCheckNum/${data.noticeId}`, null, option)
}
/**
 * @description: 根据交易参考号返回订单数据
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getNoOrderInfo(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getNoOrderInfo/${data.orderNo}`, null, option)
}
/**
 * @description: 添加服务费付款记录
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postAddPayServe(data = {}, option = {}) {
  return await postApi('/sales-api/finance/payment/addService', data, option)
}
/**
 * @description: 根据立项周期ID查询付款银行基本信息
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getBankInfoApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getBankInfo/${data}`, null, option)
}
/**
 * @description: 通过周期ID判断是否认筹
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getRecognizeById(data = {}, option = {}) {
  return await getApi(`/sales-api/project/term/getRecognizeById/${data}`, null, option)
}
/**
 * @description: 查询收款信息列表数据
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getAppListApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getAppList/${data}`, option)
}
/**
 * @description: 删除付款记录
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function paymentdeleteApi(data = {}, option = {}) {
  return await postApi(`/sales-api/finance/payment/appDelete/${data}`, option)
}
/**
 * @description: 查询待审核数列表数据
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getNotCheckListApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getNotCheckList/${data}`, option)
}
/**
 * @description: 调该接口获取到已签署好的E签宝地址
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getPreviewApi(data = {}, option = {}) {
  return await getApi(`/sales-api/contract/notice/preview/sign/${data}`, option)
}
/**
 * @description: 查询我的到访列表-小程序端案场岗
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getMyReportList(data = {}, option = {}) {
  return await postApi('/sales-api/customer/report/getMyReportList', data, option)
}
/**
 * @description: 报备有效无效操作
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postReportValid(data = {}, option = {}) {
  return await postApi('/sales-api/customer/report/visitValidOrInvalid', data, option)
}
/**
 * @description: 成交有效无效操作
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postReportDeal(data = {}, option = {}) {
  return await postApi('/sales-api/customer/report/dealValidOrInvalid', data, option)
}

/**
 * @description: 业绩申报列表
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getDealList(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/deal/getList`, data, option)
}

/**
 * @description: 业绩申报 - 通过项目周期id获取基础信息
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getBaseDealInfo(data = {}, option = {}) {
  return await getApi(`/sales-api/project/term/getProBaseByTermId/${data.cycleId}`, option)
}

/**
 * @description: 业绩申报 - 根据业务模式获取可选择的细分业务模式
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_buModelContType_subList(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/buModelContType/subList`, data, option)
}

/**
 * @description: 业绩申报 - 查询已配置的【业务模式——合同类型】对应关系列表
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_buModelContType_getList(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/buModelContType/getList`, data, option)
}

/**
 * @description: 业绩申报 - 初始化页面，选择周期、房号之后，带出成交基础、房产、渠道、客户、优惠告知书、收派金额、部分附件
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_pageData_initBasic(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/pageData/initBasic`, data, option)
}

/**
 * @description: 业绩申报 - 判断是否应该存在优惠告知书，返回true则允许添加，返回false则不允许，返回业务逻辑则直接抛出异常
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_pageData_dealCheckNotice(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/pageData/dealCheckNotice`, data, option)
}

/**
 * @description: 业绩申报 - 根据选择的优惠告知书获取优惠告知书列表和客户列表 --- 多份优惠告知书的情况下
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_notice_deal_details__noticeId(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/deal/details/${data.noticeId}`, option)
}

/**
 * @description: 业绩申报 - 派发套餐明细(选择收派套餐)
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_pageData_initSelectablePackage(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/pageData/initSelectablePackage`, data, option)
}

/**
 * @description: 业绩申报 - 派发套餐明细(选择收派套餐)
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_pageData_calculateReceiveAmount(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/pageData/calculateReceiveAmount`, data, option)
}

/**
 * @description: 业绩申报 - 新增
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_deal_entryDealBasicInf(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/deal/entryDealBasicInf`, data, option)
}

/**
 * @description: 业绩申报 - 编辑
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_deal_updateDealBasicInf(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/deal/updateDealBasicInf`, data, option)
}

/**
 * @description: 业绩申报 - 详情
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function get_deal_get__id(data = {}, option = {}) {
  return await getApi(`/sales-api/deal/deal/get/${data.id}`, option)
}

/**
 * @description: 业绩申报 - 删除
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_deal_delete__id(data = {}, option = {}) {
  return await postApi(`/sales-api/deal/deal/delete/${data.id}`, option)
}

/**
 * @description: 业绩申报 - 详情 - 获取优惠告知书
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function post_notice_customer_information(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/customer/information`, data, option)
}

/**
 * @description: 查询报备成交详情-小程序端
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function getReportById(data = {}, option = {}) {
  return await getApi(`/sales-api/customer/report/getReportById/${data.id}`, option)
}
