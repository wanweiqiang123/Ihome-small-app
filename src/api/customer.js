/*
 * @Descripttion:
 * @version:
 * @Author: wwq
 * @Date: 2020-12-15 18:08:02
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-16 20:27:16
 */
import { getApi, postApi } from '../common/http.js';

// 查询优惠告知书列表
export async function postWechatNoticeListApi(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/wechat/notices', data, option)
}
// 查询优惠告知书详情
export async function getWechatNoticeInfoApi(data = {}, option = {}) {
  return await getApi(`/sales-api/contract/notice/wechat/detail/${data.noticeId}`, option)
}
// 检查订单是否未支付
export async function getCheckIsExistNoPayApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/checkIsExistNoPay/${data.id}`, option)
}
// 添加服务费付款记录
export async function postAddServiceApi(data = {}, option = {}) {
  return await postApi(`/sales-api/finance/payment/addService`, data, option)
}
// 向银联发起支付请求
export async function getDoPaymentApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/doPayment/${data.id}`, option)
}
// 获取待付款记录ID
export async function getBusinessIdApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getBusinessId/${data.getBusinessId}`, option)
}
// 查询一条付款记录
export async function getIdApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/get/${data.id}`, option)
}
// 根据优惠告知书ID删除未付款付款记录
export async function postDeleteByBusinessIdApi(data = {}, option = {}) {
  return await postApi(`/sales-api/finance/payment/deleteByBusinessId/${data.businessId}`, option)
}