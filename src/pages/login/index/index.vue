<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-29 15:58:19
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-17 11:02:32
-->
<template>
  <view class="page">
    <u-tabs
      :list="list"
      :is-scroll="false"
      :current="current"
      @change="change"
    ></u-tabs>
    <view style="margin: 40rpx"></view>
    <u-form :model="form" ref="uForm">
      
      <u-form-item label="账号" prop="account">
        <u-input v-model="form.account" placeholder="账号" />
      </u-form-item>
      <u-form-item label="密码" prop="password">
        <u-input type="password" v-model="form.password" placeholder="密码" />
      </u-form-item>
    </u-form>
    <view style="padding: 40rpx">
      <u-button type="primary" @click="submitUser">登录</u-button>
    </view>
    <view style="padding: 40rpx">
      <u-button type="success" @click="go(-1)">列表demo</u-button>
    </view>
    <!-- <view style="padding: 20px">
      <u-button type="success" @click="go(0)">客户首页</u-button>
    </view>
    <view style="padding: 20px">
      <u-button type="success" @click="go(1)">中介首页</u-button>
    </view>
    <view style="padding: 20px">
      <u-button type="success" @click="go(2)">员工首页</u-button>
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
      list: [
        {
          name: "客户登录",
        },
        {
          name: "中介渠道",
        },
        {
          name: "员工案场",
          count: 5,
        },
      ],
      current: storageTool.getLoginUserTypeLog() || 0,
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
    change(index) {
      this.current = index;
      storageTool.setLoginUserTypeLog(this.current);
    },
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
          storageTool.goHome();

          // this.go(this.current);

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
        case -1:
          uni.redirectTo({
            url: "/pages/customer/index/index",
          });
          break;
        case 0:
          uni.redirectTo({
            url: "/customerPackage/homeTab/index",
          });
          break;
        case 1:
          uni.redirectTo({
            url: "/intermediaryPackage/homeTab/index",
          });
          break;
        case 2:
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