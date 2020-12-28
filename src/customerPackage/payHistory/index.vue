<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-25 11:40:27
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-28 15:44:06
-->
<template>
  <view class="box">
    <view
      class="box-item"
      v-for="(item, i) in info"
      :key="i"
    >
      <view class="box-item-title">
        <view style="font-weight: bold;">付款金额：{{item.amount}}</view>
        <view>
          <u-button
            type="primary"
            size="mini"
            @click="downLoad(item.id)"
          >下载电子回单</u-button>
        </view>
      </view>
      <view class="box-item-msg">
        <view class="box-item-msg-item">
          <view class="box-item-msg-title">付款单号
            <text class="box-item-msg-detail">{{item.payNo}}</text>
          </view>
          <view class="box-item-msg-title">付款方式
            <text class="box-item-msg-detail">{{getDictName(item.payType, PayType)}}</text>
          </view>
          <view class="box-item-msg-title">付款时间
            <text class="box-item-msg-detail">{{item.payDate}}</text>
          </view>
        </view>
      </view>
    </view>
    <u-empty text="暂无数据" mode="list" v-if="!info.length" style="height: 80vh"></u-empty>
  </view>
</template>
<script>
import { getAppListApi } from "../../api/customer";
import { getAllByTypeApi } from "../../api/index";
export default {
  components: {},
  data() {
    return {
      payId: '',
      info: [],
      PayType: [],
    };
  },
  onLoad(options) {
    this.payId = options.id;
    this.getInfo();
  },
  async onShow() {
    this.PayType = await this.getDictAll('PayType');
  },
  methods: {
    // 字典翻译
    async getDictAll(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 字典匹配
    getDictName(code, list) {
      if (list.length) {
        const { name } = list.find(v => v.code === code);
        return name;
      }
    },
    async getInfo() {
      this.info = await getAppListApi(this.payId);
    },
    downLoad(id) {
      uni.showToast({
        title: '接口未提供',
        icon: 'none'
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 100vh;
  background-color: #f1f1f1;
  padding: 22rpx 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-item {
    background-color: #fff;
    width: 100%;
    padding: 0 20rpx;
    & + & {
      margin-top: 20rpx;
    }
    &-title {
      height: 88rpx;
      font-size: 30rpx;
      border-bottom: 1px solid #f2f2f2f2;
      line-height: 88rpx;
      padding: 0 19rpx;
      display: flex;
      justify-content: space-between;
    }
    &-msg {
      &-item {
        padding: 0 20rpx;
      }
      &-title {
        height: 60rpx;
        line-height: 60rpx;
        border-bottom: 1px solid #f2f2f2;
        position: relative;
      }
      &-detail {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>