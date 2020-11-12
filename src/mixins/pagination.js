/*
 * @Descripttion: 分页公共方法
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-11 16:41:45
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-12 17:00:00
 */
export default {
    data() {
        return {
            loadingStatus: "loading",//加载状态
            queryPageParameters: {
                "pageNum": 1,
                "pageSize": 10,
            },//查询条件
            tableTotal: null,//总数
            tablePage: [],//列表数据
        }
    },
    methods: {
        getListMixin() {
            console.error('请在页面中实现getListMixin方法');
        },
        /**api接口请求返回的数据，直接调用此方法完成页面数据逻辑
         * @param {*} total
         * @param {*} list
         * @return {*}
         */
        setPageDataMixin({ total, list }) {
            uni.stopPullDownRefresh();
            this.tableTotal = total;
            list.forEach((element) => {
                this.tablePage.push(element);
            });
            if (this.tableTotal <= this.tablePage.length) {
                this.loadingStatus = "nomore";
            } else {
                this.loadingStatus = "loading";
            }
        }
    },
    /**上拉加载
     * @param {*}
     * @return {*}
     */
    onReachBottom() {
        if (this.tableTotal <= this.tablePage.length) return;
        this.status = "loading";
        this.queryPageParameters.pageNum++;
        this.getListMixin();
    },
    /**下拉刷新（需要在pages.json中的style配置enablePullDownRefresh为true）
     * @param {*}
     * @return {*}
     */
    onPullDownRefresh() {
        this.queryPageParameters.pageNum = 1;
        this.status = "loading";
        this.tableTotal = null;
        this.tablePage = [];
        this.getListMixin();
    },
}