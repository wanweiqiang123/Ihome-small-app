<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-12 10:16:57
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-12 11:11:37
-->
<template>
  <IntermediaryTabBar>
    <view class="home-page-wrapper">
      <view class="top-wrapper">
        <u-input
          class="select"
          type="select"
          v-model="queryPageParameters.location"
          :type="type"
          placeholder="请选择"
          @click="showLocation = true"
          :border="false"/>
        <u-search
          class="search"
          shape="square"
          :show-action="false"
          placeholder="请输入项目名称"
          v-model="queryPageParameters.projectName"></u-search>
      </view>
      <view class="swiper-wrapper">
        <u-swiper :list="list"></u-swiper>
      </view>
      <u-action-sheet :list="locationList" v-model="showLocation" @click="locationCallback"></u-action-sheet>
    </view>
  </IntermediaryTabBar>
</template>

<script>
  export default {
    data() {
      return {
        queryPageParameters: {
          location: '',
          projectName: ''
        },
        showLocation: false,
        locationList: [
          {
            text: '广州'
          },
          {
            text: '深圳'
          },
          {
            text: '肇庆'
          }
        ],
        list: [{
          image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东'
        },
          {
            image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
            title: '身无彩凤双飞翼，心有灵犀一点通'
          },
          {
            image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
            title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
          }
        ]
      };
    },
    onLoad() {
    },
    methods: {
      locationCallback(index) {
        this.queryPageParameters.location = this.locationList[index].text;
      }
    },
  };
</script>

<style lang="scss">
  .home-page-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 0rpx 20rpx;

    .top-wrapper {
      width: 100%;
      height: 72rpx;
      display: flex;

      .select {
        width: 150rpx;
        height: 72rpx;
        background: #eee;
        box-sizing: border-box;
        padding-left: 8px;
        border-bottom-left-radius: 8rpx;
        border-top-left-radius: 8rpx;
        position: relative;

        &:before {
          content: "";
          width: 1px;
          position: absolute;
          height: 65%;
          top: 15%;
          right: 0;
          background: black;
        }
      }

      .search {
        flex: 1;
        height: 72rpx;

        /deep/.u-content {
          height: 72rpx!important;
        }
      }
    }

    .swiper-wrapper {
      width: 100%;
      box-sizing: border-box;
      margin: 8rpx 0px;
    }
  }
</style>