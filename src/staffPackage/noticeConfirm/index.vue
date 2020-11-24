<!--
 * @Description: 确认优惠告知书
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 17:32:25
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-24 09:25:09
-->
<template>
  <view class="notice">
    <view class="notice-info">
      <view class="title u-border-bottom">
        <u-image
          width="80rpx"
          height="80rpx"
          src="https://cdn.uviewui.com/uview/example/fade.jpg"
          shape="circle"
        ></u-image>
        <text class="title-text">优惠信息</text>
      </view>
      <view class="info">
        <text>项目名称</text>
        <text class="info-content">保利大都会</text>
      </view>
      <view class="info">
        <text>优惠方式</text>
        <text class="info-content">5万抵10万优惠折扣</text>
      </view>
      <view class="info">
        <text>服务费金额</text>
        <text class="info-content">¥50000.00</text>
      </view>
    </view>
    <view class="form-content">
      <view class="form-color">
        <u-form
          :model="form"
          ref="uForm"
          label-width="150"
        >
          <u-form-item
            label="选择栋座"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              input-align="right"
              placeholder="请选择栋座"
            />
          </u-form-item>
          <u-form-item
            label="选择房号"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
              input-align="right"
              placeholder="请选择房号"
            />
          </u-form-item>
          <u-form-item label="业主姓名">
            <u-input
              v-model="form.sex"
              placeholder="请输入业主姓名"
            />
          </u-form-item>
          <u-form-item label="手机号码">
            <u-input
              v-model="form.sex"
              placeholder="请输入手机号码"
            />
          </u-form-item>
          <u-form-item label="身份证号">
            <u-input
              v-model="form.sex"
              placeholder="请输入身份证号"
            />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="btn-container safe-area-inset-bottom">
      <u-button
        size="default"
        type="primary"
        shape="circle"
      >确认</u-button>
    </view>
  </view>
</template>

<script>
export default {
  name: "notice-confirm",
  data() {
    return {
      form: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.notice {
  background-color: $u-bg-color;
  height: 100vh;
}
.notice-info {
  padding: 20rpx 30rpx 40rpx;
  background: #fff;
  .info {
    display: flex;
    justify-content: space-between;
    line-height: 60rpx;
    &-content {
      color: $u-type-info;
    }
  }
  .title {
    padding: 30rpx 0;
    margin-bottom: 20rpx;
    font-size: 40rpx;
    font-weight: bold;
    display: flex;
    align-items: center;
    &-text {
      margin-left: 20rpx;
    }
  }
}
.form-content {
  padding: 20rpx 30rpx 0;
  .form-color {
    background: #fff;
  }
}
.btn-container {
  position: fixed;
  bottom: 6rpx;
  left: 0;
  right: 0;
  z-index: 10;
  padding-top: 10rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background: #fff;
}
</style>
<style lang="scss">
.form-color {
  .u-form-item {
    padding-left: 20rpx !important;
    padding-right: 20rpx !important;
  }
}
</style>
