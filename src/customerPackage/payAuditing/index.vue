<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-25 11:42:30
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-22 08:23:27
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
        <view style="color:#F59A23;font-size:26rpx">
          {{$dict.dictAllName(item.status, 'PaymentStatus')}}
          <u-icon
            name="info-circle"
            size="28"
          ></u-icon>
        </view>
      </view>
      <view class="box-item-msg">
        <view class="box-item-msg-item">
          <view class="box-item-msg-title">付款单号
            <text class="box-item-msg-detail">{{item.payNo}}</text>
          </view>
          <view class="box-item-msg-title">付款方式
            <text class="box-item-msg-detail">{{$dict.dictAllName(item.payType, 'PayType')}}</text>
          </view>
          <view class="box-item-msg-title">付款时间
            <text class="box-item-msg-detail">{{item.payDate}}</text>
          </view>
          <view class="box-item-msg-title">转账凭证
            <u-image
              bg-color="#FFFFFF"
              width="100rpx"
              height="60rpx"
              class="box-item-msg-detail"
              :url="item.url"
            ></u-image>
          </view>
          <view
            class="box-item-msg-title"
            style="border-top: 1px solid #f2f2f2f2;padding: 10rpx 0;height: 80rpx"
          >转账凭证
            <u-button
              class="box-item-msg-detail"
              type="error"
              size="mini"
              @click="del(item.id)"
            >删除</u-button>
          </view>
        </view>
      </view>
    </view>
    <u-empty text="暂无数据" mode="list" v-if="!info.length" style="height: 80vh"></u-empty>
    <u-modal 
      v-model="show"
      content="是否确认删除?"
      :show-cancel-button="true"
      @confirm="delConfirm"
    ></u-modal>
  </view>
</template>
<script>
import { getNotCheckListApi, paymentdeleteApi } from "../../api/customer";
export default {
  components: {},
  data() {
    return {
      payId: '',
      info: [],
      show: false,
      delId: '',
    };
  },
  onLoad(options) {
    this.payId = options.id;
  },
  onShow() {
    if (this.payId) {
      this.getInfo();
    }
  },
  methods: {
    async getInfo() {
      this.info = await getNotCheckListApi(this.payId);
    },
    del(id) {
      this.delId = id;
      this.show = true;
    },
    async delConfirm() {
      await paymentdeleteApi(this.delId);
      uni.showToast({
        title: '删除成功',
        icon: 'none'
      })
      this.getInfo();
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