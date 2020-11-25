<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-24 18:03:00
-->
<template>
  <view>
    <CustomerTabBar>
      <u-card
        v-for="(item) in data"
        :key="item.id"
        class="cardMsg"
        :title="item.title"
        :sub-title="item.subTitle"
        :thumb="thumb"
      >
        <view slot="body">
          <view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
            <view>{{item.msg}}</view>
          </view>
        </view>
        <view
          class="cardfoot"
          slot="foot"
        >
          <span class="hint">您有一份协议待签署，请尽快处理</span>
          <u-button
            throttle-time="500"
            shape="circle"
            type="primary"
            size="default"
            @click="routerTo(item)"
          >{{item.button}}</u-button>
        </view>
      </u-card>
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

<style lang="scss">
.cardMsg {
  /deep/ .u-card__head--left__title {
    font-weight: bold;
    font-size: 18px !important;
  }
  .cardfoot {
    display: flex;
    justify-content: space-between;
    /deep/ .u-btn {
      font-size: 28rpx !important;
      height: 50rpx !important;
    }
    .hint {
      color: $u-type-error-dark;
    }
  }
}
</style>