<!--
 * @Description: 成交确认页面
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-13 15:13:13
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-07 16:47:27
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
    <view class="card-list">
      <u-card
        :border="false"
        :show-head="false"
        border-radius="4"
        padding="15"
        :body-style="{padding: '0'}"
        margin="30rpx 30rpx 0"
        class="ih-card"
        v-for="i in 2"
        :key="i"
      >
        <view
          slot="body"
          class="ih-card-content"
        >
          <view>客户姓名：陈家家(先生)</view>
          <view>客户电话：1389998444</view>
          <view>预计到访时间：2020-08-25 16:30</view>
          <view>预计到访人数：2</view>
          <view>报备项目：保利十方舟</view>
          <view>项目周期：20200310~20200410</view>
          <view>所属渠道：中介</view>
          <view>报备人：艾佳佳</view>
          <view>报备人电话：18761234521</view>
          <view>公司门店：广州居家房地产有限公司(居家置业店)</view>
          <view>报备时间：2020-08-25 16:40:12</view>
          <view>报备确认时间：2020-08-25 16:40:12</view>
          <view>是否有到访附件：是 <text class="link">查看附件</text></view>
          <view>是否有成交附件：是 <text class="link">查看附件</text></view>
          <view>认购楼盘：亚运村天成</view>
          <view>认购栋座：19栋</view>
          <view>认购房号：1902号</view>
          <view class="ih-card-tag">市场化</view>
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
            v-model="form.intro"
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
            v-model="form.intro"
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
            v-model="form.value"
            :data="checkList"
          ></IhCheckbox>
        </u-form-item>
      </u-form>
    </PopupSearch>
  </view>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
import IhCheckbox from "../../components/IhCheckbox/index.vue";

export default {
  name: "deal",
  components: {
    PopupSearch,
    IhCheckbox,
  },
  data() {
    return {
      keyword: null,
      tabList: [{ name: "成交未确认" }, { name: "已成交" }, { name: "未成交" }],
      current: 0,
      show: false,
      form: {
        name: null,
        intro: null,
        value: [],
      },
      checkList: [
        {
          value: 1,
          name: "市场化项目",
        },
        {
          value: 2,
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
