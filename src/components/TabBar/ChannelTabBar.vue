<!--
 * @Descripttion: 中介渠道模块的TabBar
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:53:18
<<<<<<< HEAD
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-01 14:51:55
=======
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-01 09:31:48
>>>>>>> f0673f0d494328b8a7d75c1782909b740244f191
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
    iconPath: require("@/channelPackage/common/icon/tabicon/home.png"),
    selectedIconPath: require("@/channelPackage/common/icon/tabicon/homeactive.png"),
    text: "首页",
    isDot: true,
    customIcon: false,
  },
  {
    pagePath: "/channelPackage/clientTab/index",
    iconPath: require("@/channelPackage/common/icon/tabicon/customer.png"),
    selectedIconPath: require("@/channelPackage/common/icon/tabicon/customeractive.png"),
    text: "客户",
    customIcon: false,
  },
  // {
  //   pagePath: "/channelPackage/messageTab/index",
  //   iconPath: require("@/channelPackage/common/icon/tabicon/msg.png"),
  //   selectedIconPath: require("@/channelPackage/common/icon/tabicon/msgactive.png"),
  //   count: 2,
  //   text: "消息",
  //   customIcon: false,
  // },
  {
    pagePath: "/channelPackage/myTab/index",
    iconPath: require("@/channelPackage/common/icon/tabicon/me.png"),
    selectedIconPath: require("@/channelPackage/common/icon/tabicon/meactive.png"),
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