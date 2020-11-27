<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 17:30:05
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-27 19:34:30
-->
<template>
  <view class="broker-list-wrapper">
    <view class="top-wrapper">
      <u-search
        class="search"
        shape="round"
        bg-color="#F1F1F2"
        border-color="#f2f2f2"
        :show-action="false"
        placeholder="请输入经纪人姓名或手机号码"
        v-model="queryPageParameters.projectName"></u-search>
      <view class="filter-wrapper" @click="showSearchWin = true">筛选</view>
      <u-icon name="grid-fill" color="#3478F7" size="38" @click="showSearchWin = true"></u-icon>
      <view class="management" @click="isManager = !isManager">{{isManager ? '完成' : '管理'}}</view>
    </view>
    <view class="list-wrapper">
      <view class="item-wrapper" v-for="item in [1,2,3,4,5]" :key="item">
        <view class="check" v-if="isManager">
          <u-checkbox v-model="flag" shape="circle" size="30rpx"></u-checkbox>
        </view>
        <view class="item" @click="handleEditor">
          <view class="item-auth">
            <text v-if="!isManager">允许发起结佣</text>
          </view>
          <view class="item-name">张三三  183000605135</view>
          <view class="item-btn">
            <view v-if="!isManager">
              编辑<u-icon name="edit-pen" color="#66B1FF" size="28"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="btn">
      <u-button
        @click="handleClick"
        :type="isManager ? 'error' : 'primary'">{{isManager ? '删除' : '添加经纪人'}}</u-button>
    </view>
    <u-popup v-model="showSearchWin" mode="right" length="80%">
      <view class="broker-popup-wrapper">
        <view class="status u-padding-20">状态</view>
        <view class="search-item-wrapper u-padding-20">
          <view
            @click="selectType(item, 'status')"
            :class="item.checked ? 'item selected' : 'item'"
            v-for="(item, index) in statusList"
            :key="index">{{item.name}}</view>
        </view>
        <view class="status u-padding-20">结佣权限</view>
        <view class="search-item-wrapper u-padding-20">
          <view
            @click="selectType(item, 'auth')"
            :class="item.checked ? 'item selected' : 'item'"
            v-for="(item, index) in authList"
            :key="index">{{item.name}}</view>
        </view>
        <view class="btn-wrapper">
          <view class="reset" @click="showSearchWin = false">重置</view>
          <view class="submit" @click="showSearchWin = false">确定</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryPageParameters: {
        projectName: ''
      },
      isManager: false,
      showSearchWin: false,
      statusList: [
        {
          id: '1',
          name: '不限',
          checked: false
        },
        {
          id: '2',
          name: '有效',
          checked: false
        },
        {
          id: '3',
          name: '无效',
          checked: false
        }
      ],
      authList: [
        {
          id: '1',
          name: '不限',
          checked: false
        },
        {
          id: '2',
          name: '有',
          checked: false
        },
        {
          id: '3',
          name: '无',
          checked: false
        }
      ],
      flag: false
    };
  },
  onLoad() {

  },
  methods: {
    // 选择
    selectType(item, type) {
      if (type === 'status') {
        this.statusList.forEach((list) => {
          if (item.id === list.id) {
            list.checked = !list.checked;
          } else {
            list.checked = false;
          }
        })
      } else if (type === 'auth') {
        this.authList.forEach((list) => {
          if (item.id === list.id) {
            list.checked = !list.checked;
          } else {
            list.checked = false;
          }
        })
      }
    },
    // 编辑经纪人
    handleEditor() {
      uni.redirectTo({
        url: `/intermediaryPackage/myTab/channelPage/addBroker`
      });
    },
    // 添加/删除经纪人
    handleClick() {
      if (!this.isManager) {
        // true---添加
        console.log('添加');
        uni.redirectTo({
          url: `/intermediaryPackage/myTab/channelPage/addBroker`
        });
      } else {
        // false---删除
        console.log('删除');
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .broker-list-wrapper {
    width: 100%;

    .top-wrapper {
      width: 100%;
      height: 85rpx;
      box-sizing: border-box;
      padding: 0rpx 20rpx;
      margin-top: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFFFFF;

      .search {
        flex: 1;
        box-sizing: border-box;
        margin-right: 20rpx;

        /deep/ .u-content {
          height: 62rpx !important;
        }
      }

      .filter-wrapper {
        color: #3478F7;
        font-size: 30rpx;
      }

      .management {
        font-size: 32rpx;
        padding: 10rpx;
        margin-left: 10rpx;
        border-left: 2rpx solid #E4E4E4;
      }
    }

    .list-wrapper {
      width: 100%;
      height: calc(100vh - 190rpx);
      padding: 20rpx;

      .item-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 1rpx solid #409EFF;
        border-radius: 10rpx;
        margin-bottom: 20rpx;
        padding-left: 10rpx;

        .check {
          //height: 162rpx;
          padding-left: 15rpx;
          margin-bottom: 20rpx;
        }

        .item {
          height: 162rpx;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;

          view {
            flex: 1;
            //padding-bottom: 8rpx;
          }

          .item-auth {
            height: 62rpx;
            text-align: right;
            font-size: 26rpx;

            text {
              display: inline-block;
              padding: 10rpx;
              color: #FFFFFF;
              background-color: #409EFF;
            }
          }

          .item-name {
            text-align: left;
            color: #666666;
            font-weight: 600;
            //padding-left: 30rpx;
          }

          .item-btn {
            height: 44rpx;
            color: #66B1FF;
            text-align: right;
            padding-right: 20rpx;
            //padding-bottom: 10rpx;
            font-size: 26rpx;
          }
        }
      }
    }

    .btn {
      width: 100%;
      height: 90rpx;
      padding: 10rpx 50rpx;
      position: fixed;
      left: 0rpx;
      border-bottom: 0rpx;
    }
  }

  .broker-popup-wrapper {
    width: 100%;
    height: 100vh;
    position: relative;

    .status {
      color: #999999;
    }

    .search-item-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .item {
        text-align: center;
        box-sizing: border-box;
        margin-right: 10rpx;
        padding: 15rpx 25rpx;
        background-color: #FFFFFF;
        border: 1rpx solid #F2F2F2;
      }

      .selected {
        border: 1rpx solid #278DFE;
        color: #278DFE;
      }
    }

    .btn-wrapper {
      width: 100%;
      position: absolute;
      left: 0rpx;
      bottom: 0rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      view {
        flex: 1;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
      }

      .reset {
        border-top: 1rpx solid #E4E4E4;
        background-color: #FFFFFF;
        color: #0079FE;
      }

      .submit {
        background-color: #0079FE;
        color: #FFFFFF;
      }
    }
  }
</style>