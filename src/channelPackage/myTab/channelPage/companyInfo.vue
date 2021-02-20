<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 14:02:13
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-20 18:08:16
-->
<template>
  <view class="company-information-wrapper">
    <view class="company-name">
      <view class="name">
        <view class="code">信用代码 {{companyInfo.creditCode}}</view>
        <view>{{companyInfo.name}}</view>
        <view>
          （{{companyInfo.shortName}}）
          <u-tag :text="companyInfo.statusName" mode="dark" size="mini" type="error"/>
        </view>
      </view>
      <view class="btn-wrapper" @click="editCompanyInfo" v-if="['DRAFT', 'ToBeConfirmed'].includes(companyInfo.status)">
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
          <u-form-item label="公司类型">
            <view>{{companyInfo.typeName}}</view>
          </u-form-item>
          <u-form-item label="注册资本">
            <view>{{companyInfo.capital}}</view>
          </u-form-item>
          <u-form-item label="营业期限">
            <view>{{companyInfo.businessTime}}</view>
          </u-form-item>
          <u-form-item label="成立时间">
            <view>{{companyInfo.setupTime}}</view>
          </u-form-item>
          <u-form-item label="法人身份证号码">
            <view>{{companyInfo.legalIdentityCode}}</view>
          </u-form-item>
          <u-form-item label="法定代表人">
            <view>{{companyInfo.legalPerson}}</view>
          </u-form-item>
          <u-form-item label="地区">
            <view>{{companyInfo.provinceName}}{{companyInfo.cityName}}{{companyInfo.countyName}}</view>
          </u-form-item>
          <u-form-item label="住所">
            <view>{{companyInfo.address}}</view>
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
            <view>{{channelPersons.name}}</view>
          </u-form-item>
          <u-form-item label="负责人手机号">
            <view>{{channelPersons.mobile}}</view>
          </u-form-item>
          <u-form-item label="身份证号码">
            <view>{{channelPersons.identityCode}}</view>
          </u-form-item>
          <u-form-item label="邮箱">
            <view>{{channelPersons.email ? channelPersons.email : ""}}</view>
          </u-form-item>
        </u-form>
      </view>
      <view class="info-item">
        <view class="form-title u-border-bottom">公司附件</view>
        <view class="annex-list-wrapper" v-for="(item, itemIndex) in annexList" :key="itemIndex">
          <view class="annex-type">{{item.name}}</view>
          <view class="annex-image">
            <u-image
              v-for="(srcItem, srcIndex) in item.fileList"
              :key="srcIndex"
              @click="previewImg(srcItem)"
              width="200rpx"
              height="200rpx"
              :src="srcItem.fileSrc"></u-image>
          </view>
        </view>
      </view>
      <view class="info-item">
        <view class="form-title u-border-bottom">公司备注</view>
        <view class="remark">{{companyInfo.remark ? companyInfo.remark : '暂无'}}</view>
      </view>
      <view class="info-item">
        <view class="form-title u-border-bottom form-count">
          <view>公司结佣帐号</view>
          <view class="count">全部({{companyInfo.channelBanks.length}})</view>
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
              v-for="(bankItem, index) in companyInfo.channelBanks"
              :key="index">
              <view class="swiper-item-msg">
                <view class="name">{{bankItem.accountName}}</view>
                <view class="local">{{bankItem.branchName}}</view>
                <view class="code">{{bankItem.accountNo}}</view>
              </view>
            </swiper-item>
          </swiper>
          <view class="indicator-dots">
            <view
              v-for="(item, index) in companyInfo.channelBanks"
              :key="index"
              class="indicator-dots-item"
              :class="[currentDots === index ? 'indicator-dots-active' : '']">
            </view>
          </view>
        </view>
      </view>
    </view>
    <u-modal
      v-model="showChange"
      :mask-close-able="true"
      :show-confirm-button="true"
      :show-cancel-button="true"
      @confirm="handleChangeStatus"
      @cancel="showChange = false"
      content="信息正在审核中，是否需要修改公司信息？"></u-modal>
  </view>
</template>

<script>
  import storageTool from "@/common/storageTool";
  import {getAreaList, getChannelInfo, backToDraft} from "@/api/channel";
  import tool from "@/common/tool";
  import { getAllByTypeApi } from "@/api/index";

  export default {
    data() {
      return {
        userInfo: null,
        companyInfo: {
          statusName: null, // 状态
          channelBanks: []
        }, // 公司基本信息
        channelPersons: {}, // 负责人信息
        form: {
          companyType: null,
          companySignMoney: null,
          companyTime: null,
        },
        annexList: [], // 附件类型
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
        currentDots: 0,
        showChange: false
      };
    },
    async onLoad() {
      await this.getChannelAttachmentList();
      this.userInfo = storageTool.getUserInfo();
      if (this.userInfo.channelId) {
        await this.init(this.userInfo.channelId);
      }
    },
    methods: {
      // 修改公司信息
      editCompanyInfo() {
        // 根据公司的审核情况做调整
        if (this.companyInfo.status === 'DRAFT') {
          // 草稿状态直接可以修改
          uni.navigateTo({
            url: `/channelPackage/myTab/channelPage/editCompany?id=${this.companyInfo.id}`
          });
        } else if (this.companyInfo.status === 'ToBeConfirmed') {
          // 待审核状态 --- 提示修改 --- 点击确认后改变状态 --- 跳转到修改页面
          this.showChange = true;
        }
      },
      // 确定改变公司状态
      async handleChangeStatus() {
        await backToDraft(this.companyInfo.id);
        uni.navigateTo({
          url: `/channelPackage/myTab/channelPage/editCompany?id=${this.companyInfo.id}`
        });
      },
      // 查看附件
      previewImg(item) {
        // console.log(item);
        if (!item.fileId) return;
        uni.previewImage({
          urls: [item.fileSrc]
        });
      },
      // 公司结佣账号切换
      changeCount(e) {
        this.currentDots = e.detail.current;
      },
      // 初始化公司信息页面
      async init(id) {
        let info = await getChannelInfo(id);
        // console.log(info);
        this.companyInfo = info;
        if (info.channelPersons && info.channelPersons.length) {
          this.channelPersons = info.channelPersons[0];
        }
        // 附件类型
        if (this.annexList.length && info.channelAttachments && info.channelAttachments.length) {
          this.annexList.forEach((list) => {
            list.fileList = [];
            info.channelAttachments.forEach((item) => {
              if (item.type === list.code) {
                list.fileList.push(
                  {
                    ...item,
                    fileSrc: tool.getFileUrl(item.fileId)
                  }
                );
              }
            });
          });
        }
        this.annexList = this.annexList.filter((list) => {
          return list.fileList.length > 0;
        });
        console.log('123123123', this.annexList);
      },
      // 获取对应字典name
      async getDictName(code, type) {
        const dictList = await getAllByTypeApi({ type });
        if (dictList.length) {
          const item = dictList.find(v => v.code === code);
          return item?.name;
        } else {
          return '';
        }
      },
      // 获取省市区
      async getArea() {
        let areaList = await getAreaList();
        return areaList;
      },
      // 获取附件类型
      async getChannelAttachmentList() {
        let postData = {
          type: "ChannelAttachment",
          valid: "Valid"
        }
        this.annexList = [];
        let list = await getAllByTypeApi(postData);
        if (list && list.length > 0) {
          list.forEach((item) => {
            this.$set(item, 'fileList', []);
          });
          this.annexList = list;
        }
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

          .annex-image {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;

            /deep/.u-image {
              margin-right: 10rpx;
            }
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