<!--
 * @Descripttion: 中介渠道模块的TabBar
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:53:18
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-12 15:45:27
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
    pagePath: "/channelPackage/homeTab/index",
    iconPath: "home",
    selectedIconPath: "home-fill",
    text: "首页",
    isDot: true,
    customIcon: false,
  },
  {
    pagePath: "/channelPackage/clientTab/index",
    iconPath: "grid",
    selectedIconPath: "grid-fill",
    text: "客户",
    customIcon: false,
  },
  {
    pagePath: "/channelPackage/messageTab/index",
    iconPath: "chat",
    selectedIconPath: "chat-fill",
    count: 2,
    text: "消息",
    customIcon: false,
  },
  {
    pagePath: "/channelPackage/myTab/index",
    iconPath: "account",
    selectedIconPath: "account-fill",
    text: "我的",
    count: 0,
    isDot: false,
    customIcon: false,
  },
];
export default {
  name: "ChannelTabBar",
  created() {},
  computed: {
    tablePage() {
      return tablePage;
    },
  },
  data() {
    return {};
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