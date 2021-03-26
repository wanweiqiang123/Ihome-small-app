<!--
 * @Description: 基于u-picker组件开发的日期范围选择组件，可以选择自定义类型日期：如
 * @version: 
 * @Author: lsj
 * @Date: 2021-03-25 16:52:13
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-26 10:07:45
-->
<template>
  <view class="ih-time-range">
    <u-picker
      :mask-close-able="false"
      z-index="10090"
      mode="time"
      v-model="showStartTimeModel"
      :start-year="startYear"
      :end-year="endYear"
      :params="params"
      :default-time="startDefaultTime"
      @cancel="cancelSelectStartTime"
      @confirm="confirmSelectStartTime"></u-picker>
    <IhPicker
      :mask-close-able="false"
      z-index="10079"
      mode="time"
      v-model="showEndTimeModel"
      :start-year="startYear"
      :end-year="endYear"
      :params="params"
      :default-time="endDefaultTime"
      cancel-text="上一步"
      @cancel="cancelSelectEndTime"
      @confirm="confirmSelectEndTime"></IhPicker>
  </view>
</template>

<script>
import IhPicker from './components/picker';
export default {
  components: {
    IhPicker
  },
  name: 'ih-time-range',
  props: {
    // 通过双向绑定控制组件的弹出与收起
    value: {
      type: Boolean,
      default: false
    },
    // picker中需要显示的参数
    params: {
      type: Object,
      default() {
        return {
          year: true,
          month: true,
          day: true,
          hour: false,
          minute: false,
          second: false
        };
      }
    },
    // 年份开始时间
    startYear: {
      type: [String, Number],
      default: 1950
    },
    // 年份结束时间
    endYear: {
      type: [String, Number],
      default: 2050
    },
  },
  data() {
    return {
      showStartTimeModel: false,
      showEndTimeModel: false,
      startDefaultTime: '',
      endDefaultTime: '',
      startTimeValue: '',
      startTimeObj: {
        year: "",
        month: "",
        day: "",
        hour: "",
        minute: "",
        second: ""
      },
      endTimeValue: '',
      endTimeObj: {
        year: "",
        month: "",
        day: "",
        hour: "",
        minute: "",
        second: ""
      },
    };
  },
  onLoad() {},
  onShow() {},
  onReady() {},
  created() {},
  methods: {
    // 开始日期 - 取消功能
    cancelSelectStartTime() {
      this.$emit('close', false);
    },
    // 开始日期 - 确定功能
    confirmSelectStartTime(value) {
      // console.log('confirmSelectStartTime：', value);
      if (!value) return ;
      if (this.params.year) this.startTimeObj.year = value.year;
      if (this.params.month) this.startTimeObj.month = value.month;
      if (this.params.day) this.startTimeObj.day = value.day;
      if (this.params.hour) this.startTimeObj.hour = value.hour;
      if (this.params.minute) this.startTimeObj.minute = value.minute;
      if (this.params.second) this.startTimeObj.second = value.second;
      if (this.params.hour && this.params.minute && this.params.second) {
        this.startTimeValue = `${value.year}-${value.month}-${value.day} ${value.hour}:${value.minute}:${value.second}`;
      } else {
        this.startTimeValue = `${value.year}-${value.month}-${value.day}`;
      }
      // console.log('this.startTimeValue：', this.startTimeValue);
      // console.log('this.startTimeObj：', this.startTimeObj);
      this.showEndTimeModel = true;
    },
    // 结束日期 - 上一步功能
    cancelSelectEndTime() {
      this.$nextTick(() => {
        this.startDefaultTime = this.startTimeValue; // 回显选择的开始时间
        this.showStartTimeModel = true;
        this.showEndTimeModel = true;
      });
    },
    // 结束日期 - 确定功能
    confirmSelectEndTime(value) {
      console.log('confirmSelectEndTime：', value);
      let timeRange = {
        startYear: '',
        startMonth: '',
        startDay: '',
        startHour: '',
        startMinute: '',
        startSecond: '',
        endYear: '',
        endMonth: '',
        endDay: '',
        endHour: '',
        endMinute: '',
        endSecond: ''
      }
      if (!value) return ;
      if (this.params.year) this.endTimeObj.year = value.year;
      if (this.params.month) this.endTimeObj.month = value.month;
      if (this.params.day) this.endTimeObj.day = value.day;
      if (this.params.hour) this.endTimeObj.hour = value.hour;
      if (this.params.minute) this.endTimeObj.minute = value.minute;
      if (this.params.second) this.endTimeObj.second = value.second;
      if (this.params.hour && this.params.minute && this.params.second) {
        this.endTimeValue = `${value.year}-${value.month}-${value.day} ${value.hour}:${value.minute}:${value.second}`;
      } else {
        this.endTimeValue = `${value.year}-${value.month}-${value.day}`;
      }
      timeRange = {
        startYear: this.startTimeObj.year,
        startMonth: this.startTimeObj.month,
        startDay: this.startTimeObj.day,
        startHour: this.startTimeObj.hour,
        startMinute: this.startTimeObj.minute,
        startSecond: this.startTimeObj.second,
        endYear: value.year ? value.year : '',
        endMonth: value.month ? value.month : '',
        endDay: value.day ? value.day : '',
        endHour: value.hour ? value.hour : '',
        endMinute: value.minute ? value.minute : '',
        endSecond: value.second ? value.second : '',
      }
      // console.log('this.endTimeValue：', this.endTimeValue);
      // console.log('timeRange：', timeRange);
      this.$emit('confirm', timeRange);
      this.$emit('close', false);
    }
  },
  watch: {
    value(n) {
      if (n) {
        this.showStartTimeModel = true;
        this.showEndTimeModel = true;
      } else {
        this.showStartTimeModel = false;
        this.showEndTimeModel = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ih-time-range {
  width: 100%;
}
</style>