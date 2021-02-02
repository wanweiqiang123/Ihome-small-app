<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-24 09:58:09
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-01 18:25:26
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
          <view>{{info.proName}}</view>
          <view>
            <u-tag
              :text="getDictName(district, areaRegion)"
              size="mini"
              :closeable="false"
              type="info"
            />
          </view>
          <!-- <view class="price-wrapper">
            <span class="price">均价23000</span>
            <span class="unit">元/m<span class="two">2</span></span>
          </view> -->
          <view class="rule">
            <span class="rule-tap">佣</span>
            <span>佣金规则</span>
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
        v-if="!pageType"
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
        v-else
      >
        <view class="client-info">
          <view class="title">房产信息</view>
        </view>
        <view class="form-wrapper">
          <u-form
            :model="estateForm"
            ref="estateForm"
            :label-width="190"
          >
            <u-form-item
              label="楼盘名称"
              right-icon="arrow-right"
            >
              <u-input
                v-model="estateForm.estateName"
                placeholder="楼盘名称"
                disabled
                :clearable="false"
                input-align="left"
              />
            </u-form-item>
            <u-form-item
              label="认购栋座"
              right-icon="arrow-right"
              class="hide-icon"
            >
              <u-input
                @click="selectEstate('roof')"
                v-model="estateForm.roof"
                type="select"
                placeholder="认购栋座"
                :clearable="false"
                input-align="left"
              />
            </u-form-item>
            <u-form-item
              label="认购房号"
              right-icon="arrow-right"
              class="hide-icon"
            >
              <u-input
                @click="selectEstate('room')"
                v-model="estateForm.room"
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
      v-model="selectEstateWin"
      :list="estateList"
      @confirm="confirmEstate"
    ></u-select>
  </view>
</template>

<script>
import { getAllByTypeApi } from "@/api/index";
import { getAreaList, postReportApi } from "@/api/channel";
import { phoneValidator } from "../../../common/validate";
export default {
  data() {
    return {
      info: {
        proName: "远洋招商保利东湾经纪渠道",
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
      district: "440105000000",
      areaRegion: [],
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

      homeImg: require("@/channelPackage/common/img/house.jpg"),
      pageType: "",
      showTime: false,
      showClient: false,
      estateForm: {
        estateName: "",
        roof: "",
        room: "",
      },
      currentSelectType: "",
      selectEstateWin: false,
      estateList: [],
      timeParams: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: false,
      },
    };
  },
  onReady() {
    this.$nextTick(() => {
      this.$refs.info.setRules(this.infoRules);
      this.$refs.custormInfo.setRules(this.custormRules);
    });
  },
  onLoad(option) {
    if (option.type && option.type === "dealReg") {
      uni.setNavigationBarTitle({
        title: "成交登记",
      });
      this.pageType = "dealReg";
    } else {
      this.pageType = "";
    }
  },
  async onShow() {
    this.areaRegion = await this.getArea(); // 省市区
    let item = getApp().globalData.searchBackData;
    if (item && item.type === "project") {
      console.log(item);
      this.info.proId = item.data.proId;
      this.info.proName = item.data.proName;
      this.info.exMarket = item.data.exMarket;
      this.district = item.data.district;
      getApp().globalData.searchBackData = {};
      // if (this.pageType) {
      //   this.buildSelectList = await postBuildByProId({
      //     proId: this.info.proId,
      //   });
      // }
    } else if (item && item.type === "customer") {
      this.info.name = item.data.name;
      this.info.sex = item.data.sex;
      this.info.mobile = item.data.mobile;
    }
  },
  methods: {
    // 周期跳转搜索页
    projectSearch() {
      getApp().globalData.searchParams = {
        api: "postProjectsApi",
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
        key: "name",
        id: "userId",
        type: "customer",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 获取字典
    async getDictByType(type) {
      const dictList = await getAllByTypeApi({ type });
      return dictList;
    },
    // 获取对应字典name
    getDictName(code, list) {
      if (list.length) {
        const item = list.find((v) => v.code === code);
        return item?.name;
      } else {
        return "";
      }
    },
    // 获取省市区
    async getArea() {
      let areaList = await getAreaList();
      return areaList;
    },
    // 确定选择时间
    handleConfirm(value) {
      // console.log(value);
      this.info.expectedTime = `${value.year}-${value.month}-${value.day} ${value.hour}:${value.minute}`;
    },
    // 成交登记-选择栋座和房号
    selectEstate(type) {
      if (type === "roof") {
        // 选择栋座
        this.currentSelectType = "roof";
        this.estateList = [
          {
            value: "1",
            label: "1栋",
          },
          {
            value: "2",
            label: "2栋",
          },
          {
            value: "3",
            label: "3栋",
          },
        ];
      } else {
        // 选择房号
        this.currentSelectType = "room";
        this.estateList = [
          {
            value: "1",
            label: "101",
          },
          {
            value: "2",
            label: "201",
          },
          {
            value: "3",
            label: "301",
          },
        ];
      }
      this.selectEstateWin = true;
    },
    // 确认选择栋座/房号
    confirmEstate(e) {
      if (this.currentSelectType === "roof") {
        this.estateForm.roof = e.label;
      } else if (this.currentSelectType === "room") {
        this.estateForm.room = e.label;
      }
    },
    // 表单验证
    formDataRules() {
      let arr = [];
      const info = new Promise((resolve, reject) => {
        this.$refs.info.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      const custormInfo = new Promise((resolve, reject) => {
        this.$refs.custormInfo.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      arr.push(info, custormInfo);
      return arr;
    },
    // 成交登记/报备客户
    handleReport() {
      let formDataRules = this.formDataRules();
      Promise.all(formDataRules).then(async () => {
        const userInfo = this.$storageTool.getUserInfo();
        let obj = { ...this.info, ...this.custormInfo };
        obj.channelId = userInfo.channelId;
        obj.reportCustomerId = userInfo.id;
        obj.reportMobile = userInfo.mobilePhone;
        obj.reportName = userInfo.name;
        obj.reportType = "FullNumber";
        await postReportApi(obj);
        this.$tool.toast(this.pageType ? "登记成功" : "报备成功");
        if (this.pageType === "dealReg") {
          uni.redirectTo({
            url: `/channelPackage/myTab/pages/myReport`,
          });
        } else {
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