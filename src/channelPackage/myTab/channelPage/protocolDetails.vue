<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 20:02:11
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-27 16:22:22
-->
<template>
  <view class="protocol-details-wrapper">
    <view class="details-wrapper">
      <view class="title">协议信息</view>
      <u-form :model="infoForm" ref="infoForm" :label-width="170">
        <u-form-item label="协议编号">
          <view class="item-right">
            {{ infoForm.electronicContractNo }}
          </view>
        </u-form-item>
        <u-form-item label="协议名称">
          <view class="item-right">
            {{ infoForm.contractTitle }}
          </view>
        </u-form-item>
        <u-form-item label="甲方">
          <view class="item-right">
            {{ infoForm.partyCompany }}
          </view>
        </u-form-item>
      </u-form>
      <view class="title u-margin-top-30">合同附件</view>
      <view class="annex-wrapper">
        <view
          class="annex-item"
          v-for="(item, index) in infoForm.annexList"
          :key="index">
          <view class="item-type">{{ item.type | typeFilter }}</view>
          <view class="item-value">
            <u-image
              width="200rpx"
              height="200rpx"
              :src="item.fileUrl"
              @click.stop="preFileItem(item)"
            ></u-image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getDistributionDetailApi } from "../../../api/channel";
import tool from "../../../common/tool";
export default {
  data() {
    return {
      pdfImg: require('@/channelPackage/common/img/pdf.jpg'),
      excelImg: require('@/channelPackage/common/img/excel.png'),
      wordImg: require('@/channelPackage/common/img/word.jpg'),
      infoForm: {
        electronicContractNo: "",
        contractTitle: "",
        partyCompany: "",
      },
    };
  },
  filters: {
    typeFilter(type) {
      //Stamped-战略已盖章扫描件、
      //NotStamped-战略未盖章扫描件、
      //ContractAnnex-甲方合同附件、
      //ArchiveAnnex-盖章版归档附件、
      //NoArchiveAnnex-未盖章版归档附件、
      //ScanArchiveAnnex-扫描件归档、
      //NoticeAttachment-告知书附件
      let r = "";
      if (type == "Stamped") {
        r = "战略已盖章扫描件";
      } else if (type == "NotStamped") {
        r = "战略未盖章扫描件";
      } else if (type == "ContractAnnex") {
        r = "甲方合同附件";
      } else if (type == "ArchiveAnnex") {
        r = "盖章版归档附件";
      } else if (type == "NoArchiveAnnex") {
        r = "未盖章版归档附件";
      } else if (type == "ScanArchiveAnnex") {
        r = "扫描件归档";
      } else if (type == "NoticeAttachment") {
        r = "告知书附件";
      }
      return r;
    },
  },
  async onLoad(options) {
    let list = getApp().globalData.protocolAnnexList; // 附件信息
    console.log('list', list);
    console.log(options.id);
    this.infoForm = await getDistributionDetailApi(options.id);
    this.infoForm.annexList = this.initAnnexList(list);
    console.log(this.infoForm.annexList);
  },
  methods: {
    // 初始化附件信息
    initAnnexList(list = []) {
      if (list && list.length) {
        list.forEach((item) => {
          if (item.type === "ArchiveAnnex") {
            // 盖章版归档附件 --- 可能存在多个附件（包括文件和图片）
            if (item.attachmentSuffix.endsWith("pdf")) {
              // pdf
              item.fileUrl = this.pdfImg;
              item.fileType = "pdf";
              item.downLoadUrl = tool.getFileDownloadUrl(item.fileNo);
            } else if (item.attachmentSuffix.endsWith("doc")) {
              // word
              item.fileUrl = this.wordImg;
              item.fileType = "doc";
              item.downLoadUrl = tool.getFileDownloadUrl(item.fileNo);
            } else if (item.attachmentSuffix.endsWith("docx")) {
              // word
              item.fileUrl = this.wordImg;
              item.fileType = "docx";
              item.downLoadUrl = tool.getFileDownloadUrl(item.fileNo);
            } else if (item.attachmentSuffix.endsWith("xls")) {
              // excel
              item.fileUrl = this.excelImg;
              item.fileType = "xls";
              item.downLoadUrl = tool.getFileDownloadUrl(item.fileNo);
            } else if (item.attachmentSuffix.endsWith("xlsx")) {
              // excel
              item.fileUrl = this.excelImg;
              item.fileType = "xlsx";
              item.downLoadUrl = tool.getFileDownloadUrl(item.fileNo);
            } else {
              // 默认是图片
              item.fileUrl = tool.getFileUrl(item.fileNo);
              item.fileType = "";
              item.downLoadUrl = "";
            }
          } else if (item.type === "NoArchiveAnnex") {
            // 未盖章版归档附件 --- 只有一个PDF文件
            item.fileUrl = this.pdfImg;
            item.fileType = "pdf";
            item.downLoadUrl = tool.getFileDownloadUrl(item.fileNo);
          }
        });
      }
      return list
    },
    // 预览功能 --- 文件 + 图片
    preFileItem(item) {
      console.log(item);
      if (item.downLoadUrl) {
        // 说明是文件
        this.openFile(item);
      } else {
        // 图片
        uni.previewImage({
          urls: [item.fileUrl],
          current: 1,
        });
      }
    },
    // 在线打开文件
    openFile(item) {
      uni.downloadFile({
        url: item.downLoadUrl,
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
    }
  },
};
</script>

<style lang="scss" scoped>
.protocol-details-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;

  .details-wrapper {
    width: 100%;
    background-color: #ffffff;

    .title {
      font-size: 36rpx;
      font-weight: 600;
      padding: 20rpx 30rpx;
    }

    .info-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1rpx solid #999999;
      padding: 20rpx 30rpx;

      view {
        flex: 1;
        font-size: 28rpx;
        color: #999999;
      }
    }

    .annex-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      padding: 20rpx 30rpx;

      .annex-item {
        width: 30%;
        margin-right: 15rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;

        view {
          width: 200rpx;
          text-align: center;
        }

        .item-type {
          padding: 5rpx;
          font-size: 28rpx;
        }

        .item-download {
          height: 80rpx;
          line-height: 80rpx;
          font-size: 30rpx;
          background-color: $u-type-primary;
          color: #ffffff;
        }
      }
    }
  }
}
.item-right {
  text-align: right;
}
</style>