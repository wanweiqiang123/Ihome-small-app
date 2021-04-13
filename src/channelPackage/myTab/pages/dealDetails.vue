<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 08:14:50
 * @LastEditors: lsj
 * @LastEditTime: 2021-04-06 19:33:25
-->
<template>
  <view class="deal-details-wrapper">
    <view class="info-item">
      <view class="form-title u-border-bottom">客户信息</view>
      <u-form :label-width="190">
        <u-form-item :label="customer.customerName">
          <u-input
            v-model="customer.customerPhone"
            placeholder="联系方式"
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="info-item">
      <view class="form-title u-border-bottom">房产信息</view>
      <u-form :label-width="190">
        <u-form-item label="楼盘名称">
          <u-input
            v-model="info.projectCycle"
            placeholder="楼盘名称"
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="物业类型">
          <u-input
            v-model="info.house.propertyType"
            placeholder="物业类型"
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="栋座">
          <u-input
            v-model="info.house.buildingName"
            placeholder="栋座"
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="房号">
          <u-input
            v-model="info.house.roomNo"
            placeholder="房号"
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
      </u-form>
    </view>
    <view
      class="info-item"
      v-if="detailsType === 'commission'"
    >
      <view class="form-title u-border-bottom">结佣信息</view>
      <u-form :label-width="190">
        <u-form-item label="可结佣金">
          <u-input
            v-model="paymentForm.totalCanCommFees"
            placeholder=" "
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="已结佣金">
          <u-input
            v-model="paymentForm.totalSettledCommFees"
            placeholder=" "
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="未结佣金">
          <u-input
            v-model="paymentForm.totalUnsetCommFees"
            placeholder=" "
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="在结佣金">
          <u-input
            v-model="paymentForm.totalInCommFees"
            placeholder=" "
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
      </u-form>
    </view>
    <view
      class="info-item"
      v-if="detailsType === 'commission'"
    >
      <view class="form-title u-border-bottom">结佣记录</view>
      <view class="form u-padding-0">
        <view
          class="record-list"
          v-for="(item, index) in paymentForm.commissionRecordResponseList"
          :key="index"
        >
          <view class="record-code">
            <view class="code">{{item.applyCode | emptyFilter}}</view>
            <view class="price">结佣金额：{{item.applyAmount | emptyFilter}}</view>
          </view>
          <view class="record-time">{{item.createTime | emptyFilter}}</view>
        </view>
      </view>
    </view>
    <view
      class="info-item"
      v-if="detailsType === 'report'"
    >
      <view class="form-title u-border-bottom">结佣信息</view>
      <u-form :label-width="190">
        <u-form-item label="应结佣金额">
          <u-input
            v-model="info.channelComm"
            placeholder=" "
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="已结佣金额">
          <u-input
            v-model="info.totalPaidChannelComm"
            placeholder=" "
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="未结佣金额">
          <u-input
            v-model="info.totalUnpaidChannelComm"
            placeholder=" "
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="当前可结金额">
          <u-input
            v-model="info.totalChannelComm"
            placeholder=" "
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
      </u-form>
    </view>
    <view
      class="info-item"
      v-if="detailsType === 'report'"
    >
      <view class="form-title u-border-bottom">附件信息</view>
      <view class="form-img">
        <view class="image-item">
          <view
            class="images"
            v-for="(item, index) in dictList"
            :key="index"
          >
            <template>
              <view>
                <text class="img-type">{{ item.name }}</text>
              </view>
              <u-image
                v-for="(image, h) in item.srcList"
                :key="h"
                width="160"
                height="160"
                :src="image.documentUrls ? image.documentUrls : getUrl(image.fileId)"
                style="display: inline-block; padding: 10rpx"
                @click="imageShow(image, item)"
              ></u-image>
            </template>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { postdealReportRecordApi, geiPayDealDetail } from "@/api/channel";
import { getAllByTypeApi } from "@/api/index";
import tool from "@/common/tool";
export default {
  data() {
    return {
      pdfImg: require('@/channelPackage/common/img/pdf.jpg'),
      excelImg: require('@/channelPackage/common/img/excel.png'),
      wordImg: require('@/channelPackage/common/img/word.jpg'),
      detailsType: "",
      detailsCode: "",
      paymentForm: {
        totalCanCommFees: "",
        totalSettledCommFees: "",
        totalUnsetCommFees: "",
        totalInCommFees: "",
        commissionRecordResponseList: [],
      },
      info: {
        house: {},
        channelComm: "", // 应结佣金额
        totalPaidChannelComm: "", // 已结佣金额
        totalChannelComm: "", // 当前可结金额
        totalUnpaidChannelComm: "", // 未结佣金额
      },
      customer: {
        customerName: "",
        customerPhone: "",
      },
      PropertyType: [],
      dictList: [],
    };
  },
  async onLoad(option) {
    this.PropertyType = await this.getDictAll("Property");
    let DealFileType = await this.getDictAll("DealFileType");
    this.detailsType = option.type;
    this.detailsCode = option.code;
    if (option.type === "report") {
      // 报备成交详情
      uni.setNavigationBarTitle({
        title: "报备成交信息详情",
      });
      DealFileType = DealFileType.filter((v) => {
        if (
          [
            "VisitConfirForm",
            "DealConfirForm",
            "SignVoucher",
            "SubscribeBook",
            "OwnerID",
          ].includes(v.code)
        ) {
          return {
            ...v,
          };
        }
      });
      this.dictList = DealFileType.map((v) => ({
        code: v.code,
        name: v.name,
        srcList: [],
      }));
      await this.getInfo();
    } else {
      // 结佣成交详情
      uni.setNavigationBarTitle({
        title: "成交详情",
      });
      await this.initPageByCommission();
    }
  },
  methods: {
    async getInfo() {
      const res = await postdealReportRecordApi({
        channelId: this.$storageTool.getUserInfo().channelId,
        dealCode: this.detailsCode,
      });
      this.info = {
        ...res,
        house: {
          ...res.house,
          propertyType: this.getDictName(
            res.house.propertyType,
            this.PropertyType
          ),
        },
      };
      // 应结佣金额
      this.info.channelComm = res.channelComm ? res.channelComm : '0';
      // 已结佣金额
      this.info.totalPaidChannelComm = this.$tool.tofixed(
        this.$tool.add(
          res.paidChannelServiceComm,
          res.paidChannelAgentComm
        ),
        2
      ).toString();
      console.log('this.info.totalPaidChannelComm', this.info.totalPaidChannelComm)
      // 当前可结金额
      this.info.totalChannelComm = this.$tool.tofixed(
        this.$tool.add(
          res.channelAgentComm,
          res.channelServiceComm
        ),
        2
      ).toString();
      // 未结佣金额
      this.info.totalUnpaidChannelComm = this.$tool.tofixed(
        this.$tool.add(
          res.unpaidChannelAgentComm,
          res.unpaidChannelServiceComm
        ),
        2
      ).toString();
      this.customer = this.info.customerList.find(
        (v) => v.isCustomer === "Yes"
      );
      res.documentShowList.forEach((v) => {
        this.dictList.forEach((j) => {
          if (v.fileType === j.code) {
            j.srcList.push(
              {
                ...v,
                documentUrls: this.getFileUrls(v, 'url'), // 获取对应文件的默认图片
                documentType: this.getFileUrls(v, 'type'), // 获取文件类型：excel、word、pdf
              }
            );
          }
        });
      });
      console.log('dictList', this.dictList);
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
    // 获取图片完整的url
    getUrl(id) {
      if (!id) return "";
      let url = tool.getFileUrl(id);
      return url;
    },
    // 结佣-成交详情初始化页面
    async initPageByCommission() {
      if (!this.detailsCode) return;
      let info = await geiPayDealDetail({ dealCode: this.detailsCode });
      console.log(info);
      this.customer.customerName = info?.customerName;
      this.customer.customerPhone = info?.customerPhone;
      this.info.projectCycle = info?.proName;
      this.info.house.propertyType = info?.propertyType
        ? this.getDictName(info?.propertyType, this.PropertyType)
        : "";
      this.info.house.buildingName = info?.buildingNo;
      this.info.house.roomNo = info?.roomNo;
      this.paymentForm.commissionRecordResponseList = info.commissionRecordResponseList;
      this.paymentForm.totalCanCommFees = info.totalCanCommFees ? info.totalCanCommFees : '0';
      this.paymentForm.totalInCommFees = info.totalInCommFees ? info.totalInCommFees : '0';
      this.paymentForm.totalSettledCommFees = info.totalSettledCommFees ? info.totalSettledCommFees : '0';
      this.paymentForm.totalUnsetCommFees = info.totalUnsetCommFees ? info.totalUnsetCommFees : '0';
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
    imageShow(file, item) {
      console.log(file);
      console.log(item);
      if (file.documentUrls) {
        // 说明是文件
        this.openFile(file);
      } else {
        // 图片
        let urls = [];
        let current = 0;
        if (item.srcList && item.srcList.length) {
          item.srcList.forEach((list) => {
            if (!list.documentUrls) {
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
      if (!item.documentType) {
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
              fileType: item.documentType,
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
  },
};
</script>

<style lang="scss" scoped>
.deal-details-wrapper {
  width: 100%;
  background-color: #f5f5f5;

  .info-item {
    background-color: #ffffff;

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

    .form {
      background-color: #ffffff;
      border: 1rpx solid #e4e4e4;
      box-sizing: border-box;
      padding: 0rpx 30rpx;
      margin: 0rpx 0rpx 20rpx 0rpx;

      .record-list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 20rpx 30rpx;
        border-bottom: 1rpx solid #e4e4e4;

        .record-code {
          display: flex;
          flex-direction: column;

          view {
            padding: 5rpx 0rpx;
          }

          .code {
            color: rgb(41, 121, 255);
            text-decoration: underline;
          }

          .price {
            color: #999999;
          }
        }
      }
    }

    .form-img {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      padding: 10rpx;

      .image-item {
        display: flex;
        flex-direction: column;
        margin-right: 10rpx;

        .img-upload,
        .img-type {
          flex: 1;
        }

        .img-type {
          height: 65rpx;
          line-height: 65rpx;
          background-color: #ffffff;
          text-align: center;
        }
      }
    }
  }
}
</style>