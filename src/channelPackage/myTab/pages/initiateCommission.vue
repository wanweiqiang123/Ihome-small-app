<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-26 14:24:10
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-18 11:10:23
-->
<template>
  <view class="initiate-commission-wrapper">
    <view class="form-wrapper">
      <u-form
        :model="paymentForm"
        ref="paymentForm"
        :label-width="190"
      >
        <u-form-item
          label="结佣项目"
          right-icon="arrow-right"
          class="hide-icon"
        >
          <u-input
            @click="showAccount = true"
            v-model="paymentForm.account"
            placeholder="结佣项目"
            disabled
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="initiate-title u-margin-bottom-20">
      <text>待结佣成交列表</text>
      <view @click="showProject = true">
        <u-icon name="plus" /> 添加
      </view>
    </view>
    <view class="commission-item-wrapper">
      <view class="top">
        <view class="top-container u-border-bottom">
          <view class="top-title">爱特城（20200101～202002001）</view>
        </view>
        <view class="top-money">
          <text>结佣总额：</text>
          <text class="money-rad">600.00</text>
          <text class="money-unit">元</text>
        </view>
      </view>
      <view class="bottom u-border-bottom">
        <view>
          <view class="code">成交报告编号：DF836372822</view>
          <view>本单佣金：200.00</view>
        </view>
        <u-icon
          name="close-circle-fill"
          color="#C0C4CC"
          size="50"
        ></u-icon>
      </view>
      <view class="bottom u-border-bottom">
        <view>
          <view class="code">成交报告编号：DF836372822</view>
          <view>本单佣金：200.00</view>
        </view>
        <u-icon
          name="close-circle-fill"
          color="#C0C4CC"
          size="50"
        ></u-icon>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="form-title u-border-bottom">收款信息</view>
      <u-form
        :model="paymentForm"
        ref="paymentForm"
        :label-width="190"
      >
        <u-form-item
          label="收款帐号"
          right-icon="arrow-right"
          class="hide-icon"
        >
          <u-input
            @click="showAccount = true"
            v-model="paymentForm.account"
            type="select"
            placeholder="收款帐号"
            :clearable="false"
          />
        </u-form-item>
        <u-form-item
          label="发票类型"
          right-icon="arrow-right"
          class="hide-icon"
        >
          <u-input
            @click="showInvoiceType = true"
            v-model="paymentForm.invoiceType"
            type="select"
            placeholder="发票类型"
            :clearable="false"
          />
        </u-form-item>
        <u-form-item
          label="发票税率"
          right-icon="arrow-right"
          class="hide-icon"
        >
          <u-input
            @click="showInvoiceTaxRate = true"
            v-model="paymentForm.invoiceTaxRate"
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
        :model="paymentForm"
        ref="paymentForm"
        :label-width="190"
      >
        <u-form-item
          label="本单佣金"
          right-icon="arrow-right"
        >
          <u-input
            v-model="paymentForm.estateName"
            placeholder="本单佣金"
            disabled
            :clearable="false"
          />
        </u-form-item>
        <u-form-item
          label="不含税金额"
          right-icon="arrow-right"
        >
          <u-input
            v-model="paymentForm.roof"
            placeholder="不含税金额"
            disabled
            :clearable="false"
          />
        </u-form-item>
        <u-form-item
          label="税额"
          right-icon="arrow-right"
        >
          <u-input
            v-model="paymentForm.room"
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
        v-for="item in annexList"
        :key="item.id"
      >
        <view class="annex-type">{{item.type}}</view>
        <view>
          <u-upload
            :action="action"
            :file-list="fileList"
          ></u-upload>
        </view>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="form-title u-border-bottom">说明</view>
      <u-form
        :model="paymentForm"
        ref="paymentForm"
        :label-width="190"
      >
        <u-form-item
          label="申请说明"
          right-icon="arrow-right"
        >
          <u-input
            v-model="paymentForm.estateName"
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
          <view class="selected">
            <u-checkbox shape="circle">全选</u-checkbox>
          </view>
          <view class="filter-wrapper">筛选</view>
          <u-icon
            name="grid-fill"
            color="#3478F7"
            size="38"
            @click="showProjectCase = true"
          ></u-icon>
        </view>
        <view
          class="add-list-item-wrapper"
          v-for="item in [1,2,3,4,5,6,7,8,9,10]"
          :key="item"
        >
          <view class="item-select">
            <u-checkbox shape="circle"></u-checkbox>
          </view>
          <view
            class="item-info"
            @click="viewProjectCommDetails"
          >
            <view class="item-code u-padding-bottom-15">
              <view>CJ18919873</view>
              <view class="u-text-right">可结佣金：200.00</view>
            </view>
            <view class="u-padding-bottom-15">爱特城项目(20200130~20200228)</view>
            <view class="u-padding-bottom-15">成交日期：2020-11-26 16:33:33</view>
          </view>
        </view>
        <view class="add-btn-wrapper">
          <view
            class="left"
            @click="showProject = false"
          >取消</view>
          <view
            class="right"
            @click="showProject = false"
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
          >
            <u-form-item
              label="项目名称"
              right-icon="arrow-right"
              class="hide-icon"
            >
              <u-input
                @click="showProjectName = true"
                v-model="projectCaseForm.name"
                type="select"
                placeholder="项目名称"
                :clearable="false"
              />
            </u-form-item>
            <u-form-item
              label="项目周期"
              right-icon="arrow-right"
              class="hide-icon"
            >
              <u-input
                @click="showProjectCycle = true"
                v-model="projectCaseForm.cycle"
                type="select"
                placeholder="项目周期"
                :clearable="false"
              />
            </u-form-item>
            <u-form-item
              label="成交报告编号"
              right-icon="arrow-right"
            >
              <u-input
                v-model="projectCaseForm.code"
                placeholder="成交报告编号"
                :clearable="false"
              />
            </u-form-item>
          </u-form>
        </view>
        <view class="add-btn-wrapper">
          <view
            class="left"
            @click="showProjectCase = false"
          >重置</view>
          <view
            class="right"
            @click="showProjectCase = false"
          >确定</view>
        </view>
      </view>
    </u-popup>
    <u-select
      v-model="showProjectName"
      z-index="20000"
      :list="projectNameList"
      @confirm="confirmProjectName"
    ></u-select>
    <u-select
      v-model="showProjectCycle"
      z-index="20000"
      :list="projectCycleList"
      @confirm="confirmProjectCycle"
    ></u-select>
    <u-popup
      v-model="showAccount"
      mode="right"
      length="100%"
    >
      <view class="account-list-wrapper">
        <view
          @click="selectAccount(index)"
          :class="currentAccountIndex === index ? 'account-list selected-color' : 'account-list'"
          v-for="(item, index) in [1,2,3,4,5]"
          :key="index"
        >
          <view>账户名称：广州市择食电子商务有限责任公司</view>
          <view>开户银行：中国银行独山县支行</view>
          <view>银行卡号：4431-3466-4687-3100-12445</view>
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
export default {
  data() {
    return {
      paymentForm: {
        account: "",
        invoiceType: "",
        invoiceTaxRate: "",
      },
      showProject: false,
      showProjectCase: false,
      projectCaseForm: {
        name: "",
        cycle: "",
        code: "",
      },
      showProjectName: false,
      projectNameList: [
        {
          value: "1",
          label: "富力新城",
        },
        {
          value: "2",
          label: "保利爱立信",
        },
        {
          value: "3",
          label: "富力广场",
        },
        {
          value: "4",
          label: "增值税普通发票",
        },
      ],
      showProjectCycle: false,
      projectCycleList: [
        {
          value: "1",
          label: "0130~0228",
        },
        {
          value: "2",
          label: "0228~0330",
        },
        {
          value: "3",
          label: "0330~0443",
        },
        {
          value: "4",
          label: "0443~0552",
        },
      ],
      showAccount: false,
      currentAccountIndex: 1,
      showInvoiceType: false,
      invoiceTypeList: [
        {
          value: "1",
          label: "增值税普通发票",
        },
        {
          value: "2",
          label: "增值税专用发票",
        },
      ],
      showInvoiceTaxRate: false,
      invoiceTaxRateList: [
        {
          value: "1",
          label: "1%",
        },
        {
          value: "2",
          label: "3%",
        },
        {
          value: "3",
          label: "5%",
        },
        {
          value: "4",
          label: "6%",
        },
        {
          value: "5",
          label: "9%",
        },
        {
          value: "5",
          label: "13%",
        },
      ],
      annexList: [
        {
          id: 1,
          type: "发票",
          imgUrl: [
            "https://cdn.uviewui.com/uview/example/fade.jpg",
            "https://cdn.uviewui.com/uview/example/fade.jpg",
          ],
        },
        {
          id: 1,
          type: "请款单",
          imgUrl: [
            "https://cdn.uviewui.com/uview/example/fade.jpg",
            "https://cdn.uviewui.com/uview/example/fade.jpg",
          ],
        },
        {
          id: 1,
          type: "结算明细",
          imgUrl: [
            "https://cdn.uviewui.com/uview/example/fade.jpg",
            "https://cdn.uviewui.com/uview/example/fade.jpg",
          ],
        },
      ],
      action: "http://www.example.com/upload",
      fileList: [],
    };
  },
  onLoad() {},
  methods: {
    // 选择账号
    selectAccount(index) {
      this.currentAccountIndex = index;
      this.showAccount = false;
    },
    // 选择项目名称
    confirmProjectName(e) {
      this.projectCaseForm.name = e[0].label;
    },
    // 选择项目周期
    confirmProjectCycle(e) {
      this.projectCaseForm.cycle = e[0].label;
    },
    // 选择发票类型
    confirmInvoiceType(e) {
      this.paymentForm.invoiceType = e[0].label;
    },
    // 选择发票税率
    confirmInvoiceTaxRate(e) {
      this.paymentForm.invoiceTaxRate = e[0].label;
    },
    // 查看项目结佣情况
    viewProjectCommDetails() {
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/projectCommDetails`,
      });
    },
    // 查看结佣成交详情
    viewDealDetail(item) {
      console.log(item);
      uni.navigateTo({
        url: `/channelPackage/myTab/pages/dealDetails`,
      });
    },
    // 提交
    handleSubmit() {
      uni.redirectTo({
        url: `/channelPackage/myTab/pages/commissionList`,
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