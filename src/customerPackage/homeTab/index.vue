<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-16 16:23:40
-->
<template>
  <view>
    <CustomerTabBar>
      <u-card
        v-for="item in data"
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
          >查看</u-button>
        </view>
      </u-card>
    </CustomerTabBar>
    <PageingSearch ref="search" />
  </view>
</template>

<script>
import PageingSearch from "../../components/pagingSearch.vue";
export default {
  name: "PageingSearch",
  components: {
    PageingSearch,
  },
  data() {
    return {
      data: [
        {
          title: "保利时光城",
          subTitle: "五万抵十万优惠折扣",
          msg: "住宅-3栋-1904号",
          id: 1,
        },
        {
          title: "保利紫山",
          subTitle: "五万抵十万优惠折扣",
          msg: "住宅-2栋-1998号",
          id: 2,
        },
        {
          title: "保利天汇",
          subTitle: "五万抵十万优惠折扣",
          msg: "住宅-1栋-1xxx号",
          id: 3,
        },
        {
          title: "保利天汇",
          subTitle: "五万抵十万优惠折扣",
          msg: "住宅-1栋-1xxx号",
          id: 3,
        },
      ],
      show: false,
    };
  },
  onLoad() {},
  methods: {
    routerTo(val) {
      // uni.navigateTo({
      //   url: `/customerPackage/discountsInfo/index?id=${val.id}`,
      // });
      this.$refs.search.open();
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