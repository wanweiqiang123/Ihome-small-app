<!--
 * @Descripttion: 员工模块的TabBar
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:53:18
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-10 11:54:49
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
    pagePath: "/staffPackage/homeTab/index",
    iconPath: require("@/static/img/tabbar/homeindex.png"),
    selectedIconPath: require("@/static/img/tabbar/homeindexactive.png"),
    text: "主页",
    count: 2,
    isDot: true,
    customIcon: false,
  },
  {
    pagePath: "/staffPackage/reportTab/index",
    iconPath: require("@/static/img/tabbar/collect.png"),
    selectedIconPath: require("@/static/img/tabbar/collectactive.png"),
    text: "报备汇总",
    customIcon: false,
  },
  {
    pagePath: "/staffPackage/personalTab/index",
    iconPath: require("@/static/img/tabbar/my.png"),
    selectedIconPath: require("@/static/img/tabbar/myactive.png"),
    text: "个人中心",
    count: 23,
    isDot: false,
    customIcon: false,
  },
];
export default {
  name: "StaffTabBar",
  computed: {
    tablePage() {
      return tablePage;
    },
  },
  data() {
    return {};
  },
  created() {},
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