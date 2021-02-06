<!--
 * @Description: 业绩申报列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 14:54:27
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-04 15:33:18
-->
<template>
  <LoginPage>
    <view class="performance safe-area-inset-bottom">
      <view class="performance-search">
        <u-search
          style="flex: 1"
          :show-action="false"
          bg-color="#fff"
          @search="confirm"
          @blur="confirm"
          placeholder="输入成交报告编号或客户姓名"
          v-model="queryPageParameters.dealCodeOrCusName"
          :clearabled="true"
        ></u-search>
        <view class="filter-btn" @click="isShow = true">
          <span>筛选</span>
        </view>
      </view>
      <view class="performance-list" v-if="tablePage.length">
        <u-card
          :border="false"
          class="ih-card"
          padding="15"
          margin="20rpx 30rpx"
          border-radius="4"
          v-for="(item, index) in tablePage"
          :key="index">
          <view slot="head">
            <view class="item-title">
              <text class="title-text">成交报告编号：{{item.dealCode}}</text>
              <text class="title-icon">{{getStatusName(item.status)}}</text>
            </view>
          </view>
          <view slot="body" class="ih-card-content">
            <view>项目周期：{{item.termName}}</view>
            <view>合同类型：{{item.contType | filterContType(contentTypeList)}}</view>
            <view>客户名称：{{item.customerName}}</view>
            <view>成交阶段：{{item.stage | filterStage(stageList)}}</view>
          </view>
          <view slot="foot" class="ih-card-foot">
            <u-button
              v-if="item.status === 'Draft'"
              size="mini"
              type="error"
              shape="circle"
              class="foot-btn"
              :custom-style="{ padding: '0 40rpx' }"
            >删除</u-button>
            <u-button
              v-if="item.status === 'Draft'"
              size="mini"
              type="primary"
              shape="circle"
              class="foot-btn"
              :custom-style="{ padding: '0 40rpx' }"
            >修改</u-button>
            <u-button
              size="mini"
              type="success"
              shape="circle"
              class="foot-btn"
              :custom-style="{ padding: '0 40rpx' }"
            >详情</u-button>
          </view>
        </u-card>
      </view>
      <view v-else style="height: 100vh">
        <u-empty text="列表为空" mode="list"></u-empty>
      </view>
      <view class="performance-btn safe-area-inset-bottom">
        <u-button shape="circle" type="primary" @click="handleGo()">业绩申报</u-button>
      </view>
      <!-- 筛选弹出 -->
      <PopupSearch v-model="isShow" @reset="handleReset" @confirm="confirm">
        <u-form :model="queryPageParameters" ref="queryPageParameters" label-position="top" :border-bottom="false">
          <u-form-item label="项目周期" :border-bottom="false">
            <u-input
              v-model="queryPageParameters.proName"
              border
              @click="handleSelectCycle"
              placeholder="请选择项目周期"
              type="select"/>
          </u-form-item>
          <u-form-item label="合同类型" :border-bottom="false">
            <u-input
              v-model="queryPageParameters.contTypeName"
              border
              @click="showContentType = true"
              placeholder="请选择合同类型"
              type="select"/>
          </u-form-item>
          <u-form-item label="成交阶段" :border-bottom="false">
            <u-input
              v-model="queryPageParameters.stageName"
              border
              @click="showStage = true"
              placeholder="请选择成交阶段"
              type="select"/>
          </u-form-item>
          <u-form-item label="成交状态" :border-bottom="false">
            <u-input
              v-model="queryPageParameters.statusName"
              border
              @click="showStatus = true"
              placeholder="请选择成交状态"
              type="select"/>
          </u-form-item>
        </u-form>
      </PopupSearch>
      <!-- 下拉框 -->
      <u-select
        v-model="showContentType"
        :list="contentTypeList"
        safe-area-inset-bottom
        title="请选择合同类型"
        value-name="code"
        label-name="name"
        @confirm="confirmContentType"
      ></u-select>
      <u-select
        v-model="showStage"
        :list="stageList"
        safe-area-inset-bottom
        title="请选择成交阶段"
        value-name="code"
        label-name="name"
        @confirm="confirmStage"
      ></u-select>
      <u-select
        v-model="showStatus"
        :list="statusList"
        safe-area-inset-bottom
        title="请选择成交状态"
        value-name="code"
        label-name="name"
        @confirm="confirmStatus"
      ></u-select>
    </view>
  </LoginPage>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
import pagination from "../../mixins/pagination";
import {getDealList} from "@/api/staff";
import {getAllByTypeApi} from "@/api";

export default {
  name: "performance",
  components: {
    PopupSearch,
  },
  mixins: [pagination],
  filters: {
    filterContType(type, data) {
      const item = data.find((i) => i.code === type);
      return item?.name || "";
    },
    filterStage(type, data) {
      const item = data.find((i) => i.code === type);
      return item?.name || "";
    },
  },
  data() {
    return {
      queryPageParameters: {
        dealCodeOrCusName: null,
        projectCycle: null,
        proName: null,
        contType: null,
        contTypeName: null,
        stage: null,
        stageName: null,
        status: null,
        statusName: null
      },
      isShow: false,
      showContentType: false,
      contentTypeList: [],
      showStage: false,
      stageList: [],
      showStatus: false,
      statusList: [
        {
          value: 'All',
          label: '全部',
        },
        {
          value: 'Draft',
          label: '草稿',
        },
        {
          value: 'AchieveDeclareUnconfirm',
          label: '待确认',
        },
        {
          value: 'HasConfirm',
          label: '已确认',
        }
      ],
      dealStatusList: [],
    };
  },
  async onLoad() {
    await this.getListMixin();
    this.contentTypeList = await this.getDictName("ContType");
    // console.log(this.contentTypeList);
    this.stageList = await this.getDictName("DealStage");
    this.dealStatusList = await this.getDictName("DealStatus");
  },
  async onShow() {
    let item = getApp().globalData.searchBackData;
    // console.log('item', item);
    if (item && item.type === "term") {
      this.queryPageParameters.projectCycle = item.data.termId;
      this.queryPageParameters.proName = item.data.termName;
      getApp().globalData.searchBackData = {};
    }
  },
  methods: {
    // 业绩申报
    handleGo() {
      uni.navigateTo({
        url: "/staffPackage/performanceEdit/index",
      });
    },
    // 搜索 - 重置
    handleReset() {
      Object.assign(this.queryPageParameters, {
        projectCycle: null,
        proName: null,
        contType: null,
        contTypeName: null,
        stage: null,
        stageName: null,
        status: null,
        statusName: null,
        isConfirmed: false // 是否已确认
      });
    },
    // 搜索 - 确定
    async confirm() {
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.setPageDataMixin(await getDealList(this.getData()));
      // console.log(this.queryPageParameters);
    },
    // 选择项目周期
    handleSelectCycle() {
      getApp().globalData.searchParams = {
        api: "postAllTermApi",
        key: "termName",
        id: "termId",
        type: "term",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 确定选择合同类型
    confirmContentType(item) {
      if (item && item.length) {
        this.queryPageParameters.contTypeName = item[0].label;
        this.queryPageParameters.contType = item[0].value;
      }
    },
    // 确定选择成交阶段
    confirmStage(item) {
      if (item && item.length) {
        this.queryPageParameters.stageName = item[0].label;
        this.queryPageParameters.stage = item[0].value;
      }
    },
    // 确定选择成交状态
    confirmStatus(item) {
      if (item && item.length) {
        this.queryPageParameters.statusName = item[0].label;
        this.queryPageParameters.status = item[0].value;
      }
    },
    // 获取业绩申报列表数据
    async getListMixin() {
      try {
        this.setPageDataMixin(await getDealList(this.getData()));
      } catch (error) {
        // console.log(error);
        uni.showToast({
          title: error.msg || '获取数据异常',
          duration: 3000
        });
      }
    },
    // 获取搜索条件
    getData() {
      let postData = {
        dealCodeOrCusName: this.queryPageParameters.dealCodeOrCusName,
        projectCycle: this.queryPageParameters.projectCycle,
        contType: this.queryPageParameters.contType,
        stage: this.queryPageParameters.stage,
        status: ['All', 'HasConfirm'].includes(this.queryPageParameters.status) ? null : this.queryPageParameters.status,
        isConfirmed: this.queryPageParameters.status === "HasConfirm", // 是否已确认
        isMobileTermination: true,
        pageNum: this.queryPageParameters.pageNum,
        pageSize: this.queryPageParameters.pageSize,
      }
      if (['All', 'HasConfirm'].includes(this.queryPageParameters.status)) {

      }
      return postData;
    },
    // 获取对应类型的字典
    async getDictName(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 状态名字
    getStatusName(type) {
      let name = "";
      if (type) {
        switch (type) {
          case "Draft":
            name = "草稿";
            break;
          case "AchieveDeclareUnconfirm":
            name = "待确认";
            break;
          case "Reject":
            name = "待确认";
            break;
          default:
            name = "已确认";
            break;
        }
      }
      return name;
    }
  },
};
</script>

<style lang="scss" scoped>
.performance {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-search {
    position: fixed;
    display: flex;
    align-items: center;
    padding: 10rpx 0 8rpx 30rpx;
    background: $u-bg-color;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .filter-btn {
    padding: 0 44rpx 0 47rpx;
    margin-left: 16rpx;
    width: 150rpx;
    line-height: 71rpx;
    background: #fcd639;
    color: #fff;
    border-radius: 50rpx 0 0 50rpx;
    font-size: 30rpx;
  }
  &-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: content-box;
    height: 90rpx;
    padding-top: 10rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    background: #fff;
    z-index: 100;
  }
}
.performance-list {
  padding-top: 70rpx;
  padding-bottom: 90rpx;
}
.ih-card {
  &-content {
    line-height: 42rpx;
    color: #606266;
    font-size: 26rpx;
  }
  &-foot {
    text-align: right;
    .foot-btn + .foot-btn {
      margin-left: 30rpx;
    }
  }
  .item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-icon {
      padding: 5rpx 10rpx;
      border-radius: 4rpx;
      color: #18b566;
      white-space: nowrap;
      // background: $u-type-success;
      box-sizing: border-box;
      font-size: 26rpx;
      line-height: 1;
    }
    .title-text {
      white-space: nowrap;
      font-weight: bold;
      font-size: 30rpx;
      font-weight: 600;
      line-height: 48rpx;
    }
  }
}
</style>
