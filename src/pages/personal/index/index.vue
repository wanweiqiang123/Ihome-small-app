<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 15:20:30
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-10 17:04:37
-->
<template>
  <TabBarPage>
    <view>
      <view
        style="padding-top: 20rpx"
        class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30"
      >
        <view class="u-m-r-10">
          <u-avatar :src="pic" size="140"></u-avatar>
        </view>
        <view class="u-flex-1">
          <view class="u-font-18 u-p-b-20">张大大</view>
          <view class="u-font-14 u-tips-color">15512345678</view>
        </view>
        <!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view> -->
        <!-- <view class="u-m-l-10 u-p-10">
        <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
      </view> -->
      </view>

      <view class="u-m-t-20">
        <u-cell-group>
          <u-cell-item icon="star" title="修改绑定手机"></u-cell-item>
          <u-cell-item icon="photo" title="修改密码"></u-cell-item>
          <u-cell-item icon="coupon" title="银行卡"></u-cell-item>
        </u-cell-group>
      </view>

      <view class="u-m-t-20">
        <u-cell-group>
          <u-cell-item icon="setting" title="我的收藏"></u-cell-item>
        </u-cell-group>
      </view>
      <view class="u-m-t-20">
        <u-button type="primary" @click="loginOut()">退出</u-button>
      </view>
    </view>
  </TabBarPage>
</template>

<script>
import storageTool from "../../../common/storageTool";
export default {
  data() {
    return {
      pic: "/static/img/photo.png",
      show: true,
    };
  },
  onLoad() {},
  methods: {
    async loginOut() {
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
page {
  background-color: #ededed;
}

.camera {
  width: 54px;
  height: 44px;

  &:active {
    background-color: #ededed;
  }
}
.user-box {
  background-color: #fff;
}
</style>
