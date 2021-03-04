/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-03-04 10:39:51
 * @LastEditors: zyc
 * @LastEditTime: 2021-03-04 11:29:37
 */

import { currentEnvConfig } from './env-config'
import { storageTool } from './common/storageTool'
function getJsLogAppId() {
    let write = true;//配置上报参数
    let appid = null;
    if (write) {
        appid = 'JvHengMP_' + currentEnvConfig.env + "_" + currentEnvConfig.envName;
    }
    return appid;
}

function jsLog(err, type) {
    try {
        let jsLogAppId = getJsLogAppId();
        let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
        let curRoute = routes[routes.length - 1].route; //获取当前页面路由
        let curParam = routes[routes.length - 1].options; //获取路由参数
        let path="";
        Object.keys(curParam || {}).forEach((key) => {
          let t = key + "=" + curParam[key] + "&";
          path += t;
        });
        if (jsLogAppId) {
            let userInfo = storageTool.getUserInfo() || {};
            try {
                let postData = {
                    type: type || 'vue-Vue.config.errorHandler',
                    message: err.message,
                    stack: err.stack,
                    url: path,
                    operatingSystem: '',
                    browser: '',
                    cookies: storageTool.getToken(),
                    localStorage: '',
                    sessionStorage: "userInfo：id=" + userInfo.id + ",name=" + userInfo.name + ",account=" + userInfo.account,
                    userAgent: ""
                }
                uni.request({
                    url: 'https://jslog.zhangdada666.com/api/log/vue',
                    data: postData,
                    header: {
                        jsLogAppId: jsLogAppId,
                    },
                    method: 'POST',
                    success: res => {

                    },
                    fail: res => {
                        console.log('fail', res.data);
                    }
                });
            } catch (error) {
                console.log(error)
            }
        }

    } catch (error) {
        console.error('js上报异常', error);
    }
}
export default jsLog;
