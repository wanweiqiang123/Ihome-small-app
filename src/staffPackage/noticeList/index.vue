<!--
 * @Description: 优惠告知书列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-23 15:54:19
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-27 09:59:55
-->
<template>
  <view class="notice safe-area-inset-bottom">
    <view class="item-container">
      <view
        class="notice-item"
        v-for="(i) in 10"
        :key="i"
        @click="handleGoConfirm()"
      >
        <view class="notice-info">
          <view class="notice-title">优惠告知书(1238755544645)</view>
          <view>保利XX项目 住宅-10栋-1501</view>
          <view>刘伟</view>
        </view>
        <view>
          <text class="notice-color">信息待确认</text>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
    <view class="notice-btn safe-area-inset-bottom">
      <u-button
        shape="circle"
        type="primary"
        @click="handleGoCreate()"
      >生成优惠告知书</u-button>
    </view>
    <!-- 筛选按钮 -->
    <view
      class="fliter"
      @click="isShow = true"
    >
      <view>筛选</view>
    </view>
    <!-- 筛选弹出 -->
    <PopupSearch
      v-model="isShow"
      @reset="handleReset()"
    >
      <u-form
        :model="form"
        ref="notice"
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
          label="房号"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            border
          />
        </u-form-item>
        <u-form-item
          label="客户姓名"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            placeholder="请输入客户姓名"
            border
          />
        </u-form-item>
        <u-form-item
          label="客户电话"
          prop="intro"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            placeholder="请输入客户电话"
            border
          />
        </u-form-item>
        <u-form-item
          label="优惠告知书编号"
          :border-bottom="false"
        >
          <u-input
            v-model="form.intro"
            placeholder="请输入优惠告知书编号"
            border
          />
        </u-form-item>
        <u-form-item
          label="优惠告知书类型"
          :border-bottom="false"
        >
          <u-checkbox-group @change="handleCheckbox">
            <u-checkbox
              v-for="(item, i) in checkbox"
              :key="i"
              :name="item.name"
              v-model="item.check"
            >{{item.name}}</u-checkbox>
          </u-checkbox-group>
        </u-form-item>
        <u-form-item
          label="状态"
          :border-bottom="false"
        >
          <u-radio-group v-model="form.xx">
            <u-radio name="1">信息待确认</u-radio>
            <u-radio name="2">客户待签署</u-radio>
            <u-radio name="3">客户已签署</u-radio>
            <u-radio name="4">待支付</u-radio>
            <u-radio name="5">分公司业管待审核</u-radio>
            <u-radio name="6">已生效</u-radio>
          </u-radio-group>
        </u-form-item>
      </u-form>
    </PopupSearch>
  </view>
</template>

<script>
import PopupSearch from "../../components/PopupSearch/index.vue";
export default {
  name: "notice-list",
  components: {
    PopupSearch,
  },
  data() {
    return {
      isShow: false,
      form: {
        name: null,
        value: [],
      },
      checkbox: [
        {
          check: false,
          name: "优惠告知书",
        },
        {
          check: false,
          name: "补充协议",
        },
        {
          check: false,
          name: "终止协议",
        },
      ],
    };
  },
  methods: {
    handleGoConfirm() {
      uni.navigateTo({
        url: "/staffPackage/noticeConfirm/index",
      });
    },
    handleGoCreate() {
      uni.navigateTo({
        url: "/staffPackage/noticeCreate/index",
      });
    },
    handleCheckbox(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  background: $u-bg-color;
  min-height: 100vh;
}
.fliter {
  position: fixed;
  top: 20rpx;
  right: 0;
  z-index: 100;
  color: #fff;
  background: #f6d45b;
  width: 150rpx;
  line-height: 71rpx;
  border-radius: 50rpx 0 0 50rpx;
  padding: 0 44rpx 0 47rpx;
  font-size: 30rpx;
  // .fliter-btn {
  //   padding: 20rpx 30rpx;
  // }
}
.item-container {
  padding: 20rpx 30rpx 116rpx;
  .notice-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 20rpx;
    background: #fff;
    .notice-info {
      color: #ccc;
      line-height: 42rpx;
      font-size: 26rpx;
      font-family: Source Han Sans CN;
    }
    .notice-title {
      font-size: 30rpx;
      font-family: "Source Han Sans CN";
      font-weight: bold;
      color: #333333;
      // margin-bottom: 19rpx;
    }
    .notice-color {
      color: #0099ff;
    }
  }
  .notice-item + .notice-item {
    margin-top: 20rpx;
  }
}
.notice-btn {
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
  z-index: 10;
}
</style>
