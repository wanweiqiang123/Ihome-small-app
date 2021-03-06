/*
 * @Descripttion: 工具类
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-10 15:29:08
 * @LastEditors: zyc
 * @LastEditTime: 2021-03-04 11:44:22
 */
import { baseUrl, h5Url } from '../env-config'
const tool = {
    /**h5地址
     * @param {*} title
     * @return {*}
     */
    getH5Url(type, id) {
        let url = h5Url + `/sales-h5/${type}?id=${id}`
        return url;
    },
    /**生成二维码
     * @param {*} title
     * @return {*}
     */
    getQrcodeUrl() {
        let url = baseUrl + `/sales-api/sales-document-cover/file/qrcode`
        return url;
    },
    /**渠道商注册-下载模版-委托书
     * @param {*} title
     * @return {*}
     */
    getTemplateDocUrl() {
        let url = baseUrl + `/sales-api/sales-document-cover/static/channel/广州居恒销售系统授权确认函.docx`
        return url;
    },
    /**获取文件上传路径
     * @param {*} title
     * @return {*}
     */
    getUploadUrl() {
        let url = baseUrl + `/sales-api/sales-document-cover/file/upload`
        return url;
    },
    /**获取文件预览路径
   * @param {*} title
   * @return {*}
   */
    getFileUrl(fid) {
        let url = baseUrl + `/sales-api/sales-document-cover/file/browse/${fid}`
        return url;
    },
    /**获取文件下载路径
  * @param {*} title
  * @return {*}
  */
    getFileDownloadUrl(fid) {
        let url = baseUrl + `/sales-api/sales-document-cover/file/download/${fid}`
        return url;
    },
    /**弹出提示 uni.showToast   icon: "none"
     * @param {*} title
     * @return {*}
     */
    toast(titleOrObj) {
        function showModal(content) {
            wx.showModal({
                title: '提示',
                content: content,
                showCancel: false, //是否显示取消按钮-----false去掉取消按钮
                cancelText: "", //默认是“取消”
                cancelColor: '', //取消文字的颜色
                confirmText: "确定", //默认是“确定”
                confirmColor: '', //确定文字的颜色
                success: function (res) {
                }
            })
        }
        if (typeof titleOrObj == 'string') {
            if (titleOrObj && titleOrObj.length > 20) {
                showModal(titleOrObj);
            } else {
                uni.showToast({
                    title: titleOrObj,
                    icon: "none",
                    duration: 5000
                });
            }
        } else {
            console.error("类型有误");
            console.error(titleOrObj);
            titleOrObj.duration = 5000;
            uni.showToast(titleOrObj);
        }
    },
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
            uni.navigateBack(options);
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
    },

    /**加法-数组，多个相加
     * @param {*}
     * @return {*}
     */
    addArr(arr) {
        if (arr.length == 1) {
            return arr[0];
        } else if (arr.length == 2) {
            return this.add(arr[0], arr[1])
        } else if (arr.length == 0) {
            console.error('数组长度为0,返回0');
            return 0;
        } else {
            let total = 0;
            arr.forEach((item) => {
                total = this.add(total, this.add(0, item));
            });
            return total;
        }
    },
    /**除法
     * @param {number} num1
     * @param {number} num2
     * @return {*}
     */
    div(num1, num2) {
        let baseNum1 = 0, baseNum2 = 0;
        let baseNum3, baseNum4;
        try {
            let arr = num1.toString().split(".");
            if (arr.length <= 1) {
                baseNum1 = 0;
            } else {
                baseNum1 = arr[1].length;
            }
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length <= 1) {
                baseNum2 = 0;
            } else {
                baseNum2 = arr[1].length;
            }

        } catch (e) {
            baseNum2 = 0;
        }
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
    },
    /**乘法
     * @param {number} num1
     * @param {number} num2
     * @return {*}
     */
    multi(num1, num2) {
        let baseNum = 0;
        try {
            let arr = num1.toString().split(".");
            if (arr.length > 1) {
                baseNum += arr[1].length;
            }
        } catch (e) {
            console.error(e);
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length > 1) {
                baseNum += arr[1].length;
            }

        } catch (e) {
            console.error(e);
        }
        return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    },
    /**减法
     * @param {number} num1
     * @param {number} num2
     * @return {*}
     */
    sub(num1, num2) {
        let baseNum, baseNum1, baseNum2;
        let precision;// 精度
        try {
            let arr = num1.toString().split(".");
            if (arr.length <= 1) {
                baseNum1 = 0;
            } else {
                baseNum1 = arr[1].length;
            }

        } catch (e) {
            baseNum1 = 0;
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length <= 1) {
                baseNum2 = 0;
            } else {
                baseNum2 = arr[1].length;
            }
        } catch (e) {
            baseNum2 = 0;
        }

        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        let a = this.multi(num1, baseNum) - this.multi(num2, baseNum);
        let t = (this.div(a, baseNum)).toFixed(precision);
        return Number(t);
        
    },
    /**加法
    * @param {*}
    * @return {*}
    */
    add(num1, num2) {
        let baseNum, baseNum1, baseNum2;
        try {
            let arr = num1.toString().split(".");
            if (arr.length <= 1) {
                baseNum1 = 0;
            } else {
                baseNum1 = arr[1].length;
            }

        } catch (e) {
            baseNum1 = 0;
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length <= 1) {
                baseNum2 = 0;
            } else {
                baseNum2 = arr[1].length;
            }

        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        let b = (this.multi(num1, baseNum) + this.multi(num2, baseNum));
        let r = this.div(b, baseNum);
        return r;
    
    },

    /**四舍五入
     * @param {*} number
     * @param {*} n
     * @return {*}
     */
    tofixed(number, n = 2) {
        /* eslint-disable no-irregular-whitespace */
        let multipe = Math.pow(10, n); //把一个数放大10的次方倍
        if (!isNaN(number)) {
            number = Math.round(number * multipe);//四舍五入
            //处理小数点
            let numberArr = number.toString().split("");
            if (numberArr.length < n + 1) {//当数值小于1的时候的处理方法
                for (let i = 0; i <= n + 1 - numberArr.length; i++) {
                    numberArr.splice(0, 0, "0");
                }
            }
            let numberStr = numberArr.splice(numberArr.length - n, 0, ".");  //给一个放大后的数的字符串插入小数点
            numberStr = numberArr.join("");
            if (parseFloat(numberStr) > -1 && parseFloat(numberStr) < 0) {
                numberStr = parseFloat(numberStr).toFixed(n).toString()
            }
            return Number(numberStr);
        } else {
            throw ('tool.tofixed方法只能对数字使用')
        }
    },

};
export default tool;