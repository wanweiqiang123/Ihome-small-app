<!--
 * @Descripttion: 启动页
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-30 14:22:01
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-30 14:56:08
-->
<template>
  <view style="padding-top: 100px">
    <view style="padding: 20px">
      <button
        type="primary"
        open-type="getUserInfo"
        @getUserInfo="getUserInfo"
        
      >
        微信登录
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
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad: function () {
    uni.login({
      success: function (res) {
        console.log(res);
      },
    });
  },

  methods: {
    getPhoneNumber: function (e) {
      console.log(e);
    },
    getUserInfo: function (a) {
      console.log(a);
    },
    login() {
      uni.redirectTo({
        url: "/pages/login/index/index",
      });
    },
  },
};
</script>

<style lang="scss">
</style>