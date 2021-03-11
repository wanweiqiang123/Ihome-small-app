<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-24 09:58:09
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-04 09:53:51
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
        <view
          class="client-info"
          v-if="dealRegisterType"
        >
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
                :disabled="!dealRegisterType"
              />
            </u-form-item>
            <u-form-item
              label="性别"
              prop="sex"
              required
            >
              <u-radio-group
                v-model="custormInfo.sex"
                :disabled="!dealRegisterType"
              >
                <u-radio name="Ms">女</u-radio>
                <u-radio name="Mr">男</u-radio>
              </u-radio-group>
            </u-form-item>
            <u-form-item
              label="手机号"
              required
            >
              <u-input
                v-if="reportType === 'FullNumber'"
                v-model="custormInfo.mobile"
                placeholder="手机号"
                input-align="left"
                :disabled="!dealRegisterType"
              />
              <view
                v-else
                class="qianhou"
              >
                <text>{{qian}}</text>
                <u-input
                  width="200"
                  type="number"
                  v-model="zhong"
                  placeholder="请补全四位手机号"
                  maxlength="4"
                  input-align="center"
                  :clearable="false"
                />
                <text>{{hou}}</text>
              </view>
            </u-form-item>
          </u-form>
        </view>
      </view>
      <view class="card margin-top-20">
        <view class="client-info">
          <view class="title">房产信息</view>
        </view>
        <view class="form-wrapper">
          <u-form
            :model="buildForm"
            ref="buildForm"
            :label-width="190"
          >
            <u-form-item label="楼盘名称">
              <u-input
                v-model="info.proName"
                placeholder="楼盘名称"
                disabled
                :clearable="false"
                input-align="left"
              />
            </u-form-item>
            <u-form-item
              label="认购栋座"
              prop="subBuildingName"
              right-icon="arrow-right"
              class="hide-icon"
              required
            >
              <u-input
                @click="buildingBlockShow = true"
                v-model="buildForm.subBuildingName"
                type="select"
                placeholder="认购栋座"
                :clearable="false"
                input-align="left"
              />
            </u-form-item>
            <u-form-item
              label="认购房号"
              prop="roomNo"
              right-icon="arrow-right"
              class="hide-icon"
              required
            >
              <u-input
                @click="roomNoShow = true"
                v-model="buildForm.roomNo"
                type="select"
                placeholder="认购房号"
                :clearable="false"
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
        登记
      </u-button>
    </view>
    <u-select
      title="选择栋座"
      confirm-color="#dd524d"
      v-model="buildingBlockShow"
      :list="buildingBlockList"
      @confirm="buildingBlockClick"
      value-name="buildingId"
      label-name="buildingName"
    ></u-select>
    <u-select
      title="选择房号"
      confirm-color="#dd524d"
      v-model="roomNoShow"
      :list="roomNoList"
      @confirm="roomNoClick"
      value-name="roomId"
      label-name="roomNo"
    ></u-select>
  </view>
</template>

<script>
import { getProDetailBBApi } from "@/api/index";
import { postAddDealtApi } from "@/api/channel";
import { postBuildByProId, postRoomByProId } from "@/api/staff";
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
      buildForm: {
        subBuildingName: "",
        subBuildingId: "",
        roomNo: "",
        roomId: "",
      },
      district: "海珠区",
      custormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        // mobile: [
        //   { required: true, message: "请输入手机号", trigger: "change" },
        //   {
        //     pattern: /^[1][3-9]\d{9}$|([6|9])\d{7}$|6\d{7}$|[0][9]\d{8}$|[1][3-9]\d{1}[*]{4}\d{4}$/,
        //     message: "请输入有效手机号",
        //     trigger: "change",
        //   },
        // ],
      },
      buildRules: {
        subBuildingName: [
          {
            required: true,
            message: "请选择栋座",
            trigger: "change",
          },
        ],
        roomNo: [
          {
            required: true,
            message: "请选择房号",
            trigger: "change",
          },
        ],
      },
      homeImg: "",
      buildingBlockShow: false,
      currentSelectType: "",
      roomNoShow: false,
      keyword: "",
      buildingBlockList: [],
      roomNoList: [],
      reportId: "",
      checked: false,
      dealRegisterType: "",
      reportType: "",
      qian: "",
      zhong: "",
      hou: "",
      homeImg: require("@/channelPackage/common/img/house.jpg"),
      routerFrom: "",
    };
  },
  onReady() {
    this.$nextTick(() => {
      this.$refs.custormInfo.setRules(this.custormRules);
    });
  },
  async onLoad(option) {
    this.reportId = option.id;
    this.routerFrom = option.from;
    const msg = getApp().myReport;
    this.dealRegisterType = msg.type;
    this.reportType = msg.reportType;
    console.log(msg);
    this.info.proId = msg?.proId;
    this.info.proName = msg?.proName;
    this.keyword = msg?.proName;
    this.info.exMarket = msg?.exMarket;
    this.homeImg = msg.projectPic
      ? this.$tool.getFileUrl(msg?.projectPic)
      : this.homeImg;
    this.district = msg?.district;
    this.buildingBlockList = await postBuildByProId({
      proId: this.info.proId,
    });
    this.custormInfo.name = msg?.name;
    this.custormInfo.sex = msg?.sex;
    // 如果手机号是前三后四
    if (msg.reportType === "FirstThreeAfterFour") {
      this.qian = msg.mobile.split("*")[0];
      this.hou = msg.mobile.split("*")[4];
    } else {
      this.custormInfo.mobile = msg?.mobile;
    }
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
      this.buildingBlockList = await postBuildByProId({
        proId: this.info.proId,
      });
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
      if (this.dealRegisterType) {
        getApp().globalData.searchParams = {
          api: "getFuzzySearchByCityApi",
          key: "proName",
          id: "proId",
          type: "project",
        };
        uni.navigateTo({
          url: "/pages/search/index/index",
        });
      }
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
    buildingBlockClick(v) {
      this.buildForm.subBuildingName = v[0].label;
      this.buildForm.subBuildingId = v[0].value;
      this.buildForm.roomNo = "";
      this.buildForm.roomId = "";
      this.getRoomList(this.buildForm.subBuildingId);
    },
    // 获取房号
    async getRoomList(buildNo) {
      this.roomNoList = await postRoomByProId({
        proId: this.info.proId,
        buildingId: buildNo,
        exDeal: 0,
		exReport: 0,
      });
    },
    roomNoClick(v) {
      this.buildForm.roomNo = v[0].label;
      this.buildForm.roomId = v[0].value;
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
        this.$refs.buildForm.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      arr.push(info, item);
      return arr;
    },
    // 成交登记
    handleReport() {
      this.$refs.buildForm.setRules(this.buildRules);
      let formDataRules = this.formDataRules();
      Promise.all(formDataRules).then(async () => {
        const userInfo = this.$storageTool.getUserInfo();
        let obj = {};
        obj = { ...this.custormInfo };
        obj.reportId = this.reportId;
        obj.roomId = this.buildForm.roomId;
        obj.subBuildingId = this.buildForm.subBuildingId;
        if (this.reportType === "FirstThreeAfterFour") {
          obj.mobile = this.qian + this.zhong + this.hou;
        }
        obj.reportType = "FullNumber";
        await postAddDealtApi(obj);
        getApp().myReport = {};
        this.$tool.toast("登记成功");
        if (this.routerFrom === "visit") {
          uni.redirectTo({
            url: `/staffPackage/dealConfirm/index`,
          });
        } else if (this.routerFrom === "report") {
          uni.redirectTo({
            url: `/channelPackage/myTab/pages/myReport`,
          });
        }
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

  .client-search-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 15rpx 20rpx;
    background-color: #f1f1f1;

    .search {
      height: 72rpx;
    }
  }

  .client-list {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 30rpx;
    border: 2rpx solid #f1f1f1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .client-name,
    .client-phone {
      height: 50rpx;
      line-height: 50rpx;
      flex: 1;
    }

    .client-phone {
      text-align: right;
    }
  }
}
.qianhou {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
</style>