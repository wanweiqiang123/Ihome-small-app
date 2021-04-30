<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-30 17:20:45
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-30 09:45:10
-->
<template>
  <u-popup
    :value="value"
    mode="right"
    width="100%"
    :mask="true"
    close-icon-pos="top-left"
    closeable
    safe-area-inset-bottom
    close-icon-size="40"
    @close="close"
  >
    <view class="base-info-wrapper">
      <view class="imageInfo">
        <u-icon
          name="photo"
          size="100"
        ></u-icon>
        <view>完成身份验证，可核对真实身份，</view>
        <view>保障合法权益</view>
      </view>
      <view v-if="phoneShow">
        <view class="form">
          <u-field
            label-width="150"
            v-model="info.custName"
            label="姓名"
            disabled
          >
          </u-field>
          <u-field
            label-width="150"
            v-model="info.certificateNumber"
            label="身份证号码"
            disabled
          >
          </u-field>
          <u-field
            label-width="150"
            v-model="info.custTel"
            label="手机号码"
            disabled
          >
          </u-field>
          <u-field
            label-width="150"
            v-model="info.shortMsg"
            label="验证码"
            placeholder="请填写验证码"
          >
            <u-button
              size="mini"
              slot="right"
              type="success"
              @click="getCode"
            >{{codeText}}</u-button>
          </u-field>
          <u-verification-code
            ref="uCode"
            @change="codeChange"
          ></u-verification-code>
        </view>
      </view>
      <view v-else>
        <view class="form">
          <u-field
            label-width="150"
            v-model="info.custName"
            label="姓名"
            disabled
          >
          </u-field>
          <u-field
            label-width="150"
            v-model="info.certificateNumber"
            label="身份证号码"
            disabled
          >
          </u-field>
        </view>
        <u-gap
          height="20"
          bg-color="#f1f1f1"
        ></u-gap>
        <view class="form face">
          <view class="face-title">选择方式</view>
          <u-radio-group
            class="rodioGroup"
            v-model="info.faceauthMode"
            wrap
          >
            <u-radio
              @change="radioChange"
              v-for="(item, index) in FaceRecognition"
              :key="index"
              :name="item.code"
            >
              {{item.name}}
            </u-radio>
          </u-radio-group>
        </view>
      </view>
      <view
        class="other"
        @click="otherChange"
      >其他认证方式</view>
      <view class="buttons">
        <u-button
          :loading="nextLoading"
          type="primary"
          @click="gotoAttestation"
        >下一步</u-button>
      </view>

      <u-action-sheet
        v-model="showSwitchOther"
        :list="switchList"
        :tips="{
          text: '请选择认证方式'
        }"
        @click="submitSwitchOther"
        safe-area-inset-bottom
      ></u-action-sheet>
      <Linkto
        v-model="linktoShow"
        :url="linkUrl"
        :custTel="info.custTel"
        :custName="info.custName"
      ></Linkto>
    </view>
  </u-popup>
</template>
<script>
import {
  getFlowIdAndSendMesApi,
  getMsgCheckAndShimingSaveApi,
  getfaceRecognitionApi,
} from "../../api/customer";
import { getAllByTypeApi } from "../../api/index";
import Linkto from "./linkto.vue";
export default {
  components: { Linkto },
  props: {
    value: {
      type: Boolean,
    },
  },
  data() {
    return {
      info: {
        custName: "",
        custTel: "",
        certificateNumber: "",
        shortMsg: "",
        noticeId: "",
        templateId: "",
        notificationType: "",
        type: "",
        faceauthMode: "",
      },
      codeText: "",
      phoneShow: false,
      showSwitchOther: false,
      switchList: [],
      nextLoading: false,
      FaceRecognition: [],
      linktoShow: false,
      linkUrl: "",
      // hidePayStatus: true,
      attestationType: [],
    };
  },
  watch: {
    value: {
      immediate: true,
      async handler(v) {
        if (v) {
          this.FaceRecognition = await this.getDictAll("FaceRecognition");
          this.attestationType = await this.getDictAll("AuthenticationMethod");
          // this.hidePayStatus = this.$storageTool.hidePay();
          this.info = {
            ...getApp().globalData.attestationInfo,
            custName: getApp().globalData.attestationInfo.ownerName,
            custTel: getApp().globalData.attestationInfo.ownerMobile,
            certificateNumber: getApp().globalData.attestationInfo
              .ownerCertificateNo,
            faceauthMode: "ZHIMACREDIT",
          };
          console.log(this.info);
        }
      },
    },
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
    // 字典翻译
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 字典匹配
    getDictName(code, list) {
      if (list.length) {
        const item = list.find((v) => v.code === code);
        return item?.name;
      }
    },
    codeChange(text) {
      this.codeText = text;
    },
    async getCode() {
      if (this.$refs.uCode.canGetCode) {
        let postData = {};
        postData.cardType = "IDCard";
        postData.certificateNumber = this.info.certificateNumber;
        postData.custName = this.info.custName;
        postData.custTel = this.info.custTel;
        postData.custType = "Individual";
        await getFlowIdAndSendMesApi(postData);
        uni.showLoading({
          title: "正在获取验证码",
        });
        setTimeout(() => {
          uni.hideLoading();
          this.$refs.uCode.start();
        }, 1000);
      } else {
        this.$u.toast("倒计时结束后再发送");
      }
    },
    otherChange() {
      this.switchList = [
        {
          text: this.phoneShow
            ? this.getDictName(
                "FacialRecognitionTechnology",
                this.attestationType
              )
            : this.getDictName(
                "MessageAuthenticationCode",
                this.attestationType
              ),
        },
      ];
      this.showSwitchOther = true;
    },

    submitSwitchOther(v) {
      this.phoneShow = !this.phoneShow;
    },

    radioChange(v) {
      this.info.faceauthMode = v;
    },
    async gotoAttestation() {
      console.log(this.linktoShow);
      let obj = {};
      obj.cardType = "IDCard";
      obj.certificateNumber = this.info.certificateNumber;
      obj.custName = this.info.custName;
      obj.custTel = this.info.custTel;
      obj.custType = "Individual";
      obj.shortMsg = this.info.shortMsg;
      this.nextLoading = true;
      if (this.phoneShow) {
        try {
          await getMsgCheckAndShimingSaveApi(obj);
          this.nextLoading = false;
          if (this.info.type === "one") {
            getApp().noticeInfo = {
              templateId: this.info.templateId,
              id: this.info.noticeId,
              notificationType: this.info.notificationType,
              type: "sign",
            };
            uni.redirectTo({
              url: `/customerPackage/notification/index`,
            });
          } else {
            uni.redirectTo({
              url: `/customerPackage/signMore/index`,
            });
          }
        } catch (err) {
          this.nextLoading = false;
        }
      } else {
        obj.faceauthMode = this.info.faceauthMode;
        try {
          const res = await getfaceRecognitionApi(obj);
          this.nextLoading = false;
          if (res) {
            this.linkUrl = res;
            this.linktoShow = true;
          }
        } catch (err) {
          this.nextLoading = false;
          console.log(err);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #f1f1f1;
  position: relative;

  .form {
    width: 100%;
    box-sizing: border-box;
    padding: 0rpx 10rpx;
    background-color: #ffffff;

    .input-btn-flex {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
  .imageInfo {
    width: 100%;
    height: 250rpx;
    background-color: #a0cfff32;
    font-size: 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .buttons {
    width: 80%;
    position: absolute;
    margin-top: 50rpx;
    left: 50%;
    transform: translateX(-50%);
  }
  .other {
    text-align: center;
    color: #4881f9;
    padding: 20px 0 0 0;
  }
  .face {
    padding: 30rpx;
    .face-title {
      padding-bottom: 20rpx;
    }
    .rodioGroup {
      /deep/ .u-radio {
        margin-top: 20rpx;
      }
    }
  }
}
</style>