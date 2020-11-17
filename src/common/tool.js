/*
 * @Descripttion: 工具类
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 15:29:08
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-16 11:41:57
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
    },
    listToGruop(list, config) {
        const defaultConfig = {
            id: 'id',
            children: 'children',
            parentId: 'parentId',
            rootId: null
        }
        Object.assign(defaultConfig, config)
        let tree = [];
        let temp;
        for (let i = 0; i < list.length; i++) {
            if (list[i][defaultConfig.parentId] == defaultConfig.rootId) {
                let obj = list[i];
                temp = this.listToGruop(list, {
                    id: defaultConfig.id,
                    children: defaultConfig.children,
                    parentId: defaultConfig.parentId,
                    rootId: obj[defaultConfig.id],
                });
                if (temp.length > 0) {
                    obj[defaultConfig.children] = temp;
                }
                tree.push(obj);
            }
        }
        return tree;
    }
};
export default tool;