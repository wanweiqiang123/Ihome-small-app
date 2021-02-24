<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 08:14:50
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:36:30
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
            placeholder="可结佣金"
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="已结佣金">
          <u-input
            v-model="paymentForm.totalSettledCommFees"
            placeholder="已结佣金"
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="未结佣金">
          <u-input
            v-model="paymentForm.totalUnsetCommFees"
            placeholder="未结佣金"
            disabled
            :clearable="false"
            input-align="left"
          />
        </u-form-item>
        <u-form-item label="在结佣金">
          <u-input
            v-model="paymentForm.totalInCommFees"
            placeholder="在结佣金"
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
      <view class="u-margin-20">
        <u-table>
          <u-tr>
            <u-th
              v-for="thItem in tableData.thList"
              :key="thItem.id"
            >{{thItem.name | emptyFilter}}</u-th>
          </u-tr>
          <u-tr
            v-for="trItem in tableData.trList"
            :key="trItem.id"
          >
            <u-td
              v-for="tdItem in trItem.value"
              :key="tdItem.id"
            >{{tdItem | emptyFilter}}</u-td>
          </u-tr>
        </u-table>
      </view>
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
            <template v-if="item.srcList.length">
              <view>
                <text class="img-type">{{ item.name }}</text>
              </view>

              <u-image
                v-for="(image, h) in item.srcList"
                :key="h"
                width="160"
                height="160"
                :src="image"
                style="display: inline-block; padding: 10rpx"
                @click="imageShow(item.srcList, h)"
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
export default {
  data() {
    return {
      detailsType: "",
      detailsCode: "",
      paymentForm: {
        totalCanCommFees: "",
        totalSettledCommFees: "",
        totalUnsetCommFees: "",
        totalInCommFees: "",
        commissionRecordResponseList: [],
      },
      tableData: {
        thList: [
          {
            id: "1",
            name: "结佣类型",
          },
          {
            id: "2",
            name: "可结佣",
          },
          {
            id: "3",
            name: "已结佣",
          },
          {
            id: "4",
            name: "未结佣",
          },
        ],
        trList: [],
      },
      info: {
        house: {},
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
            "POSForm",
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
      this.tableData.trList = [
        {
          id: "1",
          value: [
            "服务费",
            res.channelServiceComm,
            res.paidChannelServiceComm,
            res.unpaidChannelServiceComm,
          ],
        },
        {
          id: "2",
          value: [
            "代理费",
            res.channelAgentComm,
            res.paidChannelAgentComm,
            res.unpaidChannelAgentComm,
          ],
        },
        {
          id: "3",
          value: [
            "合计",
            this.$tool.tofixed(
              this.$tool.add(res.channelServiceComm, res.channelAgentComm),
              2
            ),
            this.$tool.tofixed(
              this.$tool.add(
                res.paidChannelServiceComm,
                res.paidChannelAgentComm
              ),
              2
            ),
            this.$tool.tofixed(
              this.$tool.add(
                res.unpaidChannelServiceComm,
                res.unpaidChannelAgentComm
              ),
              2
            ),
          ],
        },
      ];
      this.customer = this.info.customerList.find(
        (v) => v.isCustomer === "Yes"
      );
      res.documentShowList.forEach((v) => {
        this.dictList.forEach((j) => {
          if (v.fileType === j.code) {
            j.srcList.push(this.$tool.getFileUrl(v.fileId));
          }
        });
      });
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
      this.paymentForm = {
        ...this.paymentForm,
        ...this.info,
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
    imageShow(src, i) {
      uni.previewImage({
        urls: src,
        current: i,
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
      margin: 20rpx 0rpx;

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