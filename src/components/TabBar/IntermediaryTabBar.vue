<!--
 * @Descripttion: 中介渠道模块的TabBar
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:53:18
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-12 15:34:53
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
export default {
  name: "IntermediaryTabBar",
  created() {},
  data() {
    return {
      tablePage: [
        {
          pagePath: "/intermediaryPackage/homeTab/index",
          iconPath: "home",
          selectedIconPath: "home-fill",
          text: "首页",
          count: 2,
          isDot: true,
          customIcon: false,
        },
        {
          pagePath: "/intermediaryPackage/homeTab/index",
          iconPath: "photo",
          selectedIconPath: "photo-fill",
          text: "客户",
          customIcon: false,
        },

        {
          pagePath: "/intermediaryPackage/homeTab/index",
          iconPath: "play-right",
          selectedIconPath: "play-right-fill",
          text: "消息",
          customIcon: false,
        },
        {
          pagePath: "/intermediaryPackage/homeTab/index",
          iconPath: "account",
          selectedIconPath: "account-fill",
          text: "我的",
          count: 23,
          isDot: false,
          customIcon: false,
        },
      ],
    };
  },

  methods: {
    beforeSwitch(index) {
      let item = this.tablePage[index];
      uni.redirectTo({
        url: item.pagePath,
      });
    },
  },
};
</script>