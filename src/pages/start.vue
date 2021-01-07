<!--
 * @Descripttion: 启动页
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-30 14:22:01
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-07 10:45:46
-->
<template>
  <view style="padding-top: 100px">
    <view v-if="false">
      <view style="padding: 20px">
        <!-- <button class='testbutton' open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">
        微信用户信息
      </button> -->
        <button
          open-type="getUserInfo"
          lang="zh_CN"
          @getuserinfo="onGotUserInfo"
        >
          获取用户信息
        </button>
      </view>
      <view style="padding: 20px">
        <button
          type="default"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
        >
          微信手机号码
        </button>
      </view>
      <view style="padding: 20px">
        <u-button @click="login">账号密码登录</u-button>
      </view>
    </view>
  </view>
</template>

<script>
import storageTool from "../common/storageTool";
import { getUserInfoApi, getAreaApi, getDictGetAllApi } from "../api/index";
import { getOpenidApi } from "../api/customer";
import { currentEnvConfig } from "../env-config";
export default {
  data() {
    return {
      token: null,
    };
  },
  onLoad() {
    let that = this;
    uni.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        let openId = storageTool.getOpenId();
        let sessionKey = storageTool.getSessionKey();
        if (openId && sessionKey) {
          that.requestUserInfo();
        } else {
          that.wxLogin();
        }
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        that.wxLogin();
      },
    });
  },

  methods: {
    wxLogin() {
      let that = this;
      uni.login({
        success: async function (res) {
          console.log(res);
          storageTool.setWxCode(res.code);
          getOpenidApi(res.code, {
            hideLoading: true,
          }).then((infoRes) => {
            storageTool.setOpenId(infoRes.openId);
            storageTool.setSessionKey(infoRes.sessionKey);
            that.requestUserInfo();
          });
        },
      });
    },
    requestUserInfo() {
      getUserInfoApi(
        { terminalType: "WechatApp" },
        { hideMsg: true, hideLoading: true }
      )
        .then((userInfo) => {
          storageTool.setUserInfo(userInfo);
        })
        .catch((err) => {
          if (err.statusCode == 401) {
            storageTool.removeToken();
          }
        })
        .finally(() => {
          storageTool.goHome();
        });
    },
    getPhoneNumber: function (e) {
      console.log(e);
      console.log(e.detail.encryptedData);
      console.log(e.detail.iv);
    },
    onGotUserInfo: function (a) {
      console.log(a.detail);
      console.log(a.detail.userInfo);
    },
    login() {
      uni.navigateTo({
        url: "/pages/login/index/index",
      });
    },
  },
};
</script>

<style lang="scss">
</style>