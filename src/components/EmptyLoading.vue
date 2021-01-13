<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-13 14:34:39
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-13 14:48:59
-->
<template>
  <view class="empty-loading">
    <u-empty v-if="total === 0" text="暂无数据" mode="list"></u-empty>
    <u-loading color="#4881f9" v-if="total === null" size="60"></u-loading>
  </view>
</template>

<script>
export default {
  name: "EmptyLoading",
  props: {
    total: {
      type: Number | null,
      default: () => null,
    },
  },
  data() {
    return {
      title: "",
    };
  },
  created() {
    console.log("total", this.total);
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.empty-loading{
    width: 100%;
    text-align: center;
}
</style>