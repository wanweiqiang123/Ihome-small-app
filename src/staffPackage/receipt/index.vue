<!--
 * @Description: 购房优惠收款
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 14:10:55
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-30 15:49:18
-->
<template>
  <view class="receipt safe-area-inset-bottom">
    <view class="item-list">
      <u-card
        :border="false"
        :show-head="false"
        :foot-border-top="false"
        padding="15"
        margin="20rpx 30rpx"
        :foot-style="{paddingTop: '0'}"
        class="ih-card"
        border-radius="4"
        v-for="i in 10"
        :key="i"
      >
        <view
          slot="body"
          class="ih-card-content"
        >
          <view>
            <view class="receipt-title">保利时光城</view>
            <view>住宅-3栋-1904号</view>
          </view>
          <view>五万抵十万优惠折扣</view>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <text class="font-text">客户尚未完成付款</text>
          <u-button
            size="mini"
            type="primary"
            shape="circle"
          >查看</u-button>
        </view>
      </u-card>
    </view>
    <!-- 筛选按钮 -->
    <view
      class="fliter"
      @click="isShow = true"
    >
      <view>筛选</view>
    </view>
    <!-- 筛选弹出层 -->
    <PopupSearch v-model="isShow">
      <u-form
        label-position="top"
        :border-bottom="false"
      >
        <u-form-item
          label="楼盘名称"
          prop="name"
          :border-bottom="false"
        >
          <u-input
            v-model="form.name"
            border
            placeholder="请输入楼盘名称"
          />
        </u-form-item>
        <u-form-item
          label="房号"
          prop="name"
          :border-bottom="false"
        >
          <u-input
            v-model="form.name"
            border
            placeholder="请输入房号"
          />
        </u-form-item>
        <u-form-item
          label="客户姓名"
          prop="name"
          :border-bottom="false"
        >
          <u-input
            v-model="form.name"
            border
            placeholder="请输入客户姓名"
          />
        </u-form-item>
        <u-form-item
          label="客户电话"
          prop="name"
          :border-bottom="false"
        >
          <u-input
            v-model="form.name"
            border
            placeholder="请输入客户电话"
          />
        </u-form-item>
      </u-form>
    </PopupSearch>
  </view>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
export default {
  name: "receipt",
  components: { PopupSearch },
  data() {
    return {
      isShow: false,
      form: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.receipt {
  background: $u-bg-color;
  min-height: 100vh;
}
.fliter {
  position: fixed;
  top: 20rpx;
  right: 0;
  z-index: 100;
  color: #fff;
  background: #f6d45b;
  width: 150rpx;
  line-height: 71rpx;
  border-radius: 50rpx 0 0 50rpx;
  padding: 0 44rpx 0 47rpx;
  font-size: 30rpx;
}
.item-list {
  padding-top: 1rpx;
  padding-bottom: 6rpx;
}
.ih-card {
  &-content {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    font-size: 26rpx;
  }
  .receipt-title {
    font-weight: bold;
    font-size: 32rpx;
    margin-bottom: 16rpx;
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
