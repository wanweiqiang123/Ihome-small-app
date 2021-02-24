<!--
 * @Description: 成交确认页面
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-13 15:13:13
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-24 16:34:12
-->
<template>
  <view class="container safe-area-inset-bottom">
    <view class="report-head">
      <view class="report-search">
        <u-search
          style="flex: 1"
          :show-action="false"
          placeholder="请输入客户名称和手机号"
          v-model="keyword"
          height="72"
          :clearabled="true"
          @search="confirm"
        ></u-search>
        <view
          class="filter-btn"
          @click="show = true"
        >
          <span>筛选</span>
        </view>
      </view>
      <u-tabs
        :list="tabList"
        :is-scroll="false"
        :current="current"
        :bold="false"
        duration="0.2"
        @change="tabChange"
      ></u-tabs>
    </view>
    <view
      class="card-list"
      v-if="tablePage.length"
    >
      <u-card
        :border="false"
        :show-head="false"
        :show-foot="current !== 2"
        border-radius="4"
        padding="15"
        :body-style="{padding: '0'}"
        margin="30rpx 30rpx 0"
        class="ih-card"
        v-for="(i, n) in tablePage"
        :key="n"
      >
        <view
          slot="body"
          class="ih-card-content"
        >
          <view>客户姓名：{{`${i.name}(${i.sex === 'Mr' ? '先生' : '女士'})`}}</view>
          <view>客户电话：{{i.mobile | emptyFilter}}</view>
          <view>预计到访时间：{{i.expectedTime | emptyFilter}}</view>
          <view>预计到访人数：{{i.expectedNumber | emptyFilter}}</view>
          <view>报备项目：{{i.proName | emptyFilter}}</view>
          <view>项目周期：{{i.proCycle | emptyFilter}}</view>
          <view>所属渠道：{{i.channelName | emptyFilter}}</view>
          <view>报备人：{{i.reportUserName | emptyFilter}}</view>
          <view>报备人电话：{{i.reportMobile | emptyFilter}}</view>
          <!-- <view>公司门店：广州居家房地产有限公司(居家置业店)</view> -->
          <view>报备时间：{{i.reportDate | emptyFilter}}</view>
          <view>报备确认时间：{{i.reportConfirmTime  | emptyFilter}}</view>
          <view>是否有到访附件：{{i.isPhotoVisit | emptyFilter}}
            <text
              class="link"
              v-if="i.visitAttachments.length"
              @click.stop="preview(i.visitAttachments)"
            >查看附件</text>
          </view>
          <view>是否有成交附件：{{i.isPhotoDeal | emptyFilter}}
            <text
              class="link"
              v-if="i.dealAttachments.length"
              @click.stop="preview(i.dealAttachments)"
            >查看附件</text>
          </view>
          <view>认购楼盘：{{i.proName | emptyFilter}}</view>
          <view>认购栋座：{{i.subBuildingName | emptyFilter}}</view>
          <view>认购房号：{{i.roomName | emptyFilter}}</view>
          <view v-if="current === 1">成交确认时间：{{i.auditTime | emptyFilter}}</view>
          <view v-if="current === 1 && i.dealCode">关联成交报告编号：{{i.dealCode | emptyFilter}}</view>
          <view v-if="current === 2">无效时间：{{i.auditTime | emptyFilter}}</view>
          <view v-if="current !== 0">操作人：{{i.auditUserName | emptyFilter}}</view>
          <view v-if="current === 2">无效原因：{{i.comment | emptyFilter}}</view>
          <view :class="['ih-card-tag', {'bg-warning': !i.exMarket}]">{{i.exMarket ? '市场化' : '非市场化'}}</view>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <u-button
            shape="circle"
            :custom-style="{ padding: '0 40rpx', marginRight: '20rpx' }"
            size="mini"
            type="primary"
            @click="handleGoto(i)"
          >上传附件</u-button>
          <!--          <u-button-->
          <!--            v-if="current === 1 && !i.dealCode"-->
          <!--            shape="circle"-->
          <!--            :custom-style="{ padding: '0 40rpx' }"-->
          <!--            size="mini"-->
          <!--            @click="handleAddDeal(i)"-->
          <!--            type="success"-->
          <!--          >生成成交报告</u-button>-->
          <template v-if="current === 0">
            <!-- <template v-if="i.exMarket"> -->
            <u-button
              size="mini"
              shape="circle"
              :custom-style="{ padding: '0 40rpx', marginRight: '20rpx' }"
              @click="handleClick(i, 'showInvalid')"
            >无效</u-button>
            <u-button
              shape="circle"
              :custom-style="{ padding: '0 40rpx', marginRight: '20rpx' }"
              size="mini"
              type="success"
              @click="handleClick(i, 'timeShow')"
            >成交确认</u-button>
            <!-- </template>
            <template v-else> -->
            <u-button
              v-if="!i.exMarket"
              size="mini"
              shape="circle"
              type="warning"
              :custom-style="{ padding: '0 40rpx' }"
              @click.stop="handleSync(i.id)"
            >同步状态</u-button>
            <!-- </template> -->
          </template>
        </view>
      </u-card>
    </view>
    <view
      class="card-list"
      style="height: 100vh"
      v-else
    >
      <u-empty
        text="成交确认列表为空"
        mode="list"
      ></u-empty>
    </view>
    <!-- 弹出层 -->
    <PopupSearch
      v-model="show"
      @reset="handleReset()"
      @confirm="confirm()"
    >
      <u-form
        ref="uForm"
        label-position="top"
        :border-bottom="false"
      >
        <u-form-item
          label="项目名称"
          prop="name"
          :border-bottom="false"
        >
          <u-input
            v-model="queryPageParameters.proName"
            placeholder="请输入项目名称"
            border
          />
        </u-form-item>
        <u-form-item
          label="项目周期"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="queryPageParameters.proCycle"
            placeholder="请输入项目周期"
            border
          />
        </u-form-item>
        <u-form-item
          label="渠道公司名称"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="queryPageParameters.channelName"
            placeholder="请输入渠道公司名称"
            border
          />
        </u-form-item>
        <u-form-item
          label="项目类型"
          prop="intro"
          :border-bottom="false"
        >
          <IhRadio
            v-model="queryPageParameters.exMarket"
            :arrData="checkList"
          ></IhRadio>
        </u-form-item>
      </u-form>
    </PopupSearch>
    <!-- 模态框 -->
    <u-modal
      v-model="showInvalid"
      content="是否确认无效?"
      show-cancel-button
      :show-title="false"
      @confirm="submitReport(reportId, 'Invalid')"
    ></u-modal>
    <u-modal
      v-model="showValid"
      content="是否确认成交确认?"
      show-cancel-button
      :show-title="false"
      @confirm="submitReport(reportId, 'Valid')"
    ></u-modal>
    <!-- 时间选择器 -->
    <u-picker
      mode="time"
      v-model="timeShow"
      :params="params"
      @confirm="timeConfirm"
    ></u-picker>
  </view>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
import IhRadio from "../../components/IhRadio/index";
import pagination from "../../mixins/pagination";
import {
  getMyReportList,
  postReportDeal,
  postYueJiaReport,
} from "../../api/staff";

export default {
  name: "deal",
  components: {
    PopupSearch,
    IhRadio,
  },
  mixins: [pagination],
  data() {
    return {
      keyword: null,
      tabList: [
        { name: "成交未确认", value: "NewDeal" },
        { name: "已成交", value: "ValidDeal" },
        { name: "未成交", value: "InvalidDeal" },
      ],
      current: 0,
      show: false,
      reportStatus: "NewDeal",
      queryPageParameters: {
        proName: "",
        channelName: "",
        proCycle: "",
        exMarket: null,
      },
      checkList: [
        {
          code: 1,
          name: "市场化项目",
        },
        {
          code: 0,
          name: "非市场化项目",
        },
      ],
      showInvalid: false,
      showValid: false,
      reportId: null,
      timeShow: false,
      params: {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false,
      },
    };
  },
  methods: {
    async handleSync(reportId) {
      try {
        await postYueJiaReport({ reportId });
        this.$tool.toast("同步成功");
        this.confirm();
      } catch (error) {
        console.log(error);
      }
    },
    handleClick(item, type) {
      this.reportId = item.id;
      if (type === "showInvalid") {
        this.showInvalid = true;
      } else {
        this.timeShow = true;
      }
    },
    tabChange(index) {
      this.current = index;
      this.reportStatus = this.tabList[index].value;
      this.confirm();
    },
    // 预览
    preview(srcList) {
      let urls = srcList.map((i) => {
        let url = this.$tool.getFileUrl(i.fileId);
        return url;
      });
      uni.previewImage({
        urls,
        current: 1,
      });
    },
    async timeConfirm(time) {
      let visitDealTime = `${time.year}-${time.month}-${time.day}`;
      try {
        await postReportDeal({
          reportId: this.reportId,
          validOrInvalid: "Valid",
          visitDealTime,
        });
        this.$tool.toast("成交确认成功");
        this.confirm();
      } catch (error) {
        console.log(error);
      }
    },
    async submitReport(rId, type) {
      try {
        await postReportDeal({
          reportId: rId,
          validOrInvalid: type,
        });
        this.$tool.toast(`${type === "Valid" ? "成交确认成功" : "无效成功"}`);
        this.confirm();
      } catch (error) {
        console.log(error);
      }
    },
    handleReset() {
      Object.assign(this.queryPageParameters, {
        proName: "",
        channelName: "",
        proCycle: "",
        exMarket: null,
      });
    },
    confirm() {
      this.tablePage = [];
      this.queryPageParameters.pageNum = 1;
      this.getListMixin();
    },
    async getListMixin() {
      this.setPageDataMixin(
        await getMyReportList({
          ...this.queryPageParameters,
          nameOrTel: this.keyword,
          reportStatus: this.reportStatus,
        })
      );
    },
    handleGoto(item) {
      uni.navigateTo({
        url: `/staffPackage/upload/index?id=${item.id}`,
      });
    },
    // 生成成交报告
    handleAddDeal(item) {
      if (!item.id) return;
      uni.navigateTo({
        url: `/staffPackage/dealConfirm/entryDeal?id=${item.id}`,
      });
    },
  },
  onLoad() {
    this.getListMixin();
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: $u-bg-color;
  min-height: 100vh;
}
.card-list {
  padding-top: 170rpx;
  padding-bottom: 10rpx;
}
.ih-card {
  &-content {
    position: relative;
    padding: 15rpx;
    overflow: hidden;
  }
  &-tag {
    position: absolute;
    right: -50rpx;
    top: 24rpx;
    background: $u-type-primary;
    color: #fff;
    transform: rotate(42deg);
    width: 200rpx;
    // padding: 4rpx 40rpx;
    box-sizing: border-box;
    text-align: center;
    // box-shadow: 10rpx 4rpx 15rpx #888888;
    &.bg-warning {
      background: $u-type-warning;
    }
  }
  &-foot {
    text-align: right;
  }
  .link {
    color: $u-type-primary;
    margin-left: 20rpx;
  }
}
.report-head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 100;
  .report-search {
    display: flex;
    align-items: center;
    padding: 10rpx 12rpx;
    padding: 10rpx 5rpx 10rpx 30rpx;
  }
  .filter-btn {
    padding: 10rpx 14rpx;
    color: $u-type-primary;
  }
}
</style>
