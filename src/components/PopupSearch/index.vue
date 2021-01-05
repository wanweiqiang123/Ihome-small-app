<!--
 * @Description: 弹出层搜索
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-17 11:22:20
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-05 14:49:49
-->
<template>
  <u-popup
    :value="value"
    mode="right"
    :width="wdithCom"
    :mask="maskCom"
    close-icon-pos="top-left"
    closeable
    safe-area-inset-bottom
    @close="close"
  >
    <view class="ih-popup-bady">
      <scroll-view
        scroll-y="true"
        class="ih-popup-cantainer"
      >
        <view class="popup-content">
          <slot />
        </view>
      </scroll-view>
      <view class="popup-button">
        <u-button
          size="medium"
          shape="circle"
          @click="reset()"
        >重置</u-button>
        <u-button
          size="medium"
          type="primary"
          shape="circle"
          @click="confirm()"
        >确定</u-button>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: "PopupSearch",
  props: {
    value: {
      type: Boolean,
    },
    width: {
      type: String,
      default: "80%",
    },
    mask: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
    reset() {
      this.$emit("reset");
    },
    confirm() {
      this.close();
      this.$emit("confirm");
    },
  },
};
</script>

<style lang="scss">
.ih-popup-bady {
  padding-top: 80rpx;
  height: 100%;
  .ih-popup-cantainer {
    height: calc(100% - 114rpx);
    .popup-content {
      padding: 0 30rpx;
    }
  }
  .popup-button {
    padding: 14rpx 50rpx 20rpx;
    display: flex;
    justify-content: space-between;
    background: #fff;
  }
}
</style>
