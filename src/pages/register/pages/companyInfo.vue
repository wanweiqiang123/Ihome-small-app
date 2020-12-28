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
          <u-form-item label="公司简称" required prop="shortName">
            <u-input v-model="companyForm.shortName" :clearable="true" placeholder="请输入公司简称"/>
          </u-form-item>
          <u-form-item label="公司类型" required prop="type">
            <u-input v-model="companyForm.type" :clearable="true" placeholder="请输入公司类型"/>
          </u-form-item>
          <u-form-item label="法定代表人" required prop="legalPerson">
            <u-input v-model="companyForm.legalPerson" :clearable="true" placeholder="请输入法定代表人"/>
          </u-form-item>
          <u-form-item label="法人身份证号码" required prop="legalIdentityCode">
            <u-input v-model="companyForm.legalIdentityCode" :clearable="true" placeholder="请输入法人身份证号码"/>
          </u-form-item>
          <u-form-item label="成立日期" class="hide-icon" right-icon="arrow-right" required prop="setupTime">
            <u-input
              v-model="companyForm.setupTime"
              type="select"
              :clearable="true"
              @click="showDate = true"
              placeholder="请选择成立日期"/>
          </u-form-item>
          <u-form-item label="注册资本" required prop="capital">
            <u-input v-model="companyForm.capital" :clearable="true" placeholder="请输入注册资本"/>
          </u-form-item>
          <u-form-item label="营业期限">
            <u-input v-model="companyForm.businessTime" :clearable="true" placeholder="请输入营业期限"/>
          </u-form-item>
          <u-form-item label="地区" class="hide-icon" right-icon="arrow-right" required prop="region">
            <u-input
              v-model="companyForm.region"
              type="select"
              :clearable="true"
              @click="showRegion = true"
              placeholder="请选择地区"/>
          </u-form-item>
          <u-form-item label="住所" required prop="address">
            <u-input v-model="companyForm.address" :clearable="true" placeholder="请输入住所"/>
          </u-form-item>
        </view>
        <u-gap height="30" bg-color="#F1F1F1"></u-gap>
        <view class="info-item">
          <view class="form-title u-border-bottom">公司附件</view>
          <view class="annex-list-wrapper" v-for="item in annexInfo" :key="item.id">
            <view class="annex-type">
              <text v-if="item.subType === 'must'"
                    class="annex-required">*</text>
              {{item.name}}
            </view>
            <view>
              <u-upload
                :before-upload="beforeUpload"
                @on-success="uploadSuccess"
                @on-error="uploadError"
                :show-progress="false"
                :header="uploadHeader"
                :action="action"
                :multiple="false"
                name="files"
                :max-size="10 * 1024 * 1024"
                :file-list="fileList"></u-upload>
            </view>
          </view>
        </view>
        <u-gap height="30" bg-color="#F1F1F1"></u-gap>
        <view class="info-item">
          <view class="form-title u-border-bottom">基本存款账号信息</view>
          <u-form-item label="账户名称" required prop="accountName">
            <u-input
              v-model="companyForm.accountName"
              placeholder="账户名称" :clearable="true" input-align="left" />
          </u-form-item>
          <u-form-item label="开户银行" right-icon="arrow-right" class="hide-icon" required prop="branchName">
            <u-input
              @click="showBank = true"
              v-model="companyForm.branchName" type="select"
              placeholder="开户银行" disabled :clearable="true" input-align="left" />
          </u-form-item>
          <u-form-item label="银行卡号" required prop="accountNo">
            <u-input
              v-model="companyForm.accountNo"
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
      @confirm="confirmDate"
      v-model="showDate"
      mode="time"
      :params="dateParams"></u-picker>
    <u-select
      v-model="showRegion"
      mode="mutil-column-auto"
      :list="areaList"
      @confirm="confirmRegion"></u-select>
    <u-popup v-model="showBank" mode="right" length="100%">
      <view class="select-bank-list-wrapper">
        <view class="top-wrapper">
          <u-search
            class="search"
            shape="round"
            height="72"
            @change="changeSearch"
            @search="getBankList"
            placeholder-color="#BDBDBD"
            search-icon-color="#BDBDBD"
            bg-color="#FFFFFF"
            border-color="#DCDCDC"
            :show-action="false"
            placeholder="请输入开户银行名搜索"
            v-model="queryPageParameters.bankName"></u-search>
        </view>
        <scroll-view :scroll-top="0" scroll-y="true" class="scroll-y-wrapper" @scrolltolower="scrollLower">
          <view
            class="bank-item"
            v-for="(item, index) in bankList" :key="index"
            @click="handleSelectBank(item)">{{item.bankName}}</view>
          <u-divider v-if="isMore" :fontSize="30" :margin-top="30" half-width="100%">没有更多了</u-divider>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { getAreaList, getChannelAttachment, getBankBranchList, channelRegister } from '@/api/channel';
import { validIdentityCard } from '@/common/validate';
import { getTempToken } from '@/api/channel';
import { currentEnvConfig } from '@/env-config';

// 防抖
const debounce = (function () {
  let timer = null;
  return function (fn, interval) {
    clearTimeout(timer);
    timer = setTimeout(fn, interval || 200);
  };
})();

export default {
  props: {
    baseForm: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      areaList: [], // 省市区
      companyForm: {
        shortName: null,
        type: null,
        legalPerson: null,
        legalIdentityCode: null,
        setupTime: null,
        capital: null,
        businessTime: null,
        region: null,
        province: null,
        city: null,
        county: null,
        address: null,
        accountName: null,
        branchName: null,
        accountNo: null,
        channelBanks: [
          {
            accountName: null, // 账户名称
            accountNo: null, // 账户号码
            branchName: null, // 开户银行
          }
        ],
        channelAttachments: [
          {
            fileId: null,
            fileName: null,
            type: null
          }
        ] // 附件信息
      },
      rules: {
        shortName: [
          { required: true, message: '请输入公司简称', trigger: ['blur'] }
        ],
        type: [
          { required: true, message: '请输入公司类型', trigger: ['blur'] }
        ],
        legalPerson: [
          { required: true, message: '请输入法定代表人', trigger: ['blur'] }
        ],
        legalIdentityCode: [
          { validator: validIdentityCard, trigger: ['blur'] }
        ],
        setupTime: [
          { required: true, message: '请选择成立日期', trigger: ['blur'] }
        ],
        capital: [
          { required: true, message: '请输入注册资本', trigger: ['blur'] }
        ],
        region: [
          { required: true, message: '请选择地区', trigger: ['blur'] }
        ],
        address: [
          { required: true, message: '请输入住所', trigger: ['blur'] }
        ],
        accountName: [
          { required: true, message: '请输入账户名称', trigger: ['blur'] }
        ],
        branchName: [
          { required: true, message: '请选择开户银行', trigger: ['blur'] }
        ],
        accountNo: [
          { required: true, message: '请输入银行卡号', trigger: ['blur'] }
        ]
      },
      annexInfo: [],
      action: `${currentEnvConfig['protocol']}://${currentEnvConfig['apiDomain']}/sales-api/sales-document-cover/file/upload`,
      uploadHeader: {},
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
        pageNum: 1,
        pageSize: 10,
        bankName: null
      },
      bankList: [],
      tempToke: '',
      isMore: false
    };
  },
  onReady() {
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    this.$refs.companyForm.setRules(this.rules);
  },
  async created() {
    // console.log('baseForm', this.baseForm);
    await this.getTempToken();
    await this.getArea();
    await this.getChannelAttachmentList();
    await this.getBankList();
  },
  methods: {
    // 上传前
    beforeUpload(index, list) {
      console.log('beforeUpload+index', index);
      console.log('beforeUpload+list', list);
      uni.showToast({
        icon: 'loading',
        title: '正在上传...',
        duration: 500000000000
      });
      return true;
    },
    // 上传成功
    uploadSuccess(data, index, lists, name) {
      console.log('uploadSuccess+data', data);
      console.log('uploadSuccess+index', index);
      console.log('uploadSuccess+lists', lists);
      console.log('uploadSuccess+name', name);
      uni.hideToast();
      setTimeout(() => {
        uni.showToast({
          icon: 'success',
          title: '上传成功',
          duration: 5000
        });
      }, 100)
    },
    // 上传失败
    uploadError(res, index, lists, name) {
      uni.hideToast();
      setTimeout(() => {
        uni.showToast({
          icon: 'error',
          title: '上传失败',
          duration: 5000
        });
      }, 100)
      console.log('uploadError+res', res);
      console.log('uploadError+index', index);
      console.log('uploadError+lists', lists);
      console.log('uploadError+name', name);
    },
    // 获取临时token
    getTempToken() {
      let self = this;
      uni.login({
        success: async (res) => {
          console.log('123onLoad:', res);
          try {
            let token = await getTempToken(res.code);
            // console.log('tokenOnCompany', token);
            self.tempToke = token;
            this.uploadHeader = {
              'Content-Type': 'multipart/form-data',
              Authorization: `bearer ${token}`
            };
          } catch (error) {
            console.log(error);
            self.tempToke = '';
          }
        }
      });
    },
    // 保存并注册
    async handleSave() {
      this.$refs.companyForm.validate(valid => {
        if (valid) {
          console.log('验证通过');
          const info = channelRegister(this.queryPageParameters);
          console.log(info);
          this.$emit('next');
        } else {
          console.log('验证失败');
        }
      });
    },
    // 确定选择日期
    confirmDate(value) {
      console.log(value);
      if (value) {
        this.companyForm.setupTime = `${value.year}-${value.month}-${value.day}`
      }
    },
    // 确定选择地区
    confirmRegion(value) {
      console.log(value);
      if (value && value.length > 0) {
        this.companyForm.province = value[0].value;
        this.companyForm.city = value[1].value;
        this.companyForm.county = value[2].value;
        this.companyForm.region = `${value[0].label}${value[1].label}${value[2].label}`;
      }
    },
    // 确定选择银行
    handleSelectBank(item) {
      console.log(item);
      if (item.id) {
        this.companyForm.branchName = item.bankName;
        this.showBank = false;
      }
    },
    // 获取银行列表
    async getBankList(type = '') {
      if (this.isMore) return;
      const list = await getBankBranchList(this.queryPageParameters);
      // console.log(list);
      if (type === 'more') {
        // 上拉加载更多
        if (list && list.list.length > 0) {
          this.isMore = false;
          this.bankList.push(...list.list);
        } else {
          this.isMore = true;
        }
      } else {
        // 其他情况
        if (list && list.list.length > 0) {
          this.bankList = list.list;
        } else {
          this.bankList = [];
        }
      }
    },
    // 获取省市区
    async getArea() {
      let list = await getAreaList();
      // console.log(list);
      let first = this.$u.deepClone(list[0]);
      list.splice(0, 1);
      list = list.map((v) => ({
        ...v,
        value: v.code,
        label: v.name,
      }));
      this.areaList = this.$tool.listToGruop(list, {
        rootId: first.code,
        children: "children",
        parentId: "parentCode",
        id: "value",
      });
    },
    // 获取附件类型
    async getChannelAttachmentList() {
      let postData = {
        type: "ChannelAttachment",
        valid: "Valid"
      }
      this.annexInfo = await getChannelAttachment(postData);
      console.log('this.annexInfo', this.annexInfo);
    },
    // 搜索银行
    changeSearch(value) {
      // console.log(value);
      this.isMore = false;
      this.queryPageParameters.pageNum = 1;
      this.queryPageParameters.pageSize = 10;
      if (!!(value.trim())) {
        debounce(this.getBankList, 500);
      } else {
        this.getBankList();
      }
    },
    // 上拉加载
    scrollLower() {
      this.queryPageParameters.pageNum = this.queryPageParameters.pageNum + 1;
      this.getBankList('more');
    },
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
      padding: 0rpx 10rpx;

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

            .annex-required {
              //position: absolute;
              //left: -16rpx;
              vertical-align: middle;
              color: #fa3534;
              padding-top: 6rpx;
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

    .scroll-y-wrapper {
      width: 100%;
      height: calc(100vh - 805rpx);
    }

    .bank-item {
      padding: 30rpx 10rpx;
      text-align: left;
      border-bottom: 1rpx solid #CCCCCC;
    }
  }
</style>