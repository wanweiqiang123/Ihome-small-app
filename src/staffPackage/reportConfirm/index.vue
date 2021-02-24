<!--
 * @Description: 报备确认页面
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-13 15:13:13
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-24 15:15:29
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
          <view>
            <view>客户姓名：{{`${i.name}(${i.sex === 'Mr' ? '先生' : '女士'})`}}</view>
            <view>客户电话：{{i.mobile | emptyFilter}}</view>
            <view>预计到访时间：{{i.expectedTime | emptyFilter}}</view>
            <view>预计到访人数：{{i.expectedNumber | emptyFilter}}</view>
            <view>报备项目：{{i.proName | emptyFilter}}</view>
            <view>项目周期：{{i.proCycle | emptyFilter}}</view>
            <view>所属渠道：{{i.channelName | emptyFilter}}</view>
            <view>报备人：{{i.reportUserName | emptyFilter}}</view>
            <view>报备人电话：{{i.reportMobile | emptyFilter}}</view>
            <view>报备时间：{{i.reportDate | emptyFilter}}</view>
            <view v-if="current === 1">报备确认时间：{{i.auditTime | emptyFilter}}</view>
            <view v-if="current === 2">无效时间：{{i.auditTime | emptyFilter}}</view>
            <view v-if="current !== 0">操作人：{{i.auditUserName | emptyFilter}}</view>
            <view v-if="current === 2">无效原因：{{i.comment | emptyFilter}}</view>
          </view>
          <!-- 公司门店：广州居家房地产有限公司(居家置业店) -->
          <view :class="['ih-card-tag', {'bg-warning': !i.exMarket}]">{{i.exMarket ? '市场化' : '非市场化'}}</view>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <u-button
            size="mini"
            type="primary"
            shape="circle"
            :custom-style="{ padding: '0 40rpx', marginRight: '20rpx' }"
            @click="handleCopy(i)"
          >一键复制</u-button>
          <template v-if="current === 0">
            <u-button
              size="mini"
              shape="circle"
              :custom-style="{ padding: '0 40rpx', marginRight: '20rpx' }"
              @click="handleClick(i, 'showInvalid')"
            >无效</u-button>
            <u-button
              shape="circle"
              :custom-style="{ padding: '0 40rpx' }"
              size="mini"
              type="success"
              @click="handleClick(i, 'showValid')"
            >有效</u-button>
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
        text="报备列表为空"
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
      content="是否确认有效?"
      show-cancel-button
      :show-title="false"
      @confirm="submitReport(reportId, 'Valid')"
    ></u-modal>
  </view>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
import IhRadio from "../../components/IhRadio/index";
import pagination from "../../mixins/pagination";
import { postReportList, reportValidOrInvalid } from "../../api/staff";

export default {
  name: "report",
  components: {
    PopupSearch,
    IhRadio,
  },
  mixins: [pagination],
  data() {
    return {
      keyword: null,
      tabList: [
        { name: "报备未确认", value: "UnderReview" },
        { name: "报备有效", value: "ValidReport" },
        { name: "报备无效", value: "InvalidReport" },
      ],
      current: 0,
      show: false,
      reportStatus: "UnderReview",
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
    };
  },
  methods: {
    handleClick(item, type) {
      this.reportId = item.id;
      if (type === "showValid") {
        this.showValid = true;
      } else {
        this.showInvalid = true;
      }
    },
    tabChange(index) {
      this.current = index;
      this.reportStatus = this.tabList[index].value;
      this.confirm();
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
    async submitReport(rId, type) {
      try {
        await reportValidOrInvalid({
          reportIds: [rId],
          validOrInvalid: type,
        });
        this.$tool.toast(`${type === "Valid" ? "有效成功" : "无效成功"}`);
        this.confirm();
      } catch (error) {
        console.log(error);
      }
    },
    handleCopy(data) {
      let copyStr = "";
      if (this.current === 0) {
        copyStr = `客户姓名：${data.name}(${
          data.sex === "Mr" ? "先生" : "女士"
        })
客户电话：${data.mobile}
预计到访时间：${data.expectedTime}
预计到访人数：${data.expectedNumber}
报备项目：${data.proName}
项目周期：${data.proCycle}
所属渠道：${data.channelName || "-"}
报备人：${data.reportUser || "-"}
报备人电话：${data.reportMobile || "-"}
报备时间：${data.reportDate}`;
      }
      if (this.current === 1) {
        copyStr = `客户姓名：${data.name}(${
          data.sex === "Mr" ? "先生" : "女士"
        })
客户电话：${data.mobile}
预计到访时间：${data.expectedTime}
预计到访人数：${data.expectedNumber}
报备项目：${data.proName}
项目周期：${data.proCycle}
所属渠道：${data.channelName || "-"}
报备人：${data.reportUser || "-"}
报备人电话：${data.reportMobile || "-"}
报备时间：${data.reportDate}
报备确认时间：${data.auditTime}
操作人：${data.auditUserName}`;
      }
      if (this.current === 2) {
        copyStr = `客户姓名：${data.name}(${
          data.sex === "Mr" ? "先生" : "女士"
        })
客户电话：${data.mobile}
预计到访时间：${data.expectedTime}
预计到访人数：${data.expectedNumber}
报备项目：${data.proName}
项目周期：${data.proCycle}
所属渠道：${data.channelName || "-"}
报备人：${data.reportUser || "-"}
报备人电话：${data.reportMobile || "-"}
报备时间：${data.reportDate}
无效时间：${data.auditTime}
操作人：${data.auditUserName}
无效原因：${data.comment}`;
      }
      uni.setClipboardData({
        data: copyStr,
        success: function () {
          uni.showToast({
            title: "复制成功",
            icon: "success",
            duration: 2000,
          });
        },
      });
    },
    async getListMixin() {
      this.setPageDataMixin(
        await postReportList({
          ...this.queryPageParameters,
          nameOrTel: this.keyword,
          reportStatus: this.reportStatus,
        })
      );
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
    padding: 10rpx 5rpx 10rpx 30rpx;
  }
  .filter-btn {
    padding: 10rpx 14rpx;
    color: $u-type-primary;
  }
}
</style>
