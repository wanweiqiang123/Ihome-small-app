<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:17:34
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-08 17:41:18
-->
<template>
  <CustomerTabBar>
    <view class="person-page-wrapper">
      <view class="person-avatar-wrapper">
        <view>
          <u-image
            width="150rpx"
            height="150rpx"
            shape="circle"
            :src="photo"
          ></u-image>
        </view>
        <view>{{userInfo.name}}</view>
        <view>{{userInfo.mobilePhone}}</view>
      </view>
      <view class="btn-container">
        <u-button
          shape="circle"
          type="primary"
          @click="handleLoginOut"
        >退出账号</u-button>
      </view>
    </view>
    <u-action-sheet
      v-model="isShow"
      :list="list"
      :tips="tips"
      @click="submit"
      safe-area-inset-bottom
    ></u-action-sheet>
  </CustomerTabBar>
</template>

<script>
export default {
  name: "personal-tab",
  data() {
    return {
      isShow: false,
      tips: {
        text: "确定要退出当前账号？",
        color: "#909399",
      },
      list: [
        {
          text: "退出登录",
          color: "#fa3534",
          fontSize: 28,
        },
      ],
      userInfo: {},
      photo: require("@/static/img/photo.png"),
    };
  },
  onShow() {
    this.userInfo = uni.getStorageSync("userInfo");
  },
  methods: {
    // 退出登录
    handleLoginOut() {
      this.isShow = true;
    },
    submit(index) {
      switch (index) {
        case 0:
          this.$storageTool.loginOut();
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.person-page-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $u-bg-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  .person-avatar-wrapper {
    width: 100%;
    height: 380rpx;
    box-sizing: border-box;
    padding-bottom: 38rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $u-type-primary;
    color: white;

    view {
      box-sizing: border-box;
      margin-bottom: 8rpx;
    }
  }

  .btn-container {
    width: 90%;
    margin-top: 50rpx;
  }
}
</style>