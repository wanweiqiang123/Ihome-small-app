<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-24 16:24:02
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-22 17:30:12
-->
<template>
  <view class="report-detail-wrapper">
    <view class="top-wrapper">
      <view class="info-detail">
        <view class="name">
          {{info.name}}
          <span class="name-right">{{`(${info.sex === 'Mr' ? '先生': '女士'})`}}</span>
        </view>
        <view class="phone">
          {{info.mobile}}
          <span
            v-if="info.reportType === 'FirstThreeAfterFour'"
            class="all-phone"
            @click="buquanNum"
          >补全号码</span>
        </view>
      </view>
      <view class="project-card">
        <view class="project-img">
          <u-image
            width="242rpx"
            height="186rpx"
            :src="info.projectPic"
          ></u-image>
        </view>
        <view class="project-info">
          <view>{{info.proName}}</view>
          <view>
            <u-tag
              :text="info.district"
              size="mini"
              :closeable="false"
              type="info"
            />
          </view>
          <!-- <view class="price-wrapper">
            <span class="price">均价23000</span>
            <span class="unit">元/m<span class="two">2</span></span>
          </view> -->
        </view>
      </view>
    </view>
    <u-gap
      height="25"
      bg-color="#F5F5F5"
    ></u-gap>
    <view class="step-wrapper">
      <view
        :class="currentStep === 0 ? 'step-item step-bg' : 'step-item'"
        @click="handleStep('baobei')"
      >报备</view>
      <view>
        <u-line
          color="red"
          border-style="dashed"
        />
      </view>
      <view
        :class="currentStep === 1 ? 'step-item step-bg' : 'step-item'"
        @click="handleStep('daofang')"
      >到访</view>
      <view>
        <u-line
          color="red"
          border-style="dashed"
        />
      </view>
      <view
        :class="currentStep === 2 ? 'step-item step-bg' : 'step-item'"
        @click="handleStep('chengjiao')"
      >成交</view>
    </view>
    <view
      class="info-wrapper"
      v-show="currentStep === 0"
    >
      <view class="card">
        <view class="client-info">
          <view class="title">报备信息</view>
        </view>
        <view class="info-item-wrapper">
          <view class="item-wrapper">
            <view class="item-title">报备人</view>
            <view class="item-value">{{info.reportUser ? info.reportUser : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">联系电话</view>
            <view class="item-value">{{info.reportMobile ? info.reportMobile : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">报备时间</view>
            <view class="item-value">{{info.reportDate ? info.reportDate : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">所属公司</view>
            <view class="item-value">{{info.channelName ? info.channelName : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">预计到访人数</view>
            <view class="item-value">{{info.expectedNumber ? info.expectedNumber : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">预计到访时间</view>
            <view class="item-value">{{info.expectedTime ? info.expectedTime : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">备注信息</view>
            <view class="item-value">{{info.remark ? info.remark : '--'}}</view>
          </view>
        </view>
      </view>
      <u-gap
        height="25"
        bg-color="#F5F5F5"
      ></u-gap>
      <view class="card">
        <view class="client-info">
          <view class="title">报备审核</view>
        </view>
        <view class="info-item-wrapper">
          <view class="item-wrapper">
            <view class="item-title">审核结果</view>
            <view class="item-value">{{info.reportStatus ? getDictName(info.reportStatus, ReportStatus) : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">审核时间</view>
            <view class="item-value">{{info.reportReviewDate ? info.reportReviewDate : '--'}}</view>
          </view>
        </view>
      </view>
    </view>
    <view
      class="info-wrapper"
      v-show="currentStep === 1"
    >
      <view class="card">
        <view class="client-info">
          <view class="title">到访信息</view>
        </view>
        <view class="info-item-wrapper">
          <view class="item-wrapper">
            <view class="item-title">是否拍照</view>
            <view class="item-value">{{info.isPhotoVisit ? info.isPhotoVisit : '否'}}</view>
            <view
              v-if="info.isPhotoVisit === '是'"
              style="color: #0079fe"
              @click="viewVisit"
            >查看照片</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">拍照上传时间</view>
            <view class="item-value">{{info.visitPhotoDate ? info.visitPhotoDate : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">到访时间</view>
            <view class="item-value">{{info.visitDate ? info.visitDate : '--'}}</view>
          </view>
        </view>
      </view>
      <u-gap
        height="25"
        bg-color="#F5F5F5"
      ></u-gap>
      <view class="card">
        <view class="client-info">
          <view class="title">到访审核</view>
        </view>
        <view class="info-item-wrapper">
          <view class="item-wrapper">
            <view class="item-title">审核结果</view>
            <view class="item-value">{{info.visitDate ? info.visitDate : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">到访时间</view>
            <view class="item-value">{{info.visitDate ? info.visitDate : '--'}}</view>
          </view>
        </view>
      </view>
    </view>
    <view
      class="info-wrapper"
      v-show="currentStep === 2"
    >
      <view class="card">
        <view class="client-info">
          <view class="title">成交信息</view>
        </view>
        <view class="info-item-wrapper">
          <view class="item-wrapper">
            <view class="item-title">认购栋座</view>
            <view class="item-value">{{info.subBuildingName ? info.subBuildingName : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">认购房号</view>
            <view class="item-value">{{info.roomName ? info.roomName : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">是否拍照</view>
            <view class="item-value">{{info.isPhotoDeal ? info.isPhotoDeal : '否'}}</view>
            <view
              v-if="info.isPhotoDeal === '是'"
              style="color: #0079fe"
              @click="viewDeal"
            >查看照片</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">拍照上传时间</view>
            <view class="item-value">{{info.dealPhotoDate ? info.dealPhotoDate : '--'}}</view>
          </view>
          <view class="item-wrapper">
            <view class="item-title">成交时间</view>
            <view class="item-value">{{info.dealDate ? info.dealDate : '--'}}</view>
          </view>
        </view>
      </view>
    </view>
    <u-popup
      width="80%"
      v-model="showPhone"
      mode="center"
    >
      <view class="number-title">请补全号码</view>
      <view class="number-wrapper">
        <span>{{beforeNum}}</span>
        <u-message-input @finish="changePhone"></u-message-input>
        <span>{{laterNum}}</span>
      </view>
      <view class="number-btn">
        <u-button
          type="primary"
          shape="circle"
          size="mini"
          @click="savePhone"
        >保存</u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { getReportByIdApi, postCustomerMobileApi } from "@/api/channel";
import { getAllByTypeApi } from "@/api/index";
export default {
  data() {
    return {
      homeImg: require("@/channelPackage/common/img/house.jpg"),
      currentStep: 0, // 当前进度
      showPhone: false,
      allPhoneNumber: "",
      detailId: "",
      info: {},
      ReportStatus: [],
      beforeNum: "",
      laterNum: "",
    };
  },
  async onLoad(options) {
    this.detailId = options.id;
    this.ReportStatus = await this.getDictAll("ReportStatusType");
    if (this.detailId) this.getInfo();
  },
  methods: {
    async getInfo() {
      let res = await getReportByIdApi(this.detailId);
      this.info = {
        ...res,
        projectPic: this.$tool.getFileUrl(res.projectPic),
      };
      console.log(res);
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
    buquanNum() {
      this.showPhone = true;
      this.beforeNum = this.info.mobile.slice(0, 3);
      this.laterNum = this.info.mobile.slice(7);
    },
    // 当前进度
    handleStep(val) {
      switch (val) {
        case "baobei":
          this.currentStep = 0;
          break;
        case "daofang":
          if (
            [
              "ValidVisit",
              "InvalidVisit",
              "NewDeal",
              "ValidDeal",
              "InvalidDeal",
            ].includes(this.info.reportStatus)
          ) {
            this.currentStep = 1;
          }
          break;
        case "chengjiao":
          if (
            ["NewDeal", "ValidDeal", "InvalidDeal"].includes(
              this.info.reportStatus
            )
          ) {
            this.currentStep = 2;
          }
          break;
      }
    },
    changePhone(value) {
      this.allPhoneNumber = value;
    },
    // 补全号码
    async savePhone() {
      let obj = {};
      obj.mobile = this.beforeNum + this.allPhoneNumber + this.laterNum;
      obj.reportId = this.detailId;
      await postCustomerMobileApi(obj);
      this.getInfo();
      this.$tool.toast("补全成功");
      this.showPhone = false;
    },
    // 到访信息查看照片
    viewVisit() {
      uni.previewImage({
        urls: this.info.visitAttachments.map((v) =>
          this.$tool.getFileUrl(v.fileId)
        ),
        current: 1,
      });
    },
    // 成交信息查看图片
    viewDeal() {
      uni.previewImage({
        urls: this.info.dealAttachments.map((v) =>
          this.$tool.getFileUrl(v.fileId)
        ),
        current: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.report-detail-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 10rpx;
  //background-color: #F1F1F1;

  .top-wrapper {
    width: 100%;
    box-sizing: border-box;
    //padding: 0rpx 20rpx;
    margin-top: 10rpx;
    //background-color: #FFFFFF;

    .info-detail {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx 30rpx;
      background-color: #f5f5f5;

      .name {
        font-size: 38rpx;
        font-weight: 600;
        box-sizing: border-box;
        margin-bottom: 15rpx;

        .name-right {
          font-size: 28rpx;
          font-weight: 500;
          display: inline-block;
          box-sizing: border-box;
          margin-left: 30rpx;
        }
      }

      .all-phone {
        color: #0079fe;
        display: inline-block;
        box-sizing: border-box;
        margin-left: 30rpx;
      }
    }

    .project-card {
      width: 100%;
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      padding: 20rpx 0rpx 20rpx 24rpx;
      background-color: #ffffff;

      .project-info {
        flex: 1;
        box-sizing: border-box;
        margin-left: 30rpx;

        view {
          box-sizing: border-box;
          margin-bottom: 10rpx;
        }

        .title-wrapper {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1c1c1c;
        }

        .price-wrapper {
          width: 100%;
          color: #fd4918;
          font-family: PingFang SC;

          .price {
            font-size: 32rpx;
            font-weight: 600;
          }

          .unit {
            font-size: 22rpx;
            box-sizing: border-box;
            display: inline-block;
            margin-left: 8rpx;
          }

          .two {
            vertical-align: super;
            font-size: 18rpx;
          }
        }

        .rule {
          width: 100%;
          color: #666666;

          .rule-tap {
            width: 40rpx;
            height: 40rpx;
            line-height: 40rpx;
            text-align: center;
            display: inline-block;
            background-color: orange;
            color: white;
            box-sizing: border-box;
            margin-right: 8rpx;
            border-radius: 17%;
          }
        }
      }
    }
  }

  .step-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 40rpx 10rpx 40rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;

    view {
      flex: 1;
      text-align: center;
    }

    .step-item {
      width: 90rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      border: 1rpx solid #10acf1;
      color: #10acf1;
      font-size: 26rpx;
    }

    .step-bg {
      background-color: #03a7f0;
      color: #fff9fb;
    }
  }

  .info-wrapper {
    height: calc(100vh - 500rpx);
    overflow-y: auto;
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 0rpx 30rpx 50rpx 0rpx;

    .card {
      width: 100%;
      background-color: #ffffff;

      .client-info {
        width: 100%;
        height: 46px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 0rpx 20rpx;
        //border: 2rpx solid #F1F1F1;

        .title {
          flex: 1;
          font-size: 30rpx;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #333333;
          line-height: 42rpx;
        }
      }

      .info-item-wrapper {
        width: 100%;
        box-sizing: border-box;

        .item-wrapper {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-bottom: 2rpx solid #f5f5f5;
          padding: 20rpx 20rpx;

          .item-title {
            width: 230rpx;
            text-align: left;
          }

          .item-value {
            flex: 1;
            text-align: left;
          }
        }
      }
    }
  }
}

.number-title {
  line-height: 100rpx;
  font-weight: 500;
  text-align: center;
  background: $u-type-primary;
  color: #fff;
  border-bottom: 1px solid #eeeeee;
}

.number-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 20rpx;
}

.number-btn {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 30rpx 30rpx;

  /deep/.u-btn {
    width: 100%;
    height: 60rpx;
  }
}
</style>