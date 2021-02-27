<!--
 * @Description: 帮录客户报备页
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-17 18:10:07
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-25 20:11:54
-->
<template>
  <view class="client-container safe-area-inset-bottom">
    <view class="report-houses">
      <view class="houses-lable">报备楼盘</view>
      <view
        class="houses-search"
        @click="projectSearch"
      >
        <view>
          <u-icon
            name="search"
            color="#bdbdbd"
          />{{keyword}}
        </view>
        <u-icon
          name="arrow-down"
          color="#bdbdbd"
        ></u-icon>
      </view>
    </view>
    <view class="houses-info">
      <view class="img">
        <u-image
          width="242rpx"
          height="186rpx"
          :src="info.projectPic"
        ></u-image>
      </view>
      <view>
        <view class="item">{{info.proName}}</view>
        <view>
          <u-tag
            :text="info.districtName"
            size="mini"
            :closeable="false"
            type="info"
          />
        </view>
      </view>
    </view>
    <view class="form-content">
      <view class="bg-color">
        <view class="form-title u-border-bottom">中介信息</view>
        <u-form
          :model="channelForm"
          ref="channelForm"
          label-width="170"
        >
          <u-form-item
            label="渠道公司"
            class="hide-icon"
            right-icon="arrow-right"
            required
            prop="channelName"
          >
            <u-input
              v-model="channelForm.channelName"
              type="select"
              placeholder="请选择渠道公司"
              @click="channelSearch"
            />
          </u-form-item>
          <u-form-item
            label="经纪人姓名"
            required
            prop="reportName"
            right-icon="arrow-right"
            class="hide-icon"
          >
            <u-input
              type="select"
              placeholder="请选择经纪人姓名"
              v-model="channelForm.reportName"
              @click="manSearch"
            />
          </u-form-item>
          <u-form-item
            label="经纪人号码"
            required
            prop="reportMobile"
          >
            <u-input
              v-model="channelForm.reportMobile"
              disabled
            />
          </u-form-item>
        </u-form>
      </view>
      <view class="bg-color">
        <view class="form-title u-border-bottom">客户信息</view>
        <u-form
          :model="custormInfo"
          ref="custormInfo"
          label-width="150"
        >
          <u-form-item
            label="姓名"
            required
            prop="name"
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
            <u-input
              v-if="pageType"
			  type="number"
              v-model="custormInfo.mobile"
              placeholder="手机号"
              input-align="left"
			  maxlength="11"
            />
            <view
              v-else
              class="mobileType"
            >
              <view
                v-if="checked"
                class="qianhou"
              >
                <u-input
                  v-model="qian"
                  input-align="center"
                  placeholder="前三位"
                  maxlength="3"
                  :clearable="false"
                />
                <text>****</text>
                <u-input
                  v-model="hou"
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
      <view class="bg-color">
        <view class="form-title u-border-bottom">报备信息</view>
        <u-form
          :model="reportForm"
          ref="reportForm"
          label-width="200"
        >
          <u-form-item
            label="预计到访人数"
            prop="expectedNumber"
            required
          >
            <u-input
			  type="number"
              v-model="reportForm.expectedNumber"
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
              v-model="reportForm.expectedTime"
              type="select"
              @click="showTime = true"
              placeholder="预计到访时间"
              :clearable="true"
              input-align="left"
            />
          </u-form-item>
          <u-form-item
            label="备注信息"
            label-position="top"
          >
            <u-input
              v-model="reportForm.remark"
              type="textarea"
              :clearable="true"
            />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="btn-container safe-area-inset-bottom">
      <u-button
        size="default"
        type="primary"
        shape="circle"
        @click="handleReport"
      >保存</u-button>
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
import { phoneValidator } from "../../common/validate";
import { getProDetailBBApi } from "@/api/index";
import { postReportApi } from "@/api/channel";
import uInput from "../../uview-ui/components/u-input/u-input.vue";
export default {
  name: "clientReport",
  data() {
    return {
      showTime: false,
      info: {
        proId: "",
        proName: "",
        city: "",
        districtName: "海珠区",
        proAddr: "",
        projectPic: "",
        exMarket: 0,
        startDivisionId: "",
      },
      channelForm: {
        channelName: "",
        channelId: "",
        reportName: "",
        reportMobile: "",
      },
      custormInfo: {
        name: "",
        sex: "Ms",
        mobile: "",
      },
      reportForm: {
        expectedNumber: "",
        expectedTime: "",
        remark: "",
      },
      channelRules: {
        channelName: [
          { required: true, message: "请选择渠道公司", trigger: "change" },
        ],
        reportName: [
          { required: true, message: "请输入经纪人姓名", trigger: "change" },
        ],
        reportMobile: [
          { required: true, message: "请输入经纪人号码", trigger: "change" },
          { validator: phoneValidator, trigger: "change" },
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
      reportRules: {
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
      timeParams: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: false,
      },
      keyword: "搜索楼盘",
      checked: false,
      qian: "",
      hou: "",
    };
  },
  onReady() {
    this.$nextTick(() => {
      this.$refs.channelForm.setRules(this.channelRules);
      this.$refs.custormInfo.setRules(this.custormRules);
      this.$refs.reportForm.setRules(this.reportRules);
    });
  },
  async onShow() {
    let item = getApp().globalData.searchBackData;
    if (item && item.type === "project") {
      this.channelForm = {
        channelName: "",
        channelId: "",
        reportName: "",
        reportMobile: "",
      };
      this.info.proName = item.data.proName;
      this.info.proId = item.data.proId;
      const res = await getProDetailBBApi(this.info.proId);
      this.keyword = res.proName;
      this.info.districtName = res.districtName;
      this.info.proAddr = res.proAddr;
      this.info.city = res.city;
      this.info.exMarket = res.exMarket;
      this.info.projectPic = this.$tool.getFileUrl(res.projectPic);
      getApp().globalData.searchBackData = {};
    } else if (item && item.type === "channel") {
      Object.assign(this.channelForm, {
        reportName: "",
        reportMobile: "",
      });
      this.channelForm.channelName = item.data.name;
      this.channelForm.channelId = item.data.id;
      getApp().globalData.searchBackData = {};
    } else if (item && item.type === "man") {
      this.channelForm.reportName = item.data.name;
      this.channelForm.reportMobile = item.data.mobile;
      getApp().globalData.searchBackData = {};
    }
  },
  methods: {
    // 项目跳转搜索页
    projectSearch() {
      getApp().globalData.searchParams = {
        api: "getFuzzySearchByCityForAnChangApi",
        key: "proName",
        id: "proId",
        type: "project",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    // 渠道公司
    channelSearch() {
      if (this.info.proId) {
        getApp().globalData.searchParams = {
          api: "postChannelByNameApi",
          key: "name",
          id: "id",
          type: "channel",
          other: {
            cycleCity: this.info.city,
            departmentOrgId: this.info.startDivisionId,
          },
        };
        uni.navigateTo({
          url: "/pages/search/index/index",
        });
      } else {
        this.$tool.toast("请选择报备楼盘");
      }
    },
    // 经纪人搜索
    manSearch() {
      if (this.channelForm.channelId) {
        getApp().globalData.searchParams = {
          api: "getAgentAndChannelPersonByChannelIdApi",
          key: "nameOrTel",
          id: "id",
          type: "man",
          other: {
            channelId: this.channelForm.channelId,
          },
        };
        uni.navigateTo({
          url: "/pages/search/index/index",
        });
      } else {
        this.$tool.toast("请选择渠道公司");
      }
    },
    // 确定选择时间
    handleConfirm(value) {
      this.reportForm.expectedTime = `${value.year}-${value.month}-${value.day} ${value.hour}:${value.minute}`;
    },
    // 表单验证
    formDataRules() {
      let arr = [];
      const channelForm = new Promise((resolve, reject) => {
        this.$refs.channelForm.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      const custormInfo = new Promise((resolve, reject) => {
        this.$refs.custormInfo.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      const reportForm = new Promise((resolve, reject) => {
        this.$refs.reportForm.validate((val) => {
          val ? resolve() : reject(err);
        });
      });
      arr.push(channelForm, custormInfo, reportForm);
      return arr;
    },
    handleReport() {
      let formDataRules = this.formDataRules();
      Promise.all(formDataRules).then(async () => {
        let obj = {};
        obj = { ...this.reportForm, ...this.custormInfo, ...this.channelForm };
        if (this.checked) {
          obj.mobile = this.qian + "****" + this.hou;
          obj.reportType = "FirstThreeAfterFour";
        } else {
          obj.reportType = "FullNumber";
        }
        obj.exMarket = this.info.exMarket;
        obj.helpRecord = 1;
        obj.proId = this.info.proId;
        console.log(obj);
        await postReportApi(obj);
        this.$tool.toast("报备成功");
        uni.redirectTo({
          url: `/staffPackage/homeTab/index`,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.client-container {
  background-color: $u-bg-color;
}
.report-houses {
  padding: 10rpx 26rpx 6rpx;
  display: flex;
  background-color: #fff;
  .houses-lable {
    padding: 14rpx 10rpx;
  }
  .houses-search {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    color: #ccc;
    border-radius: 36rpx;
    background-color: #fff;
    border: solid 1rpx #dcdcdc;
  }
}
.houses-info {
  padding: 20rpx 26rpx 24rpx;
  display: flex;
  background-color: #fff;
  .img {
    margin-right: 32rpx;
    width: 242rpx;
    height: 186rpx;
    background: #ccc;
  }
  .item {
    margin-bottom: 18rpx;
    &.area {
      padding: 5rpx 7rpx;
      display: inline-block;
      background-color: rgba($color: #abaaab, $alpha: 0.2);
      color: #666666;
    }
    .icon {
      display: inline-block;
      margin-right: 10rpx;
      width: 32rpx;
      height: 32rpx;
      color: #fff;
      background: #fc9c05;
      border-radius: 4rpx;
      padding: 2rpx;
      line-height: 1;
    }
  }
}
.form-content {
  padding: 20rpx 30rpx 110rpx;
}
.bg-color {
  background: #fff;
  &:nth-child(2) {
    margin-top: 30rpx;
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
}
.btn-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 90rpx;
  box-sizing: content-box;
  padding-top: 10rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background: #fff;
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
