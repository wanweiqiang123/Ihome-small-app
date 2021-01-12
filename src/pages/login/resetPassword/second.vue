<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-29 15:58:19
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-12 11:25:03
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
                placeholder="新密码"
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
        <view class="form-container-item">
          <u-row gutter="12">
            <u-col span="11">
              <image
                class="form-container-item-ico-all"
                src="../../../static/login/password.png"
                mode="scaleToFill"
              ></image>
              <input
                v-model="form.password2"
                class="uni-input form-container-item-input"
                placeholder="确认密码"
                :password="passwordType2"
                placeholder-style="color:#C2C2C2;"
              />
            </u-col>
            <u-col span="1">
              <image
                class="form-container-item-eye"
                src="../../../static/login/eye.png"
                mode="scaleToFill"
                @click="eye2"
              ></image>
            </u-col>
          </u-row>
        </view>
        <view style="margin-top: 60rpx">
          <u-button type="primary" shape="circle" @click="login"
            >确 认</u-button
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
import { postSessionUserGetBackPasswordApi } from "../../../api/index";
import storageTool from "../../../common/storageTool";
import tool from "../../../common/tool";
export default {
  data() {
    return {
      passwordType: true,
      passwordType2: true,
      form: {
        mobilePhone: "",
        smsCode: "",
        password: "",
        password2: "",
      },
    };
  },
  onLoad(options) {
    this.form.mobilePhone = options.phone;
    this.form.smsCode = options.code;
    console.log(this.form);
  },

  methods: {
    //检查密码正则
    checkPassword(value) {
      let reg = /^[1][3-9]\d{9}$/;
      if (!reg.test(value)) {
        return false;
      } else {
        return true;
      }
    },
    async login() {
      //账号密码登录
      console.log(this.form);
      //  ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&.])[0-9a-zA-Z@#$%^&.]{8,20}$
      if (this.form.password != this.form.password2) {
        tool.toast("两个密码不一致");
        return;
      }
      if (!this.form.password) {
        tool.toast(
          "密码必须包含大写字母、小写字母、数字、特殊字符（.@#$%^&）,长度8-20位"
        );
        return;
      }

      console.log(this.form);
      const res = await postSessionUserGetBackPasswordApi(this.form);
      uni.showToast({
        title: "密码重置成功",
      });
      let url = "/pages/login/index/index";
      console.log(url);
      setTimeout(() => {
        // uni.redirectTo({
        //   url: url,
        // });
        storageTool.goHome();
      }, 2000);

      //this.loginSuccess(res);
    },
    // async loginSuccess(res) {
    //   storageTool.setToken(res.access_token, res.expires_in);
    //   const userInfo = await getUserInfoApi();
    //   storageTool.setUserInfo(userInfo);
    //   storageTool.goHome(this.redirect);
    // },

    async eye() {
      this.passwordType = !this.passwordType;
    },
    async eye2() {
      this.passwordType2 = !this.passwordType2;
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
</style>