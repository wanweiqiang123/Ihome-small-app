<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-26 17:14:10
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-18 14:35:15
-->
<template>
  <view class="commission-details-wrapper safe-area-inset-bottom">
    <view class="code-wrapper">
      <view class="code-title">
        <view class="code u-margin-right-15">结佣单号：{{paymentForm.applyCode}}</view>
        <view class="status" v-show="paymentForm.status">
          <u-tag
            :text="getStatus(paymentForm.status)"
            :type="statusType" />
        </view>
      </view>
      <view class="code-download" @click="handleDownLoad" v-if="paymentForm.applyCode">
        <u-icon name="download"></u-icon>下载结佣材料
      </view>
    </view>
    <view class="initiate-title">
      <view class="title">结佣项目：{{paymentForm.projectName}}</view>
    </view>
    <view class="initiate-title">
      <view class="title">结算佣金明细</view>
    </view>
    <view
      class="commission-item-wrapper"
      v-for="(staffItem, staffIndex) in paymentForm.staffWechatDetailCycleSummaryResponseList" :key="staffIndex">
      <view class="item-project-name u-padding-15">
        <view>{{staffItem.cycleName}}</view>
        <view class="price-list">
          <view>结佣总额：{{staffItem.cycleTotalAmount}}</view>
          <view>扣除总额：{{staffItem.cycleTotalDeductionAmount}}</view>
          <view>实结总额：{{staffItem.cycleTotalActualAmount}}</view>
        </view>
      </view>
      <view
        class="item-code-list u-padding-15"
        v-for="(detailItem, detailIndex) in staffItem.staffWechatDetailResponseList" :key="detailIndex"
        @click="viewDealDetail(detailItem.dealCode)">
        <view class="list-left">
          <view>成交报告编号：{{detailItem.dealCode}}</view>
          <view class="price">
            <view>本单佣金：{{detailItem.totalAmount}}</view>
            <view>本单应扣：{{detailItem.thisDeduct}}</view>
            <view>本单实结：{{detailItem.totalActualAmount}}</view>
          </view>
          <view class="reason">扣款原因：{{detailItem.deductType}}</view>
        </view>
        <view class="detail-color">详情</view>
        <view>
          <u-icon name="arrow-right" size="28"></u-icon>
        </view>
      </view>
    </view>
    <view class="info-item u-margin-top-20">
      <view class="form-title u-border-bottom">收款信息</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="收款帐号">
            <u-input
              v-model="paymentForm.receiveAccount"
              placeholder=" " disabled :clearable="false" input-align="left" />
          </u-form-item>
          <u-form-item label="发票类型">
            <u-input
              v-model="paymentForm.invoiceTypeName"
              placeholder=" " disabled :clearable="false" input-align="left" />
          </u-form-item>
          <u-form-item label="发票税率">
            <u-input
              v-model="paymentForm.taxRate"
              placeholder=" " disabled :clearable="false" input-align="left" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="info-item">
      <view class="form-title u-border-bottom">佣金结算</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="本单佣金">
            <u-input
              v-model="paymentForm.applyAmount"
              placeholder=" " disabled :clearable="false" input-align="left" />
          </u-form-item>
          <u-form-item label="本单扣除">
            <u-input
              v-model="paymentForm.deductAmount"
              placeholder=" " disabled :clearable="false" input-align="left" />
          </u-form-item>
          <u-form-item label="本单实结">
            <u-input
              v-model="paymentForm.actualAmount"
              placeholder=" " disabled :clearable="false" input-align="left" />
          </u-form-item>
          <u-form-item label="不含税金额">
            <u-input
              v-model="paymentForm.noTaxAmount"
              placeholder=" " disabled :clearable="false" input-align="left" />
          </u-form-item>
          <u-form-item label="税额">
            <u-input
              v-model="paymentForm.tax"
              placeholder=" " disabled :clearable="false" input-align="left" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="info-item">
      <view class="form-title u-border-bottom">附件信息</view>
      <view class="annex-list-wrapper" v-for="(item, itemIndex) in paymentForm.documentList" :key="itemIndex">
        <view class="annex-type">{{getDictName(item.fileType, fileTypeList)}}</view>
        <view class="annex-image">
          <u-image
            v-for="(srcItem, srcIndex) in item.fileList"
            :key="srcIndex"
            @click="previewImg(getImgUrl(srcItem.fileId))"
            width="200rpx"
            height="200rpx"
            :src="getImgUrl(srcItem.fileId)"></u-image>
        </view>
      </view>
    </view>
    <view class="info-item u-margin-bottom-20">
      <view class="form-title u-border-bottom">说明</view>
      <view class="form">
        <u-form :model="paymentForm" ref="paymentForm" :label-width="190">
          <u-form-item label="申请说明">
            <u-input
              v-model="paymentForm.description"
              placeholder=" " disabled :clearable="false" input-align="left" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="u-margin-20">
      <u-button type="primary" shape="circle" @click="handleReturn">返回</u-button>
    </view>
    <!-- 下拉框 -->
    <u-popup
      safe-area-inset-bottom
      v-model="showDownLoadList"
      mode="bottom">
      <view class="down-load-wrapper">
        <view class="down-load-title">
          <view class="title">结佣材料清单</view>
          <view class="btn" @click="handleCancel">取消</view>
        </view>
        <view
          class="down-load-title"
          v-for="(item, index) in downLoadList" :key="index">
          <view class="title">
            <u-image width="50rpx" height="50rpx" src=""></u-image>
            <text>结佣明细未盖章版</text>
          </view>
          <view class="btn">
            <u-button type="primary" size="mini" shape="square" @click="handleConfirmDownLoad(item.fileId)">下载</u-button>
          </view>
        </view>
        <view class="down-load-tip">选择需要下载的附件材料点击下方按钮进行下载</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {getAllDictByType} from "@/api";
import {geiPayApplyDetail} from "@/api/channel";
import {currentEnvConfig} from "@/env-config";

export default {
  data() {
    return {
      dictList: null, // 部分字典数据
      dictObj: {
        types: [
          "PayoffStatus",
          "PayoffInvoiceType",
          "PayoffFileType"
        ]
      }, // 需要用到的字典类型参数
      paymentStatusList: [], // 状态
      invoiceTypeList: [], // 发票类型
      fileTypeList: [], // 附件类型
      showDownLoadList: false,
      paymentForm: {
        applyCode: '',
        status: '',
        projectName: '',
        staffWechatDetailCycleSummaryResponseList: [],
        receiveAccount: '',
        invoiceType: '',
        invoiceTypeName: '',
        taxRate: '',
        applyAmount: '',
        deductAmount: '',
        actualAmount: '',
        noTaxAmount: '',
        tax: '',
        description: '',
        documentList: []
      },
      statusType: 'primary',
      downLoadList: [{checked: false},{checked: false},{checked: false}]
    };
  },
  async onLoad(option) {
    this.dictList = await this.getAllDictByTypes(this.dictObj);
    this.paymentStatusList = await this.getSignDict("PayoffStatus");
    this.invoiceTypeList = await this.getSignDict("PayoffInvoiceType");
    this.fileTypeList = await this.getSignDict("PayoffFileType");
    console.log(this.paymentStatusList);
    console.log(this.invoiceTypeList);
    console.log(this.fileTypeList);
    if (option && option.id) {
      await this.init(option.id);
    }
  },
  methods: {
    // 查看结佣成交详情
    viewDealDetail(dealCode = '') {
      if (!dealCode) return;
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/dealDetails?type=commission&code=${dealCode}`
      });
    },
    // 下载结佣材料
    handleDownLoad() {
      this.showDownLoadList = true;
    },
    // 取消下载
    handleCancel() {
      this.showDownLoadList = false;
      if (this.downLoadList && this.downLoadList.length) {
        this.downLoadList.forEach((list) => {
          list.checked = false;
        });
      }
    },
    // 选择下载的材料
    handleSelectDownLoadItem(item, i) {
      if (this.downLoadList && this.downLoadList.length) {
        this.downLoadList.forEach((list, index) => {
          if (index === i) {
            list.checked = true;
          } else {
            list.checked = false;
          }
        });
      }
    },
    // 确定下载
    handleConfirmDownLoad(fileId) {
      console.log('确定下载');
      if (!fileId) return;
      let fileUrl = `${currentEnvConfig['protocol']}://${currentEnvConfig['apiDomain']}/sales-api/sales-document-cover/static/channel/模版-委托书.docx`;
      uni.downloadFile({
        url: fileUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('下载成功');
            uni.openDocument({
              filePath: res.tempFilePath,
              showMenu: true,
              success: (res) => {
                console.log('打开文档成功');
              }
            });
          }
        }
      });
      this.showDownLoadList = false;
    },
    // 查看附件
    previewImg(item) {
      // console.log(item);
      if (!item) return;
      uni.previewImage({
        urls: [item]
      });
    },
    // 返回
    handleReturn() {
      uni.redirectTo({
        url: `/channelPackage/myTab/pages/commissionList`
      });
    },
    // 初始化页面
    async init(id) {
      let info = await geiPayApplyDetail({id: id});
      if (info && info.invoiceType) {
        info.invoiceTypeName = await this.getInvoiceType(info.invoiceType);
      }
      this.paymentForm = {
        ...this.paymentForm,
        ...info
      }
      this.paymentForm.documentList = this.initDocumentList(this.paymentForm.documentList);
      console.log(info);
    },
    // 初始化附件信息
    initDocumentList(documentList = []) {
      let fileTypeList = [];
      fileTypeList = JSON.parse(JSON.stringify(this.fileTypeList));
      let tempList = [];
      if (documentList && documentList.length && fileTypeList && fileTypeList.length) {
        fileTypeList.forEach((list) => {
          list.fileList = [];
          documentList.forEach((item) => {
            if (list.code === item.fileType) {
              list.fileList.push(item);
            }
          });
        });
      }
      if (tempList && tempList.length > 0) {
        tempList = fileTypeList.filter((item) => {
          return item.fileList.length > 0;
        });
      }
      console.log('fileTypeList:', fileTypeList);
      return tempList;
    },
    // 获取对应的状态
    getStatus(code) {
      let statusStr = '';
      if (['Unconfirm', 'PlatformClerkUnreview', 'BranchBusinessManageUnreview', 'BranchFinanceUnreview', 'OAReviewing'].includes(code)) {
        statusStr = "审核中";
        this.statusType = 'warning';
      } else if (['ReviewPass'].includes(code)) {
        statusStr = "已通过";
        this.statusType = 'success';
      } else if (['ConfirmingPay'].includes(code)) {
        statusStr = "付款中";
        this.statusType = 'error';
      } else if (['PaymentSuccessful'].includes(code)) {
        statusStr = "已结佣";
        this.statusType = 'success';
      }
      return statusStr;
    },
    // 获取发票类型
    getInvoiceType(code) {
      let name = '';
      if (this.invoiceTypeList && this.invoiceTypeList.length) {
        this.invoiceTypeList.forEach((item) => {
          if (item.code === code) {
            name = item.name;
          }
        });
      }
      return name;
    },
    // 获取对应类型的字典集合
    async getAllDictByTypes(obj) {
      const dictList = await getAllDictByType(obj);
      return dictList;
    },
    // 获取单个类型字典
    async getSignDict(type = '') {
      let list = [];
      if (this.dictList) {
        Object.keys(this.dictList).forEach((key) => {
          if (key === type) {
            list = this.dictList[key];
          }
        });
      }
      // console.log('getSignDict:', list);
      return list;
    },
    // 获取字典的name
    getDictName(type = "", list = []) {
      let name = '';
      if (type && list && list.length) {
        list.forEach((item) => {
          if (item.code === type) {
            name = item.name;
          }
        });
      }
      return name
    },
    // 根据id获取图片地址
    getImgUrl(fileId = '') {
      let url = '';
      url = this.$tool.getFileUrl(fileId);
      return url;
    }
  },
};
</script>

<style lang="scss" scoped>
  .commission-details-wrapper {
    width: 100%;
    background-color: #F5F5F5;

    .code-wrapper {
      width: 100%;
      //height: 80rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 20rpx;
      background-color: #FFFFFF;

      .code-title {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .code {
          font-family: PingFang SC;
          font-weight: 600;
          color: #1F1F1F;
          line-height: 48rpx;
          text-align: left;
        }

        .status {
          //width: 91rpx;
          //background: #EB7734;
          //border-radius: 4rpx;
          font-family: PingFang SC;
          font-size: 24rpx;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 46rpx;
          text-align: center;
        }
      }

      .code-download {
        color: $u-type-primary;
      }
    }

    .initiate-title {
      width: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      background-color: #FFFFFF;
      padding: 20rpx;
      margin: 20rpx 0rpx;

      .title {
        flex: 1;
      }
    }

    .commission-item-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 15rpx 15rpx 0rpx 15rpx;

      .item-project-name {
        width: 100%;
        box-sizing: border-box;
        color: #FFFFFF;
        background-color: $u-type-primary;

        view {
          padding: 10rpx;
          font-weight: 600;
        }

        .price-list {
          display: flex;
          flex-direction: row;
          align-items: center;

          view {
            flex: 1;
          }
        }
      }

      .item-code-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #FFFFFF;

        &:not(:last-child) {
          border-bottom: 1rpx solid #CCCCCC;
        }

        /deep/.u-icon__icon {
          color: $u-type-primary;
        }

        .list-left {
          flex: 1;

          view {
            padding: 10rpx;
          }

          .price {
            color: #999999;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            view {
              flex: 1;
            }
          }

          .reason {
            color: #D9001B;
          }
        }

        .detail-color {
          color: $u-type-primary;
        }
      }
    }

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
        }

        .annex-image {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;

          /deep/.u-image {
            margin-right: 10rpx;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
.down-load-wrapper {
  width: 100%;

  .down-load-title {
    width: 100%;
    box-sizing: border-box;
    padding: 10rpx 20rpx 16rpx 20rpx;
    margin: 10rpx 0rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 1rpx solid #CCCCCC;
    }

    .title {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;

      text {
        display: inline-block;
        box-sizing: border-box;
        margin-left: 10rpx;
      }
    }

    .btn {
      color: $u-type-primary;
    }
  }

  .down-load-tip {
    box-sizing: border-box;
    padding: 10rpx 20rpx;
    margin: 10rpx 0rpx;
    font-size: 24rpx;
    color: #A2A2A2;
  }
}
</style>