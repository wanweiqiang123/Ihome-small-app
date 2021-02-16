<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-16 10:38:21
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-16 11:57:36
-->
<template>
  <view class="page">
    <view style="color: #666" class="block"
      >此页面是模拟扫码跳转功能，在文本框中输入路径后跳转
    </view>
    <view class="block"> 路径格式：/xxx/xxx?id=xx&type=xxx </view>
    <view class="block"> 具体路径和参数key可以在开发者工具中复制或找前端 </view>
    <view class="block"> 具体参数值在数据库中查找或找后端 </view>
    <view class="block">
      <u-input
        v-model="url"
        type="textarea"
        :border="true"
        :height="200"
        placeholder="跳转路径"
      />
    </view>
    <view class="block">
      <u-button type="primary" @click="goto()">跳转</u-button>
    </view>
  </view>
</template>

<script>
import tool from "../common/tool";
export default {
  data() {
    return {
      title: "",
      url: null,
    };
  },
  onLoad() {},
  methods: {
    goto() {
      if (this.url && this.url.length > 0) {
        uni.navigateTo({
          url: this.url,
        });
      } else {
        tool.toast("请先输入路径");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  margin: 40rpx;
}
.block {
  margin: 40rpx;
  color: #999;
}
</style>