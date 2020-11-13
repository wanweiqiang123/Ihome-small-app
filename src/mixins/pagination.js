/*
 * @Descripttion: 分页公共方法
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-11 16:41:45
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-13 15:06:13
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
        },
        /**初始化数据，重置初始化数据
         * @param {*}
         * @return {*}
         */
        initMIxin() {
            this.queryPageParameters.pageNum = 1;
            this.status = "loading";
            this.tableTotal = null;
            this.tablePage = [];
            this.getListMixin();
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
        this.initMIxin();
    },
    onShow() {
        // console.log("onShow-mixin");
        let refreshListData = getApp().globalData.refreshListData;
        if (!refreshListData) {
            return;
        }
        let { type, data } = refreshListData;
        if (type == 'add') {
            this.tablePage.unshift(data);
        } else if (type == 'update') {
            let i = null;
            for (let index = 0; index < this.tablePage.length; index++) {
                const element = this.tablePage[index];
                if (element.id == data.id) {
                    i = index;
                    break;
                }
            }
            if (i !== null) {
                Object.assign(this.tablePage[i], data);//更新数据
                // this.$set(this.tablePage, i, resetData);
            }

        } else if (type == 'init') {
            this.initMIxin();
        }
        else {
            console.error('未指定type值')
        }
        getApp().globalData.refreshListData = null;
    },
}