<!--
 * @Description: 案场个人中心
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 11:22:52
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-16 10:46:04
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
            :src="photo"
          ></u-image>
        </view>
        <view>{{ userInfo.name }}</view>
        <view>{{ userInfo.orgName }}</view>
      </view>
      <view class="person-item-wrapper">
        <u-cell-group>
          <!-- <u-cell-item
            icon="rmb-circle"
            title="我的购房信息"
            :arrow="true"
          ></u-cell-item> -->

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
  </StaffTabBar>
</template>

<script>
import storageTool from "../../common/storageTool";
import { userSwitchApi, getUserInfoApi } from "../../api/index";
import switchUser from "../../mixins/switchUser";
export default {
  mixins: [switchUser],
  name: "personal-tab",
  data() {
    return {
      userInfo: {},
      photo: require("@/static/img/photo.png"),
    };
  },
  methods: {},
  onShow() {
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
}
</style>
