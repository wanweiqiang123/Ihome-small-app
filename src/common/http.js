/*
 * @Descripttion: http请求封装
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 10:17:55
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-07 11:25:42
 */

import storageTool from './storageTool'
const baseUrl = 'http://api.polyihome.develop';

const showToast = (title) => {
    uni.showToast({
        title: title,
        icon: 'none'
    })
}

/**请求接口
 * @method http
 * @param {String} url 接口地址
 * @param {Object} data 接口参数
 * @param {Object} option 接口配置信息，可选
 * @return {Object} Promise
 */
const api = (url, data = {}, option = {}) => {
    let hideLoading = option.hideLoading || false // 是否显示 loading
    let hideMsg = option.hideMsg || false // 是否隐藏错误提示
    const token = storageTool.getToken();
    if (!hideLoading) {
        uni.showLoading({
            title: '加载中...',
            mask: true
        })
    }
    let header = {};
    if (token) {
        if (!url.startsWith('/sales-api/sales-oauth2/oauth/token?grant_type=change')) {
            header = {
                'Authorization': 'bearer ' + token
            }
        }

    }
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + url,
            method: option.method || 'POST', // 默认 post 请求
            header: header,
            data: data,
            success: res => { // 服务器成功返回的回调函数

                if (!hideLoading) uni.hideLoading();
                if (res.statusCode === 200) {
                    let result = res.data;
                    // if (url.startsWith('/sales-api/sales-oauth2/oauth/token') || url.startsWith('/sales-oauth2/oauth/token')) {
                    //     resolve(result)
                    //     return;
                    // }
                    if (result.code === 'Success') {
                        resolve(result.data)
                        return
                    } else {
                        showToast(result.msg);
                        reject(result);
                    }

                } else { // 返回值非 200，强制显示提示信息
                    showToast('[' + res.statusCode + '] 系统处理失败')
                    reject('[' + res.statusCode + '] 系统处理失败')
                }
            },
            fail: (err) => { // 接口调用失败的回调函数
                if (!hideLoading) uni.hideLoading()
                if (err.errMsg != 'request:fail abort') {
                    showToast('连接超时，请检查您的网络。')
                    reject('连接超时，请检查您的网络。')
                }
            }
        })
    })
}
/**get请求
 * @param {*} url
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
const getApi = async (url, data = {}, option = {}) => {
    option.method = 'get'
    return await api(url, data, option)
}
/**post请求
 * @param {*} url
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
const postApi = async (url, data = {}, option = {}) => {
    option.method = 'post'
    return await api(url, data, option)
}
/**put请求
 * @param {*} url
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
const putApi = async (url, data = {}, option = {}) => {
    option.method = 'put'
    return await api(url, data, option)
}
/**delete请求
 * @param {*} url
 * @param {*} data
 * @param {*} option
 * @return {*}
 */
const deleteApi = async (url, data = {}, option = {}) => {
    option.method = 'delete'
    return await api(url, data, option)
}
export { getApi, postApi, putApi, deleteApi }
