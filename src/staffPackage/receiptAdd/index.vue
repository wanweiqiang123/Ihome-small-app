<!--
 * @Description: 添加收款记录
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-19 18:44:57
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-19 19:21:16
-->
<template>
  <view class="receipt">
    <view class="receipt-form">
      <view class="form-title u-border-bottom">收款信息</view>
      <u-form
        :model="form"
        ref="uForm"
        label-width="170"
      >
        <u-form-item label="收款金额">
          <u-input
            v-model="form.name"
            placeholder="请输入收款金额"
          />
        </u-form-item>
        <u-form-item
          label="收款日期"
          class="hide-icon"
          right-icon="arrow-right"
        >
          <u-input
            v-model="form.name"
            type="select"
            placeholder="选择日期"
            @click="isShow = true"
          />
        </u-form-item>
        <u-form-item
          label="收款方式"
          class="hide-icon"
          right-icon="arrow-right"
        >
          <u-input
            v-model="form.name"
            type="select"
            placeholder="选择收款方式"
          />
        </u-form-item>
      </u-form>
    </view>
    <u-button
      shape="circle"
      type="primary"
    >提 交</u-button>
    <!-- 选择器 -->
    <u-picker
      mode="time"
      v-model="isShow"
      safe-area-inset-bottom
      title="收款日期"
      :show-time-tag="false"
      :params="{
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      }"
      @confirm="timeConfirm"
    ></u-picker>
  </view>
</template>

<script>
export default {
  name: "receipt-add",
  data() {
    return {
      form: {
        name: "",
      },
      isShow: false,
    };
  },
  methods: {
    timeConfirm(val) {
      this.form.name = `${val.year}-${val.month}-${val.day}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.receipt {
  padding: 20rpx 30rpx 0;
}
.receipt-form {
  background: #fff;
  margin-bottom: 30rpx;
  .form-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92rpx;
    padding: 0 24rpx;
    color: $u-type-primary;
    font-family: "Source Han Sans CN";
  }
}
</style>
<style lang="scss">
page {
  background-color: $u-bg-color;
}
</style>
