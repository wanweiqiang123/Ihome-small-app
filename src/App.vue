<!--
 * @Description:
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:31:14
 * @LastEditors: zyc
 * @LastEditTime: 2021-03-31 11:23:16
-->
<script>
// const Raven = require("./common/raven");
import { autoUpdate } from "./common/autoUpdate";
export default {
  globalData: {
    initData: {
      areaAll: {}, //省市区数据
      dictAll: [], //字典数据
    }, //初始化数据是否完成参数
    paidData: {}, // 支付信息
    attestationInfo: {}, // 认证信息
    noticeInfo: {}, //优惠告知书签署预览信息
    searchParams: {
      isAddCustomer: false, // 是否显示添加客户按钮，默认false
      cssType: "", // 组件样式 - 可选
      searchTip: "", // 搜索框提示语 - 可选
      api: null, // 搜索的api
      key: null, // 搜索的关键字
      id: null, //  搜索的关键字id
      type: null, //  当页面出现多个分页搜索时区分标识
      other: {}, // 其他条件,如需过滤
    },
    refreshListData: null, //列表缓存页面刷新存放数据
    searchBackData: null, // 搜索返回数据
    bankTransferData: null, // 银行转账数据
    signMoreData: [], // 合并签署
    myReport: {}, //客户报备
    userType: null,
    webViewSrc: null,
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
    protocolAnnexList: [], // 中介渠道岗-分销协议-附件列表
  },
  onLaunch: function () {
    console.log("App Launch");
    try {
      autoUpdate(this,false);
    } catch (error) {}
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  onError(err) {
    console.error("onError");
    // Raven.captureException(err, {
    //   level: "error",
    // });
    console.error(err);
    this.$throw(err);
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