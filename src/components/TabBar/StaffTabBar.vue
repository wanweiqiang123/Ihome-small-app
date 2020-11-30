<!--
 * @Descripttion: 员工模块的TabBar
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:53:18
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-30 09:14:05
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
    iconPath: "home",
    selectedIconPath: "home-fill",
    text: "主页",
    count: 2,
    isDot: true,
    customIcon: false,
  },
  {
    pagePath: "/staffPackage/reportTab/index",
    iconPath: "photo",
    selectedIconPath: "photo-fill",
    text: "报备汇总",
    customIcon: false,
  },
  {
    pagePath: "/staffPackage/personalTab/index",
    iconPath: "account",
    selectedIconPath: "account-fill",
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