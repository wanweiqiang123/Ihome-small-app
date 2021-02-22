<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-23 17:30:18
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-22 11:44:44
-->
<template>
  <view class="project-detail-wrapper">
    <view class="bg-wrapper"></view>
    <view class="detail-content-wrapper">
      <view class="content-wrapper">
        <u-card
          :show-head="false"
          margin="0rpx"
          padding="20"
        >
          <view
            class=""
            slot="body"
          >
            <u-image
              width="100%"
              height="320rpx"
              :src="info.picAddr"
            ></u-image>
            <view class="title">
              {{info.houseName}}
              <!-- <span class="square"></span> -->
            </view>
          </view>
        </u-card>
        <view class="home-info-wrapper">
          <view class="home-info-title">户型详情</view>
          <view class="home-info">
            <u-row gutter="8">
              <u-col span="7">
                <view class="home-col-wrapper">
                  <view class="home-label">户型</view>
                  <view class="home-value">{{`${info.room ? info.room : 0}室 ${info.hall ? info.hall : 0}厅 ${info.kitchen ? info.kitchen : 0}厨 ${info.toilet ? info.toilet : 0}卫`}}</view>
                </view>
              </u-col>
              <u-col span="5">
                <view class="home-col-wrapper">
                  <view class="home-label">售价</view>
                  <view class="home-value">{{info.salePrice ? info.salePrice : 0}}</view>
                </view>
              </u-col>
              <u-col span="7">
                <view class="home-col-wrapper">
                  <view class="home-label">户型面积</view>
                  <view class="home-value">{{info.space ? info.space : 0}}</view>
                </view>
              </u-col>
              <u-col span="5">
                <view class="home-col-wrapper">
                  <view class="home-label">朝向</view>
                  <view class="home-value">{{getDictName(info.positionEnum, PositionEnum)}}</view>
                </view>
              </u-col>
              <u-col span="7">
                <view class="home-col-wrapper">
                  <view class="home-label">物业类型</view>
                  <view class="home-value">{{getDictName(info.propertyEnum, Property)}}</view>
                </view>
              </u-col>
              <u-col span="5">
                <view class="home-col-wrapper">
                  <view class="home-label">物业费</view>
                  <view class="home-value">{{info.propertyCost ? info.propertyCost : 0}}</view>
                </view>
              </u-col>
              <u-col span="7">
                <view class="home-col-wrapper">
                  <view class="home-label">产权年限</view>
                  <view class="home-value">{{info.propertyAge ? getDictName(info.propertyAge, PropertyAge) : 0}}</view>
                </view>
              </u-col>
              <u-col span="5">
                <view class="home-col-wrapper">
                  <view class="home-label">装修级别</view>
                  <view class="home-value">{{getDictName(info.renovatLevelEnum, RenovatLevelEnum)}}</view>
                </view>
              </u-col>
            </u-row>
          </view>
        </view>
      </view>
      <u-gap
        height="28"
        bg-color="#F2F2F2"
      ></u-gap>
      <view class="content-wrapper">
        <view class="home-info-wrapper">
          <view class="home-info-title">同楼盘其他户型</view>
          <view
            class="home-info-other"
            v-for="(item, i) in info.houseTypeYDOtherDetailVos"
            :key="i"
            @click="viewHomeDetail(item.houseTypeId)"
          >
            <view class="home-img">
              <u-image
                width="170rpx"
                height="130rpx"
                :src="item.picAddr"
              ></u-image>
            </view>
            <view class="home-info-right">
              <view class="info-title">
                <view>{{item.houseName}}</view>
                <veiw class="price-color">{{item.salePrice}}</veiw>
              </view>
              <view class="info-size">{{item.space}}</view>
              <view class="info-location">{{getDictName(item.positionEnum, PositionEnum)}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getAllByTypeApi } from "../../../api/index";
import { getYDhouseDetail } from "../../../api/channel";
export default {
  data() {
    return {
      info: {
        houseName: "",
        picAddr: "",
        positionEnum: "",
        proId: "",
        propertyAge: "",
        propertyCost: "",
        propertyEnum: "",
        renovatLevelEnum: "",
        salePrice: "",
        space: "",
        houseTypeYDOtherDetailVos: [],
      },
      Property: [],
      RenovatLevel: [],
      PositionEnum: [],
      PropertyAge: [],
      RenovatLevelEnum: [],
      houseId: "",
    };
  },
  onLoad(options) {
    this.houseId = options.id;
    if (this.houseId) {
      this.getInfo();
    }
  },
  async onShow() {
    this.Property = await this.getDictAll("Property");
    this.RenovatLevel = await this.getDictAll("RenovatLevel");
    this.PositionEnum = await this.getDictAll("Position");
    this.PropertyAge = await this.getDictAll("PropertyAge");
    this.RenovatLevelEnum = await this.getDictAll("RenovatLevel");
  },
  methods: {
    async getInfo() {
      const res = await getYDhouseDetail(this.houseId);
      this.info = {
        ...res,
        picAddr: this.$tool.getFileUrl(res.picAddr),
        houseTypeYDOtherDetailVos: res.houseTypeYDOtherDetailVos.map((j) => ({
          ...j,
          picAddr: this.$tool.getFileUrl(j.picAddr),
        })),
      };
    },
    // 查看户型详情
    viewHomeDetail(id) {
      uni.redirectTo({
        url: `/channelPackage/homeTab/pages/unitDetail?id=${id}`,
      });
    },
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
  },
};
</script>

<style lang="scss" scoped>
.project-detail-wrapper {
  width: 100%;
  box-sizing: border-box;
  position: relative;

  .square {
    vertical-align: super;
    font-size: 18rpx;
  }

  .price-color {
    color: #fd4918;
  }

  .home-info-title {
    height: 30rpx;
    line-height: 30rpx;
    text-align: left;
    border-left: 10rpx solid $uni-color-primary;
    padding-left: 15rpx;
    font-size: 30rpx;
    font-weight: 600;
    color: #333333;
    box-sizing: border-box;
    margin: 10rpx 0rpx;
  }

  .bg-wrapper {
    width: 100%;
    height: 380rpx;
    position: absolute;
    left: 0rpx;
    top: 0rpx;
    z-index: -1;
    background-color: $uni-color-primary;
  }

  .detail-content-wrapper {
    width: 100%;
    position: absolute;
    left: 0rpx;
    top: 0rpx;
    z-index: 500;
    box-sizing: border-box;
    padding: 20rpx 0rpx 0rpx 0rpx;

    .content-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 0rpx 20rpx;

      .title {
        box-sizing: border-box;
        margin: 18rpx 0rpx;
        font-size: 34rpx;
        font-weight: 600;
        color: #1c1c1c;
      }
    }

    .home-info-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx;

      .home-info {
        width: 100%;
        box-sizing: border-box;

        .home-col-wrapper {
          width: 100%;
          display: flex;
          flex-direction: row;
          box-sizing: border-box;
          margin: 10rpx 0rpx;

          .home-label {
            width: 120rpx;
            display: block;
            font-size: 26rpx;
            text-align-last: justify;
          }

          .home-value {
            flex: 1;
            box-sizing: border-box;
            margin-left: 15rpx;
          }
        }
      }

      .home-info-other {
        width: 100%;
        display: flex;
        flex-direction: row;

        &:not(:last-child) {
          margin-bottom: 10rpx;
        }

        .home-info-right {
          flex: 1;
          box-sizing: border-box;
          margin-left: 20rpx;

          .info-title,
          .info-size,
          .info-location {
            height: 40rpx;
            box-sizing: border-box;
            margin-bottom: 8rpx;
          }

          .info-title {
            display: flex;
            flex-direction: row;

            view {
              flex: 1;
            }
          }
        }
      }
    }
  }
}
</style>