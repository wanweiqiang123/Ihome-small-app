<!--
 * @Description: 成交确认页面
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-13 15:13:13
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-24 14:30:20
-->
<template>
  <view class="container safe-area-inset-bottom">
    <view class="report-head">
      <u-subsection
        :list="list"
        :current="0"
      ></u-subsection>
      <view class="report-search">
        <u-search
          style="flex: 1"
          :show-action="false"
          placeholder="日照香炉生紫烟"
          v-model="keyword"
          :clearabled="true"
        ></u-search>
        <view>
          <span @click="show = true">筛选</span>
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
    <view class="card-list">
      <u-card
        :border="false"
        :show-head="false"
        class="ih-card"
      >
        <view slot="body">
          <text>
            客户姓名：陈家家(先生)
            客户电话：1389998444
            预计到访时间：2020-08-25 16:30
            预计到访人数：2
            报备项目：保利十方舟
            项目周期：20200310~20200410
            所属渠道：中介
            报备人：艾佳佳
            报备人电话：18761234521
            公司门店：广州居家房地产有限公司(居家置业店)
            报备时间：2020-08-25 16:40:12
            报备确认时间：2020-08-25 16:40:12
            是否有到访附件：是
            是否有成交附件：是
            认购楼盘：亚运村天成
            认购栋座：19栋
            认购房号：1902号
          </text>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <u-button
            class="foot-btn"
            size="mini"
            type="primary"
          >上传附件</u-button>
          <u-button
            size="mini"
            class="foot-btn"
          >无效</u-button>
          <u-button
            class="foot-btn"
            size="mini"
            type="success"
          >成交确认</u-button>
        </view>
      </u-card>
      <u-card
        :border="false"
        :show-head="false"
        class="ih-card"
      >
        <view slot="body">
          <text>
            客户姓名：陈家家(先生)
            客户电话：1389998444
            预计到访时间：2020-08-25 16:30
            预计到访人数：2
            报备项目：保利十方舟
            项目周期：20200310~20200410
            所属渠道：中介
            报备人：艾佳佳
            报备人电话：18761234521
            公司门店：广州居家房地产有限公司(居家置业店)
            报备时间：2020-08-25 16:40:12
            报备确认时间：2020-08-25 16:40:12
            是否有到访附件：是
            是否有成交附件：是
            认购楼盘：亚运村天成
            认购栋座：19栋
            认购房号：1902号
          </text>
        </view>
        <view
          slot="foot"
          class="ih-card-foot"
        >
          <u-button
            class="foot-btn"
            size="mini"
            type="primary"
          >上传附件</u-button>
          <u-button
            size="mini"
            class="foot-btn"
          >无效</u-button>
          <u-button
            class="foot-btn"
            size="mini"
            type="success"
          >成交确认</u-button>
        </view>
      </u-card>
    </view>
    <!-- 弹出层 -->
    <PopupSearch
      v-model="show"
      @reset="handleReset()"
    >
      <u-form
        :model="form"
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
            v-model="form.name"
            border
            type="select"
          />
        </u-form-item>
        <u-form-item
          label="项目周期"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            border
          />
        </u-form-item>
        <u-form-item
          label="渠道公司名称"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            placeholder="渠道公司名称"
            border
          />
        </u-form-item>
      </u-form>
    </PopupSearch>
  </view>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";

export default {
  name: "deal",
  components: {
    PopupSearch,
  },
  data() {
    return {
      keyword: null,
      list: [{ name: "市场化项目" }, { name: "非市场化项目" }],
      tabList: [{ name: "成交未确认" }, { name: "已成交" }, { name: "未成交" }],
      current: 0,
      show: false,
      form: {
        name: null,
        intro: null,
      },
    };
  },
  methods: {
    tabChange(index) {
      this.current = index;
    },
    handleReset() {
      Object.assign(this.form, {
        name: null,
        intro: null,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: $u-bg-color;
}
.card-list {
  padding-top: 220rpx;
  padding-bottom: 10rpx;
  background: $u-bg-color;
  min-height: 100vh;
}
.ih-card {
  .ih-card-foot {
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
    padding: 10rpx 12rpx;
  }
}
</style>
<style lang="scss">
.ih-card {
  &:last-child {
    .u-card {
      margin-bottom: 0 !important;
    }
  }
}
</style>
