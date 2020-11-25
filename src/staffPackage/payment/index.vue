<!--
 * @Description: 结佣付款列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 16:09:28
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-25 18:03:13
-->
<template>
  <view class="payment safe-area-inset-bottom">
    <view class="payment-search">
      <u-search
        style="flex: 1"
        :show-action="false"
        placeholder="日照香炉生紫烟"
        v-model="keyword"
        :clearabled="true"
      ></u-search>
      <view class="filter-btn">
        <span @click="isShow = true">筛选</span>
      </view>
    </view>
    <view class="payment-list">
      <u-card
        :border="false"
        :show-head="false"
        class="ih-card"
        v-for="i in 8"
        :key="i"
      >
        <view
          slot="body"
          class="ih-card-content"
        >
          <view class="item-title">
            <text class="title-text">付款申请单号：CJ38135843321</text>
            <text class="title-icon">已通过</text>
            <!-- <text class="title-icon bg-warning">已通过</text> -->
            <view>详情
              <u-icon
                name="arrow-right"
                size="28"
              ></u-icon>
            </view>
          </view>
          <view>渠道公司：XXX公司</view>
          <view>申请佣金：1000.00</view>
          <view>扣除金额：100.00</view>
          <view>实结佣金：900.00</view>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <view>发起人：陈案场(员工)</view>
          <view>申请时间：2020-11-24 16:09:28</view>
        </view>
      </u-card>
    </view>
    <view class="payment-btn safe-area-inset-bottom">
      <u-button
        shape="circle"
        type="primary"
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
          <u-checkbox-group>
            <u-checkbox name="item">平台文员审核中</u-checkbox>
          </u-checkbox-group>
        </u-form-item>
      </u-form>
    </PopupSearch>
  </view>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
export default {
  name: "payment",
  components: {
    PopupSearch,
  },
  data() {
    return {
      keyword: null,
      isShow: false,
    };
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
    padding: 10rpx 12rpx;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .filter-btn {
    padding: 0 10rpx;
  }
  &-list {
    padding-top: 80rpx;
    padding-bottom: 102rpx;
  }
  &-btn {
    position: fixed;
    bottom: 6rpx;
    left: 0;
    right: 0;
    padding-top: 10rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    background: #fff;
    z-index: 100;
  }
}
.ih-card {
  &-content {
    line-height: 40rpx;
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
      padding: 6rpx;
      border-radius: 10rpx;
      color: #fff;
      white-space: nowrap;
      background: $u-type-success;
      box-sizing: border-box;
      font-size: 26rpx;
      line-height: 1;
      &.bg-warning {
        background: $u-type-warning;
      }
    }
    .title-text {
      white-space: nowrap;
      font-weight: bold;
    }
  }
}
</style>
