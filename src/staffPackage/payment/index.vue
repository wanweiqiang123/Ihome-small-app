<!--
 * @Description: 结佣付款列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 16:09:28
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-30 19:28:11
-->
<template>
  <view class="payment safe-area-inset-bottom">
    <view class="payment-search">
      <u-search
        style="flex: 1"
        :show-action="false"
        bg-color="#fff"
        placeholder="日照香炉生紫烟"
        v-model="keyword"
        :clearabled="true"
        height="72"
        border-color="#DCDCDC"
      ></u-search>
      <view
        class="filter-btn"
        @click="isShow = true"
      >
        <text>筛选</text>
      </view>
    </view>
    <view class="payment-list">
      <u-card
        :border="false"
        :foot-border-top="false"
        padding="15"
        margin="20rpx 30rpx"
        :foot-style="{paddingTop: '0'}"
        class="ih-card"
        border-radius="4"
        v-for="i in 8"
        :key="i"
        @click="handleGoInfo()"
      >
        <view slot="head">
          <view class="item-title">
            <text class="title-text">付款申请单号：CJ38135843321</text>
            <text :class="['title-icon', {'bg-warning': i == 1}]">已通过</text>
            <!-- <text class="title-icon bg-warning">已通过</text> -->
          </view>
        </view>
        <view
          slot="body"
          class="ih-card-content"
        >
          <view>渠道公司：XXX公司</view>
          <view>申请佣金：1000.00</view>
          <view>扣除金额：100.00</view>
          <view>实结佣金：900.00</view>
          <view>发起人：陈案场(员工)</view>
          <view>申请时间：2020-11-24 16:09:28</view>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <view>详情
            <u-icon
              name="arrow-right"
              size="28"
            ></u-icon>
          </view>
        </view>
      </u-card>
    </view>
    <view class="payment-btn safe-area-inset-bottom">
      <u-button
        shape="circle"
        type="primary"
        @click="handleGoto()"
      >发起付款申请</u-button>
    </view>
    <!-- 筛选弹出 -->
    <PopupSearch
      v-model="isShow"
      @reset="handleReset()"
    >
      <u-form
        :model="form"
        ref="form"
        label-position="top"
        :border-bottom="false"
      >
        <u-form-item
          label="渠道公司"
          prop="name"
          :border-bottom="false"
        >
          <u-input
            v-model="form.name"
            border
            placeholder="请选择渠道公司"
            type="select"
          />
        </u-form-item>
        <u-form-item
          label="发起人姓名"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            border
            placeholder="请输入发起人姓名"
          />
        </u-form-item>
        <u-form-item
          label="状态"
          prop="intro"
          :border-bottom="false"
        >
          <IhCheckbox
            :data="checkList"
            v-model="form.value"
          ></IhCheckbox>
        </u-form-item>
      </u-form>
    </PopupSearch>
  </view>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
import IhCheckbox from "../../components/IhCheckbox/index.vue";
export default {
  name: "payment",
  components: {
    PopupSearch,
    IhCheckbox,
  },
  data() {
    return {
      keyword: null,
      isShow: false,
      form: {},
      checkList: [
        {
          name: "平台文员审核中",
          value: 1,
        },
        {
          name: "一线审核中",
          value: 2,
        },
        {
          name: "业管审核中",
          value: 3,
        },
      ],
    };
  },
  methods: {
    handleGoto() {
      uni.navigateTo({
        url: "/staffPackage/paymentAdd/index",
      });
    },
    handleGoInfo() {
      uni.navigateTo({
        url: "/staffPackage/paymentInfo/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.payment {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-search {
    position: fixed;
    display: flex;
    align-items: center;
    padding: 10rpx 0 8rpx 30rpx;
    background: $u-bg-color;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .filter-btn {
    padding: 0 44rpx 0 47rpx;
    margin-left: 16rpx;
    width: 150rpx;
    line-height: 71rpx;
    background: #fcd639;
    color: #fff;
    border-radius: 50rpx 0 0 50rpx;
    font-size: 30rpx;
  }
  &-list {
    padding-top: 70rpx;
    padding-bottom: 90rpx;
  }
  &-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90rpx;
    box-sizing: content-box;
    padding-top: 10rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    background: #fff;
    z-index: 100;
  }
}
.ih-card {
  &-content {
    line-height: 42rpx;
    color: #606266;
    font-size: 26rpx;
  }
  &-foot {
    text-align: right;
    line-height: 40rpx;
  }
  .item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-icon {
      padding: 5rpx 10rpx;
      border-radius: 4rpx;
      color: #fff;
      white-space: nowrap;
      background: #18b566;
      box-sizing: border-box;
      font-size: 26rpx;
      line-height: 1;
      &.bg-warning {
        background: #eb7734;
      }
    }
    .title-text {
      white-space: nowrap;
      font-weight: bold;
      font-size: 30rpx;
      font-weight: 600;
      line-height: 48rpx;
    }
  }
}
</style>
