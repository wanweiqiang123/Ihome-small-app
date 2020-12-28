<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-12 11:25:11
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-12 13:15:25
-->
<template>
  <view class="company-info-wrapper">
    <view class="info-content-wrapper">
      <u-form
        :model="companyForm"
        ref="companyForm"
        label-width="210">
        <view class="info-item">
          <view class="form-title u-border-bottom">公司基本信息</view>
          <u-form-item label="公司简称" required prop="shortName">
            <u-input v-model="companyForm.shortName" :clearable="true" placeholder="请输入公司简称"/>
          </u-form-item>
          <u-form-item label="公司类型" required prop="type">
            <u-input v-model="companyForm.type" :clearable="true" placeholder="请输入公司类型"/>
          </u-form-item>
          <u-form-item label="法定代表人" required prop="legalPerson">
            <u-input v-model="companyForm.legalPerson" :clearable="true" placeholder="请输入法定代表人"/>
          </u-form-item>
          <u-form-item label="法人身份证号码" required prop="legalIdentityCode">
            <u-input v-model="companyForm.legalIdentityCode" :clearable="true" placeholder="请输入法人身份证号码"/>
          </u-form-item>
          <u-form-item label="成立日期" class="hide-icon" right-icon="arrow-right" required prop="setupTime">
            <u-input
              v-model="companyForm.setupTime"
              type="select"
              :clearable="true"
              @click="showDate = true"
              placeholder="请选择成立日期"/>
          </u-form-item>
          <u-form-item label="注册资本" required prop="capital">
            <u-input v-model="companyForm.capital" :clearable="true" placeholder="请输入注册资本"/>
          </u-form-item>
          <u-form-item label="营业期限">
            <u-input v-model="companyForm.businessTime" :clearable="true" placeholder="请输入营业期限"/>
          </u-form-item>
          <u-form-item label="地区" class="hide-icon" right-icon="arrow-right" required prop="region">
            <u-input
              v-model="companyForm.region"
              type="select"
              :clearable="true"
              @click="showRegion = true"
              placeholder="请选择地区"/>
          </u-form-item>
          <u-form-item label="住所" required prop="address">
            <u-input v-model="companyForm.address" :clearable="true" placeholder="请输入住所"/>
          </u-form-item>
        </view>
        <u-gap height="30" bg-color="#F1F1F1"></u-gap>
        <view class="info-item">
          <view class="form-title u-border-bottom">公司附件</view>
          <view class="annex-list-wrapper" v-for="(item, infoIndex) in annexInfo" :key="item.id">
            <view class="annex-type">
              <text v-if="item.subType === 'must'"
                    class="annex-required">*</text>
              {{item.name}}
            </view>
            <view class="upload-file-wrapper">
              <view v-if="item.fileList.length > 0">
                <view class="file-list-wrapper" v-for="list in item.fileList" :key="list.fileId">
                  <u-icon
                    @click="deleteImg(infoIndex, list)"
                    class="icon" name="close-circle-fill" color="#FA3534" size="50"></u-icon>
                  <u-image
                    @click="viewImg(list)"
                    width="100%" height="100%" :src="list.fileUrls ? list.fileUrls : getImgUrl(list.fileId)"></u-image>
                </view>
              </view>
              <view class="upload-icon" @click="uploadByType(item)">
                <u-icon name="plus" color="#606266" size="40"></u-icon>
                <view class="select">选择文件</view>
              </view>
            </view>
          </view>
        </view>
        <u-gap height="30" bg-color="#F1F1F1"></u-gap>
        <view class="info-item">
          <view class="form-title u-border-bottom">基本存款账号信息</view>
          <u-form-item label="账户名称" required prop="accountName">
            <u-input
              v-model="companyForm.accountName"
              placeholder="账户名称" :clearable="true" input-align="left" />
          </u-form-item>
          <u-form-item label="开户银行" right-icon="arrow-right" class="hide-icon" required prop="branchName">
            <u-input
              @click="showBank = true"
              v-model="companyForm.branchName" type="select"
              placeholder="开户银行" disabled :clearable="true" input-align="left" />
          </u-form-item>
          <u-form-item label="银行卡号" required prop="accountNo">
            <u-input
              v-model="companyForm.accountNo"
              placeholder="银行卡号" :clearable="true" input-align="left"/>
          </u-form-item>
        </view>
      </u-form>
    </view>
    <u-gap height="50" bg-color="#F1F1F1"></u-gap>
    <view class="btn">
      <u-button type="primary" @click="handleSave">保存并注册</u-button>
    </view>
    <u-picker
      @confirm="confirmDate"
      v-model="showDate"
      mode="time"
      :params="dateParams"></u-picker>
    <u-select
      v-model="showRegion"
      mode="mutil-column-auto"
      :list="areaList"
      @confirm="confirmRegion"></u-select>
    <u-action-sheet
      :safe-area-inset-bottom="true"
      :list="actionList"
      v-model="showActionShow"
      @click="handleUpload"></u-action-sheet>
    <u-popup v-model="showBank" mode="right" length="100%">
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
            @click="handleSelectBank(item)">{{item.bankName}}</view>
          <u-divider v-if="isMore" :fontSize="30" :margin-top="30" half-width="100%">没有更多了</u-divider>
        </scroll-view>
      </view>
    </u-popup>
    <u-modal
      @confirm="handleDelete"
      v-model="showDeleteWin" :content="content"></u-modal>
  </view>
</template>

<script>
import { getAreaList, getChannelAttachment, getBankBranchList, channelRegister } from '@/api/channel';
import { validIdentityCard } from '@/common/validate';
import { getTempToken, getImgUrl } from '@/api/channel';
import { currentEnvConfig } from '@/env-config';

// 防抖
const debounce = (function () {
  let timer = null;
  return function (fn, interval) {
    clearTimeout(timer);
    timer = setTimeout(fn, interval || 200);
  };
})();

export default {
  props: {
    baseForm: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      pdfImg: require('@/channelPackage/common/img/pdf.jpg'),
      excelImg: require('@/channelPackage/common/img/excel.png'),
      wordImg: require('@/channelPackage/common/img/word.jpg'),
      getImgUrl: getImgUrl,
      areaList: [], // 省市区
      companyForm: {
        shortName: null,
        type: null,
        legalPerson: null,
        legalIdentityCode: null,
        setupTime: null,
        capital: null,
        businessTime: null,
        region: null,
        province: null,
        city: null,
        county: null,
        address: null,
        accountName: null,
        branchName: null,
        accountNo: null,
        channelAttachments: [
          {
            fileId: null,
            fileName: null,
            type: null
          }
        ] // 附件信息
      },
      rules: {
        shortName: [
          { required: true, message: '请输入公司简称', trigger: ['blur'] }
        ],
        type: [
          { required: true, message: '请输入公司类型', trigger: ['blur'] }
        ],
        legalPerson: [
          { required: true, message: '请输入法定代表人', trigger: ['blur'] }
        ],
        legalIdentityCode: [
          { validator: validIdentityCard, trigger: ['blur'] }
        ],
        setupTime: [
          { required: true, message: '请选择成立日期', trigger: ['blur'] }
        ],
        capital: [
          { required: true, message: '请输入注册资本', trigger: ['blur'] }
        ],
        region: [
          { required: true, message: '请选择地区', trigger: ['blur'] }
        ],
        address: [
          { required: true, message: '请输入住所', trigger: ['blur'] }
        ],
        accountName: [
          { required: true, message: '请输入账户名称', trigger: ['blur'] }
        ],
        branchName: [
          { required: true, message: '请选择开户银行', trigger: ['blur'] }
        ],
        accountNo: [
          { required: true, message: '请输入银行卡号', trigger: ['blur'] }
        ]
      },
      annexInfo: [],
      imgUrl:`${currentEnvConfig['protocol']}://${currentEnvConfig['apiDomain']}/sales-api/sales-document-cover/file/browse/`,
      uploadAction: `${currentEnvConfig['protocol']}://${currentEnvConfig['apiDomain']}/sales-api/sales-document-cover/file/upload`,
      uploadHeader: {}, // 请求header
      uploadName: 'files', // 供后端取值用
      fileList: [],
      showDate: false,
      dateParams:  {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      },
      showRegion: false,
      showBank: false,
      queryPageParameters: {
        pageNum: 1,
        pageSize: 10,
        bankName: null
      },
      bankList: [],
      tempToke: '',
      isMore: false,
      actionList: [
        {
          text: '上传图片',
          color: '',
          fontSize: 30,
          subText: ''
        },
        {
          text: '上传文件',
          color: '',
          fontSize: 30,
          subText: 'pdf、word、excel文件，大小不能超过10M'
        }
      ],
      currentUploadType: null, // 上传的附件类型
      showActionShow: false,
      showDeleteWin: false,
      deleteIndex: '',
      deleteItem: '',
    };
  },
  onReady() {
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    this.$refs.companyForm.setRules(this.rules);
  },
  async created() {
    // console.log('baseForm', this.baseForm);
    await this.getTempToken();
    await this.getArea();
    await this.getChannelAttachmentList();
    await this.getBankList();
  },
  methods: {
    // 上传
    uploadByType(item) {
      // console.log(item);
      this.currentUploadType = item.code;
      this.showActionShow = true;
    },
    // 上传选择
    handleUpload(index) {
      let self = this;
      if (index === 0) {
        console.log('上传图片');
        uni.chooseImage({
          count: 9, // 默认9
          success: (res) => {
            // console.log(res);
            if (res && res.tempFiles && res.tempFiles.length > 0) {
              let flag = false;
              flag = self.validFileSizeAndType(res.tempFiles, 'img');
              if (!flag) {
                uni.showToast({
                  icon: 'none',
                  title: '图片大小不能超过10M!',
                });
                return;
              }
              // 上传
              res.tempFilePaths.forEach((path) => {
                uni.uploadFile({
                  url: self.uploadAction, //仅为示例，非真实的接口地址
                  filePath: path,
                  name: self.uploadName,
                  header: self.uploadHeader,
                  success: (res) => {
                    let data = JSON.parse(res.data);
                    console.log('图片：', data);
                    self.annexInfo.forEach((item) => {
                      if (item.code === self.currentUploadType) {
                        item.fileList.push(
                          {
                            ...data[0],
                            fileUrls: ''
                          }
                        )
                      }
                    });
                  },
                  fail: (error) => {
                    console.log(error);
                  }
                });
              });
            }
          }
        });
      } else {
        console.log('上传文件');
        wx.chooseMessageFile({
          count: 10, // 最大可选
          type: 'file',
          success: (res) => {
            // tempFilePath可以作为img标签的src属性显示图片
            // console.log(res);
            if (res && res.tempFiles && res.tempFiles.length > 0) {
              let flag = false;
              flag = self.validFileSizeAndType(res.tempFiles, 'file');
              if (!flag) {
                uni.showToast({
                  icon: 'none',
                  title: '请上传符合要求的文件！',
                });
                return;
              }
              // 上传
              res.tempFiles.forEach((list) => {
                uni.uploadFile({
                  url: self.uploadAction, //仅为示例，非真实的接口地址
                  filePath: list.path,
                  name: self.uploadName,
                  header: self.uploadHeader,
                  success: (res) => {
                    let data = JSON.parse(res.data);
                    console.log('文件：', data);

                    self.annexInfo.forEach((item) => {
                      if (item.code === self.currentUploadType) {
                        item.fileList.push(
                          {
                            ...data[0],
                            fileUrls: self.getFileImg(list)
                          }
                        )
                      }
                    });
                  },
                  fail: (error) => {
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
      this.annexInfo[this.deleteIndex].fileList = this.annexInfo[this.deleteIndex].fileList.filter((list) => {
        return list.fileId !== this.deleteItem.fileId;
      });
      uni.showToast({
        icon: 'none',
        title: '移除成功',
      });
    },
    // 预览图片
    viewImg(file) {
      let url = '';
      if (file.fileUrls) {
        url = file.fileUrls;
      } else {
        url = getImgUrl(file.fileId);
      }
      uni.previewImage({
        urls: [url]
      })
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
      let pdfReg = /.pdf$/i;
      let wordReg = /.doc$|.docx$/i;
      let excelReg = /.xls$|.xlsx$/i;
      let fileTypes = '';
      if (pdfReg.test(file.name)) {
        fileTypes = 'pdf';
        url = this.pdfImg;
      }
      if (wordReg.test(file.name)) {
        fileTypes = 'word';
        url = this.wordImg;
      }
      if (excelReg.test(file.name)) {
        fileTypes = 'excel';
        url = this.excelImg;
      }
      return url;
    },
    // 获取临时token
    getTempToken() {
      let self = this;
      uni.login({
        success: async (res) => {
          console.log('123onLoad:', res);
          try {
            let token = await getTempToken(res.code);
            // console.log('tokenOnCompany', token);
            self.tempToke = token;
            this.uploadHeader = {
              'Content-Type': 'multipart/form-data',
              Authorization: `bearer ${token}`
            };
          } catch (error) {
            console.log(error);
            self.tempToke = '';
          }
        }
      });
    },
    // 保存并注册
    async handleSave() {
      let self = this;
      let flag = false;
      // 校验附件是否有值
      flag = self.validAnnex(self.annexInfo);
      console.log('flag', flag)
      if (!flag) {
        uni.showToast({
          icon: 'none',
          title: '请上传公司附件'
        });
      }
      this.$refs.companyForm.validate(valid => {
        if (valid && flag) {
          console.log('验证通过');
          let postData = {
            ...self.baseForm,
            ...self.companyForm
          }
          postData.channelBanks = [
            {
              accountName: self.companyForm.accountName, // 账户名称
              accountNo: self.companyForm.accountNo, // 账户号码
              branchName: self.companyForm.branchName, // 开户银行
            }
          ];
          if (self.annexInfo && self.annexInfo.length > 0) {
            self.annexInfo.forEach((item) => {
              let obj = {
                fileId: item.fileId,
                fileName: item.fileId,
                type: item.fileId,
              };
              postData.channelAttachments.push(obj);
            })
          }
          const info = channelRegister(postData);
          console.log(info);
          if (info.code === 'success') {
            uni.showToast({
              icon: 'success',
              title: '注册成功'
            });
            this.$emit('next');
          }
        } else {
          console.log('验证失败');
        }
      });
    },
    // 校验附件
    validAnnex() {
      if (this.annexInfo && this.annexInfo.length > 0) {
        let flag = false;
        flag = this.annexInfo.some((item) => {
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
    // 确定选择日期
    confirmDate(value) {
      console.log(value);
      if (value) {
        this.companyForm.setupTime = `${value.year}-${value.month}-${value.day}`
      }
    },
    // 确定选择地区
    confirmRegion(value) {
      console.log(value);
      if (value && value.length > 0) {
        this.companyForm.province = value[0].value;
        this.companyForm.city = value[1].value;
        this.companyForm.county = value[2].value;
        this.companyForm.region = `${value[0].label}${value[1].label}${value[2].label}`;
      }
    },
    // 确定选择银行
    handleSelectBank(item) {
      console.log(item);
      if (item.id) {
        this.companyForm.branchName = item.bankName;
        this.showBank = false;
      }
    },
    // 获取银行列表
    async getBankList(type = '') {
      if (this.isMore) return;
      const list = await getBankBranchList(this.queryPageParameters);
      // console.log(list);
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
    // 获取附件类型
    async getChannelAttachmentList() {
      let postData = {
        type: "ChannelAttachment",
        valid: "Valid"
      }
      let list = await getChannelAttachment(postData);
      // console.log('listlistlist', list);
      if (list && list.length > 0) {
        list.forEach((item) => {
          this.$set(item, 'fileList', []);
        });
        this.annexInfo = list;
      }
      console.log('this.annexInfo', this.annexInfo);
    },
    // 搜索银行
    changeSearch(value) {
      // console.log(value);
      this.isMore = false;
      this.queryPageParameters.pageNum = 1;
      this.queryPageParameters.pageSize = 10;
      if (!!(value.trim())) {
        debounce(this.getBankList, 500);
      } else {
        this.getBankList();
      }
    },
    // 上拉加载
    scrollLower() {
      this.queryPageParameters.pageNum = this.queryPageParameters.pageNum + 1;
      this.getBankList('more');
    },
  },
};
</script>

<style lang="scss" scoped>
  .company-info-wrapper {
    width: 100%;
    background-color: #FFFFFF;

    .info-content-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 0rpx 10rpx;

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

        .remark {
          padding: 10rpx 20rpx;
        }

        .swiper-wrapper {
          width: 100%;

          .swiper {
            padding: 0 21rpx;
            height: 278rpx;

            .swiper-item {
              padding-right: 5rpx;
              box-sizing: border-box;

              .swiper-item-msg {
                height: 100%;
                background-color: #e6f1fc;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-radius: 14rpx;
                box-sizing: border-box;
                padding: 30rpx;

                view {
                  font-family: PingFang SC;
                }

                .name {
                  flex: 1;
                  font-size: 32rpx;
                  font-weight: bold;
                  color: #333333;
                }

                .local, .code {
                  flex: 1;
                  font-size: 30rpx;
                  color: #666666;
                }

                .more {
                  text-align: center;
                  font-size: 32rpx;
                  font-weight: bold;
                  color: #666666;

                  /deep/.u-icon {
                    margin-left: 10rpx;
                  }
                }
              }
            }
          }

          .indicator-dots {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30rpx 0rpx;
          }

          .indicator-dots-item {
            background-color: $u-tips-color;
            height: 16rpx;
            width: 16rpx;
            border-radius: 10px;
            margin: 0 3px;
          }

          .indicator-dots-active {
            background-color: $u-type-primary;
          }
        }
      }
    }

    .btn {
      box-sizing: border-box;
      margin-bottom: 30rpx;
      /deep/.u-size-default {
        height: 92rpx !important;
        line-height: 92rpx !important;
      }
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
      height: calc(100vh - 805rpx);
    }

    .bank-item {
      padding: 30rpx 10rpx;
      text-align: left;
      border-bottom: 1rpx solid #CCCCCC;
    }
  }
</style>