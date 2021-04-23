<!--
 * @Description:
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-09 14:31:14
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-31 11:23:16
-->
<script>
// const Raven = require("./common/raven");
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
    var self = this;
    console.log("App Launch");
    try {
      autoUpdate(this);
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

function autoUpdate(self) {
  try {
    let version = ""; //版本号
    try {
      version = wx.getAccountInfoSync().miniProgram.version;
      console.log("App Launch version:" + version);
    } catch (error) {}

    // 获取小程序更新机制兼容
    if (wx.canIUse("getUpdateManager")) {
      const updateManager = wx.getUpdateManager();
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //2. 小程序有新版本，则静默下载新版本，做好更新准备
          updateManager.onUpdateReady(function () {
            console.log(new Date());
            wx.showModal({
              title: "更新提示",
              content: "新版本" + version + "已经准备好，是否重启应用？",
              success: function (res) {
                if (res.confirm) {
                  //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                } else if (res.cancel) {
                  //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                  // wx.showModal({
                  //   title: "温馨提示~",
                  //   content:
                  //     "本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~",
                  //   success: function (res) {
                  //     self.autoUpdate();
                  //     return;
                  //     //第二次提示后，强制更新
                  //     if (res.confirm) {
                  //       // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  //       updateManager.applyUpdate();
                  //     } else if (res.cancel) {
                  //       //重新回到版本更新提示
                  //       self.autoUpdate();
                  //     }
                  //   },
                  // });
                }
              },
            });
          });
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: "已经有新版本了哟~",
              content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
            });
          });
        }
      });
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: "提示",
        content:
          "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
      });
    }
  } catch (error) {
    console.log("onLaunch update" + JSON.stringify(error));
  }
}
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