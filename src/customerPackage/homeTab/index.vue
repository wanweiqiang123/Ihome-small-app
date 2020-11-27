<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-27 16:33:52
-->
<template>
  <view>
    <CustomerTabBar>
      <view class="box">
        <u-card
          :border="false"
          v-for="item in data"
          :key="item.id"
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
                <view class="receipt-title">{{item.title}}</view>
                <view>{{item.msg}}</view>
              </view>
              <view>{{item.subTitle}}</view>
            </view>
          </view>
          <view
            class="ih-card-foot"
            slot="foot"
          >
            <span class="font-text">您有一份协议待签署，请尽快处理</span>
            <u-button
              throttle-time="500"
              shape="circle"
              type="primary"
              size="mini"
              @click="routerTo(item)"
            >{{item.button}}</u-button>
          </view>
        </u-card>
      </view>
    </CustomerTabBar>
  </view>
</template>

<script>
export default {
  name: "PageingSearch",
  components: {},
  data() {
    return {
      data: [
        {
          title: "保利时光城",
          subTitle: "五万抵十万优惠折扣",
          msg: "住宅-3栋-1904号",
          id: 1,
          button: "分页组件",
        },
        {
          title: "保利紫山",
          subTitle: "五万抵十万优惠折扣",
          msg: "住宅-2栋-1998号",
          id: 2,
          button: "生成优惠告知书",
        },
        {
          title: "保利天汇",
          subTitle: "五万抵十万优惠折扣",
          msg: "住宅-1栋-1xxx号",
          id: 3,
          button: "生成退款申请书",
        },
        {
          title: "保利天汇",
          subTitle: "五万抵十万优惠折扣",
          msg: "住宅-1栋-1xxx号",
          id: 4,
          button: "购房优惠详情",
        },
      ],
      show: false,
    };
  },
  onLoad() {},
  onShow() {
    let refreshListData = getApp().globalData.refreshListData;
  },
  methods: {
    routerTo(val) {
      switch (val.id) {
        case 1:
          uni.navigateTo({
            url: `/pages/search/index/index?api=postdevepolersApi`,
            // url: `/pages/search/index/index?api=postUsersApi`,
          });
          break;
        case 2:
          uni.navigateTo({
            url: `/customerPackage/createDiscounts/index?id=${val.id}`,
          });
          break;
        case 3:
          uni.navigateTo({
            url: `/customerPackage/createRefund/index?id=${val.id}`,
          });
          break;
        case 4:
          uni.navigateTo({
            url: `/customerPackage/discountsInfo/index?id=${val.id}`,
          });
          break;
      }
    },
  },
};
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
</style>