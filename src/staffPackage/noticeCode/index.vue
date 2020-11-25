<!--
 * @Description: 查询购房优惠码
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 17:10:39
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-25 17:03:20
-->
<template>
  <view class="notice">
    <view class="notice-select">
      <u-cell-group>
        <u-cell-item
          title="项目周期"
          value="11"
          :arrow="true"
        ></u-cell-item>
      </u-cell-group>
    </view>
    <view class="notice-list">
      <u-card
        :border="false"
        :show-foot="false"
        class="ih-card"
        v-for="i in 3"
        :key="i"
        @click="handleCode(i)"
      >
        <view
          slot="head"
          class="ih-card-head"
        >
          <view>优惠套餐1</view>
          <view class="sub-title">查看优惠二维码
            <u-icon name="arrow-right" />
          </view>
        </view>
        <view
          slot="body"
          class="ih-card-content"
        >
          <view>优惠方式说明：五万抵十万</view>
          <view>需支付服务费：50000.00元</view>
        </view>
      </u-card>
    </view>
    <!-- 二维码弹出层 -->
    <u-popup
      v-model="isShow"
      mode="center"
      closeable
      width="600rpx"
      class="ih-popup"
    >
      <view>
        <view class="head">优惠二维码</view>
        <view class="code">
          <u-image
            width="100%"
            height="100%"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3101623223,11353193&fm=26&gp=0.jpg"
          ></u-image>
        </view>
        <view class="btn">
          <u-button type="primary">下载二维码</u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  name: "notice-code",
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    handleCode(i) {
      console.log(i);
      this.isShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-select {
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  &-list {
    padding-top: 100rpx;
    padding-bottom: 6rpx;
    .sub-title {
      color: $u-type-info;
    }
  }
}
.ih-card {
  &-content {
    line-height: 40rpx;
  }
  &-head {
    display: flex;
    justify-content: space-between;
  }
}
.ih-popup {
  .head {
    padding-left: 30rpx;
    line-height: 90rpx;
  }
  .code {
    background: #f1f1f1;
    width: 500rpx;
    height: 500rpx;
    margin: 0 auto 20rpx;
  }
  .btn {
    padding: 20rpx 30rpx;
  }
}
</style>
