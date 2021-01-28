<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-28 19:01:58
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-28 19:04:11
-->
<template>
  <view class="box">
    <view
      class="box-item"
      v-for="(item, i) in info"
      :key="i"
    >
      <view class="box-item-title">
        <view style="font-weight: bold;">收款金额：{{item.amount}}</view>
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
          <view class="box-item-msg-title">收款单号
            <text class="box-item-msg-detail">{{item.payNo}}</text>
          </view>
          <view class="box-item-msg-title">收款方式
            <text class="box-item-msg-detail">{{getDictName(item.payType, PayType)}}</text>
          </view>
          <view class="box-item-msg-title">收款时间
            <text class="box-item-msg-detail">{{item.payDate}}</text>
          </view>
          <view class="pingzheng">
            <view class="pingzhengtitle">转账凭证</view>
            <view class="imagelist">
              <template v-for="(data, x) in item.fileIds">
                <u-image
                  class="images"
                  :key="x"
                  bg-color="#FFFFFF"
                  width="100rpx"
                  height="60rpx"
                  :src="data.url"
                  @click="showImage(item.fileIds, x)"
                />
              </template>
            </view>
          </view>
          <view
            class="box-item-msg-title"
            style="border-top: 1px solid #f2f2f2f2;padding: 10rpx 0;margin-top: 10rpx;height: 80rpx"
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
    <u-empty
      text="暂无数据"
      mode="list"
      v-if="!info.length"
      style="height: 80vh"
    ></u-empty>
    <u-modal
      v-model="show"
      content="是否确认删除?"
      :show-cancel-button="true"
      @confirm="delConfirm"
    ></u-modal>
  </view>
</template>

<script>
import { getNotCheckListApi, paymentdeleteApi } from "../../api/staff";
import { getAllByTypeApi } from "../../api/index";
import { currentEnvConfig } from "../../env-config.js";
export default {
  components: {},
  data() {
    return {
      payId: "",
      info: [],
      show: false,
      delId: "",
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
    this.PaymentStatus = await this.getDictAll("PaymentStatus");
    this.PayType = await this.getDictAll("PayType");
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
        const item = list.find((v) => v.code === code);
        return item?.name;
      }
    },
    async getInfo() {
      const res = await getNotCheckListApi(this.payId);
      this.info = res.map((v) => ({
        ...v,
        fileIds: v.fileIds.map((j) => ({
          url: `${currentEnvConfig["protocol"]}://${currentEnvConfig["apiDomain"]}/sales-api/sales-document-cover/file/browse/${j}`,
        })),
      }));
    },
    del(id) {
      this.delId = id;
      this.show = true;
    },
    async delConfirm() {
      await paymentdeleteApi(this.delId);
      uni.showToast({
        title: "删除成功",
        icon: "none",
      });
      this.getInfo();
    },
    showImage(data, index) {
      uni.previewImage({
        urls: data.map((v) => v.url),
        current: index,
      });
    },
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
.pingzheng {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}
.pingzhengtitle {
  width: 190rpx;
}
.imagelist {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  flex: 1;
}
.images {
  margin: 5rpx 0 0 5rpx;
}
</style>
