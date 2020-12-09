<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 14:02:13
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-09 11:16:20
-->
<template>
  <view class="company-information-wrapper">
    <view class="company-name">
      <view class="name">
        <view class="code">信用代码 1234567890DE</view>
        <view>广州市星星电子商务有限责任公司</view>
        <view>（广州星星）</view>
      </view>
      <view class="btn-wrapper" @click="editCompanyInfo">
        <u-icon name="edit-pen" color="$u-type-primary" size="30"></u-icon>编辑
      </view>
    </view>
    <view class="info-content-wrapper">
      <view class="info-item">
        <view class="form-title u-border-bottom">公司基本信息</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="210">
          <u-form-item label="公司类型" class="hide-icon" right-icon="arrow-right">
            <u-input
              v-model="form.companyType"
              type="select"
              placeholder="请选择公司类型"/>
          </u-form-item>
          <u-form-item label="注册资本">
            <u-input v-model="form.companySignMoney" placeholder="请输入注册资本" />
          </u-form-item>
          <u-form-item label="营业期限" class="hide-icon" right-icon="arrow-right">
            <u-input
              v-model="form.companyTime"
              type="select"
              placeholder="请选择营业期限"/>
          </u-form-item>
          <u-form-item label="成立时间" class="hide-icon" right-icon="arrow-right">
            <u-input
              v-model="form.companyTime"
              type="select"
              placeholder="请选择成立时间"/>
          </u-form-item>
          <u-form-item label="法人身份证号码">
            <u-input v-model="form.companySignMoney" placeholder="请输入法人身份证号码" />
          </u-form-item>
          <u-form-item label="法定代表人">
            <u-input v-model="form.companySignMoney" placeholder="请输入法定代表人" />
          </u-form-item>
          <u-form-item label="地区" class="hide-icon" right-icon="arrow-right">
            <u-input
              v-model="form.companyTime"
              type="select"
              placeholder="请选择地区"/>
          </u-form-item>
          <u-form-item label="住所" class="hide-icon" right-icon="arrow-right">
            <u-input
              v-model="form.companyTime"
              type="select"
              placeholder="请选择住所"/>
          </u-form-item>
        </u-form>
      </view>
      <view class="info-item">
        <view class="form-title u-border-bottom">负责人信息</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="210">
          <u-form-item label="负责人姓名">
            <u-input v-model="form.companySignMoney" placeholder="请输入负责人姓名" />
          </u-form-item>
          <u-form-item label="负责人手机号">
            <u-input v-model="form.companySignMoney" placeholder="请输入负责人手机号" />
          </u-form-item>
          <u-form-item label="身份证号码">
            <u-input v-model="form.companySignMoney" placeholder="请输入身份证号码" />
          </u-form-item>
          <u-form-item label="邮箱">
            <u-input v-model="form.companySignMoney" placeholder="请输入邮箱" />
          </u-form-item>
        </u-form>
      </view>
      <view class="info-item">
        <view class="form-title u-border-bottom">公司附件</view>
        <view class="annex-list-wrapper" v-for="item in annexInfo" :key="item.id">
          <view class="annex-type">{{item.type}}</view>
          <view>
            <u-upload :action="action" :file-list="fileList" ></u-upload>
          </view>
        </view>
      </view>
      <view class="info-item">
        <view class="form-title u-border-bottom">公司备注</view>
        <view class="remark">盼望着，盼望着，东风来了，春天的脚步近了。</view>
      </view>
      <view class="info-item">
        <view class="form-title u-border-bottom form-count">
          <view>公司结佣帐号</view>
          <view class="count" @click="goToCountList">全部({{bankCodeList.length}})</view>
        </view>
        <view class="swiper-wrapper">
          <swiper
            class="swiper"
            :autoplay="false"
            circular
            title
            @change="changeCount">
            <swiper-item
              class="swiper-item"
              v-for="(item, index) in bankCodeList"
              :key="index">
              <view class="swiper-item-msg" v-if="!!item.name">
                <view class="name">{{item.name}}</view>
                <view class="local">{{item.local}}</view>
                <view class="code">{{item.code}}</view>
              </view>
              <view class="swiper-item-msg" v-else>
                <view class="more" @click="goToCountList">
                  查看更多<u-icon name="more-circle-fill" color="$u-type-primary" size="32"></u-icon>
                </view>
              </view>
            </swiper-item>
          </swiper>
          <view class="indicator-dots">
            <view
              v-for="(item, index) in bankCodeList"
              :key="index"
              class="indicator-dots-item"
              :class="[currentDots === index ? 'indicator-dots-active' : '']">
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          companyType: null,
          companySignMoney: null,
          companyTime: null,
        },
        action: '',
        fileList: [],
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
          },
          {
            name: '',
            local: '',
            code: ''
          }
        ],
        currentDots: 0
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
      },
      // 公司结佣账号切换
      changeCount(e) {
        this.currentDots = e.detail.current;
      },
      // 跳转到结佣账号列表
      goToCountList() {
        uni.navigateTo({
          url: `/intermediaryPackage/myTab/channelPage/commissionAccount`
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .company-information-wrapper {
    width: 100%;
    background-color: #F1F1F1;

    .company-name {
      width: 100%;
      height: 162rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #FFFFFF;
      box-sizing: border-box;
      padding: 20rpx 30rpx 20rpx 30rpx;

      .name {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        view {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }

        .code {
          font-size: 26rpx;
          font-weight: 400;
          color: #666666;
          padding-bottom: 10rpx;
        }
      }

      .btn-wrapper {
        color: $u-type-primary;

        /deep/.u-icon {
          box-sizing: border-box;
          margin-right: 12rpx;
        }
      }
    }

    .info-content-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 30rpx;

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
  }
</style>