/*
 * @Descripttion: storage本地存储
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 15:30:00
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-10 15:46:00
 */
const tokenKey = 'token';//token的key
const userInfoKey = 'userInfo';//用户信息的key

const storageTool = {
    setToken(data) {
        uni.setStorageSync(tokenKey, data);
    },
    getToken() {
        return uni.getStorageSync(tokenKey);
    },
    removeToken() {
        uni.removeStorageSync(tokenKey);
    },
    setUserInfo(data) {
        uni.setStorageSync(userInfoKey, data);
    },
    getUserInfo() {
        return uni.getStorageSync(userInfoKey);
    },
    removeUserInfo() {
        uni.removeStorageSync(userInfoKey);
    }
}
export default storageTool;