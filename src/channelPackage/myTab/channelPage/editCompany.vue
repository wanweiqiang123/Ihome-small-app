<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 15:36:22
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-16 19:22:13
-->
<template>
  <view class="edit-company-wrapper">
    <u-form :model="paymentForm" ref="paymentForm" :label-width="210">
      <view class="info-item">
        <view class="form-title u-border-bottom">公司基本信息</view>
        <u-form-item label="信用代码" required prop="creditCode">
          <u-input v-model="paymentForm.creditCode" maxlength="18" :clearable="true" placeholder="请输入信用代码"/>
        </u-form-item>
        <u-form-item label="公司简称" required prop="shortName">
          <u-input v-model="paymentForm.shortName" :clearable="true" placeholder="请输入公司简称"/>
        </u-form-item>
        <u-form-item label="公司类型" right-icon="arrow-right" class="hide-icon" required prop="typeName">
          <u-input
            @click="showCompanyType = true"
            v-model="paymentForm.typeName" type="select"
            placeholder="公司类型" disabled :clearable="true" input-align="left" />
        </u-form-item>
        <u-form-item label="法定代表人" required prop="legalPerson">
          <u-input v-model="paymentForm.legalPerson" :clearable="true" placeholder="请输入法定代表人"/>
        </u-form-item>
        <u-form-item label="法人身份证号码" required prop="legalIdentityCode">
          <u-input v-model="paymentForm.legalIdentityCode" :clearable="true" placeholder="请输入法人身份证号码"/>
        </u-form-item>
        <u-form-item label="成立日期" class="hide-icon" right-icon="arrow-right" required prop="setupTime">
          <u-input
            v-model="paymentForm.setupTime"
            type="select"
            :clearable="true"
            @click="showTime = true"
            placeholder="请选择成立日期"/>
        </u-form-item>
        <u-form-item label="注册资本" required prop="capital">
          <u-input v-model="paymentForm.capital" :clearable="true" placeholder="请输入注册资本"/>
        </u-form-item>
        <u-form-item label="营业期限">
          <u-input v-model="paymentForm.businessTime" :clearable="true" placeholder="请输入营业期限"/>
        </u-form-item>
        <u-form-item label="地区" class="hide-icon" right-icon="arrow-right" required prop="region">
          <u-input
            v-model="paymentForm.region"
            type="select"
            :clearable="true"
            @click="showRegion = true"
            placeholder="请选择地区"/>
        </u-form-item>
        <u-form-item label="住所" required prop="address">
          <u-input v-model="paymentForm.address" :clearable="true" placeholder="请输入住所"/>
        </u-form-item>
      </view>
      <view class="info-item">
        <view class="form-title u-border-bottom">公司附件</view>
        <view class="annex-list-wrapper" v-for="item in annexList" :key="item.id">
          <view class="annex-type">
            <text v-if="item.subType === 'must'"
                  class="annex-required">*</text>
            {{item.name}}
          </view>
          <view class="upload-file-wrapper">
            <template v-if="item.fileList.length > 0">
              <view class="file-list-wrapper" v-for="list in item.fileList" :key="list.fileId">
                <u-icon
                  @click="deleteImg(infoIndex, list)"
                  class="icon" name="close-circle-fill" color="#FA3534" size="50"></u-icon>
                <u-image
                  @click="viewImg(list, item)"
                  width="100%" height="100%" :src="list.fileUrls ? list.fileUrls : getUrl(list.fileId)"></u-image>
              </view>
            </template>
            <view class="upload-icon" @click="uploadByType(item)">
              <u-icon name="plus" color="#606266" size="40"></u-icon>
              <view class="select">选择文件</view>
            </view>
          </view>
        </view>
      </view>
      <view class="info-item">
        <view class="form-title u-border-bottom">基本存款信息</view>
        <u-form-item label="账户名称" required prop="accountName">
          <u-input
            v-model="paymentForm.accountName"
            placeholder="账户名称" :clearable="true" input-align="left" />
        </u-form-item>
        <u-form-item label="开户银行" right-icon="arrow-right" class="hide-icon" required prop="branchName">
          <u-input
            @click="showBank = true"
            v-model="paymentForm.branchName" type="select"
            placeholder="开户银行" disabled :clearable="true" input-align="left" />
        </u-form-item>
        <u-form-item label="银行卡号" required prop="accountNo">
          <u-input
            v-model="paymentForm.accountNo"
            placeholder="银行卡号" :clearable="true" input-align="left"/>
        </u-form-item>
      </view>
    </u-form>
    <view class="btn">
      <u-button type="primary" @click="handleSave">保存</u-button>
    </view>
    <u-picker
      safe-area-inset-bottom
      @confirm="confirmDate"
      v-model="showTime"
      mode="time"
      :params="dateParams"></u-picker>
    <u-select
      safe-area-inset-bottom
      v-model="showRegion"
      mode="mutil-column-auto"
      :list="areaList"
      @confirm="confirmRegion"></u-select>
    <u-select
      safe-area-inset-bottom
      v-model="showCompanyType"
      :list="companyTypeList"
      @confirm="confirmCompanyType"></u-select>
    <u-action-sheet
      :safe-area-inset-bottom="true"
      :list="actionList"
      v-model="showActionShow"
      @click="handleUpload"></u-action-sheet>
    <u-popup
      safe-area-inset-bottom
      v-model="showBank" mode="right" length="100%">
      <view class="select-bank-list-wrapper">
        <view class="top-wrapper">
          <u-search
            class="search"
            shape="round"
            height="72"
            @change="changeSearch"
            @search="getBankList"
            placeholder-color="#BDBDBD"
            search-icon-color="#BDBDBD"
            bg-color="#FFFFFF"
            border-color="#DCDCDC"
            :show-action="false"
            placeholder="请输入开户银行名搜索"
            v-model="queryPageParameters.bankName"></u-search>
        </view>
        <scroll-view :scroll-top="0" scroll-y="true" class="scroll-y-wrapper" @scrolltolower="scrollLower">
          <view
            class="bank-item"
            v-for="(item, index) in bankList" :key="index"
            @click="handleSelectBank(item)">{{item.branchName}}</view>
          <u-divider v-if="isMore" :fontSize="30" :margin-top="30" half-width="100%">没有更多了</u-divider>
        </scroll-view>
      </view>
    </u-popup>
    <u-modal
      @confirm="handleDelete"
      @cancel="showDeleteWin = false"
      :mask-close-able="true"
      :show-cancel-button="true"
      v-model="showDeleteWin" content="您确定要删除此项吗？"></u-modal>
  </view>
</template>

<script>
import storageTool from "@/common/storageTool";
import {
  channelCheckSetupTime,
  getAreaList,
  getBankBranchList,
  getChannelInfo,
  getDictByType,
  editChannelInfo
} from "@/api/channel";
import {getAllByTypeApi} from "@/api";
import tool from "@/common/tool";
import {validIdentityCard} from "@/common/validate";

// 防抖
const debounce = (function () {
  let timer = null;
  return function (fn, interval) {
    clearTimeout(timer);
    timer = setTimeout(fn, interval || 200);
  };
})();

export default {
  data() {
    const validSetupTime = async (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择成立日期！'));
      } else {
        try {
          let flag = await channelCheckSetupTime({ setupTime: value });
          if (flag) {
            callback();
          } else {
            callback(new Error("成立时间必须大于三个月"));
          }
        } catch (error) {
          callback();
          console.log(error);
        }
      }
    };
    const validCreditCode = async (rule, value, callback) => {
      console.log('validCreditCode', value);
      if (!value) {
        callback(new Error('请输入信用代码！'));
      } else {
        let reg = /^[A-Za-z0-9]{18}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入18位正确的信用代码！'));
        } else {
          callback();
        }
      }
    };
    return {
      pdfImg: require('@/channelPackage/common/img/pdf.jpg'),
      excelImg: require('@/channelPackage/common/img/excel.png'),
      wordImg: require('@/channelPackage/common/img/word.jpg'),
      paymentForm: {
        id:'',
        name:'',
        creditCode:'',
        shortName:'',
        type:'',
        typeName:'',
        legalPerson:'',
        legalIdentityCode:'',
        setupTime:'',
        capital:'',
        businessTime:'',
        account:'',
        address:'',
        accountName: '',
        branchName: '',
        branchNo: '',
        accountNo: '',
        region: ''
      },
      rules: {
        creditCode: [
          { validator: validCreditCode, trigger: 'blur' },
        ],
        shortName: [
          { required: true, message: '请输入公司简称', trigger: 'blur' }
        ],
        typeName: [
          { required: true, message: '请选择公司类型', trigger: ['blur', 'change'] }
        ],
        legalPerson: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        legalIdentityCode: [
          { validator: validIdentityCard, trigger: 'blur' }
        ],
        setupTime: [
          { validator: validSetupTime, trigger: ['blur', 'change'] }
        ],
        capital: [
          { required: true, message: '请输入注册资本', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择地区', trigger: ['blur', 'change'] }
        ],
        address: [
          { required: true, message: '请输入住所', trigger: 'blur' }
        ],
        accountName: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
        ],
        branchName: [
          { required: true, message: '请选择开户银行', trigger: ['blur', 'change'] }
        ],
        accountNo: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ]
      },
      dateParams:  {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      },
      areaList: [], // 省市区
      showTime: false,
      showRegion: false,
      showBank: false,
      annexList: [],
      uploadHeader: {}, // 请求header
      uploadName: 'files', // 供后端取值用
      action: 'http://www.example.com/upload',
      fileList: [],
      queryPageParameters: {
        pageNum: 1,
        pageSize: 20,
        bankName: ''
      },
      bankList: [],
      isMore: false,
      showActionShow: false,
      actionList: [
        {
          text: '上传图片',
          color: '',
          fontSize: 30,
          subText: '大小不能超过10M'
        },
        {
          text: '上传文件',
          color: '',
          fontSize: 30,
          subText: 'pdf、word、excel文件，大小不能超过10M'
        }
      ],
      currentUploadType: '', // 上传的附件类型
      companyTypeList: [],
      showCompanyType: false, // 公司类型
      showDeleteWin: false,
      deleteIndex: null,
      deleteItem: null
    };
  },
  onReady() {
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    console.log(this.rules);
    this.$refs.paymentForm.setRules(this.rules);
  },
  async onLoad() {
    await this.getToken();
    await this.getArea();
    await this.getChannelAttachmentList();
    await this.getCompanyTypeList();
    await this.getBankList();
    this.userInfo = storageTool.getUserInfo();
    if (this.userInfo.channelId) {
      await this.init(this.userInfo.channelId);
    }
  },
  methods: {
    // 获取token
    getToken() {
      this.uploadHeader = {
        'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${storageTool.getToken()}`
      };
    },
    // 确定选择日期
    confirmDate(value) {
      // console.log(value);
      if (value) {
        this.paymentForm.setupTime = `${value.year}-${value.month}-${value.day}`
      }
    },
    // 确定选择地区
    confirmRegion(value) {
      // console.log(value);
      if (value && value.length > 0) {
        this.paymentForm.province = value[0].value;
        this.paymentForm.city = value[1].value;
        this.paymentForm.county = value[2].value;
        this.paymentForm.region = `${value[0].label}${value[1].label}${value[2].label}`;
      }
    },
    // 上传
    uploadByType(item) {
      this.currentUploadType = item.code;
      this.showActionShow = true;
    },
    // 上传选择
    handleUpload(index) {
      let self = this;
      if (index === 0) {
        uni.chooseImage({
          count: 9, // 默认9
          success: (res) => {
            console.log('chooseImage', res);
            if (res && res.tempFiles && res.tempFiles.length > 0) {
              let flag = false;
              flag = self.validFileSizeAndType(res.tempFiles, 'img');
              if (!flag) {
                tool.toast('图片大小不能超过10M!');
                return;
              }
              // 上传
              res.tempFilePaths.forEach((path) => {
                uni.uploadFile({
                  url: tool.getUploadUrl(),
                  filePath: path,
                  name: self.uploadName,
                  header: self.uploadHeader,
                  success: (res) => {
                    let data = JSON.parse(res.data);
                    // console.log('图片：', data);
                    self.annexList.forEach((item) => {
                      if (item.code === self.currentUploadType) {
                        item.fileList.push(
                          {
                            ...data.data[0],
                            fileUrls: '',
                            fileName: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                            fileType: data?.data[0]?.generateFileType,
                            name: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                          }
                        )
                      }
                    });
                  },
                  fail: (error) => {
                    tool.toast('上传失败，请重新上传' + error);
                    console.log(error);
                  }
                });
              });
            }
          }
        });
      } else {
        wx.chooseMessageFile({
          count: 9, // 最大可选
          type: 'file',
          success: (res) => {
            // console.log(res);
            if (res && res.tempFiles && res.tempFiles.length > 0) {
              let flag = false;
              flag = self.validFileSizeAndType(res.tempFiles, 'file');
              if (!flag) {
                tool.toast('请上传符合要求的文件！');
                return;
              }
              // 上传
              res.tempFiles.forEach((list) => {
                uni.uploadFile({
                  url: tool.getUploadUrl(),
                  filePath: list.path,
                  name: self.uploadName,
                  header: self.uploadHeader,
                  success: (res) => {
                    let data = JSON.parse(res.data);
                    // console.log('文件：', data);
                    self.annexList.forEach((item) => {
                      if (item.code === self.currentUploadType) {
                        item.fileList.push(
                          {
                            ...data.data[0],
                            fileUrls: self.getFileImg(data.data[0]),
                            fileName: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                            fileType: data?.data[0]?.generateFileType,
                            name: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                          }
                        )
                      }
                    });
                  },
                  fail: (error) => {
                    tool.toast('上传失败，请重新上传' + error);
                    console.log(error);
                  }
                });
              });
            }
          },
        })
      }
    },
    // 删除图片/文件
    deleteImg(index, item) {
      console.log(item);
      this.showDeleteWin = true;
      this.deleteIndex = index;
      this.deleteItem = item;
    },
    // 确定删除图片/文件
    handleDelete() {
      this.annexList[this.deleteIndex].fileList = this.annexList[this.deleteIndex].fileList.filter((list) => {
        return list.fileId !== this.deleteItem.fileId;
      });
      tool.toast('移除成功');
    },
    // 预览图片
    viewImg(file, item) {
      console.log(file);
      console.log(item);
      if (file.fileUrls) {
        // 说明是文件
        this.openFile(file);
      } else {
        // 图片
        let urls = [];
        let current = 0;
        if (item.fileList && item.fileList.length) {
          item.fileList.forEach((list) => {
            if (!list.fileUrls) {
              urls.push(tool.getFileUrl(list.fileId));
            }
          });
        }
        if (urls && urls.length) {
          urls.forEach((item, index) => {
            if (item === tool.getFileUrl(file.fileId)) {
              current = index;
            }
          });
        }
        uni.previewImage({
          urls: urls,
          current: current,
        });
      }
    },
    // 在线打开文件
    openFile(item) {
      if (!item.fileType) {
        uni.showToast({
          title: '无法打开该文档',
          duration: 3000
        });
        return ;
      }
      uni.downloadFile({
        url: tool.getFileDownloadUrl(item.fileId),
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('下载成功', res.tempFilePath);
            uni.openDocument({
              filePath: res.tempFilePath,
              fileType: item.fileType,
              showMenu: true,
              success: (res) => {
                console.log('打开文档成功');
              },
              fail: (err) => {
                console.log('打开文档出错', err);
                uni.showToast({
                  title: '无法打开该文档',
                  duration: 3000
                });
              }
            });
          }
        },
        fail: (err) => {
          console.log('下载出错', err);
          uni.showToast({
            title: '下载出错',
            duration: 3000
          });
        }
      });
    },
    // 校验上传的图片的大小和类型是否符合要求
    validFileSizeAndType(fileList = [], type = '') {
      if (fileList.length > 0) {
        const FILE_SIZE = 10 * 1024 * 1024; // 文件大小
        const RegStr = /.doc$|.docx$|.xls$|.xlsx$|.pdf$/i; // 上传文件的类型 --- 图片不校验类型
        let sizeList = [];
        let typeList = [];
        if (type === 'img') {
          // 校验图片
          sizeList = fileList.filter((list) => {
            return list.size > FILE_SIZE;
          });
          if (sizeList.length > 0) {
            return false;
          } else {
            return true;
          }
        } else {
          // 校验文件
          fileList.forEach((list) => {
            if (list.size > FILE_SIZE) {
              sizeList.push(list);
            }
            if (!RegStr.test(list.name)) {
              typeList.push(list);
            }
          })
          if (sizeList.length > 0 || typeList.length > 0) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        return false;
      }
    },
    // 获取文件的图片
    getFileImg(file) {
      let url = '';
      let pdfReg = /pdf/i;
      let wordReg = /doc|docx/i;
      let excelReg = /xls|xlsx/i;
      let fileTypes = '';
      if (pdfReg.test(file.generateFileType)) {
        fileTypes = 'pdf';
        url = this.pdfImg;
      }
      if (wordReg.test(file.generateFileType)) {
        fileTypes = 'word';
        url = this.wordImg;
      }
      if (excelReg.test(file.generateFileType)) {
        fileTypes = 'excel';
        url = this.excelImg;
      }
      return url;
    },
    // 确定选择公司类型
    confirmCompanyType(value) {
      // console.log(value);
      if (value && value.length > 0) {
        this.paymentForm.type = value[0].value;
        this.paymentForm.typeName = value[0].label;
      }
    },
    // 确定选择银行
    handleSelectBank(item) {
      // console.log(item);
      if (item.id) {
        this.paymentForm.branchName = item.bankName;
        this.paymentForm.branchNo = item.branchNo;
        this.showBank = false;
      }
    },
    // 搜索银行
    changeSearch(value) {
      this.isMore = false;
      this.queryPageParameters.pageNum = 1;
      this.queryPageParameters.pageSize = 10;
      if (!!(value.trim())) {
        debounce(this.getBankList, 500);
      } else {
        this.getBankList();
      }
    },
    // 获取银行列表
    async getBankList(type = '') {
      if (this.isMore) return;
      const list = await getBankBranchList(this.queryPageParameters);
      if (type === 'more') {
        // 上拉加载更多
        if (list && list.list.length > 0) {
          this.isMore = false;
          this.bankList.push(...list.list);
        } else {
          this.isMore = true;
        }
      } else {
        // 其他情况
        if (list && list.list.length > 0) {
          this.bankList = list.list;
        } else {
          this.bankList = [];
        }
      }
    },
    // 上拉加载
    scrollLower() {
      this.queryPageParameters.pageNum = this.queryPageParameters.pageNum + 1;
      this.getBankList('more');
    },
    // 初始化公司信息页面
    async init(id) {
      let info = await getChannelInfo(id);
      // console.log(info);
      this.paymentForm = info;
      if (info.channelPersons && info.channelPersons.length) {
        this.channelPersons = info.channelPersons[0];
      }
      // 附件类型
      if (this.annexList && this.annexList.length) {
        this.annexList.forEach((list) => {
          list.fileList = [];
          if (info && info.channelAttachments && info.channelAttachments.length) {
            info.channelAttachments.forEach((item) => {
              if (item.type === list.code) {
                list.fileList.push(
                  {
                    ...item,
                    fileUrls: this.getFileUrls(item, 'url'), // 获取对应文件的默认图片
                    fileType: this.getFileUrls(item, 'type'), // 获取文件类型：excel、word、pdf
                  }
                );
              }
            });
          }
        });
      }
      // 地区
      this.paymentForm.region = `${info.provinceName}${info.cityName}${info.countyName}`;
      // 账户信息
      if (info && info.channelBanks && info.channelBanks.length) {
        this.paymentForm.accountName = info.channelBanks[0].accountName;
        this.paymentForm.branchName = info.channelBanks[0].branchName;
        this.paymentForm.accountNo = info.channelBanks[0].accountNo;
        this.paymentForm.branchNo = info.channelBanks[0].branchNo;
      } else {
        this.paymentForm.accountName = null;
        this.paymentForm.branchName = null;
        this.paymentForm.accountNo = null;
        this.paymentForm.branchNo = null;
      }
      // console.log('123123123', this.annexList);
    },
    getFileUrls(file, getType = '') {
      let url = '';
      let type = '';
      if (file.fileId && file.fileName) {
        if (file.fileName.endsWith(".pdf")) {
          // pdf
          url = this.pdfImg;
          type = "pdf";
        } else if (file.fileName.endsWith(".doc")) {
          // word
          url = this.wordImg;
          type = "doc";
        } else if (file.fileName.endsWith(".docx")) {
          // word
          url = this.wordImg;
          type = "docx";
        } else if (file.fileName.endsWith(".xls")) {
          // excel
          url = this.excelImg;
          type = "xls";
        } else if (file.fileName.endsWith(".xlsx")) {
          // excel
          url = this.excelImg;
          type = "xlsx";
        } else {
          // 默认是图片
          url = "";
          type = "";
        }
      }
      if (getType === 'url') {
        // 返回默认文件图片
        return url;
      } else {
        // 返回文件类型
        return type
      }
    },
    // 保存
    async handleSave() {
      let self = this;
      let flag = false;
      // 校验附件是否有值
      console.log('self.annexList', self.annexList);
      flag = self.validAnnex(self.annexList);
      if (!flag) {
        tool.toast('请上传具体附件');
      }
      this.$refs.paymentForm.validate(valid => {
        if (valid && flag) {
          let postData = {
            name: self.paymentForm.name,
            creditCode: self.paymentForm.creditCode,
            address: self.paymentForm.address,
            businessTime: self.paymentForm.businessTime,
            capital: self.paymentForm.capital,
            city: self.paymentForm.city,
            county: self.paymentForm.county,
            id: self.paymentForm.id,
            legalIdentityCode: self.paymentForm.legalIdentityCode,
            legalPerson: self.paymentForm.legalPerson,
            shortName: self.paymentForm.shortName,
            province: self.paymentForm.province,
            setupTime: self.paymentForm.setupTime,
            type: self.paymentForm.type,
            channelAttachments: []
          }
          postData.channelBanks = [
            {
              accountName: self.paymentForm.accountName, // 账户名称
              accountNo: self.paymentForm.accountNo, // 账户号码
              branchName: self.paymentForm.branchName, // 开户银行
              branchNo: self.paymentForm.branchNo, // 开户银行
            }
          ];
          if (self.annexList && self.annexList.length > 0) {
            self.annexList.forEach((item) => {
              if (item.fileList.length) {
                item.fileList.forEach((list) => {
                  let obj = {
                    fileId: list.fileId,
                    fileName: `${list?.generateFileName}.${list?.generateFileType}`,
                    type: item.code,
                  };
                  postData.channelAttachments.push(obj);
                });
              }
            })
          }
          self.handleEdit(postData);
        } else {
          console.log('验证失败');
        }
      });
    },
    // 注册
    async handleEdit(data) {
      const info = await editChannelInfo(data);
      console.log(info);
      uni.showToast({
        icon: 'success',
        title: '修改成功'
      });
      uni.redirectTo({
        url: "/channelPackage/myTab/channelPage/companyInfo",
      });
    },
    // 校验附件
    validAnnex() {
      if (this.annexList && this.annexList.length > 0) {
        let flag = false;
        flag = this.annexList.some((item) => {
          return (item.subType === "must" && item.fileList.length === 0);
        });
        if (flag) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    // 获取附件类型
    async getChannelAttachmentList() {
      let postData = {
        type: "ChannelAttachment",
        valid: "Valid"
      }
      this.annexList = [];
      let list = await getAllByTypeApi(postData);
      if (list && list.length > 0) {
        list.forEach((item) => {
          this.$set(item, 'fileList', []);
        });
        this.annexList = list;
      }
    },
    // 获取省市区
    async getArea() {
      let list = await getAreaList();
      // console.log(list);
      let first = this.$u.deepClone(list[0]);
      list.splice(0, 1);
      list = list.map((v) => ({
        ...v,
        value: v.code,
        label: v.name,
      }));
      this.areaList = this.$tool.listToGruop(list, {
        rootId: first.code,
        children: "children",
        parentId: "parentCode",
        id: "value",
      });
    },
    // 获取公司类型
    async getCompanyTypeList() {
      let postData = {
        type: "ChannelCompanyType",
        valid: "Valid"
      }
      this.companyTypeList = [];
      let list = await getDictByType(postData);
      console.log(list);
      if (list && list.length) {
        list.forEach((item) => {
          let obj = {
            value: item.code,
            label: item.name
          }
          this.companyTypeList.push(obj);
        })
      } else {
        this.companyTypeList = [];
      }
    },
    // 获取图片完整的url
    getUrl(id) {
      if (!id) return "";
      let url = tool.getFileUrl(id);
      return url;
    }
  },
};
</script>

<style lang="scss" scoped>
  .edit-company-wrapper {
    width: 100%;
    background-color: #F1F1F1;
    padding: 30rpx;

    .info-item {
      background-color: #FFFFFF;

      &:not(:last-child) {
        margin-bottom: 30rpx;
      }

      .form-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 92rpx;
        padding: 0 20rpx;
        color: $u-type-primary;
      }

      .annex-list-wrapper {
        width: 100%;
        padding: 0rpx 20rpx 20rpx 20rpx;

        &:not(:last-child) {
          border-bottom: 1rpx solid #F1F1F1;
        }

        .annex-type {
          font-size: 30rpx;
          padding: 20rpx 0rpx 10rpx 0rpx;

          .annex-required {
            //position: absolute;
            //left: -16rpx;
            vertical-align: middle;
            color: #fa3534;
            padding-top: 6rpx;
          }
        }

        .upload-file-wrapper {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          .file-list-wrapper {
            width: 200rpx;
            height: 200rpx;
            margin: 4rpx;
            border-radius: 8rpx;
            position: relative;

            .icon {
              position: absolute;
              top: 4rpx;
              right: 4rpx;
              z-index: 10;
            }
          }

          .upload-icon {
            width: 200rpx;
            height: 200rpx;
            margin: 4rpx;
            border-radius: 8rpx;
            background: #f4f5f6;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .select {
              box-sizing: border-box;
              margin-top: 10rpx;
              font-size: 28rpx;
              color: #606266;
            }
          }
        }
      }
    }

    .btn {
      width: 100%;
      padding: 30rpx 50rpx;
      text-align: center;
    }
  }

  .select-bank-list-wrapper {
    width: 100%;

    .top-wrapper {
      width: 100%;
      height: 92rpx;
      box-sizing: border-box;
      padding: 10rpx 24rpx 10rpx 18rpx;
      display: flex;
      background-color: #EFEFF4;

      .search {
        flex: 1;
        height: 72rpx;
      }
    }

    .scroll-y-wrapper {
      width: 100%;
      height: calc(100vh - 105rpx);
    }

    .bank-item {
      padding: 30rpx 10rpx;
      text-align: left;
      border-bottom: 1rpx solid #CCCCCC;
    }
  }
</style>