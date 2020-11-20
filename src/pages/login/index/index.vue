<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-29 15:58:19
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-20 14:55:07
-->
<template>
  <view class="page">
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
      <u-button type="success" @click="go()">列表demo</u-button>
    </view>
    <u-popup width="80%" v-model="show" mode="center">
      <view class="login-select-select login-select-select-title">
        请选择登陆用户</view
      >
      <view
        class="login-select-select"
        v-for="(item, index) in list"
        :key="index"
        @click="gotoPage(item, index)"
      >
        {{ item.name }}</view
      >
    </u-popup>
  </view>
</template>

<script>
import { loginApi, getUserInfoApi } from "../../../api/index";
import storageTool from "../../../common/storageTool";

export default {
  data() {
    return {
      show: false,
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

      rules: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: ["change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["change"],
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
          this.show = true;
          // if (this.list.length == 1) {
          //   storageTool.goHome();
          // }
        } else {
          console.log("验证失败");
        }
      });
    },
    gotoPage(item, index) {
      storageTool.setLoginUserTypeLog(index);
      storageTool.goHome();
    },
    go() {
      uni.redirectTo({
        url: "/pages/customer/index/index",
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

.login-select-select {
  line-height: 100rpx;
  border-bottom: 1px solid #eeeeee;
  text-align: center;
  font-weight: 500;
}
.login-select-select-title {
  font-weight: 600 !important;
  background: #409eff;
  color: #fff;
}
</style>