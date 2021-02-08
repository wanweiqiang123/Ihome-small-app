<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-26 09:02:05
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-26 10:01:10
-->
<template>
  <view class="follow-up-wrapper">
    <view class="client-info">
      <view class="name u-padding-bottom-20">陈某某</view>
      <view>18333334444</view>
    </view>
    <view class="client-info u-margin-top-30 u-padding-bottom-20">
      <view class="name u-padding-bottom-20">跟进方式</view>
      <view>
        <u-subsection
          active-color="#ff9900"
          :list="followTypeList"
          :current="currentType"
          @change="changeType"
        ></u-subsection>
      </view>
    </view>
    <view class="client-info u-margin-top-30">
      <view class="name u-padding-bottom-20">跟进情况</view>
      <view>
        <u-input
          :clearable="false"
          v-model="followCase"
          type="textarea"
          :border="true"
          :height="150"
          :auto-height="false"
        />
      </view>
    </view>
    <view class="bottom-btn">
      <u-button
        type="primary"
        @click="saveEnter"
      >保存</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      followTypeList: [
        {
          name: "电联",
        },
        {
          name: "约看",
        },
        {
          name: "面谈",
        },
      ],
      currentType: 0,
      followCase: "",
    };
  },
  onLoad() {},
  methods: {
    // 选择跟进方式
    changeType(index) {
      this.currentType = index;
    },
    // 保存
    saveEnter() {
      uni.redirectTo({
        url: `/channelPackage/clientTab/index`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.follow-up-wrapper {
  width: 100%;
  height: calc(100vh - 120rpx);
  box-sizing: border-box;
  background-color: #f5f5f5;

  .name {
    font-size: 38rpx;
    font-weight: 600;
  }

  .client-info,
  .follow-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx;
    background-color: #fcfcfc;
  }

  .bottom-btn {
    width: 100%;
    height: 100rpx;
    box-sizing: border-box;
    padding: 10rpx 50rpx;
    background-color: #ffffff;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    z-index: 9999;
  }
}
</style>