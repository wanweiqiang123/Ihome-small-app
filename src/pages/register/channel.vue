<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-10 10:42:47
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-10 11:03:48
-->
<template>
  <view> 渠道注册</view>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },

  onLoad(query) {
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(query.scene);
    console.log(scene);
  },
  methods: {},
};
</script>

<style lang="scss">
</style>