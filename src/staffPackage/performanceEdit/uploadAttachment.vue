<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2021-03-31 16:25:35
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-31 16:55:16
-->
<template>
  <view class="upload-attachment-wrapper">
    <view class="upload-type-wrapper">
      <view class="annex-list-wrapper" v-for="(item, infoIndex) in dictList" :key="infoIndex">
        <view class="annex-type">{{item.name}}</view>
        <view class="upload-file-wrapper">
          <template v-if="item.fileList.length > 0">
            <view class="file-list-wrapper" v-for="list in item.fileList" :key="list.fileId">
              <u-icon
                v-show="!list.canDelete"
                @click="deleteImg(infoIndex, list)"
                class="icon" name="close-circle-fill" color="#FA3534" size="50"></u-icon>
              <u-image
                @click="viewImg(list, item)"
                width="100%" height="100%" :src="list.fileUrls ? list.fileUrls : getUrl(list.fileId)"></u-image>
            </view>
          </template>
          <view class="upload-icon" @click="uploadByType(item)" v-if="item.code !== 'ContractInfo'">
            <u-icon name="plus" color="#606266" size="40"></u-icon>
            <view class="select">选择文件</view>
          </view>
        </view>
      </view>
    </view>
    <view class="upload-bottom-btn">
      <u-button
        type="primary"
        shape="square"
        @click="handleSubmit"
      >提交</u-button>
    </view>
    <!-- 选择上传附件类型菜单 -->
    <u-action-sheet
      :safe-area-inset-bottom="true"
      :list="actionList"
      v-model="showActionShow"
      @click="handleUpload"></u-action-sheet>
    <!-- 删除提示 -->
    <u-modal
      @confirm="handleDelete"
      @cancel="showDeleteWin = false"
      :mask-close-able="true"
      :show-cancel-button="true"
      v-model="showDeleteWin" content="您确定要删除此项吗？"></u-modal>
  </view>
</template>

<script>
import {
  get_deal_get__id,
  postAddDocs
} from "@/api/staff";
import { getAllByTypeApi } from "@/api/index";
import storageTool from "@/common/storageTool.js";
import tool from "@/common/tool";
export default {
  name: "uploadAttachment",
  data() {
    return {
      pdfImg: require('@/channelPackage/common/img/pdf.jpg'),
      excelImg: require('@/channelPackage/common/img/excel.png'),
      wordImg: require('@/channelPackage/common/img/word.jpg'),
      showDeleteWin: false,
      deleteIndex: null,
      deleteItem: null,
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
      uploadName: 'files', // 供后端取值用
      currentUploadType: null, // 上传的附件类型
      DealFileTypeList: [],
      dictList: [],
      dealId: "",
    };
  },
  async onLoad(option) {
    this.dealId = option.id;
    await this.getToken();
    this.DealFileTypeList = await this.getDictAll("DealFileType");
    if (this.dealId) await this.getDealInfo();
  },
  methods: {
    // 删除图片/文件
    deleteImg(index, item) {
      console.log(item);
      this.showDeleteWin = true;
      this.deleteIndex = index;
      this.deleteItem = item;
    },
    // 确定删除图片/文件
    handleDelete() {
      this.dictList[this.deleteIndex].fileList = this.dictList[this.deleteIndex].fileList.filter((list) => {
        return list.fileId !== this.deleteItem.fileId;
      });
      tool.toast('移除成功');
    },
    // 预览图片
    viewImg(file, item) {
      console.log(file);
      console.log(item);
      // return ;
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
      if (!item.type) {
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
              fileType: item.type,
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
    // 获取图片完整路径
    getUrl(id) {
      if (!id) return '';
      let url = tool.getFileUrl(id);
      return url;
    },
    // 上传
    uploadByType(item) {
      console.log(item);
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
            console.log(res);
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
                    console.log('图片：', data);
                    self.dictList.forEach((item) => {
                      if (item.code === self.currentUploadType) {
                        item.fileList.push(
                          {
                            ...data.data[0],
                            fileUrls: '',
                            fileName: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                            type: data?.data[0]?.generateFileType,
                            name: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                            isAdd: true // 新增的
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
                    self.dictList.forEach((item) => {
                      if (item.code === self.currentUploadType) {
                        item.fileList.push(
                          {
                            ...data.data[0],
                            fileUrls: self.getFileImg(data.data[0]),
                            fileName: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                            type: data?.data[0]?.generateFileType,
                            name: `${data?.data[0]?.generateFileName}.${data?.data[0]?.generateFileType}`,
                            isAdd: true // 新增的
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
    // 获取token
    getToken() {
      this.uploadHeader = {
        'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${storageTool.getToken()}`
      };
    },
    // 获取字典
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 获取对应字典name
    getDictName(code, list) {
      if (list.length) {
        const item = list.find((v) => v.code === code);
        return item?.name;
      } else {
        return "";
      }
    },
    // 获取附件信息
    async getDealInfo() {
      let info  = await get_deal_get__id({id: this.dealId});
      console.log(info);
      this.dictList = this.initDocumentList(info.charge, info.contType, info.documentList);
    },
    // 初始化附件列表
    initDocumentList(charge = '', contType = '', list = []) {
      let fileList = JSON.parse(JSON.stringify(this.DealFileTypeList)); // 附件类型
      // 根据收费模式过滤
      if (charge === 'Agent') {
        // 项目周期的收费模式为代理费的话，隐藏优惠告知书
        fileList = fileList.filter((item) => {
          return item.code !== "Notice";
        });
      }
      // 根据合同类型过滤
      if (contType !== 'DistriDeal') {
        // 合同类型不是分销成交的话隐藏
        fileList = fileList.filter((item) => {
          return !["VisitConfirForm", "DealConfirForm"].includes(item.code);
        });
      }
      // 附件类型增加key
      if (fileList.length > 0) {
        fileList.forEach((vo) => {
          vo.fileList = []; // 存放新上传的数据
          if (list && list.length) {
            list.forEach((item) => {
              if (vo.code === item.fileType) {
                vo.fileList.push(
                  {
                    ...item,
                    name: item.fileName,
                    fileUrls: this.getFileUrls(item, 'url'), // 获取对应文件的默认图片
                    type: this.getFileUrls(item, 'type'), // 获取文件类型：excel、word、pdf
                    canDelete: true,
                    isAdd: false // 新增的
                  }
                );
              }
            });
          }
        });
      }
      return fileList;
    },
    // 获取文件图标
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
    // 提交
    async handleSubmit() {
      console.log('提交');
      console.log(this.dictList);
      let tempList = [];
      if (this.dictList && this.dictList.length) {
        this.dictList.forEach((list) => {
          if (list.fileList && list.fileList.length) {
            list.fileList.forEach((item) => {
              if (item.isAdd) {
                tempList.push(
                  {
                    fileId: item.fileId,
                    fileName: item.fileName,
                    fileType: list.code
                  }
                )
              }
            });
          }
        });
      }
      if (!tempList.length) {
        this.$tool.toast("没有新增附件，无需提交");
        return;
      }
      let postData = {
        dealId: this.dealId,
        documentAddVOS: tempList
      }
      let info = await postAddDocs(postData);
      console.log(info);
      this.$tool.toast("提交成功");
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-attachment-wrapper {
  width: 100%;
  height: calc(100vh - 130rpx);
  overflow-y: auto;
  background-color: #f5f5f5;

  .upload-type-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx;
    background-color: #ffffff;
  }

  .upload-bottom-btn {
    width: 100%;
    height: 120rpx;
    box-sizing: border-box;
    padding: 20rpx 50rpx;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    z-index: 998;
  }

  .annex-list-wrapper {
    width: 100%;
    padding: 0rpx 20rpx 20rpx 20rpx;

    .annex-type {
      font-size: 30rpx;
      padding: 20rpx 0rpx 10rpx 0rpx;
    }

    &:not(:last-child) {
      border-bottom: 1rpx solid #F1F1F1;
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
</style>