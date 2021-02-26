<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-25 11:40:27
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-26 11:10:48
-->
<template>
  <view class="box">
    <view
      class="box-item"
      v-for="(item, i) in info"
      :key="i"
    >
      <view class="box-item-title">
        <view style="font-weight: bold;">付款金额：{{item.amount | emptyFilter}}</view>
        <template v-if="item.fileIds.length">
          <view style="font-size: 20rpx;">
            电子回单：
            <u-button
              class="downButton"
              type="primary"
              size="mini"
              :loading="item.loading"
              :custom-style="{marginRight: '10rpx'}"
              @click="downLoad(item)"
            >下载</u-button>
            <u-button
              class="downButton"
              type="success"
              size="mini"
              :loading="item.loading"
              @click="perview(item)"
            >预览</u-button>
          </view>
        </template>
      </view>
      <view class="box-item-msg">
        <view class="box-item-msg-item">
          <view class="box-item-msg-title">付款单号
            <text class="box-item-msg-detail">{{item.payNo | emptyFilter}}</text>
          </view>
          <view class="box-item-msg-title">付款方式
            <text class="box-item-msg-detail">{{getDictName(item.payType, PayType) | emptyFilter}}</text>
          </view>
          <view class="box-item-msg-title">支付时间
            <text class="box-item-msg-detail">{{item.payTime | emptyFilter}}</text>
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
      v-model="isShow"
      :show-title="false"
      confirm-text="一键复制"
      :content="downUrl"
      :content-style="{
        wordBreak: 'break-word'
      }"
      @confirm="modalConfirm"
    ></u-modal>
  </view>
</template>
<script>
import { getAppListApi } from "../../api/customer";
import { getAllByTypeApi, getPdf2PicApi } from "../../api/index";
export default {
  components: {},
  data() {
    return {
      payId: "",
      info: [],
      PayType: [],
      isShow: false,
      downUrl: "",
    };
  },
  onLoad(options) {
    this.payId = options.id;
    this.getInfo();
  },
  async onShow() {
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
      const res = await getAppListApi(this.payId);
      this.info = res.map((v) => ({
        ...v,
        loading: false,
      }));
    },
    perview(item) {
      let url = this.$tool.getFileUrl(item.fileIds[0]);
      uni.downloadFile({
        url: url,
        success: function (res) {
          var filePath = res.tempFilePath;
          uni.openDocument({
            filePath: filePath,
            fileType: "pdf",
            showMenu: true,
            success: function (res) {
              console.log("打开文档成功");
            },
          });
        },
      });
    },
    async downLoad(item) {
      this.downUrl = this.$tool.getFileDownloadUrl(item.fileIds[0]);
      this.isShow = true;
    },
    modalConfirm() {
      uni.setClipboardData({
        data: this.downUrl,
        success: () => {
          this.$tool.toast("复制成功, 请前往浏览器打开");
        },
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
    padding: 0 20rpx 20rpx;
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

.downButton {
  /deep/ .u-loading::before {
    width: 20rpx;
    height: 20rpx;
  }
}
</style>