<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-29 15:58:19
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-23 11:42:40
-->
<template>
  <view class="page login-page-style">
    <view style="margin: 50rpx"></view>
    <view class="img-logo">
      <image src="../../../static/login/logo.png" mode="scaleToFill"></image>
    </view>
    <view style="margin: 70rpx"></view>

    <view style="padding: 10rpx 70rpx">
      <u-tabs
        :list="list"
        :is-scroll="false"
        :current="current"
        @change="changeType"
      ></u-tabs>
      <view class="form-container" v-show="current == 0">
        <view class="form-container-item">
          <u-icon
            name="account"
            class="account-ico form-container-item-ico"
          ></u-icon>
          <input
            v-model="phoneForm.phone"
            class="uni-input form-container-item-input"
            placeholder="手机号码"
            maxlength="11"
          />
        </view>
        <view class="form-container-item">
          <u-row gutter="12">
            <u-col span="7">
              <u-icon
                name="lock"
                class="password-ico form-container-item-ico"
              ></u-icon>
              <input
                v-model="phoneForm.code"
                type="number"
                class="uni-input form-container-item-input"
                placeholder="验证码"
                maxlength="6"
              />
            </u-col>
            <u-col span="5">
              <u-button
                class="form-container-item-phone"
                type="primary"
                shape="circle"
                :plain="true"
                :disabled="second != 60"
                @click="sendCode()"
                >{{ codeBtnText }}</u-button
              >
            </u-col>
          </u-row>
        </view>
        <view style="margin-top: 60rpx">
          <u-button type="primary" shape="circle" @click="loginPhone()"
            >登 录</u-button
          >
        </view>
      </view>
      <view class="form-container" v-show="current == 1">
        <view class="form-container-item">
          <u-icon
            name="account"
            class="account-ico form-container-item-ico"
          ></u-icon>
          <input
            v-model="form.account"
            class="uni-input form-container-item-input"
            placeholder="账号"
          />
        </view>
        <view class="form-container-item">
          <u-row gutter="12">
            <u-col span="11">
              <u-icon
                name="lock"
                class="password-ico form-container-item-ico"
              ></u-icon>
              <input
                v-model="form.password"
                class="uni-input form-container-item-input"
                placeholder="密码"
                :password="passwordType"
              />
            </u-col>
            <u-col span="1">
              <image
                class="form-container-item-eye"
                src="../../../static/login/eye.png"
                mode="scaleToFill"
                @click="eye()"
              ></image>
            </u-col>
          </u-row>
        </view>
        <view style="margin-top: 60rpx">
          <u-button type="primary" shape="circle" @click="login()"
            >登 录</u-button
          >
        </view>
      </view>
    </view>

    <view class="img-bottom">
      <image
        style="width: 100%"
        src="../../../static/login/bottom.png"
        mode="scaleToFill"
      ></image>
    </view>
  </view>
</template>

<script>
import {
  loginApi,
  loginPhoneApi,
  getUserInfoApi,
  getSessionUserSendSmsApi,
} from "../../../api/index";
import storageTool from "../../../common/storageTool";

export default {
  data() {
    return {
      codeBtnText: "发送验证码",
      second: 60,
      passwordType: true,
      list: [
        {
          name: "手机号码登录",
        },
        {
          name: "账号密码登录",
        },
      ],
      current: 1,
      show: false,
      form: {
        account: "",
        password: "",
      },
      phoneForm: {
        phone: "",
        code: "",
      },
    };
  },

  methods: {
    changeType(index) {
      this.current = index;
    },
    async login() {
      //账号密码登录
      console.log(this.form);
      if (this.form.account && this.form.account.length > 0) {
      } else {
        uni.showToast({
          title: "账号必填",
          icon: "none",
        });
        return;
      }
      if (this.form.password && this.form.password.length > 0) {
      } else {
        uni.showToast({
          title: "密码必填",
          icon: "none",
        });
        return;
      }
      const res = await loginApi({
        username: this.form.account,
        password: this.form.password,
      });
      this.loginSuccess(res);
    },
    async loginSuccess(res) {
      storageTool.setToken(res.access_token, res.expires_in);
      const userInfo = await getUserInfoApi();
      storageTool.setUserInfo(userInfo);
      storageTool.goHome();
    },
    async loginPhone() {
      //验证码登录
      console.log(this.phoneForm);
      if (this.phoneForm.phone && this.phoneForm.phone.length > 0) {
      } else {
        uni.showToast({
          title: "手机号码必填",
          icon: "none",
        });
        return;
      }
      if (this.phoneForm.code && this.phoneForm.code.length > 0) {
      } else {
        uni.showToast({
          title: "验证码必填",
          icon: "none",
        });
        return;
      }
      //
      const res = await loginPhoneApi({
        phone: this.phoneForm.phone,
        code: this.phoneForm.code,
      });
      this.loginSuccess(res);
    },
    async sendCode() {
      //发送验证码
      if (this.checkPhone(this.phoneForm.phone)) {
        const res = await getSessionUserSendSmsApi(this.phoneForm.phone);
        console.log(res);
        uni.showToast({
          title: "发送成功",
          icon: "none",
        });
        //倒计时
        let timer = setInterval(() => {
          this.second--;
          this.codeBtnText = this.second + "秒";
          if (this.second == 0) {
            this.codeBtnText = "发送验证码";
            clearInterval(timer);
            this.second = 60;
          }
        }, 1000);
      } else {
        uni.showToast({
          title: "手机号码格式有误",
          icon: "none",
        });
      }
    },
    //检查手机号码格式
    checkPhone(value) {
      let reg = /^[1][3-9]\d{9}$/;
      if (!reg.test(value)) {
        return false;
      } else {
        return true;
      }
    },

    async submitUser() {
      const that = this;
      const res = await loginApi({
        username: that.form.account,
        password: that.form.password,
      });
      storageTool.setToken(res.access_token, res.expires_in);
      const userInfo = await getUserInfoApi();
      storageTool.setUserInfo(userInfo);
      storageTool.goHome();
    },
    async eye() {
      this.passwordType = !this.passwordType;
    },
  },

  onReady() {},
  created() {},
};
</script>

<style lang="scss" scoped>
.login-select-select {
  line-height: 100rpx;
  border-bottom: 1px solid #eeeeee;
  text-align: center;
  font-weight: 500;
}
.login-select-select-title {
  font-weight: 600 !important;
  background: $u-type-primary;
  color: #fff;
}

.img-logo {
  text-align: center;
  image {
    height: 150rpx;
    width: 150rpx;
  }
}
</style>
<style lang="scss">
.login-page-style {
  .u-scroll-view {
    border-bottom: 1px solid #eee !important;
  }
  .u-tab-bar {
    width: 80px !important;
    margin-left: -30px !important;
    transition-duration: 0.5s;
    background-color: #2979ff;
    height: 2px !important;
    top: 40px !important;
  }
  .img-bottom {
    width: 100%;
    position: fixed;
    bottom: -5px;
  }

  .form-container {
    margin: 0rpx 0rpx;
  }
  .form-container-item {
    line-height: 46rpx;
    padding-bottom: 40rpx;
    border-bottom: 1px solid #dbdbdb;
  }
  .form-container-item-ico {
    position: relative;
    top: 46rpx;
  }
  .form-container-item-input {
    padding-left: 60rpx;
  }
  .form-container-item-phone {
    position: relative;
    top: 30rpx;
  }
  .form-container-item-eye {
    width: 60rpx;
    height: 60rpx;
    position: relative;
    top: 40rpx;
  }
}
</style>