<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-29 15:58:19
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-12 14:51:48
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
      <view style="padding: 20px">
      <u-button type="primary" @click="go('0')">列表</u-button>
    </view>
    <view style="padding: 20px">
      <u-button type="success" @click="go('1')">客户首页</u-button>
    </view>
    <view style="padding: 20px">
      <u-button type="success" @click="go('2')">中介首页</u-button>
    </view>
    <view style="padding: 20px">
      <u-button type="success" @click="go('3')">员工首页</u-button>
    </view>
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
          storageTool.setToken(res.access_token, res.expires_in);
          const userInfo = await getUserInfoApi();
          storageTool.setUserInfo(userInfo);

          // that.$store.commit("setTabBarList", that.$store.getters.tabBarList);
          // uni.redirectTo({
          //   url: "/pages/home/index/index",
          // });
        } else {
          console.log("验证失败");
        }
      });
    },
    go(t) {
      switch (t) {
         case "0":
          uni.redirectTo({
            url: "/pages/customer/index/index",
          });
          break;
        case "1":
          uni.redirectTo({
            url: "/customerPackage/homeTab/index",
          });
          break;
        case "2":
          uni.redirectTo({
            url: "/intermediaryPackage/homeTab/index",
          });
          break;
        case "3":
          uni.redirectTo({
            url: "/staffPackage/homeTab/index",
          });
          break;

        default:
          break;
      }
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