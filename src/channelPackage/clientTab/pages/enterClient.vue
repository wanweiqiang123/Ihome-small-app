<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-25 14:26:33
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-25 16:13:38
-->
<template>
  <view class="enter-client-wrapper">
    <view class="client-info-wrapper">
      <view class="title">客户信息</view>
      <view class="form-wrapper">
        <u-form :model="infoForm" ref="infoForm" :label-width="130">
          <u-form-item label="姓名" right-icon="arrow-right" required>
            <u-input v-model="infoForm.name" placeholder="姓名" :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="性别" required>
            <u-radio-group v-model="infoForm.sex" class="group-wrapper">
              <u-radio name="female">女士</u-radio>
              <u-radio name="male">先生</u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="手机号" right-icon="arrow-right" required>
            <u-input v-model="infoForm.phone" placeholder="手机号" :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="client-info-wrapper u-margin-top-30">
      <view class="title">客户来源</view>
      <view class="form-wrapper">
        <u-form :model="sourceForm" ref="sourceForm" :label-width="130">
          <u-form-item label="来源渠道" right-icon="arrow-right" class="hide-icon">
            <u-input
              @click="showSource = true"
              v-model="sourceForm.source"
              type="select" placeholder="来源渠道" :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="client-info-wrapper u-margin-top-30">
      <view class="title">客户需求</view>
      <view class="form-wrapper">
        <u-form :model="demandForm" ref="demandForm" :label-width="130">
          <u-form-item label="意向区域" right-icon="arrow-right" class="hide-icon">
            <u-input
              @click="selectArea('region')"
              v-model="demandForm.region"
              type="select" placeholder="意向区域" :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="购房目的">
            <u-checkbox-group class="check-box-wrapper">
              <u-checkbox v-model="item.checked" v-for="(item, index) in targetList" :key="index" :name="item.name">
                {{ item.name }}
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
          <u-form-item label="意向面积">
            <u-checkbox-group class="check-box-wrapper">
              <u-checkbox v-model="item.checked" v-for="(item, index) in areaList" :key="index" :name="item.name">
                {{ item.name }}
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
          <u-form-item label="意向户型">
            <u-checkbox-group class="check-box-wrapper">
              <u-checkbox v-model="item.checked" v-for="(item, index) in unitTypeList" :key="index" :name="item.name">
                {{ item.name }}
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
          <u-form-item label="房屋装修">
            <u-checkbox-group class="check-box-wrapper">
              <u-checkbox v-model="item.checked" v-for="(item, index) in decorationList" :key="index" :name="item.name">
                {{ item.name }}
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
          <u-form-item label="关注因素">
            <u-checkbox-group class="check-box-wrapper">
              <u-checkbox v-model="item.checked" v-for="(item, index) in factorList" :key="index" :name="item.name">
                {{ item.name }}
              </u-checkbox>
            </u-checkbox-group>
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="client-info-wrapper u-margin-top-30 u-margin-bottom-30">
      <view class="title">客户详情</view>
      <view class="form-wrapper">
        <u-form :model="detailForm" ref="detailForm" :label-width="130">
          <u-form-item label="年龄段" right-icon="arrow-right" class="hide-icon">
            <u-input
              @click="showAge = true"
              v-model="detailForm.ageRange"
              type="select" placeholder="年龄段" :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="现住区域" right-icon="arrow-right" class="hide-icon">
            <u-input
              @click="selectArea('currentLocation')"
              v-model="detailForm.currentLocation"
              type="select" placeholder="现住区域" :clearable="false" input-align="right" />
          </u-form-item>
          <u-form-item label="工作区域" right-icon="arrow-right" class="hide-icon">
            <u-input
              @click="selectArea('workLocation')"
              v-model="detailForm.workLocation"
              type="select" placeholder="工作区域" :clearable="false" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </view>
    <view class="bottom-btn">
      <u-button type="primary" @click="saveEnter">保存</u-button>
    </view>
    <u-select v-model="showSource" :list="sourceList" @confirm="confirmSource"></u-select>
    <u-picker v-model="showRegion" mode="region" @confirm="confirmRegion"></u-picker>
    <u-select v-model="showAge" :list="ageList" @confirm="confirmAge"></u-select>
  </view>
</template>

<script>
export default {
  data() {
    return {
      infoForm: {
        name: '',
        sex: '',
        phone: ''
      },
      sourceForm: {
        source: ''
      },
      showSource: false,
      sourceList: [
        {
          value: '1',
          label: '朋友介绍'
        },
        {
          value: '2',
          label: '活动'
        },
        {
          value: '3',
          label: '房展会'
        },
        {
          value: '4',
          label: '网络'
        },
        {
          value: '5',
          label: '门店'
        },
        {
          value: '6',
          label: '老客户'
        },
        {
          value: '7',
          label: '杂志'
        },
        {
          value: '8',
          label: '其他'
        }
      ],
      demandForm: {
        region: '',
        target: '',
        area: '',
        unitType: '',
        decoration: '',
        factor: ''
      },
      selectRegionType: '',
      showRegion: false,
      targetList: [
        {
          name: '投资',
          checked: false,
          disabled: false
        },
        {
          name: '自住',
          checked: false,
          disabled: false
        },
        {
          name: '择校',
          checked: false,
          disabled: false
        }
      ],
      areaList: [
        {
          name: '60m²以下',
          checked: false,
          disabled: false
        },
        {
          name: '60-90m²',
          checked: false,
          disabled: false
        },
        {
          name: '90-120m²',
          checked: false,
          disabled: false
        },
        {
          name: '120-150m²',
          checked: false,
          disabled: false
        },
        {
          name: '150-180m²',
          checked: false,
          disabled: false
        },
        {
          name: '180-240m²',
          checked: false,
          disabled: false
        },
        {
          name: '240-300m²',
          checked: false,
          disabled: false
        },
        {
          name: '300m²以上',
          checked: false,
          disabled: false
        }
      ],
      unitTypeList: [
        {
          name: '1室',
          checked: false,
          disabled: false
        },
        {
          name: '2室',
          checked: false,
          disabled: false
        },
        {
          name: '3室',
          checked: false,
          disabled: false
        },
        {
          name: '4室',
          checked: false,
          disabled: false
        },
        {
          name: '5室',
          checked: false,
          disabled: false
        },
        {
          name: '5室以上',
          checked: false,
          disabled: false
        }
      ],
      decorationList: [
        {
          name: '毛坯',
          checked: false,
          disabled: false
        },
        {
          name: '清水',
          checked: false,
          disabled: false
        },
        {
          name: '简装',
          checked: false,
          disabled: false
        },
        {
          name: '精装',
          checked: false,
          disabled: false
        },
        {
          name: '豪华',
          checked: false,
          disabled: false
        }
      ],
      factorList: [
        {
          name: '地段',
          checked: false,
          disabled: false
        },
        {
          name: '教育',
          checked: false,
          disabled: false
        },
        {
          name: '交通',
          checked: false,
          disabled: false
        },
        {
          name: '医疗',
          checked: false,
          disabled: false
        },
        {
          name: '商圈',
          checked: false,
          disabled: false
        },
        {
          name: '户型',
          checked: false,
          disabled: false
        },
        {
          name: '物业',
          checked: false,
          disabled: false
        },
        {
          name: '带花园',
          checked: false,
          disabled: false
        },
        {
          name: '朝中庭',
          checked: false,
          disabled: false
        }
      ],
      detailForm: {
        ageRange: '',
        currentLocation: '',
        workLocation: '',
      },
      showAge: false,
      ageList: [
        {
          value: '1',
          label: '22岁以下'
        },
        {
          value: '2',
          label: '22-30岁'
        },
        {
          value: '3',
          label: '30-40岁'
        },
        {
          value: '4',
          label: '40-50岁'
        },
        {
          value: '5',
          label: '50岁以上'
        }
      ],
      showCurrent: false,
      showWork: false
    };
  },
  onLoad() {},
  methods: {
    // 选择来源
    confirmSource(e) {
      console.log(e);
      this.sourceForm.source = e[0].label;
    },
    // 选择区域
    selectArea(type) {
      this.selectRegionType = type;
      this.showRegion = true;
    },
    // 确认选择区域
    confirmRegion(e) {
      if (this.selectRegionType === 'region') {
        // 意向区域
        this.demandForm.region = e[0].label;
      } else if (this.selectRegionType === 'currentLocation') {
        // 现住区域
        this.detailForm.currentLocation = e[0].label;
      } else if (this.selectRegionType === 'workLocation') {
        // 工作区域
        this.detailForm.workLocation = e[0].label;
      }
    },
    // 选择年龄段
    confirmAge(e) {
      this.detailForm.ageRange = e[0].label;
    },
    // 保存
    saveEnter() {
      uni.redirectTo({
        url: `/channelPackage/clientTab/index`
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .enter-client-wrapper {
    width: 100%;
    height: calc(100vh - 120rpx);
    overflow-y: auto;
    box-sizing: border-box;
    background-color: #F5F5F5;

    .title {
      flex: 1;
      //height: 30rpx;
      font-size: 30rpx;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #333333;
      line-height: 42rpx;
    }

    .client-info-wrapper {
      width: 100%;
      background-color: #FFFFFF;
      padding: 20rpx;

      .form-wrapper {
        width: 100%;
        box-sizing: border-box;
        padding: 0rpx 20rpx;

        /deep/.u-radio {
          float: right!important;
        }

        /deep/.u-checkbox {
          float: none!important;
        }

        .check-box-wrapper {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          flex-wrap: wrap;
        }
      }
    }

    .bottom-btn {
      width: 100%;
      height: 100rpx;
      box-sizing: border-box;
      padding: 10rpx 50rpx;
      background-color: #FFFFFF;
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      z-index: 9999;
    }
  }
</style>