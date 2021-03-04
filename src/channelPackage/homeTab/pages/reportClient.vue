<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-24 09:58:09
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-04 09:04:40
-->
<template>
  <view class="report-client-wrapper">
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
        placeholder="请输入项目名称"
        disabled
        v-model="keyword"
        @click="projectSearch"
      ></u-search>
      <view class="project-card">
        <view class="project-img">
          <u-image
            width="242rpx"
            height="186rpx"
            :src="homeImg"
          ></u-image>
        </view>
        <view class="project-info">
          <view>{{info.proName | emptyFilter}}</view>
          <view>
            <u-tag
              :text="district"
              size="mini"
              :closeable="false"
              type="info"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="info-wrapper">
      <view class="card">
        <view class="client-info">
          <view class="title">客户信息</view>
          <view class="btn">
            <u-button
              type="warning"
              shape="circle"
              size="mini"
              @click="customerSearch"
            >客户池导入</u-button>
          </view>
        </view>
        <view class="form-wrapper">
          <u-form
            :model="custormInfo"
            ref="custormInfo"
            :label-width="130"
          >
            <u-form-item
              label="姓名"
              prop="name"
              required
            >
              <u-input
                v-model="custormInfo.name"
                placeholder="姓名"
                :clearable="false"
                input-align="left"
              />
            </u-form-item>
            <u-form-item
              label="性别"
              prop="sex"
              required
            >
              <u-radio-group v-model="custormInfo.sex">
                <u-radio name="Mr">先生</u-radio>
                <u-radio name="Ms">女士</u-radio>
              </u-radio-group>
            </u-form-item>
            <u-form-item
              label="手机号"
              required
            >
              <view class="mobileType">
                <view
                  v-if="checked"
                  class="qianhou"
                >
                  <u-input
                    v-model="qian"
                    type="number"
                    input-align="center"
                    placeholder="前三位"
                    maxlength="3"
                    :clearable="false"
                  />
                  <text>****</text>
                  <u-input
                    v-model="hou"
                    type="number"
                    input-align="center"
                    placeholder="后四位"
                    maxlength="4"
                    :clearable="false"
                  />
                </view>
                <view v-else>
                  <u-input
                    type="number"
                    v-model="custormInfo.mobile"
                    placeholder="手机号"
                    input-align="left"
                    maxlength="11"
                  />
                </view>
                <u-switch v-model="checked"></u-switch>
              </view>
            </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="card margin-top-20">
        <view class="client-info">
          <view class="title">报备信息</view>
        </view>
        <view class="form-wrapper">
          <u-form
            :model="info"
            ref="info"
            :label-width="190"
          >
            <u-form-item
              label="预计到访人数"
              prop="expectedNumber"
              required
            >
              <u-input
                type="number"
                v-model="info.expectedNumber"
                placeholder="预计到访人数"
                :clearable="true"
                input-align="left"
              />
            </u-form-item>
            <u-form-item
              label="预计到访时间"
              prop="expectedTime"
              class="hide-icon"
              right-icon="arrow-right"
              required
            >
              <u-input
                v-model="info.expectedTime"
                type="select"
                @click="showTime = true"
                placeholder="预计到访时间"
                :clearable="true"
                input-align="left"
              />
            </u-form-item>
            <u-form-item label="备注">
              <u-input
                v-model="info.remark"
                placeholder="备注"
                :clearable="true"
                input-align="left"
              />
            </u-form-item>
          </u-form>
        </view>
      </view>
    </view>
    <view class="report-bottom-btn">
      <u-button
        type="primary"
        shape="circle"
        @click="handleReport"
      >
        报备
      </u-button>
    </view>
    <u-picker
      v-model="showTime"
      mode="time"
      :params="timeParams"
      @confirm="handleConfirm"
    ></u-picker>
  </view>
</template>

<script>
import { getProDetailBBApi } from "@/api/index";
import { postReportApi } from "@/api/channel";
// import { postBuildByProId, postRoomByProId } from "@/api/staff";
export default {
  data() {
    return {
      info: {
        proName: "请选择项目",
        proId: "",
        expectedNumber: "",
        expectedTime: "",
        remark: "",
      },
      custormInfo: {
        name: "",
        sex: "Ms",
        mobile: "",
      },
      district: "海珠区",
      infoRules: {
        expectedNumber: [
          {
            required: true,
            message: "请输入预计到访人数",
            trigger: "change",
          },
        ],
        expectedTime: [
          {
            required: true,
            message: "请输入预计到访时间",
            trigger: "change",
          },
        ],
      },
      custormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            pattern: /^[1][3-9]\d{9}$|([6|9])\d{7}$|6\d{7}$|[0][9]\d{8}$|[1][3-9]\d{1}[*]{4}\d{4}$/,
            message: "请输入有效手机号",
            trigger: "change",
          },
        ],
      },
      homeImg: "",
      // pageType: "",
      showTime: false,
      currentSelectType: "",
      timeParams: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: false,
      },
      keyword: "",
      // buildingBlockList: [],
      reportId: "",
      checked: false,
      qian: "",
      hou: "",
    };
  },
  onReady() {
    this.$nextTick(() => {
      this.$refs.custormInfo.setRules(this.custormRules);
    });
  },
  async onLoad(option) {
    this.reportId = option.id;
    const msg = getApp().myReport;
    this.info.proId = msg?.proId;
    this.info.proName = msg?.proName;
    this.keyword = msg?.proName;
    this.info.exMarket = msg?.exMarket;
    this.homeImg = this.$tool.getFileUrl(msg?.projectPic);
    this.district = msg?.district;
    // this.buildingBlockList = await postBuildByProId({
    //   proId: this.info.proId,
    // });
    // if (option.type && option.type === "dealReg") {
    //   uni.setNavigationBarTitle({
    //     title: "成交登记",
    //   });
    //   this.pageType = "dealReg";
    //   this.custormInfo.name = msg?.name;
    //   this.custormInfo.sex = msg?.sex;
    //   this.custormInfo.mobile = msg?.mobile;
    // } else {
    //   this.pageType = "";
    // }
  },
  async onShow() {
    let item = getApp().globalData.searchBackData;
    if (item && item.type === "project") {
      this.info.proId = item.data.proId;
      const res = await getProDetailBBApi(this.info.proId);
      this.info.proName = res.proName;
      this.keyword = res.proName;
      this.info.exMarket = res.exMarket;
      this.district = res.districtName;
      this.homeImg = this.$tool.getFileUrl(res.proAddr);
      getApp().globalData.searchBackData = {};
      // if (this.pageType) {
      //   this.buildingBlockList = await postBuildByProId({
      //     proId: this.info.proId,
      //   });
      // }
    } else if (item && item.type === "customer") {
      this.checked = false;
      this.custormInfo.name = item.data.name;
      this.custormInfo.sex = item.data.sex;
      this.custormInfo.mobile = item.data.mobile;
      this.custormInfo.reportCustomerId = item.data.id;
      getApp().globalData.searchBackData = {};
    }
  },
  methods: {
    // 项目跳转搜索页
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
    // 客户池跳转搜索页
    customerSearch() {
      getApp().globalData.searchParams = {
        api: "postReportCustomerApi",
        key: "nameOrTel",
        id: "userId",
        type: "customer",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 确定选择时间
    handleConfirm(value) {
      this.info.expectedTime = `${value.year}-${value.month}-${value.day} ${value.hour}:${value.minute}`;
    },
    // 表单验证
    formDataRules() {
      let arr = [];
      const info = new Promise((resolve, reject) => {
        this.$refs.custormInfo.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      let item;
      item = new Promise((resolve, reject) => {
        this.$refs.info.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      arr.push(info, item);
      return arr;
    },
    // 报备客户
    handleReport() {
      this.$refs.info.setRules(this.infoRules);
      let formDataRules = this.formDataRules();
      Promise.all(formDataRules).then(async () => {
        const userInfo = this.$storageTool.getUserInfo();
        let obj = {};
        obj = { ...this.info, ...this.custormInfo };
        if (this.checked) {
          obj.mobile = this.qian + "****" + this.hou;
          obj.reportType = "FirstThreeAfterFour";
        } else {
          obj.reportType = "FullNumber";
        }
        obj.channelId = userInfo.channelId;
        obj.reportMobile = userInfo.mobilePhone;
        obj.reportName = userInfo.name;
        console.log(obj);
        await postReportApi(obj);
        getApp().myReport = {};
        this.$tool.toast("报备成功");
        uni.redirectTo({
          url: `/channelPackage/myTab/pages/myReport`, //跳转我的报备页
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.report-client-wrapper {
  width: 100%;
  height: calc(100vh - 110rpx);
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 10rpx;
  background-color: #f1f1f1;

  .top-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 10rpx 24rpx 10rpx 18rpx;
    background-color: #ffffff;

    .search {
      height: 72rpx;
    }

    .project-card {
      width: 100%;
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      padding: 25rpx 0rpx 0rpx 0rpx;

      .project-info {
        flex: 1;
        box-sizing: border-box;
        margin-left: 30rpx;

        view {
          box-sizing: border-box;
          margin-bottom: 10rpx;
        }

        .title-wrapper {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1c1c1c;
        }

        .price-wrapper {
          width: 100%;
          color: #fd4918;
          font-family: PingFang SC;

          .price {
            font-size: 32rpx;
            font-weight: 600;
          }

          .unit {
            font-size: 22rpx;
            box-sizing: border-box;
            display: inline-block;
            margin-left: 8rpx;
          }

          .two {
            vertical-align: super;
            font-size: 18rpx;
          }
        }

        .rule {
          width: 100%;
          color: #666666;

          .rule-tap {
            width: 40rpx;
            height: 40rpx;
            line-height: 40rpx;
            text-align: center;
            display: inline-block;
            background-color: orange;
            color: white;
            box-sizing: border-box;
            margin-right: 8rpx;
            border-radius: 17%;
          }
        }
      }
    }
  }

  .info-wrapper {
    box-sizing: border-box;
    margin: 20rpx 30rpx 0rpx 30rpx;

    .card {
      width: 100%;
      background-color: #ffffff;

      .client-info {
        width: 100%;
        height: 46px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 0rpx 30rpx;
        border-bottom: 1rpx solid #f1f1f1;

        .title {
          flex: 1;
          height: 30rpx;
          font-size: 30rpx;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #333333;
          line-height: 42rpx;
        }

        .btn {
          /deep/ .u-btn {
            width: 140rpx;
            height: 60rpx;
            background: #fcd639;
          }
        }
      }

      .form-wrapper {
        width: 100%;
        box-sizing: border-box;
        padding: 0rpx 20rpx;
      }
    }

    .margin-top-20 {
      margin-top: 20rpx;
    }
  }

  .report-bottom-btn {
    width: 100%;
    height: 95rpx;
    line-height: 95rpx;
    box-sizing: border-box;
    padding: 5rpx 20rpx;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
  }
}

.mobileType {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  .qianhou {
    display: flex;
    justify-content: space-around;
  }
}
</style>