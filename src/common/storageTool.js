/*
 * @Descripttion: storage本地存储
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 15:30:00
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-05 16:25:22
 */
const tokenKey = 'token';//token的key
const expiresInKey = 'expires_in';//token的key的过期时间
const userInfoKey = 'userInfo';//用户信息的key
const loginUserTypeLogKey = 'loginUserTypeLog';//登录类别记录

const sessionKeyKey = 'sessionKey';
const openIdKey = 'openId';
const wxCodeKey = 'wxcode';

const storageTool = {
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
        let expires_in = uni.getStorageSync(expiresInKey)
        if (expires_in) {
            let m = new Date(expires_in).getTime() - new Date().getTime();
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
    /**存储openId*/
    setOpenId(openId) {
        uni.setStorageSync(openIdKey, openId);
    },
    getOpenId() {
        return uni.getStorageSync(openIdKey);
    },
    /**存储setSessionKey*/
    setSessionKey(sessionKey) {
        uni.setStorageSync(sessionKeyKey, sessionKey);
    },
    getSessionKey() {
        return uni.getStorageSync(sessionKeyKey);
    },
    getWxCode() {
        return uni.getStorageSync(wxCodeKey);
    },
    setWxCode(code) {
        uni.setStorageSync(wxCodeKey, code);
    },

    /**根据用户类别跳转首页，未登录情况跳转登录页面*/
    goHome(path) {
        const token = this.getToken();
        if (token) {
            const userInfo = this.getUserInfo();
            let userType = userInfo?.userType;
            if (path && path.length > 0) {
                uni.redirectTo({
                    url: `/${path}`,
                });
                return;
            }
            // const userType = 'Customer';
            //userType用户类别(Staff-员工、Channel-渠道、Customer-客户)
            switch (userType) {
                case 'Customer':
                    uni.redirectTo({
                        url: "/customerPackage/homeTab/index",
                    });
                    break;
                case 'Channel':
                    uni.redirectTo({
                        url: "/channelPackage/homeTab/index",
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

    }
}
export default storageTool;