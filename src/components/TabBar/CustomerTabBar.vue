<!--
 * @Descripttion: 客户模块的TabBar
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:53:18
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-14 10:06:50
-->
<template>
  <view>
    <view class="u-page">
      <slot />
    </view>
    <!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
    <u-tabbar
      v-model="current"
      :list="tablePage"
      :before-switch="beforeSwitch"
    ></u-tabbar>
  </view>
</template>

<script>
let tablePage = [
  {
    pagePath: "/customerPackage/homeTab/index",
    iconPath: require("@/customerPackage/common/icon/tabicon/home.png"),
    selectedIconPath: require("@/customerPackage/common/icon/tabicon/homeactive.png"),
    text: "我的购房优惠",
    isDot: true,
    customIcon: false,
  },
  {
    pagePath: "/customerPackage/personalTab/index",
    iconPath: require("@/customerPackage/common/icon/tabicon/me.png"),
    selectedIconPath: require("@/customerPackage/common/icon/tabicon/meactive.png"),
    text: "个人中心",
    customIcon: false,
  },
];
export default {
  name: "CustomerTabBar",
  created() {},
  computed: {
    tablePage() {
      return tablePage;
    },
  },

  methods: {
    beforeSwitch(index) {
      let item = tablePage[index];
      uni.redirectTo({
        url: item.pagePath,
      });
    },
  },
};
</script>