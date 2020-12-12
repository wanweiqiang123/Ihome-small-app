<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-12 11:25:11
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-12 13:15:25
-->
<template>
  <view class="company-info-wrapper">
    <view class="info-content-wrapper">
      <u-form
        :model="companyForm"
        ref="companyForm"
        label-width="210">
        <view class="info-item">
          <view class="form-title u-border-bottom">公司基本信息</view>
          <u-form-item label="公司简称">
            <u-input v-model="companyForm.companyName" :clearable="true" placeholder="请输入公司简称"/>
          </u-form-item>
          <u-form-item label="公司类型">
            <u-input v-model="companyForm.companyType" :clearable="true" placeholder="请输入公司类型"/>
          </u-form-item>
          <u-form-item label="法定代表人">
            <u-input v-model="companyForm.representative" :clearable="true" placeholder="请输入法定代表人"/>
          </u-form-item>
          <u-form-item label="法人身份证号码">
            <u-input v-model="companyForm.IDCode" :clearable="true" placeholder="请输入法人身份证号码"/>
          </u-form-item>
          <u-form-item label="成立日期" class="hide-icon" right-icon="arrow-right">
            <u-input
              v-model="companyForm.foundDate"
              type="select"
              :clearable="true"
              @click="showDate = true"
              placeholder="请选择成立日期"/>
          </u-form-item>
          <u-form-item label="注册资本">
            <u-input v-model="companyForm.capital" :clearable="true" placeholder="请输入注册资本"/>
          </u-form-item>
          <u-form-item label="营业期限">
            <u-input v-model="companyForm.deadline" :clearable="true" placeholder="请输入营业期限"/>
          </u-form-item>
          <u-form-item label="地区" class="hide-icon" right-icon="arrow-right">
            <u-input
              v-model="companyForm.region"
              type="select"
              :clearable="true"
              @click="showRegion = true"
              placeholder="请选择地区"/>
          </u-form-item>
          <u-form-item label="住所">
            <u-input v-model="companyForm.location" :clearable="true" placeholder="请输入住所"/>
          </u-form-item>
        </view>
        <u-gap height="30" bg-color="#F1F1F1"></u-gap>
        <view class="info-item">
          <view class="form-title u-border-bottom">公司附件</view>
          <view class="annex-list-wrapper" v-for="item in annexInfo" :key="item.id">
            <view class="annex-type">{{item.type}}</view>
            <view>
              <u-upload :action="action" :file-list="fileList" ></u-upload>
            </view>
          </view>
        </view>
        <u-gap height="30" bg-color="#F1F1F1"></u-gap>
        <view class="info-item">
          <view class="form-title u-border-bottom">基本存款账号信息</view>
          <u-form-item label="账户名称">
            <u-input
              v-model="companyForm.accountName"
              placeholder="账户名称" :clearable="true" input-align="left" />
          </u-form-item>
          <u-form-item label="开户银行" right-icon="arrow-right" class="hide-icon">
            <u-input
              @click="showBank = true"
              v-model="companyForm.accountBank" type="select"
              placeholder="开户银行" disabled :clearable="true" input-align="left" />
          </u-form-item>
          <u-form-item label="银行卡号">
            <u-input
              v-model="companyForm.accountCode"
              placeholder="银行卡号" :clearable="true" input-align="left"/>
          </u-form-item>
        </view>
      </u-form>
    </view>
    <u-gap height="50" bg-color="#F1F1F1"></u-gap>
    <view class="btn">
      <u-button type="primary" @click="handleSave">保存并注册</u-button>
    </view>
    <u-picker
      @cancel="cancelDate"
      @confirm="confirmDate"
      v-model="showDate"
      mode="time"
      :params="dateParams"></u-picker>
    <u-picker
      @cancel="cancelRegion"
      @confirm="confirmRegion"
      v-model="showRegion"
      mode="region"></u-picker>
    <u-popup v-model="showBank" mode="right" length="100%">
      <view class="select-bank-list-wrapper">
        <view class="top-wrapper">
          <u-search
            class="search"
            shape="round"
            height="72"
            placeholder-color="#BDBDBD"
            search-icon-color="#BDBDBD"
            bg-color="#FFFFFF"
            border-color="#DCDCDC"
            :show-action="false"
            placeholder="请输入开户银行名搜索"
            v-model="queryPageParameters.bankName"></u-search>
        </view>
        <view
          class="bank-item"
          v-for="(item, index) in bankList" :key="index"
          @click="showBank = false">{{item.name}}</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      companyForm: {
        companyName: null,
        companyType: null,
        representative: null,
        IDCode: null,
        foundDate: null,
        capital: null,
        deadline: null,
        region: null,
        location: null,
        accountName: null,
        accountBank: null,
        accountCode: null
      },
      annexInfo: [
        {
          id: 1,
          type: '营业执照',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
        },
        {
          id: 2,
          type: '开户许可证',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
        },
        {
          id: 3,
          type: '法人身份证正反面复印件',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
        },
        {
          id: 4,
          type: '签约授权确认函',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
        },
        {
          id: 5,
          type: '被委托人身份证复印件',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
        },
        {
          id: 6,
          type: '综合查询被执行人查询结果',
          imgUrl: ['https://cdn.uviewui.com/uview/example/fade.jpg', 'https://cdn.uviewui.com/uview/example/fade.jpg']
        }
      ],
      action: '',
      fileList: [],
      showDate: false,
      dateParams:  {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      },
      showRegion: false,
      showBank: false,
      queryPageParameters: {
        bankName: null
      },
      bankList: [
        {
          name: '广东广州工商银行番禺支行'
        },
        {
          name: '广东广州工商银行番禺支行'
        },
        {
          name: '广东广州工商银行番禺支行'
        },
        {
          name: '广东广州工商银行番禺支行'
        }
      ]
    };
  },

  onLoad() {

  },
  methods: {
    // 保存并注册
    handleSave() {
      this.$emit('next');
    },
    // 取消选择日期
    cancelDate(value) {
      console.log(value);
    },
    // 确定选择日期
    confirmDate(value) {
      // console.log(value);
      if (value) {
        this.companyForm.foundDate = `${value.year}-${value.month}-${value.day}`
      }
    },
    // 取消选择地区
    cancelRegion(value) {
      console.log(value);
    },
    // 确定选择地区
    confirmRegion(value) {
      console.log(value);
      if (value) {
        this.companyForm.region = `${value.province}${value.city}${value.label}`;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .company-info-wrapper {
    width: 100%;
    background-color: #FFFFFF;

    .info-content-wrapper {
      width: 100%;
      box-sizing: border-box;

      .info-item {
        background-color: #FFFFFF;

        &:not(:last-child) {
          margin-bottom: 30rpx;
        }

        .form-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 92rpx;
          padding: 0 20rpx;
          color: $u-type-primary;
        }

        .annex-list-wrapper {
          width: 100%;
          padding: 0rpx 20rpx 20rpx 20rpx;

          &:not(:last-child) {
            border-bottom: 1rpx solid #F1F1F1;
          }

          .annex-type {
            font-size: 30rpx;
            padding: 20rpx 0rpx 10rpx 0rpx;
          }
        }

        .remark {
          padding: 10rpx 20rpx;
        }

        .swiper-wrapper {
          width: 100%;

          .swiper {
            padding: 0 21rpx;
            height: 278rpx;

            .swiper-item {
              padding-right: 5rpx;
              box-sizing: border-box;

              .swiper-item-msg {
                height: 100%;
                background-color: #e6f1fc;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-radius: 14rpx;
                box-sizing: border-box;
                padding: 30rpx;

                view {
                  font-family: PingFang SC;
                }

                .name {
                  flex: 1;
                  font-size: 32rpx;
                  font-weight: bold;
                  color: #333333;
                }

                .local, .code {
                  flex: 1;
                  font-size: 30rpx;
                  color: #666666;
                }

                .more {
                  text-align: center;
                  font-size: 32rpx;
                  font-weight: bold;
                  color: #666666;

                  /deep/.u-icon {
                    margin-left: 10rpx;
                  }
                }
              }
            }
          }

          .indicator-dots {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30rpx 0rpx;
          }

          .indicator-dots-item {
            background-color: $u-tips-color;
            height: 16rpx;
            width: 16rpx;
            border-radius: 10px;
            margin: 0 3px;
          }

          .indicator-dots-active {
            background-color: $u-type-primary;
          }
        }
      }
    }

    .btn {
      box-sizing: border-box;
      margin-bottom: 30rpx;
      /deep/.u-size-default {
        height: 92rpx !important;
        line-height: 92rpx !important;
      }
    }
  }

  .select-bank-list-wrapper {
    width: 100%;

    .top-wrapper {
      width: 100%;
      height: 92rpx;
      box-sizing: border-box;
      padding: 10rpx 24rpx 10rpx 18rpx;
      display: flex;
      background-color: #EFEFF4;

      .search {
        flex: 1;
        height: 72rpx;
      }
    }

    .bank-item {
      padding: 30rpx 10rpx;
      text-align: left;
      border-bottom: 1rpx solid #CCCCCC;
    }
  }
</style>