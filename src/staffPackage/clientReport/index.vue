<!--
 * @Description: 帮录客户报备页
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-17 18:10:07
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-23 10:41:57
-->
<template>
  <view class="client-container safe-area-inset-bottom">
    <view class="report-houses">
      <view class="houses-lable">报备楼盘</view>
      <view class="houses-search">
        <view>
          <u-icon
            name="search"
            color="#bdbdbd"
          />搜索楼盘
        </view>
        <u-icon
          name="arrow-down"
          color="#bdbdbd"
        ></u-icon>
      </view>
    </view>
    <view class="houses-info">
      <view class="img"></view>
      <view>
        <view class="item">远洋招商保利东湾经纪渠道</view>
        <view class="item area">天河区</view>
        <view class="item">
          <view class="icon">佣</view>
          佣金规则
        </view>
      </view>
    </view>
    <view class="form-content">
      <view class="bg-color">
        <view class="form-title u-border-bottom">中介信息</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="150"
        >
          <u-form-item
            label="渠道公司"
            class="hide-icon"
            right-icon="arrow-right"
          >
            <u-input
              v-model="form.sex"
              type="select"
            />
          </u-form-item>
          <u-form-item label="经纪人姓名">
            <u-input v-model="form.sex" />
          </u-form-item>
          <u-form-item label="经纪人号码">
            <u-input v-model="form.sex" />
          </u-form-item>
        </u-form>
      </view>
      <view class="bg-color">
        <view class="form-title u-border-bottom">客户信息</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="120"
        >
          <u-form-item label="姓名">
            <u-input v-model="form.sex" />
          </u-form-item>
          <u-form-item label="性别">
            <u-radio-group
              v-model="form.sex"
              width="50%"
            >
              <u-radio name="1">先生</u-radio>
              <u-radio name="0">女士</u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="手机号">
            <u-input v-model="form.sex" />
          </u-form-item>
        </u-form>
      </view>
      <view class="bg-color">
        <view class="form-title u-border-bottom">报备信息</view>
        <u-form
          :model="form"
          ref="uForm"
          label-width="200"
        >
          <u-form-item label="预计到访人数">
            <u-input v-model="form.sex" />
          </u-form-item>
          <u-form-item label="预计到访时间">
            <u-input v-model="form.sex" />
          </u-form-item>
          <u-form-item
            label="备注信息"
            label-position="top"
          >
            <u-input
              v-model="form.sex"
              type="textarea"
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
      >保存</u-button>
    </view>
  </view>
</template>

<script>
export default {
  name: "clientReport",
  data() {
    return {
      form: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.client-container {
  background-color: #f1f1f1;
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
  padding: 20rpx 30rpx 102rpx;
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
    padding: 0 34rpx;
  }
}
.btn-container {
  position: fixed;
  bottom: 6rpx;
  left: 0;
  right: 0;
  z-index: 10;
  padding-top: 10rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background: #fff;
}
</style>
<style lang="scss">
.bg-color {
  .u-form-item {
    padding-left: 20rpx !important;
    padding-right: 20rpx !important;
  }
}
</style>
