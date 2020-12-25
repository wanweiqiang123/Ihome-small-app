<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:31:14
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-25 10:53:08
-->
<script>
export default {
  globalData: {
    initData: {
      areaAll: {}, //省市区数据
      dictAll: [], //字典数据
    }, //初始化数据是否完成参数
    paidData: {},
    refreshListData: null, //列表缓存页面刷新存放数据
    userType: null,
    tabList: [
      {
        pagePath: "/pages/home/index/index",
        iconPath: "/static/img/tabbar/home.png",
        selectedIconPath: "/static/img/tabbar/homeactive.png",
        text: "首页",
      },
      {
        pagePath: "/pages/customer/index/index",
        iconPath: "/static/img/tabbar/guanzhu.png",
        selectedIconPath: "/static/img/tabbar/guanzhuactive.png",
        text: "客户",
      },
    ],
  },
  onLaunch: function () {
    console.log("App Launch");
    console.log("envVersion", __wxConfig.envVersion);
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */

/* 下拉框隐藏默认图标 */
.hide-icon >>> .u-input__right-icon {
  display: none;
}
</style>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
</style>