<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-27 13:05:22
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-09 15:55:10
-->
<template>
  <view class="deal-list-wrapper">
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
        placeholder="请输入客户姓名或手机号码"
        v-model="queryPageParameters.projectName"></u-search>
      <view class="filter-wrapper" @click="showSearchWin = true">筛选</view>
      <u-icon name="grid-fill" color="#3478F7" size="38" @click="showSearchWin = true"></u-icon>
    </view>
    <view class="list-wrapper">
      <view class="list-item" v-for="item in [1,2,3,4,5,6,7,8,9,10]" :key="item" @click="viewDealDetail">
        <view class="item-code u-padding-bottom-20">
          <view class="code">成交报告编号：CJ38135843321</view>
          <view class="detail">详情</view>
          <u-icon name="arrow-right" color="#999999" size="28"></u-icon>
        </view>
        <view class="item-content">
          <view class="content-left">
            <view>项目名称：保利艾特成</view>
            <view>客户姓名：陈先生</view>
            <view>客户号码：18300054512</view>
          </view>
          <view class="content-right">
            <view class="right-top">
              <view class="title">可结佣</view>
              <view class="border">200.00</view>
            </view>
            <view class="right-bottom">
              <view class="title">已结佣</view>
              <view class="border">160.00</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <u-popup v-model="showSearchWin" mode="right" length="70%">
      <view class="project-case-wrapper">
        <view>
          <u-form :model="searchForm" ref="searchForm" :label-width="190">
            <u-form-item label="项目名称" right-icon="arrow-right" class="hide-icon">
              <u-input
                @click="showProjectName = true"
                v-model="searchForm.name" type="select"
                placeholder="项目名称" :clearable="false" input-align="right" />
            </u-form-item>
            <u-form-item label="成交阶段" right-icon="arrow-right" class="hide-icon">
              <u-input
                @click="showProjectStage = true"
                v-model="searchForm.stage" type="select"
                placeholder="成交阶段" :clearable="false" input-align="right" />
            </u-form-item>
          </u-form>
        </view>
        <view class="add-btn-wrapper">
          <view class="left" @click="showSearchWin = false">重置</view>
          <view class="right" @click="showSearchWin = false">确定</view>
        </view>
      </view>
    </u-popup>
    <u-select v-model="showProjectName" z-index="20000" :list="projectNameList" @confirm="confirmProjectName"></u-select>
    <u-select v-model="showProjectStage" z-index="20000" :list="projectStageList" @confirm="confirmProjectStage"></u-select>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryPageParameters: {
        projectName: ''
      },
      showSearchWin: false,
      searchList: [
        {
          name: '已通过',
          checked: false
        },
        {
          name: '审核中',
          checked: false
        },
        {
          name: '驳回',
          checked: false
        }
      ],
      searchForm: {
        name: '',
        stage: ''
      },
      showProjectName: false,
      projectNameList: [
        {
          value: '1',
          label: '富力新城'
        },
        {
          value: '2',
          label: '保利爱立信'
        },
        {
          value: '3',
          label: '富力广场'
        },
        {
          value: '4',
          label: '增值税普通发票'
        }
      ],
      showProjectStage: false,
      projectStageList: [
        {
          value: '1',
          label: '认筹'
        },
        {
          value: '2',
          label: '认购'
        },
        {
          value: '3',
          label: '签约'
        }
      ],
    };
  },
  onLoad() {},
  methods: {
    // 选择项目名称
    confirmProjectName(e) {
      this.searchForm.name = e[0].label;
    },
    // 选择项目周期
    confirmProjectStage(e) {
      this.searchForm.stage = e[0].label;
    },
    // 查看中介报备成交详情
    viewDealDetail() {
      uni.navigateTo({
        url: `/intermediaryPackage/myTab/pages/dealDetails?type=report`
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .deal-list-wrapper {
    width: 100%;
    background-color: #F5F5F5;

    .top-wrapper {
      width: 100%;
      height: 92rpx;
      box-sizing: border-box;
      padding: 10rpx 24rpx 10rpx 18rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFFFFF;

      .search {
        flex: 1;
        box-sizing: border-box;
        margin-right: 20rpx;
      }

      .filter-wrapper {
        color: $u-type-primary;
        font-size: 30rpx;
      }
    }

    .list-wrapper {
      width: 100%;
      height: calc(100vh - 95rpx);
      overflow-y: auto;
      background-color: #F5F5F5;

      .list-item {
        box-sizing: border-box;
        margin: 20rpx;
        padding: 20rpx;
        background-color: #FFFFFF;
        border: 1rpx solid #DADADA;

        .item-code {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .code {
            flex: 1;
            font-weight: 600;
          }

          .detail {
            box-sizing: border-box;
            margin: 0rpx 10rpx;
            color: #999999;
          }
        }

        .item-content {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: flex-end;

          .content-left {
            flex: 1;

            view {
              box-sizing: border-box;
              padding: 10rpx 0rpx 5rpx 0rpx;
            }
          }

          .content-right {
            display: flex;
            flex-direction: column;
            font-size: 26rpx;

            .right-top, .right-bottom {
              //flex: 1;
              display: flex;
              flex-direction: row;
              align-items: center;

              view {
                padding: 10rpx;
              }

              .border {
                color: #999999;
                border: 1rpx solid #999999;
              }
            }

            .right-top {
              .title {
                text-align: center;
                color: #FFFFFF;
                border: 1rpx solid #FE9400;
                background-color: #FE9400;
              }
            }

            .right-bottom {
              .title {
                text-align: center;
                color: #FFFFFF;
                border: 1rpx solid #4BD863;
                background-color: #4BD863;
              }
            }
          }
        }
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
        background-color: #FFFFFF;
      }

      .right {
        color: #FFFFFF;
        background-color: $u-type-primary;
      }
    }
  }
</style>