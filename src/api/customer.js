/*
 * @Descripttion:
 * @version:
 * @Author: wwq
 * @Date: 2020-12-15 18:08:02
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-04 16:34:34
 */
import { getApi, postApi } from '../common/http.js';

// 查询优惠告知书列表
export async function postWechatNoticeListApi(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/wechat/customer/notices', data, option)
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
// 获取待付款记录ID
export async function getBusinessIdApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getBusinessId/${data}`, option)
}
// 查询一条付款记录
export async function getIdApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/get/${data.id}`, option)
}
// 根据优惠告知书ID删除未付款付款记录
export async function postDeleteByBusinessIdApi(data = {}, option = {}) {
  return await postApi(`/sales-api/finance/payment/deleteByBusinessId/${data.businessId}`, option)
}
// 获取银联支付接口参数
export async function postUnionPayParameterApi(data = {}, option = {}) {
  return await postApi(`/sales-api/finance/payment/getUnionPayParameter`, data, option)
}
// 获取微信openId
export async function getOpenidApi(data = {}, option = {}) {
  return await getApi(`/sales-api/system/wx/getOpenid/${data}`, option)
}
// 获取二维码信息
export async function getPaymentQRCodeInfoApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getPaymentQRCodeInfo/${data}`, option)
}
// 生成二维码
export async function postQrcodeApi(data = {}, option = {}) {
  return await postApi(`/sales-api/sales-document-cover/file/qrcode`, data, option)
}
// 查询待审核数列表数据
export async function getNotCheckListApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getNotCheckList/${data}`, option)
}
// 删除付款记录
export async function paymentdeleteApi(data = {}, option = {}) {
  return await postApi(`/sales-api/finance/payment/appDelete/${data}`, option)
}
// 查询收款信息列表数据
export async function getAppListApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getAppList/${data}`, option)
}
// 查询待审核数据数量
export async function getNotCheckNumApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getNotCheckNum/${data}`, option)
}
// 根据立项周期ID查询付款银行基本信息
export async function getBankInfoApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getBankInfo/${data}`, option)
}
// 获取银联请求url
export async function postUnionPayUrlApi(data = {}, option = {}) {
  return await postApi(`/sales-api/finance/payment/getUnionPayUrl`, data, option)
}
// 获取订单支付状态
export async function getPayStatusApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getPayStatus/${data}`, null, option)
}
// 优惠告知书签署
export async function postSignApi(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/wechat/sign`, data, option)
}
// 获取实名认证验证码
export async function postVerificationApi(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/verification/code`, data, option)
}
// 实名认证
export async function postCertificationApi(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/accounts/certification/check`, data, option)
}
// 扫码后获取优惠告知书信息
export async function getDetailApi(data = {}, option = {}) {
  return await getApi(`/sales-api/project/preferential/getDetail/${data}`, option)
}
// 优惠告知书申领
export async function postNoticeCreateApi(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/create`, data, option)
}
// 微信支付
export async function getWeChatJsApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getWeChatJsApi/${data}`, option)
}
// 退款申请详情
export async function getNoticeRefundApi(data = {}, option = {}) {
  return await getApi(`/sales-api/contract/notice/refund/detail/${data}`, option)
}
// 更新退款申请书
export async function postUpdateRefundApi(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/update/refund`, data, option)
}
// 修改付款记录
export async function postPaymentupdateApi(data = {}, option = {}) {
  return await postApi(`/sales-api/finance/payment/update`, data, option)
}
// 查询待付款订单或者已付金额,没有待付款订单则只返回已付金额
export async function getUnpaidOrderOrAmountPaidApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getUnpaidOrderOrAmountPaid/${data}`, option)
}
// 调该接口获取到已签署好的E签宝地址
export async function getPreviewApi(data = {}, option = {}) {
  return await getApi(`/sales-api/contract/notice/preview/sign/${data}`, option)
}
// 客户合并签署
export async function postSigningApi(data = {}, option = {}) {
  return await postApi(`/sales-api/contract/notice/merge/signing`, data, option)
}

// 退款信息
export async function getRefundInfoApi(data = {}, option = {}) {
  return await getApi(`/sales-api/finance/payment/getRefundInfo/${data}`, option)
}