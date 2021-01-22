<!--
 * @Descripttion: 员工模块的TabBar
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:53:18
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-22 14:19:14
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
      active-color="#4881F9"
      nactive-color="#847E81"
    ></u-tabbar>
  </view>
</template>

<script>
let tablePage = [
  {
    pagePath: "/staffPackage/homeTab/index",
    iconPath: require("@/staffPackage/common/icon/tabicon/home.png"),
    selectedIconPath: require("@/staffPackage/common/icon/tabicon/homeactive.png"),
    text: "主页",
    // count: 2,
    // isDot: true,
    customIcon: false,
  },
  {
    pagePath: "/staffPackage/reportTab/index",
    iconPath: require("@/staffPackage/common/icon/tabicon/collect.png"),
    selectedIconPath: require("@/staffPackage/common/icon/tabicon/collectactive.png"),
    text: "报备汇总",
    customIcon: false,
  },
  {
    pagePath: "/staffPackage/personalTab/index",
    iconPath: require("@/staffPackage/common/icon/tabicon/me.png"),
    selectedIconPath: require("@/staffPackage/common/icon/tabicon/meactive.png"),
    text: "个人中心",
    // count: 23,
    // isDot: false,
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