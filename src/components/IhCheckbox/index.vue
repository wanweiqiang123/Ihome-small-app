<!--
 * @Description: checkbox
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-30 10:48:38
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-30 14:44:19
-->
<template>
  <view class="check-container">
    <template v-for="(item, i) in checkList">
      <view
        :class="['item', {'active': item.isCheck}]"
        :key="i"
        @click="handleSwitch(item)"
      >{{item[nameProp]}}</view>
    </template>
  </view>
</template>

<script>
export default {
  name: "ih-checkbox",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      defalut: () => [],
    },
    alias: {
      type: Object,
      defalut: () => {
        return {
          name: "name",
          value: "value",
        };
      },
    },
    isObj: {
      type: Boolean,
      defalut: false,
    },
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(newValue) {
        this.checkList = newValue.map((item) => {
          let check = false;
          if (this.value.length) {
            if (this.isObj) {
              check = this.value
                .map((i) => i[this.valueProp])
                .includes(item[this.valueProp]);
            } else {
              check = this.value.includes(item[this.valueProp]);
            }
          }
          return {
            ...item,
            isCheck: check,
          };
        });
      },
    },
  },
  computed: {
    nameProp() {
      return this.alias?.name || "name";
    },
    valueProp() {
      return this.alias?.value || "value";
    },
  },
  data() {
    return {
      checkList: [],
    };
  },
  methods: {
    handleSwitch(item) {
      item.isCheck = !item.isCheck;
      let resArr = [];
      this.checkList.forEach((i, n) => {
        if (i.isCheck) {
          this.isObj
            ? resArr.push(this.data[n])
            : resArr.push(i[this.valueProp]);
        }
      });
      this.$emit("input", resArr);
    },
  },
};
</script>

<style lang="scss" scoped>
.check-container {
  display: flex;
  flex-wrap: wrap;
  .item {
    padding: 21rpx 28rpx;
    color: #666666;
    background: #f8f8f8;
    margin-right: 12rpx;
    margin-bottom: 8rpx;
    line-height: normal;
    &.active {
      position: relative;
      color: #4881f9;
      background: #e6f1fc;
      &::after {
        content: " ";
        position: absolute;
        top: 0;
        right: 0;
        width: 30rpx;
        height: 34rpx;
        background: url("./img/icon.png") no-repeat;
        background-size: cover;
      }
    }
  }
}
</style>
