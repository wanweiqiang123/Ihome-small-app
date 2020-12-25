/*
 * @Description: staff的api
 * @version:
 * @Author: ywl
 * @Date: 2020-12-10 15:30:58
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-16 15:23:11
 */
import { getApi, postApi } from '../common/http.js';

// 报备确认列表
export async function postReportList(data = {}, option = {}) {
  return await postApi('/sales-api/customer/report/getList', data, option)
}
// 优惠告知书列表
export async function postNoticeList(data = {}, option = {}) {
  return await postApi('/sales-api/contract/notice/list', data, option)
}
