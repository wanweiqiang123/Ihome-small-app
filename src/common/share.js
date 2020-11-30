/*
 * @Descripttion: 全局默认转发
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-30 11:31:55
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-30 11:53:21
 */
export default {
    data() {
        return {
            //设置默认的分享参数
            //如果页面不设置share，就触发这个默认的分享
            share: {
                title: '居恒小程序',//不设置为主体名称
                path: "/pages/start",//不设置为转发时的路径
                imageUrl: "/static/logo.png",//不设置为转发时页面截图
                desc: '描述',
                content: '内容'
            }
        }
    },
    onShareAppMessage(res) {//分享到朋友
        if (res.from === "button") {
            // 来自页面内分享按钮
            console.log(res.target);
        } else if (res.from === "menu") {
            // 来自右上角分享按钮
        }
        return {
            title: this.share.title,
            path: this.share.path,
            imageUrl: this.share.imageUrl,
            desc: this.share.desc,
            content: this.share.content,
            success() {
                uni.showToast({
                    title: '分享成功'
                })
            },
            fail() {
                uni.showToast({
                    title: '分享失败',
                    icon: 'none'
                })
            }
        }
    },
    onShareTimeline(res) {//分享到朋友圈
        if (res.from === "button") {
            // 来自页面内分享按钮
            console.log(res.target);
        } else if (res.from === "menu") {
            // 来自右上角分享按钮
        }
        return {
            title: this.share.title,
            path: this.share.path,
            imageUrl: this.share.imageUrl,
            desc: this.share.desc,
            content: this.share.content,
            success() {
                uni.showToast({
                    title: '分享成功'
                })
            },
            fail() {
                uni.showToast({
                    title: '分享失败',
                    icon: 'none'
                })
            }
        }
    },
}