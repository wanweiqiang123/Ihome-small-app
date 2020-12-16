<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-15 20:04:32
-->
<template>
  <view>
    <CustomerTabBar>
      <view class="box">
        <u-card
          :border="false"
          v-for="(item, i) in info"
          :key="i"
          class="ih-card"
          :show-head="false"
          :foot-border-top="false"
          :foot-style="{
            padding: '10rpx 30rpx'
          }"
        >
          <view slot="body">
            <view class="ih-card-content">
              <view>
                <view class="receipt-title">{{item.projectName}}</view>
                <view>{{`${$dict.dictAllName(item.propertyType, 'Property')}-${item.buyUnit}-${item.roomNumberName}`}}</view>
              </view>
              <view>{{item.explain}}</view>
            </view>
          </view>
          <view
            class="ih-card-foot"
            slot="foot"
          >
            <view class="font-text">
              <text v-show="item.notificationStatus === 'WaitBeSigned'">您有一份协议待签署，请尽快处理</text> 
            </view>
            <u-button
              class="home-button"
              throttle-time="500"
              shape="circle"
              type="primary"
              size="medium"
              @click="routerTo(item.noticeId)"
            >查看</u-button>
          </view>
        </u-card>
      </view>
    </CustomerTabBar>
  </view>
</template>

<script>
import { postWechatNoticeListApi } from "../../api/customer";
import storageTool from "../../common/storageTool";
export default {
  name: "PageingSearch",
  components: {},
  data() {
    return {
      info: [],
      show: false,
    };
  },
  onLoad() {
    this.getInfo();
  },
  onShow() {},
  methods: {
    async getInfo() {
      const userInfo = storageTool.getUserInfo();
      this.info = await postWechatNoticeListApi({
        ownerMobile: userInfo.mobilePhone,
      })
      console.log(this.info);
    },
    routerTo(id) {
      console.log(id);
      uni.navigateTo({
        url: `/customerPackage/discountsInfo/index?id=${id}`,
      });
      // switch (val.id) {
      //   case 1:
      //     uni.navigateTo({
      //       url: `/pages/search/index/index?api=postdevepolersApi`,
      //       // url: `/pages/search/index/index?api=postUsersApi`,
      //     });
      //     break;
      //   case 2:
      //     uni.navigateTo({
      //       url: `/customerPackage/createDiscounts/index?id=${val.id}`,
      //     });
      //     break;
      //   case 3:
      //     uni.navigateTo({
      //       url: `/customerPackage/createRefund/index?id=${val.id}`,
      //     });
      //     break;
    }
  },
}
</script>

<style lang="scss" scoped>
.box {
  overflow: hidden;
  min-height: 100vh;
  background-color: #f1f1f1;
}
.ih-card {
  &-content {
    display: flex;
    justify-content: space-between;
  }
  .receipt-title {
    font-weight: bold;
    font-size: 40rpx;
    margin-bottom: 10rpx;
  }
  &-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .font-text {
    color: $u-type-error;
  }
}
.home-button {
  /deep/ .u-btn {
    padding: 0 50rpx;
    height: 60rpx;
    line-height: 60rpx;
  }
}
</style>