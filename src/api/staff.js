/*
 * @Description: staff的api
 * @version:
 * @Author: ywl
 * @Date: 2020-12-10 15:30:58
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-19 09:37:23
 */
import { getApi, postApi } from '../common/http.js';

// 报备确认列表
export async function postReportList(data = {}, option = {}) {
  return await postApi('/sales-api/customer/report/getList', data, option)
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
  return await getApi(`/sales-api/contract/notice/industry/management/determine/${data}`, null, option)
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
 * @description: 小程序查询优惠告知书列表
 * @param {*} data
 * @param {*} option
 * @return {*} Promise
 */
export async function postWechatNotice(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/wechat/notices', data, option)
}
