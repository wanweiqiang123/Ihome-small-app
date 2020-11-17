<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-13 15:23:42
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-17 14:47:43
-->
<template>
  <view>
    <u-card
      :border="false"
      padding="20"
      margin="30rpx 30rpx 0 30rpx"
    >
      <view
        class="head"
        slot="head"
      >
        <view>
          <img
            class="head-img"
            :src="src"
            alt=""
          >
        </view>
        <view class="head-title">优惠信息</view>
      </view>
      <view
        class="body"
        slot="body"
      >
        <view class="body-msg">
          <view class="">项目名称</view>
          <view class="color">保利大都会</view>
        </view>
        <view class="body-msg">
          <view class="">优惠方式</view>
          <view class="color">5万抵10万优惠折扣</view>
        </view>
        <view class="body-msg">
          <view class="">服务费金额</view>
          <view class="color">¥50000.00</view>
        </view>
      </view>
    </u-card>
    <u-gap
      height="20"
      bg-color="#f3f4f6"
    ></u-gap>
    <view class="select">
      <view class="select-msg">
        <view class="">选择栋座</view>
        <view
          class="color"
          @click="buildingBlockShow = true"
        >{{buildingBlock}}
          <u-icon
            name="arrow-right"
            size="28"
          ></u-icon>
        </view>
      </view>
      <view class="select-msg">
        <view class="">选择房号</view>
        <view
          class="color"
          @click="roomNoShow = true"
        >{{roomNo}}
          <u-icon
            name="arrow-right"
            size="28"
          ></u-icon>
        </view>
      </view>
      <u-select
        title="选择栋座"
        confirm-color="#dd524d"
        v-model="buildingBlockShow"
        :list="buildingBlockList"
        @confirm="buildingBlockClick"
      ></u-select>
      <u-select
        title="选择房号"
        confirm-color="#dd524d"
        v-model="roomNoShow"
        :list="roomNoList"
        @confirm="roomNoClick"
      ></u-select>
    </view>
    <u-gap
      height="80"
      bg-color="#f3f4f6"
    ></u-gap>
    <view class="owner">
      <view class="owner-tilte">
        <view class="owner-tilte-left">业主信息</view>
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
          class="owner-layout"
          :key="i"
        >
          <view class="owner-msg">
            <view class="owner-msg-item">
              <view class="">业主姓名</view>
              <view class="owner-input">
                <u-input
                  v-model="item.name"
                  :auto-height="autoHeight"
                  placeholder="请输入姓名"
                  clearable
                />
              </view>
            </view>
            <view class="owner-msg-item">
              <view class="">手机号码</view>
              <view class="owner-input">
                <u-input
                  v-model="item.phone"
                  :auto-height="autoHeight"
                  placeholder="请输入手机号码"
                  clearable
                />
              </view>
            </view>
            <view class="owner-msg-item">
              <view class="">身份证号</view>
              <view class="owner-input">
                <u-input
                  v-model="item.identity"
                  :auto-height="autoHeight"
                  placeholder="请输入身份证号"
                  clearable
                />
              </view>
            </view>
          </view>
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
        <u-gap
          :key="i"
          height="20"
          bg-color="#f3f4f6"
        ></u-gap>
      </template>
    </view>
    <view class="button">
      <u-button
        type="primary"
        size="medium"
        @click="submit"
      >保存并预览优惠告知书</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "优惠信息",
      src: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
      buildingBlock: "请选择",
      roomNo: "请选择",
      buildingBlockShow: false,
      buildingBlockList: [
        {
          label: "1栋",
          value: "1",
        },
        {
          label: "2栋",
          value: "2",
        },
        {
          label: "3栋",
          value: "3",
        },
        {
          label: "4栋",
          value: "4",
        },
        {
          label: "5栋",
          value: "5",
        },
        {
          label: "6栋",
          value: "6",
        },
        {
          label: "7栋",
          value: "7",
        },
        {
          label: "8栋",
          value: "8",
        },
        {
          label: "9栋",
          value: "9",
        },
      ],
      roomNoShow: false,
      roomNoList: [
        {
          label: "001号",
          value: "1",
        },
        {
          label: "002号",
          value: "2",
        },
        {
          label: "003号",
          value: "3",
        },
        {
          label: "004号",
          value: "4",
        },
        {
          label: "005号",
          value: "5",
        },
        {
          label: "006号",
          value: "6",
        },
        {
          label: "007号",
          value: "7",
        },
        {
          label: "008号",
          value: "8",
        },
        {
          label: "009号",
          value: "9",
        },
      ],
      ownerInfo: [
        {
          name: "",
          phone: "",
          identity: "",
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    buildingBlockClick(v) {
      this.buildingBlock = v[0].label;
    },
    roomNoClick(v) {
      this.roomNo = v[0].label;
    },
    addOwner() {
      this.ownerInfo.push({
        name: "",
        phone: "",
        identity: "",
      });
    },
    subtractOwner(i) {
      this.ownerInfo.splice(i, 1);
    },
    submit() {
      console.log(this.ownerInfo);
    },
  },
};
</script>

<style lang="scss">
.head {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &-img {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
  }
  &-title {
    margin-left: 30rpx;
    font-weight: bold;
    font-size: 16px;
  }
}

.body {
  &-msg {
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.select {
  padding: 0 50rpx;
  &-msg {
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & + & {
      border-top: 1px solid #f3f4f6;
    }
  }
}

.owner {
  position: relative;
  &-tilte {
    width: 100%;
    padding: 0 50rpx;
    position: absolute;
    top: -60rpx;
    display: flex;
    justify-content: space-between;
    &-right {
      color: #D9001B;
    }
  }
  &-layout {
    padding: 0 30rpx 0 50rpx;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  &-msg {
    width: 95%;
    &-item {
      height: 100rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  &-input {
    margin-left: 30rpx;
  }
  &-icon {
    width: 5%;
    line-height: 300rpx;
  }
}

.button {
  padding: 50rpx 0;
  text-align: center;
}

.color {
  color: #999999;
}
</style>