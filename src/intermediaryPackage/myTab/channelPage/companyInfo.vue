<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 14:02:13
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-27 15:36:22
-->
<template>
  <view class="company-information-wrapper">
    <view class="company-name">
      <view class="code-wrapper">
        <view class="code">信用代码  91440101MA5D6ETP8X</view>
        <view @click="editCompanyInfo">
          <u-icon name="edit-pen" size="30"></u-icon>编辑
        </view>
      </view>
      <view class="name-wrapper u-padding-top-10 u-padding-bottom-10">
        <view class="name">广州市择食电子商务有限责任公司</view>
        <view>(广州择食)</view>
      </view>
    </view>
    <view class="info-wrapper">
      <view class="title">公司基本信息</view>
      <view class="info-list">
        <view class="item" v-for="(item, index) in info" :key="index" :class="item.className">
          <view>{{item.type}}</view>
          <view>{{item.value}}</view>
        </view>
      </view>
      <view class="title">负责人信息</view>
      <view class="info-list">
        <view class="item" v-for="(item, index) in chargeInfo" :key="index" :class="item.className">
          <view>{{item.type}}</view>
          <view>{{item.value}}</view>
        </view>
      </view>
      <view class="title">公司附件</view>
      <view class="annex-list">
        <view class="item" v-for="(item, index) in annexInfo" :key="index">
          <view class="type">{{item.type}}</view>
          <view v-for="(imgItem, imgIndex) in item.imgUrl" :key="imgIndex" class="img">
            <u-image width="100rpx" height="100rpx" :src="imgItem"></u-image>
          </view>
        </view>
      </view>
      <view class="title">公司备注</view>
      <view class="remark">盼望着，盼望着，东风来了，春天的脚步近了。</view>
    </view>
    <view class="company-name bg-color-no">
      <view class="account">
        <view class="title">公司结佣帐号</view>
        <view>全部(3)</view>
      </view>
      <view class="swiper-wrapper">
        <swiper :indicator-dots="true" :autoplay="false" :interval="2000" :duration="500">
          <swiper-item v-for="(item, index) in bankCodeList" :key="index">
            <view class="account-wrapper">
              <view class="name">{{item.name}}</view>
              <view class="local">{{item.local}}</view>
              <view class="code">{{item.code}}</view>
            </view>
          </swiper-item>
          <swiper-item class="more-wrapper">
            <view class="more">查看更多</view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        info: [
          {
            type: '公司类型',
            value: '有限责任公司（自然人投资或控股）',
            className: 'with-70',
          },
          {
            type: '注册资本',
            value: '100万元人民币',
            className: 'with-30',
          },
          {
            type: '营业期限',
            value: '2020-03-31 至 2026-03-31',
            className: 'with-70',
          },
          {
            type: '成立时间',
            value: '2020-03-01',
            className: 'with-20',
          },
          {
            type: '法人身份证号码',
            value: '440111198710031817',
            className: 'with-70',
          },
          {
            type: '法定代表人',
            value: '谭星科',
            className: 'with-30',
          },
          {
            type: '地区',
            value: '广东省广州市天河区',
            className: 'with-100',
          },
          {
            type: '住所',
            value: '广州市荔湾区信义路24号4幢自编217房',
            className: 'with-100',
          }
        ],
        chargeInfo: [
          {
            type: '负责人姓名',
            value: '李四',
            className: 'with-70',
          },
          {
            type: '负责人手机号',
            value: '13589888888',
            className: 'with-30',
          },
          {
            type: '身份证号码',
            value: '440111198710031817',
            className: 'with-70',
          },
          {
            type: '邮箱',
            value: 'liswer@163.com',
            className: 'with-30',
          },
        ],
        annexInfo: [
          {
            type: '营业执照',
            imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
          },
          {
            type: '开户许可证',
            imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
          },
          {
            type: '法人身份证正反面复印件',
            imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
          },
          {
            type: '签约授权确认函',
            imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
          },
          {
            type: '被委托人身份证复印件',
            imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
          },
          {
            type: '综合查询被执行人查询结果',
            imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
          }
        ],
        bankCodeList: [
          {
            name: '广州择食电子商务有限责任公司',
            local: '中国银行独山县支行',
            code: '4431-3465-4687-3100-12445'
          },
          {
            name: '广州择食电子商务有限责任公司',
            local: '中国银行独山县支行',
            code: '4431-3465-4687-3100-12445'
          }
        ]
      };
    },
    onLoad() {
    },
    methods: {
      // 修改公司信息
      editCompanyInfo() {
        uni.navigateTo({
          url: `/intermediaryPackage/myTab/channelPage/editCompany`
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .company-information-wrapper {
    width: 100%;
    padding: 10rpx 20rpx;

    .company-name {
      width: 100%;
      background-color: #02A7F0;
      color: #FFFFFF;
      padding: 10rpx 20rpx;

      .code-wrapper {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        .code {
          flex: 1;
          font-size: 26rpx;
        }
      }

      .name-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        font-weight: 600;

        view {
          flex: 1;
          text-align: center;
        }

        .name {
          font-size: 36rpx;
        }
      }

      .account {
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10rpx 10rpx;
        background-color: #02A7F0;

        .title {
          flex: 1;
          font-size: 36rpx;
        }
      }

      .swiper-wrapper {
        width: 100%;
        background-color: #F3FBFE;

        .account-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 30rpx;

          .name {
            color: #333333;
            font-size: 32rpx;
          }

          .local, .code {
            color: #666666;
            font-size: 28rpx;
          }
        }

        .more-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;

          .more {
            color: #666666;
            font-size: 36rpx;
            text-align: center;
          }
        }
      }
    }

    .bg-color-no {
      background-color: #F9F9F9;
    }

    .info-wrapper {
      width: 100%;
      font-size: 24rpx;
      padding: 20rpx;

      .title {
        font-size: 36rpx;
        font-weight: 600;
        padding: 10rpx 0rpx;
        color: #666666;
      }

      .info-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: wrap;

        .item {
          margin-right: 10rpx;
          display: flex;
          flex-direction: column;
          padding: 10rpx 0rpx;

          view {
            padding: 5rpx 0rpx;
          }
        }

        .with-70 {
          width: 58%;
        }

        .with-30 {
          width: 39%;
        }

        .with-100 {
          width: 99%;
        }
      }

      .annex-list {
        display: flex;
        flex-direction: column;

        .item {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 10rpx 0rpx;

          .type {
            flex: 1;
          }

          .img {
            &:not(:last-child) {
              margin-right: 5rpx;
            }
          }
        }
      }

      .remark {
        padding: 10rpx 0rpx;
      }
    }
  }
</style>