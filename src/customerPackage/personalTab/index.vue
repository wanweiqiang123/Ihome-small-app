<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:17:34
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:47:21
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
        <view v-if="!isPrd">当前环境：{{ currentEnv }}</view>
        <view>{{ userInfo.name | emptyFilter }}</view>
        <view>{{ userInfo.mobilePhone | emptyFilter }}</view>
      </view>
      <view class="person-item-wrapper">
        <u-cell-group>
          <u-cell-item
            @click="userSwitchClick()"
            icon="account"
            title="切换用户"
            :arrow="true"
          ></u-cell-item>
          <u-cell-item
            @click="updateClick()"
            icon="info-circle"
            title="更新版本"
            :arrow="true"
          ></u-cell-item>
          <u-cell-item
            v-if="qrcodeShow"
            @click="qrcodeGoto()"
            icon="share"
            title="模拟二维码跳转"
            :arrow="true"
          ></u-cell-item>
        </u-cell-group>
      </view>

      <view class="btn-container">
        <u-button shape="circle" type="primary" @click="handleLoginOut"
          >退出账号</u-button
        >
      </view>
    </view>
    <!-- 退出 -->
    <u-action-sheet
      v-model="isShow"
      :list="list"
      :tips="tips"
      @click="submit"
      safe-area-inset-bottom
    ></u-action-sheet>
    <!-- 切换用户 -->
    <u-action-sheet
      v-model="showSwitchUser"
      :list="switchList"
      :tips="switchUseTips"
      @click="submitSwitchUser"
      safe-area-inset-bottom
    ></u-action-sheet>
  </CustomerTabBar>
</template>

<script>
import storageTool from "../../common/storageTool";
import switchUser from "../../mixins/switchUser";
export default {
  name: "personal-tab",
  mixins: [switchUser],
  data() {
    return {
      isPrd: true,
      currentEnv: "",
      isShow: false,
      userInfo: {},
      photo: require("@/static/img/photo.png"),
    };
  },
  onShow() {
    this.currentEnv = storageTool.getEnvName();
    this.isPrd = __wxConfig.envVersion == "release";
    console.log('this.isPrd', this.isPrd);
    this.userInfo = storageTool.getUserInfo();
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
    //height: 380rpx;
    box-sizing: border-box;
    padding-top: 20rpx;
    padding-bottom: 60rpx;
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