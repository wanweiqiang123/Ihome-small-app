<!--
 * @Description: 案场个人中心
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 11:22:52
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-25 15:31:59
-->
<template>
  <StaffTabBar>
    <view class="person-page-wrapper">
      <view class="person-avatar-wrapper">
        <view>
          <u-image
            width="150rpx"
            height="150rpx"
            shape="circle"
            src="https://cdn.uviewui.com/uview/swiper/2.jpg"
          ></u-image>
        </view>
        <view>张小凡</view>
        <view>18600002222</view>
      </view>
      <view class="person-item-wrapper">
        <u-cell-group>
          <u-cell-item
            icon="rmb-circle"
            title="我的购房信息"
            :arrow="true"
          ></u-cell-item>
        </u-cell-group>
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
  </StaffTabBar>
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
    };
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
  .person-item-wrapper {
    width: 90%;
    box-sizing: border-box;
    margin-top: -50rpx;
    background: #fff;
  }

  .btn-container {
    width: 90%;
    margin-top: 100rpx;
  }
}
</style>
