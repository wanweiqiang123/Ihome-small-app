<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-29 15:58:19
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-12 15:36:25
-->
<template>
  <view class="page login-page-style">
    <view style="margin: 50rpx"></view>
    <view class="img-logo">
      <image src="../../../static/login/logo.png" mode="scaleToFill"></image>
    </view>
    <view style="margin: 70rpx"></view>

    <view style="padding: 10rpx 70rpx">
      <view class="form-container">
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
          <u-button type="primary" shape="circle" @click="nextGo"
            >下一步</u-button
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
  postSessionUserSendSmsApi,
  postSessionUserCheckSmsApi,
} from "../../../api/index";
import storageTool from "../../../common/storageTool";
import tool from "../../../common/tool";
export default {
  data() {
    return {
      codeBtnText: "发送验证码",
      second: 60,
      phoneForm: {
        phone: "",
        code: "",
      },
    };
  },
  onLoad(options) {},

  methods: {
    async loginSuccess(res) {
      storageTool.setToken(res.access_token, res.expires_in);
      const userInfo = await getUserInfoApi();
      storageTool.setUserInfo(userInfo);
      storageTool.goHome(this.redirect);
    },
    async nextGo() {
      //验证码登录
      console.log(this.phoneForm);
      if (this.phoneForm.phone && this.phoneForm.phone.length > 0) {
      } else {
        tool.toast("手机号码必填");
        return;
      }
      if (this.phoneForm.code && this.phoneForm.code.length > 0) {
      } else {
        tool.toast("验证码必填");
        return;
      }
      let p = {
        mobilePhone: this.phoneForm.phone,
        smsCode: this.phoneForm.code,
        smsCodeType: "RestPassword",
      };
      const res = await postSessionUserCheckSmsApi(p);
      if (res) {
        uni.showToast({
          title: "验证成功",
        });
        let url =
          "/pages/login/resetPassword/second?phone=" +
          this.phoneForm.phone +
          "&code=" +
          this.phoneForm.code;
        console.log(url);
        uni.navigateTo({
          url: url,
        });
      } else {
        tool.toast("验证码有误");
      }
    },
    async sendCode() {
      console.log("sendCode");
      //发送验证码
      if (this.phoneForm.phone == "") {
        tool.toast("请选输入手机号码");
        return;
      }
      if (this.checkPhone(this.phoneForm.phone)) {
        const res = await postSessionUserSendSmsApi({
          mobilePhone: this.phoneForm.phone,
          smsCodeType: "RestPassword",
        });
        console.log(res);
        tool.toast(res);
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
        tool.toast("手机号码格式有误");
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
  },
};
</script>

<style lang="scss" scoped>
.register-wrapper {
  width: 100%;
  padding: 10rpx 70rpx;
  margin-top: 20rpx;
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

  .wechat-blue-login button::after {
    border: none !important;
  }
  .view-bottom {
    display: flex;
  }
  .wechat-blue-login {
    border: none !important;
    flex: 1;
  }
  .password-reset {
    text-align: left;
    flex: 1;
  }
}
</style>