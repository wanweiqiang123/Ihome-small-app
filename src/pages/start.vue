<!--
 * @Descripttion: 启动页
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-30 14:22:01
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-28 19:12:08
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
    that.wxLogin();
  },

  methods: {
    wxLogin() {
      let that = this;
      uni.login({
        success: async function (res) {
          console.log(res, "xxxxx");
          getOpenidApi(res.code, {
            hideLoading: true,
          })
            .then((infoRes) => {
              console.log(infoRes.uuid, "uuid");
              showToast({
                title: res.code + "xx" + infoRes.uuid,
              });
              storageTool.setUUID(infoRes.uuid);
            })
            .catch((err) => {
              uni.showToast({
                title: "[启动异常,请重新进入小程序]" + err.msg,
                icon: "none",
                duration: 3000,
              });
            })
            .finally(() => {
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