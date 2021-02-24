<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-24 09:58:09
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 14:30:28
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
                <u-radio name="Ms">女</u-radio>
                <u-radio name="Mr">男</u-radio>
              </u-radio-group>
            </u-form-item>
            <u-form-item
              label="手机号"
              prop="mobile"
              required
            >
              <u-input
                v-model="custormInfo.mobile"
                placeholder="手机号"
                :clearable="false"
                input-align="left"
              />
            </u-form-item>
          </u-form>
        </view>
      </view>
      <view
        class="card margin-top-20"
        v-show="!pageType"
      >
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
      <view
        class="card margin-top-20"
        v-show="pageType"
      >
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
        {{pageType ? '登记' : '报备'}}
      </u-button>
    </view>
    <u-picker
      v-model="showTime"
      mode="time"
      :params="timeParams"
      @confirm="handleConfirm"
    ></u-picker>
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
import { getAllByTypeApi, getProDetailBBApi } from "@/api/index";
import { getAreaList, postReportApi, postAddDealtApi } from "@/api/channel";
import { phoneValidator } from "../../../common/validate";
import { postBuildByProId, postRoomByProId } from "../../../api/staff";
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
          { validator: phoneValidator, trigger: "change" },
        ],
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
      pageType: "",
      showTime: false,
      buildingBlockShow: false,
      currentSelectType: "",
      roomNoShow: false,
      timeParams: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: false,
      },
      keyword: "",
      buildingBlockList: [],
      roomNoList: [],
      reportId: "",
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
    this.info.exMarket = msg.exMarket;
    this.homeImg = this.$tool.getFileUrl(msg?.projectPic);
    this.district = msg.district;
    this.buildingBlockList = await postBuildByProId({
      proId: this.info.proId,
    });
    if (option.type && option.type === "dealReg") {
      uni.setNavigationBarTitle({
        title: "成交登记",
      });
      this.pageType = "dealReg";
      this.custormInfo.name = msg?.name;
      this.custormInfo.sex = msg?.sex;
      this.custormInfo.mobile = msg?.mobile;
    } else {
      this.pageType = "";
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
      if (this.pageType) {
        this.buildingBlockList = await postBuildByProId({
          proId: this.info.proId,
        });
      }
    } else if (item && item.type === "customer") {
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
      if (this.pageType) {
        item = new Promise((resolve, reject) => {
          this.$refs.buildForm.validate((val) => {
            val ? resolve() : reject(err);
          });
        });
      } else {
        item = new Promise((resolve, reject) => {
          this.$refs.info.validate((val) => {
            val ? resolve() : reject(err);
          });
        });
      }
      arr.push(info, item);
      return arr;
    },
    // 成交登记/报备客户
    handleReport() {
      if (this.pageType) {
        this.$refs.buildForm.setRules(this.buildRules);
      } else {
        this.$refs.info.setRules(this.infoRules);
      }
      let formDataRules = this.formDataRules();
      Promise.all(formDataRules).then(async () => {
        const userInfo = this.$storageTool.getUserInfo();
        let obj = {};
        if (this.pageType) {
          obj = { ...this.custormInfo };
          obj.reportId = this.reportId;
          obj.roomId = this.buildForm.roomId;
          obj.subBuildingId = this.buildForm.subBuildingId;
          await postAddDealtApi(obj);
          getApp().myReport = {};
          this.$tool.toast("登记成功");
          uni.redirectTo({
            url: `/channelPackage/myTab/pages/myReport`,
          });
        } else {
          obj = { ...this.info, ...this.custormInfo };
          obj.channelId = userInfo.channelId;
          obj.reportMobile = userInfo.mobilePhone;
          obj.reportName = userInfo.name;
          obj.reportType = "FullNumber";
          await postReportApi(obj);
          getApp().myReport = {};
          this.$tool.toast("报备成功");
          uni.redirectTo({
            url: `/channelPackage/homeTab/index`,
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
</style>