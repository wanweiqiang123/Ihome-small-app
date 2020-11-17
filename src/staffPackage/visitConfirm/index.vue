<!--
 * @Description: 到访确认页
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-17 10:54:41
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-17 15:31:13
-->
<template>
  <view>
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
          >有效</u-button>
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
          >有效</u-button>
        </view>
      </u-card>
    </view>
    <!-- 弹出 -->
    <PopupSearch v-model="show">
      <u-form
        :model="form"
        ref="uForm"
        label-position="top"
        :border-bottom="false"
      >
        <u-form-item
          label="姓名"
          prop="name"
          :border-bottom="false"
        >
          <u-input
            v-model="form.name"
            border
          />
        </u-form-item>
        <u-form-item
          label="简介"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
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
  name: "report",
  components: { PopupSearch },
  data() {
    return {
      keyword: null,
      list: [{ name: "市场化项目" }, { name: "非市场化项目" }],
      tabList: [
        { name: "到访未确认" },
        { name: "到访有效" },
        { name: "到访无效" },
      ],
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
  },
};
</script>

<style lang="scss" scoped>
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