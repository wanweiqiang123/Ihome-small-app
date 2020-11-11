/*
 * @Descripttion: storage本地存储
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 15:30:00
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-11 16:15:12
 */
const tokenKey = 'token';//token的key
const expiresInKey = 'expires_in';//token的key的过期时间
const userInfoKey = 'userInfo';//用户信息的key

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
    }
}
export default storageTool;