<!--
 * @Description: radio
 * @version: 
 * @Author: ywl
 * @Date: 2021-02-01 10:47:14
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-06 15:45:46
-->
<template>
  <view class="radio-container">
    <template v-for="(i, n) in arrData">
      <view
        :key="n"
        :class="['item', {'active': n === activeHandler}]"
        @click="handleClick(i, n)"
      >{{i[nameProp]}}</view>
    </template>
  </view>
</template>

<script>
export default {
  name: "ih-radio",
  props: {
    value: {
      type: String | Number | Object,
      default: null,
    },
    arrData: {
      type: Array,
      default: () => [],
    },
    radioStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    alias: {
      type: Object,
      default: () => {
        return {
          name: "name",
          code: "code",
        };
      },
    },
    isValueObj: {
      type: Boolean,
      default: false,
    },
    valueKey: {
      type: String,
      default: "",
    },
  },
  computed: {
    nameProp() {
      return this.alias?.name || "name";
    },
    valueProp() {
      return this.alias?.code || "code";
    },
    activeHandler() {
      if (this.isValueObj) {
        let list = this.arrData.map((i) => i[this.valueProp][this.valueKey]);
        this.active = list.indexOf(this.value[this.valueKey]);
      } else {
        let list = this.arrData.map((i) => i[this.valueProp]);
        this.active = list.indexOf(this.value);
      }
      return this.active;
    },
  },
  // watch: {
  //   value: {
  //     immediate: true,
  //     handler(val) {
  //       // if (!val) {
  //       //   this.active = -1;
  //       // }
  //       // let item = this.arrData.indexOf((i) => {
  //       //   return i[this.valueProp] == val
  //       // })
  //       let list = this.arrData.map((i) => i[this.valueProp]);
  //       this.active = list.indexOf(val);
  //       console.log(this.active, list);
  //     },
  //   },
  // },
  data() {
    return {
      active: -1,
    };
  },
  methods: {
    handleClick(item, index) {
      // this.active = index;
      if (this.isValueObj) {
        this.$emit("input", item);
      } else {
        this.$emit("input", item[this.valueProp]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-container {
  display: flex;
  flex-wrap: wrap;
  .item {
    padding: 21rpx 28rpx;
    color: #666666;
    background: #f8f8f8;
    margin-right: 12rpx;
    margin-bottom: 10rpx;
    line-height: normal;
    border: 1px solid #f8f8f8;
    &.active {
      position: relative;
      color: #4881f9;
      background: #e6f1fc;
      border-color: #4881f9;
      // &::after {
      //   content: " ";
      //   position: absolute;
      //   top: 0;
      //   right: 0;
      //   width: 30rpx;
      //   height: 34rpx;
      //   background: url("./img/icon.png") no-repeat;
      //   background-size: cover;
      // }
    }
  }
}
</style>
