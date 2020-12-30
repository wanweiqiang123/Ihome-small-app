<!--
 * @Descripttion: 启动页
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-30 14:22:01
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-30 16:13:45
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
    uni.login({
      success: async function (res) {
        console.log(res);
        getOpenidApi(res.code, {
          hideLoading: true,
        }).then((infoRes) => {
          storageTool.setOpenId(infoRes.openId);
          storageTool.setSessionKey(infoRes.sessionKey);
          getUserInfoApi(
            { terminalType: "WechatApp" },
            { hideMsg: true, hideLoading: true }
          )
            .then((userInfo) => {
              storageTool.setUserInfo(userInfo);
            })
            .finally(() => {
              storageTool.goHome();
            });
        });
      },
    });
  },

  methods: {
    async init() {
      uni.showLoading({
        title: "启动程序中...",
        mask: true,
      });
      try {
        const userInfo = await getUserInfoApi(null, {
          hideMsg: true,
          hideLoading: true,
        });
        console.log(userInfo);
        debugger;
        storageTool.setUserInfo(userInfo);
      } catch (error) {
      } finally {
        uni.login({
          success: async function (res) {
            console.log(res);
            try {
              const { openId, sessionKey } = await getOpenidApi(res.code, {
                hideLoading: true,
              });
              uni.hideLoading();
              storageTool.setOpenId(openId);

              // 获取用户信息
              uni.getUserInfo({
                provider: "weixin",
                success: function (infoRes) {
                  console.log("用户昵称为：" + infoRes.userInfo.nickName);
                  storageTool.goHome();
                },
                fail: function (err) {
                  console.log(err);
                  storageTool.goHome();
                },
              });
            } catch (error) {
              storageTool.goHome();
            }
          },
        });
      }
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