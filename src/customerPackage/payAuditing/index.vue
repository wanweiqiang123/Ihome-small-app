<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-25 11:42:30
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-28 15:42:51
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
          {{getDictName(item.status, PaymentStatus)}}
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
            <text class="box-item-msg-detail">{{getDictName(item.payType, PayType)}}</text>
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
              :url="`/sales-api/sales-document-cover/file/browse/${item.fileIds[0]}`"
            ></u-image>
          </view>
          <view
            class="box-item-msg-title"
            style="border-top: 1px solid #f2f2f2f2;padding: 10rpx 0;height: 80rpx"
          >
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
import { getAllByTypeApi } from "../../api/index";
export default {
  components: {},
  data() {
    return {
      payId: '',
      info: [],
      show: false,
      delId: '',
      PaymentStatus: [],
      PayType: [],
    };
  },
  onLoad(options) {
    this.payId = options.id;
  },
  async onShow() {
    if (this.payId) {
      this.getInfo();
    }
    this.PaymentStatus = await this.getDictAll('PaymentStatus');
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