<!--
 * @Descripttion: 底部导航栏
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 15:20:30
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-02 17:40:27
-->
<template>
  <view>
    <view class="u-page">
      <slot />
    </view>
    <!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
    <u-tabbar
      v-model="current"
      :list="list"
      :before-switch="beforeSwitch"
    ></u-tabbar>
  </view>
</template>

<script>
export default {
  name: "TabBarPage",
  created() {
    console.log(this.$store.getters.tabBarList);
  },
  computed: {
    list() {
      return this.$store.getters.tabBarList;
    },
  },

  methods: {
    beforeSwitch(index) {
      console.log(index);
      let item = this.$store.getters.tabBarList[index];
      uni.navigateTo({
        url: item.pagePath,
      });
    },
  },
};
</script>