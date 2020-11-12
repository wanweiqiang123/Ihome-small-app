<!--
 * @Descripttion: 客户模块的TabBar
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:53:18
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-12 11:01:36
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
  name: "CustomerTabBar",
  created() {},
  computed: {
    list() {
      let data = [
        {
          pagePath: "/customerPackage/homeTab/index",
          iconPath: "home",
          selectedIconPath: "home-fill",
          text: "我的购房优惠",
          count: 2,
          isDot: true,
          customIcon: false,
        },
        {
          pagePath: "/customerPackage/personalTab/index",
          iconPath: "photo",
          selectedIconPath: "photo-fill",
          text: "个人中心",
          customIcon: false,
        },
      ];
      return data;
    },
  },

  methods: {
    beforeSwitch(index) {
      let item = this.$store.getters.tabBarList[index];
      uni.redirectTo({
        url: item.pagePath,
      });
    },
  },
};
</script>