<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-05-11 09:36:35
 * @LastEditors: wwq
 * @LastEditTime: 2021-05-11 10:17:42
-->
<template>
  <view>
    <view class="imgView">
      <img
        class="img"
        :src="src"
        alt=""
      >
      <view
        class="margin"
        v-if="type === 'Stop'"
      >该优惠码还未生效哦</view>
      <view
        class="margin"
        v-if="type === 'Cancel'"
      >该优惠码已失效</view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      src: require("@/static/img/warning.png"),
      type: "",
    };
  },
  onLoad(options) {
    this.type = options.type;
  },
};
</script>
<style scoped lang="scss">
.imgView {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  .img {
    width: 100rpx;
    height: 100rpx;
  }
  .margin {
    margin-top: 20rpx;
  }
}
</style>