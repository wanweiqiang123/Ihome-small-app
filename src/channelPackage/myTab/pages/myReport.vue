<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-24 15:22:09
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-04 11:29:40
-->
<template>
  <view class="my-report-wrapper">
    <view class="top-wrapper">
      <u-search
        class="search"
        shape="round"
        height="72"
        placeholder-color="#BDBDBD"
        search-icon-color="#BDBDBD"
        bg-color="#FFFFFF"
        border-color="#FFFFFF"
        :show-action="false"
        :clearabled="false"
        placeholder="请输入客户姓名/电话"
        v-model="keyword"
        @search="searchSomething"
      ></u-search>
    </view>
    <view class="my-report-tabs-wrapper">
      <view
        class="tabs-item"
        v-for="(item, i) in tabsList"
        :key="i"
        @click="changeTabs(item, i)"
      >
        <text :class="currentTabs === i ? 'name activating' : 'name'">{{item.name}}</text>
      </view>
    </view>
    <view class="my-report-list">
      <view
        class="list-item-wrapper"
        v-for="(item, i) in tablePage"
        :key="i"
      >
        <view class="item-info">
          <view class="name-wrapper">
            <view class="name">{{item.name}}</view>
            <view class="status">{{getDictName(item.reportStatus, ReportStatus)}}</view>
          </view>
          <view class="phone">{{item.mobile}}</view>
          <view class="location">{{item.proName}}</view>
          <view class="time">{{item.reportDate}}</view>
        </view>
        <view class="item-btn u-padding-right-20">
          <u-button
            shape="circle"
            type="primary"
            @click="viewDetails(item.id)"
          >查看详情</u-button>
          <u-button
            shape="circle"
            type="warning"
            @click="uploadAttachment(item.id)"
          >上传附件</u-button>
          <u-button
            shape="circle"
            type="error"
            @click="handleDealRegister(item.id)"
            v-show="currentTabs === 1"
          >成交登记</u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { postCustomerReportListApi } from "@/api/channel";
import { getAllByTypeApi } from "@/api/index";
import pagination from "../../../mixins/pagination";
export default {
  mixins: [pagination],
  data() {
    return {
      keyword: "",
      tabsList: [
        {
          name: "已报备",
          code: "Report",
        },
        {
          name: "已到访",
          code: "Visit",
        },
        {
          name: "已成交",
          code: "Deal",
        },
        {
          name: "无效单",
          code: "Invalid",
        },
      ],
      currentTabs: 0,
      ReportStatus: [],
    };
  },
  onLoad() {
    this.getListMixin();
  },
  async onShow() {
    this.ReportStatus = await this.getDictAll("ReportStatusType");
  },
  methods: {
    async getListMixin() {
      this.queryPageParameters.type = this.tabsList[this.currentTabs].code;
      let res = await postCustomerReportListApi(this.queryPageParameters);
      this.setPageDataMixin(res);
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
    searchSomething() {
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.queryPageParameters.nameOrTel = this.keyword;
      this.getListMixin();
    },
    // 切换tabs
    changeTabs(item, index) {
      this.currentTabs = index;
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.getListMixin();
    },
    // 成交登记
    handleDealRegister(id) {
      uni.navigateTo({
        url: `/channelPackage/homeTab/pages/reportClient?type=dealReg&&id=${id}`,
      });
    },
    // 上传附件
    uploadAttachment(id) {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/uploadAttachment?id=${id}`,
      });
    },
    // 查看详情
    viewDetails(id) {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/reportDetails?id=${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-report-wrapper {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: #f1f1f1;

  .top-wrapper {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    box-sizing: border-box;
    padding: 0rpx 30rpx;
  }

  .my-report-tabs-wrapper {
    width: 100%;
    height: 78rpx;
    background: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;

    .tabs-item {
      flex: 1;
      font-size: 30rpx;
      font-family: PingFang SC;
      color: #303133;

      .name {
        width: 128rpx;
        height: 42rpx;
        border-radius: 21rpx;
        display: inline-block;
      }
    }

    .activating {
      font-weight: bold;
      background: $u-type-primary;
      color: #ffffff;
      transition-duration: 0.5s;
    }
  }

  .my-report-list {
    width: 100%;
    height: calc(100vh - 170rpx);
    overflow-y: auto;
    box-sizing: border-box;
    padding: 18rpx 30rpx;

    .list-item-wrapper {
      width: 100%;
      //height: 322rpx;
      box-sizing: border-box;
      margin-bottom: 20rpx;
      background-color: #ffffff;

      .item-info {
        width: 100%;
        //height: 222rpx;
        box-sizing: border-box;
        padding: 28rpx 0rpx 34rpx 32rpx;
        border-bottom: 2rpx dashed #f1f1f1;

        .name-wrapper {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;

          .name {
            flex: 1;
            font-size: 30rpx;
            font-weight: 600;
            font-family: PingFang SC;
            font-weight: 600;
            color: #1f1f1f;
            line-height: 48rpx;
          }

          .status {
            width: 106rpx;
            height: 44rpx;
            line-height: 44rpx;
            text-align: center;
            border-top-left-radius: 20rpx;
            border-bottom-left-radius: 20rpx;
            background: #00c777;
            color: #ffffff;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 600;
          }
        }

        .phone,
        .location,
        .time {
          width: 100%;
          box-sizing: border-box;
          font-size: 26rpx;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #606266;
          line-height: 40rpx;
        }
      }

      .item-btn {
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;
        text-align: right;
        box-sizing: border-box;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;

        /deep/.u-btn {
          width: 200rpx;
          height: 66rpx;
          margin-left: 20rpx;
        }
      }
    }
  }
}
</style>