<!--
 * @Description: 生成优惠告知书
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-24 09:42:46
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-29 15:08:18
-->
<template>
  <view class="notice safe-area-inset-bottom">
    <view class="notice-info">
      <view class="title">
        <u-image
          width="80rpx"
          height="80rpx"
          src="http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg"
          shape="circle"
        ></u-image>
        <text class="title-text">优惠信息</text>
      </view>
    </view>
    <view class="form-content">
      <view class="form-color">
        <u-form
          :model="form"
          label-width="190"
        >
          <u-form-item
            label="项目联动周期"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.cycleName"
              type="select"
              placeholder="请选择项目联动周期"
              @click="handleClick"
            />
          </u-form-item>
          <u-form-item
            label="优惠方式"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.manner"
              type="select"
              placeholder="请选择优惠折扣方式"
              @click="handleShowSelect"
            />
          </u-form-item>
          <template v-if="isOther">
            <u-form-item label="优惠说明">
              <u-input
                v-model="form.explain"
                placeholder="请输入优惠说明"
              />
            </u-form-item>
            <u-form-item label="服务费金额">
              <u-input
                v-model="form.paymentAmount"
                placeholder="请输入服务费金额"
              />
            </u-form-item>
          </template>
          <template v-else>
            <u-form-item label="服务费金额">
              <u-input
                v-model="form.paymentAmount"
                placeholder="请输入服务费金额"
                disabled
              />
            </u-form-item>
          </template>
        </u-form>
      </view>
      <view class="form-color">
        <u-form
          :model="form"
          label-width="190"
        >
          <u-form-item
            label="选择栋座"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.unitName"
              type="select"
              placeholder="请选择栋座"
              @click="handleShowBuild"
            />
          </u-form-item>
          <u-form-item
            label="选择房号"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.roomName"
              type="select"
              placeholder="请选择房号"
              @click="handleShowRoom"
            />
          </u-form-item>
          <u-form-item label="业主类型">
            <u-radio-group v-model="form.ownerType">
              <u-radio name="1">个人</u-radio>
              <u-radio name="0">企业</u-radio>
            </u-radio-group>
          </u-form-item>
        </u-form>
      </view>
      <!-- 个人部分 -->
      <template v-if="form.ownerType == '1'">
        <view class="owner-tilte">
          <view class="owner-tilte-right">如有多个业主通过右侧“
            <u-icon
              name="plus-circle"
              size="32"
            ></u-icon>
            ”按钮新增
          </view>
        </view>
        <template v-for="(item, i) in ownerInfo">
          <view
            class="form-layout"
            :key="i"
          >
            <u-form
              :model="item"
              :ref="`uForm`"
              class="owner-msg"
              label-width="150"
            >
              <u-form-item
                label="业主姓名"
                prop="name"
              >
                <u-input
                  v-model="item.name"
                  :auto-height="autoHeight"
                  placeholder="请输入姓名"
                  clearable
                />
              </u-form-item>
              <u-form-item
                label="手机号码"
                prop="phone"
              >
                <u-input
                  v-model="item.phone"
                  :auto-height="autoHeight"
                  placeholder="请输入手机号码"
                  clearable
                />
              </u-form-item>
              <u-form-item
                label="身份证号"
                prop="identity"
              >
                <u-input
                  v-model="item.identity"
                  :auto-height="autoHeight"
                  placeholder="请输入身份证号"
                  clearable
                />
              </u-form-item>
            </u-form>
            <view
              v-if="i === 0"
              class="owner-icon"
              @click="addOwner"
            >
              <u-icon
                name="plus-circle"
                color="#2979ff"
                size="32"
              ></u-icon>
            </view>
            <view
              v-else
              class="owner-icon"
              @click="subtractOwner(i)"
            >
              <u-icon
                name="close-circle"
                color="#2979ff"
                size="32"
              ></u-icon>
            </view>
          </view>
        </template>
      </template>
      <!-- 企业部分 -->
      <template v-else>
        <view class="form-color">
          <u-form
            :model="form"
            label-width="220"
          >
            <u-form-item label="公司名称">
              <u-input
                v-model="form.sex"
                placeholder="请输入公司名称"
              />
            </u-form-item>
            <u-form-item label="经办人号码">
              <u-input
                v-model="form.sex"
                placeholder="请输入经办人号码"
              />
            </u-form-item>
            <u-form-item label="营业执照编号">
              <u-input
                v-model="form.sex"
                placeholder="请输入营业执照编号"
              />
            </u-form-item>
            <u-form-item label="优惠告知书附件">
              <u-upload
                :action="action"
                :file-list="fileList"
                max-count="1"
              ></u-upload>
            </u-form-item>
          </u-form>
        </view>
      </template>
    </view>
    <view class="notice-btn safe-area-inset-bottom">
      <u-button
        shape="circle"
        type="primary"
        @click="submit()"
      >保存并预览优惠告知书</u-button>
    </view>
    <!-- 选择器 -->
    <u-select
      v-model="selectShow"
      :list="selectList"
      safe-area-inset-bottom
      value-name="premiumReceived"
      label-name="modeDescription"
      @confirm="selectConfirm"
    ></u-select>
    <u-select
      v-model="buildSelectShow"
      :list="buildSelectList"
      safe-area-inset-bottom
      value-name="buildingId"
      label-name="buildingName"
      @confirm="buildConfirm"
    ></u-select>
    <u-select
      v-model="roomSelectShow"
      :list="roomSelectList"
      safe-area-inset-bottom
      value-name="roomId"
      label-name="roomNo"
      @confirm="roomConfirm"
    ></u-select>
  </view>
</template>

<script>
import { phoneValidator, validIdentityCard } from "../../common/validate.js";
import {
  getMannerListByTermId,
  postBuildByProId,
  postRoomByProId,
} from "../../api/staff";

export default {
  name: "notice-create",
  data() {
    return {
      proId: null,
      selectShow: false,
      selectList: [],
      buildSelectShow: false,
      buildSelectList: [],
      roomSelectShow: false,
      roomSelectList: [],
      isOther: false,
      form: {
        cycleId: null,
        cycleName: null,
        manner: null,
        explain: null,
        paymentAmount: null,
        buyUnit: null,
        unitName: null,
        roomNumberId: null,
        roomName: null,
        ownerType: "1",
      },
      ownerInfo: [
        {
          name: "",
          phone: "",
          identity: "",
        },
      ],
      action: "",
      fileList: [
        {
          url: "http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg",
        },
      ],
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "change",
          },
          { validator: phoneValidator, trigger: "change" },
        ],
        identity: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "change",
          },
          { validator: validIdentityCard, trigger: "change" },
        ],
      },
    };
  },
  methods: {
    addOwner() {
      this.ownerInfo.push({
        name: "",
        phone: "",
        identity: "",
      });
      this.$nextTick(() => {
        this.$refs.uForm[this.ownerInfo.length - 1].setRules(this.rules);
      });
    },
    subtractOwner(i) {
      this.ownerInfo.splice(i, 1);
    },
    refForm(index, err) {
      let res = new Promise((resolve, reject) => {
        this.$refs.uForm[index].validate((valid) => {
          if (valid) {
            resolve();
          } else {
            reject(err);
          }
        });
      });
      this.arr.push(res);
    },
    handleClick() {
      getApp().globalData.searchParams = {
        api: "postTermApi",
        key: "termName",
        id: "termId",
        type: "term",
      };
      uni.navigateTo({
        url: "/pages/search/index/index",
      });
    },
    selectConfirm(val) {
      let item = val[0];
      if (item.value === "other") {
        this.isOther = true;
        this.form.manner = item.label;
        this.form.explain = null;
        this.form.paymentAmount = null;
      } else {
        this.isOther = false;
        this.form.manner = item.label;
        this.form.explain = item.label;
        this.form.paymentAmount = item.value;
      }
    },
    async handleShowSelect() {
      if (!this.form.cycleId) {
        uni.showToast({
          title: "请先选择联动周期",
          icon: "none",
        });
        return;
      }
      const list = [{ modeDescription: "自定义", premiumReceived: "other" }];
      this.selectList = await getMannerListByTermId({ id: this.form.cycleId });
      this.selectList = this.selectList.concat(list);
      this.selectShow = true;
    },
    buildConfirm(val) {
      let item = val[0];
      this.form.unitName = item.label;
      this.form.buyUnit = item.value;
    },
    async handleShowBuild() {
      if (!this.proId) {
        uni.showToast({
          title: "请先选择联动周期",
          icon: "none",
        });
        return;
      }
      this.buildSelectList = await postBuildByProId({ proId: this.proId });
      this.buildSelectShow = true;
    },
    roomConfirm(val) {
      let item = val[0];
      this.form.roomNumberId = item.value;
      this.form.roomName = item.label;
    },
    async handleShowRoom() {
      if (!this.proId) {
        uni.showToast({
          title: "请先选择联动周期",
          icon: "none",
        });
        return;
      }
      this.roomSelectList = await postRoomByProId({
        proId: this.proId,
        buildingId: this.form.buyUnit,
      });
      this.roomSelectShow = true;
    },
    submit() {
      this.arr = [];
      this.ownerInfo.forEach((v, i) => {
        console.log(i);
        this.refForm(i, this.ownerInfo[i]);
      });
      console.log(this.arr);
      Promise.all(this.arr)
        .then(() => {
          console.log("全部通过");
        })
        .catch(() => {
          console.log("不通过");
        });
    },
  },
  onReady() {
    this.$refs.uForm[0].setRules(this.rules);
  },
  onShow() {
    console.log(getApp().globalData.refreshListData, "ssaa");
    let item = getApp().globalData.refreshListData;
    if (item) {
      switch (item.type) {
        case "term":
          this.form.cycleId = item.data.termId;
          this.form.cycleName = item.data.termName;
          this.proId = item.data.proId;
          break;

        default:
          break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.notice {
  background-color: $u-bg-color;
  min-height: 100vh;
  &-info {
    padding: 40rpx 30rpx;
    background: #fff;
    .title {
      font-size: 40rpx;
      font-weight: bold;
      display: flex;
      align-items: center;
      &-text {
        margin-left: 20rpx;
      }
    }
  }
}
.form-content {
  padding: 20rpx 30rpx 110rpx;
  .form-color {
    background: #fff;
    &:nth-child(2),
    &:nth-child(3) {
      margin-top: 30rpx;
    }
  }
}
.owner-tilte {
  display: flex;
  padding: 10rpx 0;
  justify-content: flex-end;
  &-right {
    color: $u-type-error;
  }
}
.form-layout {
  display: flex;
  align-items: center;
  background: #fff;
  .owner-msg {
    flex: 1;
  }
  .owner-icon {
    padding: 8rpx;
  }
  & + & {
    margin-top: 30rpx;
  }
}
.notice-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90rpx;
  box-sizing: content-box;
  padding-top: 10rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background: #fff;
  z-index: 10;
}
</style>
<style lang="scss">
.form-color,
.form-layout {
  .u-form-item {
    padding-left: 20rpx !important;
    padding-right: 20rpx !important;
  }
}
</style>
