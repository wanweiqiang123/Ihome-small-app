/*
 * @Description: staff的api
 * @version:
 * @Author: ywl
 * @Date: 2020-12-10 15:30:58
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-30 17:54:05
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
export async function postNoticeStatus(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/Information/status', data, option)
}
