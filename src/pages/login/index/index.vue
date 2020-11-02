<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-29 15:58:19
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-02 17:31:54
-->
<template>
  <view class="page">
    <u-form :model="form" ref="uForm">
      <u-form-item label="账号" prop="account">
        <u-input v-model="form.account" placeholder="账号" />
      </u-form-item>
      <u-form-item label="密码" prop="password">
        <u-input type="password" v-model="form.password" placeholder="密码" />
      </u-form-item>
    </u-form>
    <view style="padding: 20px">
      <u-button type="primary" @click="submitUser">登录用户</u-button>
    </view>
    <view style="padding: 20px">
      <u-button type="success" @click="submitOther">登录案场</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    submitUser() {
      const that=this;
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          console.log("验证通过");
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
          uni.navigateTo({
            url: "/pages/home/index/index",
          });
        } else {
          console.log("验证失败");
        }
      });
    },
    submitOther() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          console.log("验证通过");

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
          uni.navigateTo({
            url: "/pages/home/index/index",
          });
        } else {
          console.log("验证失败");
        }
      });
    },
  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  created() {
    console.log(getApp().globalData.tabList);
  },
};
</script>

<style lang="scss">
.page {
  padding: 0 20rpx 20rpx 20rpx;
}
</style>