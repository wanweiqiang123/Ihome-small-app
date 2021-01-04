<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-29 15:58:19
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-04 15:27:16
-->
<template>
  <view class="page login-page-style">
    <view style="margin: 50rpx"></view>
    <view class="img-logo">
      <image src="../../../static/login/logo.png" mode="scaleToFill"></image>
    </view>
    <view style="margin: 70rpx"></view>

    <view style="padding: 10rpx 70rpx">
      <view class="page-tab">
        <view
          class="page-tab-item"
          :class="{ 'page-tab-item-active': current == 0 }"
          @click="activeTab(0)"
        >
          手机号码登录</view
        >
        <view
          class="page-tab-item"
          :class="{ 'page-tab-item-active': current == 1 }"
          @click="activeTab(1)"
          >账号密码登录
        </view>
      </view>

      <view class="form-container" v-show="current == 0">
        <view class="form-container-item">
          <image
            class="form-container-item-ico-all"
            src="../../../static/login/user.png"
            mode="scaleToFill"
          ></image>
          <input
            type="number"
            v-model="phoneForm.phone"
            class="uni-input form-container-item-input"
            placeholder="手机号码"
            placeholder-style="color:#C2C2C2;"
            maxlength="11"
          />
        </view>
        <view class="form-container-item">
          <u-row gutter="12">
            <u-col span="7">
              <image
                class="form-container-item-ico-all"
                src="../../../static/login/password.png"
                mode="scaleToFill"
              ></image>
              <input
                v-model="phoneForm.code"
                type="number"
                class="uni-input form-container-item-input"
                placeholder="验证码"
                maxlength="6"
                placeholder-style="color:#C2C2C2;"
              />
            </u-col>
            <u-col span="5">
              <u-button
                class="form-container-item-phone"
                type="primary"
                shape="circle"
                :plain="true"
                :disabled="second != 60"
                @click="sendCode"
                >{{ codeBtnText }}</u-button
              >
            </u-col>
          </u-row>
        </view>
        <view style="margin-top: 60rpx">
          <u-button type="primary" shape="circle" @click="loginPhone"
            >登 录</u-button
          >
        </view>
      </view>
      <view class="form-container" v-show="current == 1">
        <view class="form-container-item">
          <image
            class="form-container-item-ico-all"
            src="../../../static/login/user.png"
            mode="scaleToFill"
          ></image>
          <input
            v-model="form.account"
            class="uni-input form-container-item-input"
            placeholder="账号"
            placeholder-style="color:#C2C2C2;"
          />
        </view>
        <view class="form-container-item">
          <u-row gutter="12">
            <u-col span="11">
              <image
                class="form-container-item-ico-all"
                src="../../../static/login/password.png"
                mode="scaleToFill"
              ></image>
              <input
                v-model="form.password"
                class="uni-input form-container-item-input"
                placeholder="密码"
                :password="passwordType"
                placeholder-style="color:#C2C2C2;"
              />
            </u-col>
            <u-col span="1">
              <image
                class="form-container-item-eye"
                src="../../../static/login/eye.png"
                mode="scaleToFill"
                @click="eye"
              ></image>
            </u-col>
          </u-row>
        </view>
        <view style="margin-top: 60rpx">
          <u-button type="primary" shape="circle" @click="login"
            >登 录</u-button
          >
        </view>
      </view>
    </view>
    <view class="register-wrapper">
      <u-button shape="circle" @click="handleRegister">渠道商注册</u-button>
    </view>
    <view class="register-wrapper">
      <u-button
        shape="circle"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
        >微信登录</u-button
      >
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
  postGetPhoneNumberApi,
} from "../../../api/index";
import storageTool from "../../../common/storageTool";

export default {
  data() {
    return {
      redirect: null, //跳转路径
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
  onLoad(options) {
    this.redirect = options.options || null;
    uni.login({
      success: function (res) {
        // 获取code
        console.log(res);
      },
    });
  },

  methods: {
    async getPhoneNumber(e) {
      console.log(e);
      if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
        //用户拒绝
      } else {
        try {
          let code = storageTool.getWxCode();
          let sessionKey = storageTool.getSessionKey();
          let p = {
            code: code,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            sessionKey: sessionKey,
          };
          console.log(p);
          const res = await postGetPhoneNumberApi(p);
          console.log(res);
        } catch (error) {
          console.log(error);
          uni.showToast({
            title: "登陆失败",
          });
        }
      }

      //              console.log(JSON.stringify(e.encryptedData));
      //              console.log(JSON.stringify(e.iv));
    },
    activeTab(index) {
      this.current = index;
    },
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
      storageTool.goHome(this.redirect);
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
      console.log("sendCode");
      //发送验证码
      if (this.phoneForm.phone == "") {
        uni.showToast({
          title: "请选输入手机号码",
          icon: "none",
        });
        return;
      }
      if (this.checkPhone(this.phoneForm.phone)) {
        const res = await getSessionUserSendSmsApi(this.phoneForm.phone);
        console.log(res);
        uni.showToast({
          title: res,
          icon: "none",
          duration: 3000,
        });
        // uni.showToast({
        //   title: "发送成功",
        //   icon: "none",
        // });
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
    // 渠道商注册
    handleRegister() {
      uni.redirectTo({
        url: "/pages/register/channel",
      });
    },
  },

  onReady() {},
  created() {},
};
</script>

<style lang="scss" scoped>
.register-wrapper {
  width: 100%;
  padding: 10rpx 70rpx;
  margin-top: 20rpx;
}
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
.page-tab {
  display: flex;
  text-align: center;
  color: #c2c2c2;
  font-size: 36rpx;
  border-bottom: 1px solid #c2c2c2;
  // padding-bottom: -4rpx;
}
.page-tab-item {
  flex: 1;
  margin: 0 40rpx;
}
.page-tab-item-active {
  color: #4881f9;
  border-bottom: 2px solid #4881f9;
  padding-bottom: 20rpx;
}
</style>
<style lang="scss">
.login-page-style {
  .u-scroll-view {
    border-bottom: 1px solid #eee !important;
  }
  .u-tab-bar {
    top: 40px !important;
    height: 2px !important;
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
    top: 48rpx;
  }
  .form-container-item-input {
    padding-left: 80rpx;
  }
  .form-container-item-phone {
    position: relative;
    top: 36rpx;
  }
  .form-container-item-eye {
    width: 60rpx;
    height: 60rpx;
    position: relative;
    top: 48rpx;
  }
  .icon-style {
    font-size: 20px;
    color: #c2c2c2;
  }
  .form-container-item-ico-all {
    width: 50rpx;
    height: 50rpx;
    position: relative;
    top: 56rpx;
  }
}
</style>