/*
 * @Descripttion: 三种用户的切换用户处理逻辑
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-09 15:59:32
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-16 10:46:23
 */
import storageTool from "../common/storageTool";
import tool from "../common/tool";
import { userSwitchApi, getUserInfoApi } from "../api/index";

export default {
    data() {
        return {
            qrcodeShow: __wxConfig.envVersion != 'release',
            userSwitchShow: false,
            userTypeList: [],
            isShow: false,
            tips: {
                text: "确定要退出当前账号？",
                color: "#909399",
            },
            list: [
                {
                    text: "退出登录",
                    color: "#fa3534",
                    fontSize: 28,
                },
            ],

            showSwitchUser: false,
            switchUseTips: {
                text: "请选择需要切换的用户",
                color: "#000",
            },
            switchList: [],
        }
    },
    methods: {
        //模拟二维码跳转
        qrcodeGoto() {
            uni.navigateTo({
                url: `/pages/qrcodeGo`,
            });

        },
        // 退出登录
        handleLoginOut() {
            this.isShow = true;
        },
        submit(index) {
            switch (index) {
                case 0:
                    storageTool.loginOut();
                    break;
            }
        },
        async submitSwitchUser(index) {
            let item = this.switchList[index];
            console.log(index, item);
            const res = await userSwitchApi({
                change_type: item.loginUserType,
                access_token: storageTool.getToken(),
            });
            console.log(res);

            storageTool.setToken(res.access_token, res.expires_in);
            const userInfo = await getUserInfoApi();
            storageTool.setUserInfo(userInfo);
            uni.showToast({
                title: "切换成功",
            });
            setTimeout(() => {
                storageTool.goHome();
            }, 500);
        },
        userSwitchClick() {
            let userInfo = storageTool.getUserInfo();
            let userTypeList = userInfo?.userTypeList || [];
            console.log(userTypeList);
            if (userTypeList && userTypeList.length > 0) {
                this.switchList = [];
                for (let index = 0; index < userTypeList.length; index++) {
                    const element = userTypeList[index];
                    let color =
                        userInfo.loginUserType == element.userType ? "#4881f9" : "#666";
                    let userTypeName =
                        userInfo.loginUserType == element.userType
                            ? element.userTypeName + " ✓"
                            : element.userTypeName;
                    this.switchList.push({
                        text: userTypeName,
                        color: color,
                        fontSize: 28,
                        loginUserType: element.userType,
                    });
                }

                this.showSwitchUser = true;
            } else {
                uni.showToast({
                    title: "暂无用户可切换",
                    icon: "none",
                });
            }
        },
        updateClick() {
            //更新版本
            let version = wx.getAccountInfoSync().miniProgram.version;
            wx.showModal({
                title: "是否检查更新？",
                content: `当前版本：${version}`,
                success(res) {
                    if (res.confirm) {
                        console.log('确定');
                        autoUpdate(this);
                    } else {
                        console.log('取消')
                    }
                },
            });
        },

    }

}

function autoUpdate(self) {
    try {
        let version = ""; //版本号
        try {
            version = wx.getAccountInfoSync().miniProgram.version;
            console.log("App Launch version:" + version);
        } catch (error) { }

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
                } else {
                    tool.toast('已是最新版本，无需更新');

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