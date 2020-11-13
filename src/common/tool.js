/*
 * @Descripttion: 工具类
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 15:29:08
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-13 15:07:30
 */

const tool = {
    /**页面返回事件，刷新列表
     * @param {*} options
     * @param {*} config config.page=指定页面（跨多个页面时指定）；config.data=数据；config.type=指定类型
     * @return {*}
     */
    back(options, config) {
        let pages = getCurrentPages();
        if (!config.page) {
            let lastPage = getCurrentPages()[pages.length - 2]; //当前页面
            config.page = lastPage.route;
        }
        getApp().globalData.refreshListData = config;
        if (options) {
            uni.navigateBack(p);
        } else {
            uni.navigateBack();
        }
    }
};
export default tool;