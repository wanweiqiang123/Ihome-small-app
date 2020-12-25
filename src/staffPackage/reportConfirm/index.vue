<!--
 * @Description: 报备确认页面
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-13 15:13:13
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-16 17:22:12
-->
<template>
  <view class="container safe-area-inset-bottom">
    <view class="report-head">
      <view class="report-search">
        <u-search
          style="flex: 1"
          :show-action="false"
          placeholder="请输入客户名称和手机号"
          v-model="queryPageParameters.name"
          height="72"
          :clearabled="true"
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
          <text ref="text">
            客户姓名：{{`${i.name}(${i.sex === 'Mr' ? '先生' : '女士'})`}}
            客户电话：{{i.mobile}}
            预计到访时间：{{i.visitDate}}
            预计到访人数：2
            报备项目：{{i.proName}}
            项目周期：{{i.proCycle}}
            所属渠道：{{i.channelName}}
            报备人：{{i.reportUser}}
            报备人电话：18761234521
            公司门店：广州居家房地产有限公司(居家置业店)
            报备时间：{{i.reportDate}}
          </text>
          <view class="ih-card-tag">市场化</view>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <u-button
            size="mini"
            type="primary"
            class="foot-btn"
            @click="handleCopy()"
          >一键复制</u-button>
          <u-button
            size="mini"
            class="foot-btn"
          >无效</u-button>
          <u-button
            class="foot-btn"
            size="mini"
            type="success"
          >有效</u-button>
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
          <IhCheckbox
            v-model="exMarketList"
            :arr="checkList"
          ></IhCheckbox>
        </u-form-item>
      </u-form>
    </PopupSearch>
  </view>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
import IhCheckbox from "../../components/IhCheckbox/index.vue";
import pagination from "../../mixins/pagination";
import { postReportList } from "../../api/staff";

export default {
  name: "report",
  components: {
    PopupSearch,
    IhCheckbox,
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
      queryPageParameters: {
        proName: null,
        proCycle: null,
        channelName: null,
        exMarket: null,
        name: null,
        reportStatus: "UnderReview",
      },
      exMarketList: [],
      checkList: [
        {
          value: 1,
          name: "市场化项目",
        },
        {
          value: 0,
          name: "非市场化项目",
        },
      ],
    };
  },
  methods: {
    tabChange(index) {
      this.current = index;
    },
    handleReset() {
      Object.assign(this.queryPageParameters, {
        proName: null,
        proCycle: null,
        channelName: null,
        exMarket: null,
      });
    },
    handleCopy(data) {
      uni.setClipboardData({
        data: `客户姓名：陈家家(先生)
客户电话：1389998444
预计到访时间：2020-08-25 16:30
预计到访人数：2
报备项目：保利十方舟
项目周期：20200310~20200410
所属渠道：中介
报备人：艾佳佳
报备人电话：18761234521
公司门店：广州居家房地产有限公司(居家置业店)
报备时间：2020-08-25 16:40:12`,
        success: function () {
          console.log("success");
        },
      });
    },
    async getListMixin() {
      this.setPageDataMixin(await postReportList(this.queryPageParameters));
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
    right: -40rpx;
    top: 22rpx;
    background: $u-type-primary;
    color: #fff;
    transform: rotate(42deg);
    width: 200rpx;
    padding: 4rpx 40rpx;
    box-sizing: border-box;
    text-align: center;
    box-shadow: 10rpx 4rpx 15rpx #888888;
  }
  &-foot {
    text-align: right;
    .foot-btn + .foot-btn {
      margin-left: 30rpx;
    }
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
