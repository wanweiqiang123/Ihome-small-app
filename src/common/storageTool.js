/*
 * @Descripttion: storage本地存储
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 15:30:00
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-20 14:24:33
 */
const tokenKey = 'token';//token的key
const expiresInKey = 'expires_in';//token的key的过期时间
const userInfoKey = 'userInfo';//用户信息的key
const loginUserTypeLogKey = 'loginUserTypeLog';//登录类别记录

const UUIDKey = "uuid";//微信code换取uuid
const envKey = 'env';//环境变量key，值  dev,int,uat,prd
const storageTool = {

    hidePay() {
        try {
            let userInfo = this.getUserInfo();
            if (userInfo) {
                let roleList = userInfo.roleList?.map((item) => { return item.code }) || [];
                return roleList.includes('RAuditCustomer');
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }

    },
    /**设置token*/
    setToken(data, expires_in) {
        uni.setStorageSync(tokenKey, data);
        let date = new Date(new Date().getTime() + expires_in * 1000);
        let dateString = this.getFullTime(date);
        console.log(dateString)
        uni.setStorageSync(expiresInKey, dateString);
    },
    /**获取token*/
    getToken() {
        let expires_in = uni.getStorageSync(expiresInKey);
        let expires_in_ios = expires_in.replace(/-/g, '/');//此处解决ios new Date 兼容性问题
        if (expires_in_ios) {
            let m = new Date(expires_in_ios).getTime() - new Date().getTime();
            if (m < 0) {
                this.removeToken();
                return null;
            } else {
                return uni.getStorageSync(tokenKey);
            }
        } else {
            return null;
        }
    },
    /**获取token失效时间*/
    getTokenExpiresTime() {
        let expires_in = uni.getStorageSync(expiresInKey);
        let expires_in_ios = expires_in.replace(/-/g, '/');//此处解决ios new Date 兼容性问题
        return expires_in_ios;
    },
    /**删除token*/
    removeToken() {
        uni.removeStorageSync(tokenKey);
        uni.removeStorageSync(expiresInKey);
        this.removeUserInfo();
    },
    /**设置用户信息*/
    setUserInfo(data) {
        uni.setStorageSync(userInfoKey, data);
    },
    /**获取用户信息*/
    getUserInfo() {
        return uni.getStorageSync(userInfoKey);
    },
    /**删除用户信息*/
    removeUserInfo() {
        uni.removeStorageSync(userInfoKey);
    },
    /**将时间类型转为字符串*/
    getFullTime(date) {
        let Y = date.getFullYear() + '';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
        let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
        let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
        return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    },
    /**退出登陆*/
    loginOut() {
        this.removeToken();
        this.removeUserInfo();
        this.removeLoginUserTypeLog();
        this.goHome();
    },
    setLoginUserTypeLog(type) {
        uni.setStorageSync(loginUserTypeLogKey, type);
    },
    getLoginUserTypeLog() {
        return uni.getStorageSync(loginUserTypeLogKey);
    },
    removeLoginUserTypeLog() {
        uni.removeStorageSync(loginUserTypeLogKey);
    },
    /**前往启动页*/
    goStart() {
        uni.redirectTo({
            url: "/pages/start",
        });
    },


    setUUID(uuid) {
        uni.setStorageSync(UUIDKey, uuid);
    },
    getUUID() {
        return uni.getStorageSync(UUIDKey);
    },
    removeUUID() {
        return uni.removeStorageSync(UUIDKey);
    },


    /**根据用户类别跳转首页，未登录情况跳转登录页面*/
    goHome(path) {
        const token = this.getToken();
        if (token) {
            const userInfo = this.getUserInfo();
            let loginUserType = userInfo?.loginUserType;
            if (path && path.length > 0) {
                uni.redirectTo({
                    url: `/${path}`,
                });
                return;
            }
            //userType用户类别(Staff-员工、Channel-渠道、Customer-客户)
            switch (loginUserType) {
                case 'Customer':
                    uni.redirectTo({
                        url: "/customerPackage/homeTab/index",
                    });
                    break;
                case 'Channel':
                    uni.redirectTo({
                        url: "/channelPackage/homeTab/index",
                        // url: "/channelPackage/myTab/channelPage/protocolList",
                    });
                    break;
                case 'Staff':
                    uni.redirectTo({
                        url: "/staffPackage/homeTab/index",
                    });
                    break;
                default:
                    uni.redirectTo({
                        url: "/pages/login/index/index",
                    });
                    break;
            }
        } else {
            uni.redirectTo({
                url: "/pages/login/index/index",
            });
        }

    },


    /**设置环境变量
     * @param {*} d
     * @return {*}
     */
    setEnv(d) {
        uni.setStorageSync(envKey, d);
    },
    removeEnv() {
        uni.removeStorageSync(envKey);
    },
    /**获取环境变量
     * @param {*}
     * @return {*}
     */
    getEnv() {
        let env = uni.getStorageSync(envKey);
        if (!env) {
            switch (__wxConfig.envVersion) {
                case 'develop':
                    env = 'dev'
                    break;
                case 'trial':
                    env = 'uat'
                    break;
                default:
                    env = 'prd'
            }
        }
        return env;
    },



}
export default storageTool;