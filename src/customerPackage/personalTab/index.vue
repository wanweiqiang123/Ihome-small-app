<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:17:34
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-13 14:16:47
-->
<template>
  <CustomerTabBar>
    <view class="box">
      <view class="msg">
        <u-avatar
          :src="src"
          :size="120"
          @click="headClick"
        ></u-avatar>
        <view style="margin-left:20rpx">
          <view>皮小强</view>
          <view>15119337612</view>
        </view>
      </view>
      <view>
        <u-icon
          name="setting-fill"
          size="40"
        ></u-icon>
      </view>
    </view>
    <view class="logout">
      <u-action-sheet
        :list="list"
        :tips="tips"
        v-model="show"
        @click="logout"
      ></u-action-sheet>
      <u-button
        type="primary"
        @click="show = true"
      >退出登录</u-button>
    </view>
  </CustomerTabBar>
</template>

<script>
import storageTool from "../../common/storageTool";
export default {
  data() {
    return {
      title: "",
      src: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
      show: false,
      list: [
        {
          text: "退出登录",
          color: "#F95E5A",
        },
      ],
      tips: {
        text: "确定要退出当前账号？",
        color: "#909399",
        fontSize: 24,
      },
    };
  },
  onLoad() {},
  methods: {
    headClick() {
      console.log(123);
    },
    logout() {
      storageTool.removeToken();
      storageTool.removeUserInfo();
      uni.redirectTo({
        url: "/pages/login/index/index",
      });
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100%;
  height: 200rpx;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}
.msg {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}
.logout {
  padding: 0 40rpx;
}
</style>