<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-10 10:42:47
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-23 16:32:37
-->
<template>
  <view class="channel-register-wrapper">
    <view class="register-steps-wrapper">
      <view
        v-for="(item, index) in stepList"
        :key="index"
        :class="
          currentStep === index ? `${item.className} color` : item.className
        "
        >{{ item.name }}</view>
    </view>
    <view class="component-wrapper">
      <BaseInfo :qrCode="qrScene" @next="nextStep" v-show="currentStep === 0"></BaseInfo>
      <CompanyInfo :baseForm="baseForm" @next="nextStep" v-show="currentStep === 1"></CompanyInfo>
    </view>
    <view v-if="currentStep === 2" class="u-margin-top-30">
      <view class="tips-wrapper">
        <view class="tips-icon">
          <u-icon
            name="checkmark-circle-fill"
            size="120"
            color="#007aff"
          ></u-icon>
        </view>
        <view class="tips-success">注册成功</view>
        <view class="tips-detail">您可以通过我的-公司信息查看公司详情</view>
      </view>
    </view>
    <view class="btn" v-if="currentStep === 2">
      <u-button type="primary" @click="handleView">查看个人中心</u-button>
    </view>
  </view>
</template>

<script>
import BaseInfo from "@/pages/register/pages/baseInfo.vue";
import CompanyInfo from "@/pages/register/pages/companyInfo.vue";

export default {
  components: { BaseInfo, CompanyInfo },
  data() {
    return {
      stepList: [
        {
          name: "1.注册信息",
          className: "register arrow",
        },
        {
          name: "2.完善公司信息",
          className: "company arrow",
        },
        {
          name: "3.完成注册",
          className: "finish",
        },
      ],
      currentStep: 0,
      qrScene: '',
      baseForm: {}
    };
  },
  onLoad(query) {
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    if (query && query.scene) {
      const scene = decodeURIComponent(query.scene);
      this.qrScene = scene;
      console.log(scene);
    } else {
      this.qrScene = '';
    }
  },
  methods: {
    // 下一步
    nextStep(data) {
      // console.log(data);
      this.baseForm = data;
      this.currentStep = this.currentStep + 1;
    },
    // 查看个人中心
    handleView() {
      this.currentStep = 0;
    }
  },
};
</script>

<style lang="scss" scoped>
.channel-register-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;

  .register-steps-wrapper {
    width: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;

    view {
      height: 92rpx;
      line-height: 92rpx;
      text-align: center;
      position: relative;
      border-top: solid 1rpx #ddd;
      border-bottom: solid 1rpx #ddd;
    }

    .register {
      width: 34%;
    }

    .company {
      width: 38%;
      box-sizing: border-box;
      padding: 0rpx 22rpx;
      text-align: left;
    }

    .finish {
      width: 28%;
    }

    .arrow:after,
    .arrow:before {
      width: 0rpx;
      height: 0rpx;
      content: " ";
      position: absolute;
      top: 0rpx;
      right: -36rpx;
      border: 46rpx solid transparent;
      border-left: 26rpx solid #fff;
    }

    .arrow:before {
      border-left-color: #ddd;
      right: -38rpx;
    }

    .color {
      color: $u-type-primary;
    }
  }

  .component-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 30rpx;
  }

  .tips-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;

    view {
      flex: 1;
      box-sizing: border-box;
    }

    .tips-icon {
      padding-top: 50rpx;
    }

    .tips-success {
      font-size: 36rpx;
      font-weight: bold;
      color: #666666;
      padding: 20rpx 0rpx;
    }

    .tips-detail {
      font-size: 28rpx;
      font-weight: 500;
      color: #666666;
      padding-bottom: 50rpx;
    }
  }

  .btn {
    box-sizing: border-box;
    margin-top: 30rpx;
    padding: 0rpx 30rpx;
    /deep/.u-size-default {
      height: 92rpx !important;
      line-height: 92rpx !important;
    }
  }
}
</style>