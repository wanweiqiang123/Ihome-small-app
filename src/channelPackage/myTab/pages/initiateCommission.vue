<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-26 14:24:10
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:38:01
-->
<template>
  <view class="initiate-commission-wrapper">
    <view class="form-wrapper">
      <u-form
        :model="info"
        :label-width="190"
      >
        <u-form-item
          label="结佣项目"
          right-icon="arrow-right"
          class="hide-icon"
        >
          <u-input
            @click="projectSearch"
            v-model="info.payApplyVO.projectName"
            placeholder="结佣项目"
            disabled
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="initiate-title u-margin-bottom-20">
      <text>待结佣成交列表</text>
      <view @click="addDeal">
        <u-icon name="plus" /> 添加
      </view>
    </view>
    <view
      class="commission-item-wrapper"
      v-for="(item, i) in showDealList"
      :key="i"
    >
      <view class="top">
        <view class="top-container u-border-bottom">
          <view class="top-title">{{item.cycleName | emptyFilter}}</view>
        </view>
        <view class="top-money">
          <text>结佣总额：</text>
          <text class="money-rad">{{item.payNum | emptyFilter}}</text>
          <text class="money-unit">元</text>
        </view>
      </view>
      <view
        class="bottom u-border-bottom"
        v-for="(key, k) in item.dealList"
        :key="k"
      >
        <view @click="viewDealDetail(key.dealCode)">
          <view class="code">成交报告编号：{{key.dealCode | emptyFilter}}</view>
          <view>本单佣金：{{key.actualAmount | emptyFilter}}</view>
        </view>
        <u-icon
          name="close-circle-fill"
          color="#C0C4CC"
          size="50"
          @click="deleteDeal(key.dealCode, i, k)"
        ></u-icon>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="form-title u-border-bottom">收款信息</view>
      <u-form
        :model="info.payApplyVO"
        ref="info"
        :label-width="190"
      >
        <u-form-item
          label="收款帐号"
          right-icon="arrow-right"
          class="hide-icon"
          required
          prop="receiveAccount"
        >
          <u-input
            @click="showAccount = true"
            v-model="info.payApplyVO.receiveAccount"
            type="select"
            placeholder="收款帐号"
            :clearable="false"
          />
        </u-form-item>
        <u-form-item
          label="发票类型"
          right-icon="arrow-right"
          class="hide-icon"
          required
          prop="invoiceTypeName"
        >
          <u-input
            @click="showInvoiceType = true"
            v-model="info.payApplyVO.invoiceTypeName"
            type="select"
            placeholder="发票类型"
            :clearable="false"
          />
        </u-form-item>
        <u-form-item
          label="发票税率"
          right-icon="arrow-right"
          class="hide-icon"
          required
          prop="taxRateName"
        >
          <u-input
            @click="showInvoiceTaxRate = true"
            v-model="info.payApplyVO.taxRateName"
            type="select"
            placeholder="发票税率"
            :clearable="false"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="form-wrapper">
      <view class="form-title u-border-bottom">佣金结算</view>
      <u-form
        :model="info"
        :label-width="190"
      >
        <u-form-item label="本单佣金">
          <u-input
            v-model="info.payApplyVO.bendanNum"
            placeholder="本单佣金"
            disabled
            :clearable="false"
          />
        </u-form-item>
        <u-form-item label="不含税金额">
          <u-input
            v-model="info.payApplyVO.noTaxAmount"
            placeholder="不含税金额"
            disabled
            :clearable="false"
          />
        </u-form-item>
        <u-form-item label="税额">
          <u-input
            v-model="info.payApplyVO.tax"
            placeholder="税额"
            disabled
            :clearable="false"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="form-wrapper">
      <view class="form-title u-border-bottom">附件信息</view>
      <view
        class="annex-list-wrapper"
        v-for="(item, i) in dictList"
        :key="i"
      >
        <view class="annex-type">{{item.name | emptyFilter}}</view>
        <u-upload
          max-count="10"
          class="upload"
          width="160"
          height="160"
          :action="$tool.getUploadUrl()"
          @on-success="successChange($event, item.code)"
          @on-remove="removeChange($event, item.code)"
          :show-upload-list="true"
          :header="header"
          :show-progress="false"
          :file-list="item.showList"
          name="files"
        ></u-upload>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="form-title u-border-bottom">说明</view>
      <u-form
        :model="info"
        :label-width="190"
      >
        <u-form-item label="申请说明">
          <u-input
            v-model="info.payApplyVO.description"
            placeholder="申请说明"
            :clearable="false"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="btn-wrapper">
      <u-button
        type="primary"
        shape="circle"
        @click="handleSubmit"
      >提交</u-button>
    </view>
    <u-popup
      v-model="showProject"
      mode="right"
      length="100%"
    >
      <view class="add-project-list-wrapper">
        <view class="title">
          <view
            class="selected"
            @click="checkAll"
          >
            <checkbox
              :value="allChecked"
              :checked="allChecked"
              color="#4881f9"
              style="transform:scale(0.8)"
            >全选</checkbox>
          </view>
          <view
            class="filter-wrapper"
            @click="showProjectCase = true"
          >
            <view>筛选</view>
            <u-icon
              name="grid-fill"
              color="#3478F7"
              size="38"
            ></u-icon>
          </view>
        </view>
        <view
          class="add-list-item-wrapper"
          v-for="(item, i) in dealList"
          :key="i"
          @click="checkMore(item.dealCode)"
        >
          <view class="item-select">
            <checkbox
              style="transform:scale(0.7)"
              :value="item.dealCode"
              :checked="item.checked"
              color="#4881f9"
            ></checkbox>
          </view>
          <view class="item-info">
            <view class="item-code u-padding-bottom-15">
              <view>{{item.dealCode}}</view>
              <view class="u-text-right">可结佣金：{{$tool.add(item.ageCanCommFees, item.serCanCommFees)}}</view>
            </view>
            <view class="u-padding-bottom-15">{{item.cycleName | emptyFilter}}</view>
            <view class="u-padding-bottom-15">成交日期：{{item.signDate | emptyFilter}}</view>
          </view>
        </view>
        <view class="add-btn-wrapper safe-area-inset-bottom">
          <view
            class="left"
            @click="showProject = false"
          >取消</view>
          <view
            class="right"
            @click="dealComfirm"
          >确认</view>
        </view>
      </view>
    </u-popup>
    <u-popup
      v-model="showProjectCase"
      mode="right"
      :z-inde="15000"
      length="70%"
    >
      <view class="project-case-wrapper">
        <view>
          <u-form
            :model="projectCaseForm"
            ref="projectCaseForm"
            :label-width="190"
            label-position="top"
          >
            <u-form-item
              label="项目周期"
              right-icon="arrow-right"
              class="hide-icon"
            >
              <u-input
                @click="termSearch"
                v-model="projectCaseForm.cycleName"
                type="select"
                placeholder="项目周期"
                :clearable="false"
              />
            </u-form-item>
            <u-form-item label="成交报告编号">
              <u-input
                v-model="projectCaseForm.dealCode"
                placeholder="成交报告编号"
                :clearable="false"
              />
            </u-form-item>
          </u-form>
        </view>
        <view class="add-btn-wrapper safe-area-inset-bottom">
          <view
            class="left"
            @click="projectCaseFormReset"
          >重置</view>
          <view
            class="right"
            @click="projectCaseFormConfirm"
          >确定</view>
        </view>
      </view>
    </u-popup>
    <u-popup
      v-model="showAccount"
      mode="right"
      length="100%"
    >
      <view class="account-list-wrapper">
        <view
          @click="selectAccount(item, index)"
          :class="currentAccountIndex === index ? 'account-list selected-color' : 'account-list'"
          v-for="(item, index) in channelBanks"
          :key="index"
        >
          <view>账户名称：{{item.accountName}}</view>
          <view>开户银行：{{item.branchName}}</view>
          <view>银行卡号：{{item.accountNo}}</view>
        </view>
      </view>
    </u-popup>
    <u-select
      v-model="showInvoiceType"
      :list="invoiceTypeList"
      @confirm="confirmInvoiceType"
    ></u-select>
    <u-select
      v-model="showInvoiceTaxRate"
      :list="invoiceTaxRateList"
      @confirm="confirmInvoiceTaxRate"
    ></u-select>
  </view>
</template>

<script>
import {
  postPayDealApi,
  getChannelInfo,
  postCreatepayApplyApi,
} from "@/api/channel";
import { getAllByTypeApi } from "@/api";
import storageTool from "../../../common/storageTool.js";
export default {
  data() {
    return {
      info: {
        payApplyVO: {
          projectId: "",
          projectName: "",
          description: "",
          agencyId: "",
          agencyName: "",
          invoiceType: "",
          receiveAccount: "",
          invoiceTypeName: "",
          taxRateName: "",
          taxRate: "",
          bendanNum: 0,
          noTaxAmount: 0,
          tax: 0,
        },
        documentList: [], //附件信息
        payApplyDetailList: [], // 待付款列表信息
      },
      infoRules: {
        receiveAccount: [
          { required: true, message: "请选择收款帐号", trigger: "change" },
        ],
        invoiceTypeName: [
          { required: true, message: "请选择发票类型", trigger: "change" },
        ],
        taxRateName: [
          { required: true, message: "请选择发票税率", trigger: "change" },
        ],
      },
      dealList: [], // 成交报告list
      showDealList: [], // 展示的成交报告list
      channelBanks: [], // 渠道收款信息
      invoiceTypeList: [],
      invoiceTaxRateList: [],
      dictList: [],
      header: {
        Authorization: "bearer " + storageTool.getToken(),
      },
      PayoffFileType: [],
      showProject: false,
      showProjectCase: false,
      projectCaseForm: {
        cycleId: "",
        cycleName: "",
        dealCode: "",
      },
      showAccount: false,
      currentAccountIndex: 1,
      showInvoiceType: false,
      showInvoiceTaxRate: false,
    };
  },
  computed: {
    allChecked() {
      if (this.dealList.length) {
        if (this.dealList.every((v) => v.checked)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  onReady() {
    this.$nextTick(() => {
      this.$refs.info.setRules(this.infoRules);
    });
  },
  async onLoad() {
    this.info.payApplyVO.agencyId = this.$storageTool.getUserInfo().channelId;
    this.info.payApplyVO.agencyName = this.$storageTool.getUserInfo().name;
    // 假数据
    // this.info.payApplyVO.agencyId = 508;
    // this.info.payApplyVO.agencyName = "渠道1232020";
    this.getChannelInfo(this.info.payApplyVO.agencyId);
    let res = await this.getDictAll("PayoffFileType");
    this.PayoffFileType = res.filter((v) =>
      ["Invoice", "RequestForm", "SetteDetail"].includes(v.code)
    );
    this.dictList = this.PayoffFileType.map((v) => ({
      code: v.code,
      id: v.id,
      name: v.name,
      fileList: [],
      showList: [],
    }));
  },
  async onShow() {
    const PayoffInvoiceType = await this.getDictAll("PayoffInvoiceType");
    const PayoffTaxRate = await this.getDictAll("PayoffTaxRate");
    this.invoiceTypeList = PayoffInvoiceType.map((v) => ({
      value: v.code,
      label: v.name,
    }));
    this.invoiceTaxRateList = PayoffTaxRate.map((v) => ({
      value: v.name,
      label: v.name + "%",
    }));
    let item = getApp().globalData.searchBackData;
    if (item && item.type === "project") {
      this.info.payApplyVO.projectId = item.data.proId;
      this.info.payApplyVO.projectName = item.data.proName;
      getApp().globalData.searchBackData = {};
    } else if (item && item.type === "term") {
      this.projectCaseForm.cycleId = item.data.termId;
      this.projectCaseForm.cycleName = item.data.termName;
      getApp().globalData.searchBackData = {};
    }
  },
  methods: {
    // 计算
    computedNum(val) {
      let arr = [];
      arr = val.map((v) => {
        let actualAmount = this.$tool.add(v.serCanCommFees, v.ageCanCommFees);
        let tax = this.$tool.sub(
          this.$tool.add(v.serCanCommFees, v.ageCanCommFees),
          this.$tool.div(
            this.$tool.add(v.serCanCommFees, v.ageCanCommFees),
            1 +
              (this.info.payApplyVO.taxRate
                ? this.info.payApplyVO.taxRate
                : 0) /
                100
          )
        );
        let noTaxAmount = this.$tool.sub(actualAmount, tax);
        let chaiyong = this.$tool.add(v.serCommFees, v.ageCommFees);
        let total1 = this.$tool.div(actualAmount, chaiyong);
        let ratio = this.$tool.multi(total1, 100);
        return {
          ...v,
          serThisCommFees: v.serCanCommFees,
          ageThisCommFees: v.ageCanCommFees,
          thisDeduct: 0,
          actualAmount,
          tax,
          noTaxAmount,
          ratio,
        };
      });
      let map = {};
      let newList = [];
      arr.forEach((e) => {
        if (!map[e.cycleId]) {
          map[e.cycleId] = {
            cycleId: e.cycleId,
            cycleName: e.cycleName,
            payNum: e.actualAmount,
            payTax: e.tax,
            dealList: [],
          };
        } else {
          map[e.cycleId].payNum += e.actualAmount;
          map[e.cycleId].payTax += e.tax;
        }
        map[e.cycleId].dealList.push(e);
      });
      for (let key in map) {
        newList.push(map[key]);
      }
      this.showDealList = newList;
      let paySum = 0;
      let payTax = 0;
      this.showDealList.forEach((j) => {
        paySum += j.payNum;
        payTax += j.payTax;
      });
      this.info.payApplyVO.bendanNum = this.$tool.tofixed(paySum, 2);
      this.info.payApplyVO.tax = this.$tool.tofixed(payTax, 2);
      this.info.payApplyVO.noTaxAmount = this.$tool.sub(
        this.$tool.tofixed(paySum, 2),
        this.$tool.tofixed(payTax, 2)
      );
    },
    // 获取收款账号
    async getChannelInfo(id) {
      const res = await getChannelInfo(id);
      this.channelBanks = res.channelBanks;
    },
    projectSearch() {
      getApp().globalData.searchParams = {
        api: "getFuzzySearchByCityApi",
        key: "proName",
        id: "proId",
        type: "project",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    termSearch() {
      getApp().globalData.searchParams = {
        api: "postTermListByProIdApi",
        key: "termName",
        id: "termId",
        type: "term",
        other: {
          proId: this.info.payApplyVO.projectId,
        },
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    addDeal() {
      if (this.info.payApplyVO.projectId) {
        this.showProject = true;
        this.getDealList();
      } else {
        this.$tool.toast("请先选择结佣项目");
      }
    },
    // 获取成交报告列表
    async getDealList() {
      const res = await postPayDealApi({
        projectId: this.info.payApplyVO.projectId,
        agencyId: this.$storageTool.getUserInfo().channelId,
        pageNum: 1,
        pageSize: 500,
        ...this.projectCaseForm,
      });
      this.dealList = res.list.map((v) => ({
        ...v,
        checked: false,
      }));
    },
    checkAll() {
      if (!this.allChecked) {
        this.dealList.forEach((v) => {
          v.checked = true;
        });
      } else {
        this.dealList.forEach((v) => {
          v.checked = false;
        });
      }
    },
    checkMore(val) {
      const item = this.dealList.find((v) => v.dealCode === val);
      item.checked = !item.checked;
    },
    // 确认
    dealComfirm() {
      const item = this.dealList.find((v) => v.checked);
      if (item) {
        this.showProject = false;
        let arr = [];
        arr = this.dealList.filter((v) => v.checked);
        this.computedNum(arr);
      } else {
        this.$tool.toast("请勾选成交报告");
      }
    },
    deleteDeal(code, index, i) {
      if (this.showDealList[index].dealList.length === 1) {
        this.showDealList = [];
      } else {
        this.showDealList[index].dealList.splice(i, 1);
      }
      let arr = [];
      this.dealList.forEach((v) => {
        if (v.dealCode === code) {
          v.checked = false;
        }
      });
      arr = this.dealList.filter((v) => v.checked);
      this.computedNum(arr);
      this.$tool.toast("删除成功");
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
    // 选择账号
    selectAccount(item, index) {
      this.currentAccountIndex = index;
      this.info.payApplyVO.receiveAccount = item.accountNo;
      this.info.payApplyVO.agencyAccountBank = item.branchName;
      this.showAccount = false;
    },
    // 选择发票类型
    confirmInvoiceType(e) {
      this.info.payApplyVO.invoiceTypeName = e[0].label;
      this.info.payApplyVO.invoiceType = e[0].value;
    },
    // 选择发票税率
    confirmInvoiceTaxRate(e) {
      this.info.payApplyVO.taxRateName = e[0].label;
      this.info.payApplyVO.taxRate = e[0].value;
      let arr = [];
      arr = this.dealList.filter((v) => v.checked);
      this.computedNum(arr);
    },
    projectCaseFormReset() {
      this.projectCaseForm = {
        cycleId: "",
        cycleName: "",
        dealCode: "",
      };
    },
    async projectCaseFormConfirm() {
      this.getDealList();
      this.showProjectCase = false;
    },
    // 上传移除
    removeChange(index, code) {
      this.dictList.forEach((v) => {
        if (v.code === code) {
          v.fileList.splice(index, 1);
        }
      });
    },
    // 上传成功
    successChange(data, code) {
      this.dictList.forEach((v) => {
        if (v.code === code) {
          if (v.fileList.length) {
            v.fileList.push({
              fileId: data.data[0].fileId,
              fileName:
                data.data[0].generateFileName +
                "." +
                data.data[0].generateFileType,
              fileType: code,
            });
          } else {
            v.fileList = [
              {
                fileId: data.data[0].fileId,
                fileName:
                  data.data[0].generateFileName +
                  "." +
                  data.data[0].generateFileType,
                fileType: code,
              },
            ];
          }
        }
      });
    },
    // 查看结佣成交详情
    viewDealDetail(code) {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/dealDetails?code=${code}&&type=commission`,
      });
    },
    // 提交
    async handleSubmit() {
      this.$refs.info.validate(async (valid) => {
        if (valid) {
          let obj = {
            payApplyVO: {},
            documentList: [],
            payApplyDetailList: [],
          };
          let arr = [];
          obj.payApplyVO = { ...this.info.payApplyVO };
          this.showDealList.forEach((v) => {
            arr = arr.concat(v.dealList);
          });
          obj.payApplyDetailList = arr;
          this.dictList.forEach((v) => {
            obj.documentList = obj.documentList.concat(v.fileList);
          });
          console.log(obj);
          await postCreatepayApplyApi(obj);
          this.$tool.toast("提交成功");
          uni.reLaunch({
            url: `/channelPackage/myTab/pages/commissionList`,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.initiate-commission-wrapper {
  width: 100%;
  padding: 20rpx 30rpx 40rpx 30rpx;
  background-color: $u-bg-color;

  .initiate-title {
    height: 92rpx;
    background: $uni-bg-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24rpx;
    color: $u-type-primary;
    font-family: "Source Han Sans CN";
  }

  .commission-item-wrapper {
    background: #fff;
    padding: 32rpx 0;

    .top {
      position: relative;
      padding: 0 20rpx;
      border-bottom: 1px dashed $u-bg-color;

      &::before {
        content: "";
        position: absolute;
        width: 25rpx;
        height: 25rpx;
        background: $u-bg-color;
        bottom: 0;
        left: 0;
        border-radius: 50%;
        transform: translate(-50%, 50%);
      }

      &::after {
        content: "";
        position: absolute;
        width: 25rpx;
        height: 25rpx;
        background: $u-bg-color;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        transform: translate(50%, 50%);
      }

      &-container {
        padding-bottom: 17rpx;
      }

      &-title {
        color: #1f1f1f;
        font-weight: 600;
        margin-bottom: 10rpx;
      }

      &-money {
        height: 98rpx;
        font-size: 30rpx;
        color: #333333;
        line-height: 98rpx;

        .money-rad {
          font-size: 36rpx;
          font-weight: 600;
          color: #ff0000;
        }

        .money-unit {
          color: #ff0000;
          font-size: 22rpx;
          vertical-align: bottom;
          margin-left: 6rpx;
        }
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 24rpx 39rpx 24rpx 17rpx;
      font-size: 25rpx;
      color: #999999;

      .code {
        color: #333333;
        font-size: 30rpx;
      }
    }

    & + & {
      margin-top: 10rpx;
    }
  }

  .form-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin: 20rpx 0rpx;
    background: $uni-bg-color;

    .form-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 92rpx;
      padding: 0 24rpx;
      color: $u-type-primary;
      font-family: "Source Han Sans CN";
    }

    .annex-list-wrapper {
      width: 100%;
      padding: 0rpx 20rpx 20rpx 20rpx;

      &:not(:last-child) {
        border-bottom: 1rpx solid #f1f1f1;
      }

      .annex-type {
        font-size: 30rpx;
        padding: 20rpx 0rpx 10rpx 0rpx;
      }
    }

    .form {
      background-color: $uni-bg-color;
      border: 1rpx solid #e4e4e4;
      box-sizing: border-box;
      padding: 0rpx 30rpx;
      margin: 20rpx 0rpx;
    }

    .form-img {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;

      .img-item {
        //width: 30%;
        display: flex;
        flex-direction: column;
        margin-right: 10rpx;

        .img-upload,
        .img-type {
          flex: 1;
        }

        .img-type {
          height: 65rpx;
          line-height: 65rpx;
          background-color: $uni-bg-color;
          text-align: center;
        }
      }
    }
  }

  .btn-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 50rpx;
    margin-bottom: 30rpx;
  }
}

.add-project-list-wrapper {
  width: 100%;
  padding: 0 20rpx;
  height: calc(100vh - 90rpx);
  overflow-y: auto;

  .title {
    width: 100%;
    padding: 20rpx 10rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1rpx solid #e4e4e4;

    .selected {
      flex: 1;
    }

    .filter-wrapper {
      display: flex;
      color: $u-type-primary;
      font-size: 30rpx;
    }
  }

  .add-list-item-wrapper {
    width: 100%;
    padding: 20rpx 10rpx;
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    .item-info {
      flex: 1;

      .item-code {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

        view {
          flex: 1;
        }
      }
    }
  }

  .add-btn-wrapper {
    width: 100%;
    //position: absolute;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    view {
      height: 80rpx;
      line-height: 80rpx;
      flex: 1;
      text-align: center;
    }

    .left {
      color: #999999;
      background-color: $uni-bg-color;
    }

    .right {
      color: $uni-bg-color;
      background-color: $u-type-primary;
    }
  }
}

.project-case-wrapper {
  width: 100%;
  padding: 20rpx 30rpx;

  .add-btn-wrapper {
    width: 100%;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    view {
      height: 80rpx;
      line-height: 80rpx;
      flex: 1;
      text-align: center;
    }

    .left {
      color: #999999;
      background-color: $uni-bg-color;
    }

    .right {
      color: $uni-bg-color;
      background-color: $u-type-primary;
    }
  }
}

.account-list-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx;

  .account-list {
    box-sizing: border-box;
    padding: 20rpx;
    border: 1rpx dashed #e4e4e4;
    margin-bottom: 20rpx;

    view {
      padding-bottom: 15rpx;
    }
  }

  .selected-color {
    border-color: #1abc9c;
  }
}
</style>