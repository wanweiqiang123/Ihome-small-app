/*
 * @Descripttion: 三种用户的切换用户处理逻辑
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-09 15:59:32
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-16 10:46:23
 */
import storageTool from "../common/storageTool";
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
    }

}