/*
 * @Description: channel(中介渠道岗模块)接口api
 * @version:
 * @Author: lsj
 * @Date: 2020-12-15 10:10:10
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-15 16:30:30
 */
import { getApi, postApi } from '@/common/http';

// 图片地址
export function getImgUrl(id = '') {
  if (!id) return ''
  return `http://api.polyihome.develop/sales-api/sales-document-cover/file/browse/${id}`
}

// 获取推荐的项目列表
export async function getRecommendItemList(data = {}, option = {}) {
  return await postApi('/sales-api/project/project/getRecommendProjectList', data, option)
}

// 获取项目(房源、楼盘)详情
export async function getProDetail(id = '', data = {}, option = {}) {
  return await getApi(`/sales-api/project/project/getProDetail/${id}`, data, option)
}

// 获取我的客户列表
export async function getCustomerList(data = {}, option = {}) {
  return await postApi('/sales-api/customer/reportCustomer/getList', data, option)
}
