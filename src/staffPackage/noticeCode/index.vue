<!--
 * @Description: 查询购房优惠码
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 17:10:39
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-22 09:28:42
-->
<template>
  <LoginPage>
    <view class="notice">
      <view class="notice-select">
        <u-cell-group>
          <u-cell-item
            title="项目周期"
            :value="termName || '请选择项目周期'"
            :arrow="true"
            @click="handleToSearch()"
            :value-style="{
              overflow: 'hidden',
              textOverflow:'ellipsis',
              whiteSpace: 'nowrap',
              marginLeft: '10rpx'
            }"
          ></u-cell-item>
        </u-cell-group>
      </view>
      <view class="notice-list">
        <u-card
          :border="false"
          :show-foot="false"
          class="ih-card"
          v-for="(i, n) in codeList"
          :key="n"
          @click="handleCode(i)"
        >
          <view
            slot="head"
            class="ih-card-head"
          >
            <view>{{`优惠套餐${n+1}`}}</view>
            <view class="sub-title">查看优惠二维码
              <u-icon name="arrow-right" />
            </view>
          </view>
          <view
            slot="body"
            class="ih-card-content"
          >
            <view>优惠方式说明：{{i.modeDescription}}</view>
            <view>需支付服务费：{{i.premiumReceived}}元</view>
          </view>
        </u-card>
      </view>
      <!-- 二维码弹出层 -->
      <u-popup
        v-model="isShow"
        mode="center"
        closeable
        width="600rpx"
        class="ih-popup"
      >
        <view>
          <view class="head">优惠二维码</view>
          <view class="code">
            <u-image
              width="100%"
              height="100%"
              mode="scaleToFill"
              :src="src"
              @click="preview(src)"
            ></u-image>
          </view>
          <view
            class="btn"
            style="font-size: 26rpx; text-align: center;"
          >
            下载二维码, 可以点击二维码进行长按保存
            <!-- <u-button
              type="primary"
              :loading="loading"
              @click="savePoster()"
            >下载二维码</u-button> -->
          </view>
        </view>
      </u-popup>
    </view>
  </LoginPage>
</template>

<script>
import { getMannerListByTermId } from "../../api/staff";
import { currentEnvConfig } from "../../env-config.js";
import tool from "../../common/tool";

export default {
  name: "notice-code",
  data() {
    return {
      isShow: false,
      termId: null,
      termName: null,
      codeList: [],
      src: "",
      fileId: null,
      loading: false,
    };
  },
  methods: {
    preview(url) {
      uni.previewImage({
        urls: [url],
        current: 1,
      });
    },
    handleCode(item) {
      this.src = tool.getFileUrl(item.preferentialAddr);
      this.fileId = item.preferentialAddr;
      this.isShow = true;
    },
    savePoster() {
      uni.getSetting({
        success: (res) => {
          if (res.authSetting["scope.writePhotosAlbum"]) {
            //验证用户是否授权可以访问相册
            this.downloadCode();
          } else {
            //如果没有授权，向用户发起请求
            uni.authorize({
              scope: "scope.writePhotosAlbum",
              success: () => {
                this.downloadCode();
              },
              fail: () => {
                uni.showToast({
                  title: "请打开保存相册权限，再点击保存相册分享",
                  icon: "none",
                  duration: 3000,
                });
                setTimeout(() => {
                  uni.openSetting({
                    //调起客户端小程序设置界面,让用户开启访问相册
                    success: (res2) => {
                      // console.log(res2.authSetting)
                    },
                  });
                }, 3000);
              },
            });
          }
        },
      });
    },
    downloadCode() {
      this.loading = true;
      const downUrl = tool.getFileDownloadUrl(this.fileId);
      uni.downloadFile({
        url: downUrl,
        // url: `http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg`,
        success: (res) => {
          let filePath = res.tempFilePath;
          console.log(filePath);
          uni.saveImageToPhotosAlbum({
            filePath: filePath,
            success: () => {
              this.$tool.toast("购房二维码已保存到相册");
              this.loading = false;
            },
            fail: () => {
              uni.showToast({
                title: "保存失败, 可以尝试点击图片进行长按保存",
                icon: "none",
                duration: 5000,
              });
              this.loading = false;
            },
          });
        },
      });
    },
    handleToSearch() {
      getApp().globalData.searchParams = {
        api: "postTermApi",
        key: "termName",
        id: "termId",
        type: "term",
        other: {
          auditEnums: ["ConstractAdopt"],
          excludeChargeEnum: "Agent",
        },
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    async getCodeList(id) {
      try {
        this.codeList = await getMannerListByTermId({ id });
      } catch (error) {
        console.log(error);
      }
    },
  },
  onShow() {
    let item = getApp().globalData.searchBackData;
    if (item && item.type === "term") {
      this.termId = item.data.termId;
      this.termName = item.data.termName;
      this.getCodeList(item.data.termId);
      getApp().globalData.searchBackData = {};
    }
  },
};
</script>

<style lang="scss" scoped>
.notice {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-select {
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  &-list {
    padding-top: 100rpx;
    padding-bottom: 6rpx;
    .sub-title {
      color: $u-type-info;
    }
  }
}
.ih-card {
  &-content {
    line-height: 40rpx;
  }
  &-head {
    display: flex;
    justify-content: space-between;
  }
}
.ih-popup {
  .head {
    padding-left: 30rpx;
    line-height: 90rpx;
  }
  .code {
    // background: #f1f1f1;
    width: 100%;
    height: 540rpx;
    // margin: 0 auto 20rpx;
  }
  .btn {
    padding: 20rpx 30rpx;
  }
}
</style>
