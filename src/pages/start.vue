<!--
 * @Descripttion: 启动页
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-30 14:22:01
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-07 14:16:53
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
import { getUserInfoApi } from "../api/index";
export default {
  data() {
    return {
      token: null,
    };
  },
  async onLoad() {
    const that = this;
    const token = storageTool.getToken();
    uni.showLoading({
      title: "加载中...",
      mask: true,
    });
    try {
      const userInfo = await getUserInfoApi({ hideMsg: true });
      storageTool.setUserInfo(userInfo);
    } catch (error) {
      uni.redirectTo({
        url: "/pages/login/index/index",
      });
    }

    uni.login({
      success: function (res) {
        console.log(res);
        // uni.redirectTo({
        //   url: "/pages/login/index/index",
        // });
        // 获取用户信息
        uni.getUserInfo({
          provider: "weixin",
          success: function (infoRes) {
            console.log("用户昵称为：" + infoRes.userInfo.nickName);
            storageTool.goHome();
          },
          fail: function (err) {
            console.log(err)
            storageTool.goHome();
          },
        });

        // if (token) {
        //   that.$store.commit("setTabBarList", that.$store.getters.tabBarList);
        //   uni.redirectTo({
        //     url: "/pages/home/index/index",
        //   });
        // } else {
        //   uni.redirectTo({
        //     url: "/pages/login/index/index",
        //   });
        // }
      },
    });
  },

  methods: {
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