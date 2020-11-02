<!--
 * @Descripttion: 启动页
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-30 14:22:01
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-02 17:32:51
-->
<template>
  <view style="padding-top: 100px">
    <view style="padding: 20px">
      <!-- <button class='testbutton' open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">
        微信用户信息
      </button> -->
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
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
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad: function () {
    const that=this;
    uni.login({
      success: function (res) {
        console.log(res);
        uni.getStorage({
          key: "userType",
          success(e) {
            if (e.data) {
              if (e.data == "1") {
                let data = [
                  {
                    pagePath: "/pages/home/index/index",
                    iconPath: "home",
                    selectedIconPath: "home-fill",
                    text: "首页",
                    count: 2,
                    isDot: true,
                    customIcon: false,
                  },

                  {
                    pagePath: "/pages/personal/index/index",
                    iconPath: "account",
                    selectedIconPath: "account-fill",
                    text: "我的",
                    count: 23,
                    isDot: false,
                    customIcon: false,
                  },
                ];
                that.$store.commit("setTabBarList", data);
                uni.redirectTo({
                  url: "/pages/home/index/index",
                });
              } else if (e.data == "2") {
                let data = [
                  {
                    pagePath: "/pages/home/index/index",
                    iconPath: "home",
                    selectedIconPath: "home-fill",
                    text: "首页",
                    count: 2,
                    isDot: true,
                    customIcon: false,
                  },
                  {
                    pagePath: "/pages/customer/index/index",
                    iconPath: "photo",
                    selectedIconPath: "photo-fill",
                    text: "客户",
                    customIcon: false,
                  },

                  {
                    pagePath: "/pages/message/index/index",
                    iconPath: "play-right",
                    selectedIconPath: "play-right-fill",
                    text: "消息",
                    customIcon: false,
                  },
                  {
                    pagePath: "/pages/personal/index/index",
                    iconPath: "account",
                    selectedIconPath: "account-fill",
                    text: "我的",
                    count: 23,
                    isDot: false,
                    customIcon: false,
                  },
                ];
                that.$store.commit("setTabBarList", data);
                uni.redirectTo({
                  url: "/pages/home/index/index",
                });
              }
            }
          },
        });
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