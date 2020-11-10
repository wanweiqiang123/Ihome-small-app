<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-29 15:58:19
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-10 17:16:15
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
      <u-button type="primary" @click="submitUser">登录</u-button>
    </view>
    <!-- <view style="padding: 20px">
      <u-button type="success" @click="submitOther">登录案场</u-button>
    </view> -->
  </view>
</template>

<script>
import { loginApi, getUserInfoApi } from "../../../api/index";
import storageTool from "../../../common/storageTool";

export default {
  data() {
    return {
      form: {
        account: "admin",
        password: "123456",
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
    async submitUser() {
      const that = this;
      this.$refs.uForm.validate(async (valid) => {
        if (valid) {
          const res = await loginApi({
            username: that.form.account,
            password: that.form.password,
          });
          storageTool.setToken(res.access_token);
          const userInfo = await getUserInfoApi();
          storageTool.setUserInfo(userInfo);

          that.$store.commit("setTabBarList", that.$store.getters.tabBarList);
          uni.redirectTo({
            url: "/pages/home/index/index",
          });
        } else {
          console.log("验证失败");
        }
      });
    },
    // submitOther() {
    //   const that = this;
    //   this.$refs.uForm.validate((valid) => {
    //     if (valid) {
    //       console.log("验证通过");

    //       that.$store.commit("setTabBarList", data);
    //       uni.redirectTo({
    //         url: "/pages/home/index/index",
    //       });
    //     } else {
    //       console.log("验证失败");
    //     }
    //   });
    // },
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