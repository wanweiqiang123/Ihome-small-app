/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-11 16:41:45
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-11 17:35:20
 */
export default {
    data() {
        return {
            queryPageParameters: {
                "pageNum": 1,
                "pageSize": 10,
            },
            resPageInfo: {
                total: null,
                list: []
            }
        }
    },
    methods: {
        getListMixin() {
            console.error('请在页面中实现getListMixin方法');

        }
    },
    onReachBottom() {
        console.log("上拉加载onReachBottom");
        this.getListMixin();
    },
    onPullDownRefresh() {
        console.log("下拉刷新onPullDownRefresh");
    }
}