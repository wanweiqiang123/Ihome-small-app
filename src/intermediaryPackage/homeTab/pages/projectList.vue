<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-17 15:26:33
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-23 17:20:21
-->
<template>
  <view class="project-list-wrapper">
    <view class="top-wrapper">
      <view class="top-location">
        <u-icon name="map-fill" size="50rpx"></u-icon>
        <view>广州市</view>
      </view>
      <u-search
        class="search"
        shape="round"
        bg-color="white"
        border-color="#f2f2f2"
        :show-action="false"
        placeholder="请输入项目名称"
        v-model="queryPageParameters.projectName"></u-search>
    </view>
    <view>
      <u-dropdown ref="uDropdown">
        <u-dropdown-item
          @change="handleDrop"
          v-model="dropDownList[0].value"
          :title="dropDownList[0].title"
          :options="dropDownList[0].options">
        </u-dropdown-item>
        <u-dropdown-item :title="dropDownList[1].title">
          <view class="slot-content slot-wrapper">
            <view>
              <view
                @click="handleChange(1, 'value', item.value)"
                class="slot-item-wrapper"
                v-for="item in dropDownList[1].options"
                :key="item.value">
                <view class="type">{{item.label}}</view>
                <view class="icon">
                  <u-icon v-show="dropDownList[1].value === item.value" name="checkbox-mark" size="32rpx"></u-icon>
                </view>
              </view>
              <view class="input-wrapper">
                <view class="title">自定义</view>
                <view class="input">
                  <input
                    type="text"
                    class="input-u"
                    v-model="dropDownList[1].minValue"
                    @input="changePrice"
                    placeholder="最小价格" />
                  <span class="input-gap">-</span>
                  <input
                    type="text"
                    class="input-u"
                    v-model="dropDownList[1].maxValue"
                    @input="changePrice"
                    placeholder="最大价格" />
                </view>
                <view class="btn">
                  <u-button type="error" size="mini" @click="closeDropdown">确定</u-button>
                </view>
              </view>
            </view>
          </view>
        </u-dropdown-item>
        <u-dropdown-item :title="dropDownList[2].title">
          <view class="slot-content slot-wrapper">
            <view>
              <view
                @click="handleChange(2, 'value', item.value)"
                class="slot-item-wrapper"
                v-for="item in dropDownList[2].options"
                :key="item.value">
                <view class="type">{{item.label}}</view>
                <view class="icon" v-show="dropDownList[2].value.includes(item.value)">
                  <u-icon name="checkbox-mark" size="32rpx"></u-icon>
                </view>
              </view>
            </view>
          </view>
        </u-dropdown-item>
        <u-dropdown-item :title="dropDownList[3].title">
          <view class="slot-content slot-more-wrapper">
            <view class="type-wrapper">
              <view class="name">类型</view>
              <view class="type">
                <view
                  v-for="item in dropDownList[3].typeOptions"
                  :key="item.value"
                  :class="dropDownList[3].type === item.value ? 'item item-selected' : 'item'"
                  @click="handleChange(3, 'type', item.value)">{{item.label}}</view>
              </view>
            </view>
            <view class="type-wrapper">
              <view class="name">排序</view>
              <view class="type">
                <view
                  v-for="item in dropDownList[3].sortOptions"
                  :key="item.value"
                  :class="dropDownList[3].sort === item.value ? 'item item-selected' : 'item'"
                  @click="handleChange(3, 'sort', item.value)">{{item.label}}</view>
              </view>
            </view>
            <view class="type-wrapper no-border-bottom">
              <view class="name">装修</view>
              <view class="type">
                <view
                  v-for="item in dropDownList[3].decorationOptions"
                  :key="item.value"
                  :class="dropDownList[3].decoration === item.value ? 'item item-selected' : 'item'"
                  @click="handleChange(3, 'decoration', item.value)">{{item.label}}</view>
              </view>
            </view>
            <view class="btn-wrapper">
              <view class="info" @click="handleReset">恢复默认</view>
              <view class="error" @click="closeDropdown">确定</view>
            </view>
          </view>
        </u-dropdown-item>
      </u-dropdown>
      <view class="tag-wrapper">
        <u-tag
          v-for="(item, index) in tagList"
          :key="item.id"
          :text="item.label"
          @close="closeTag(item)"
          :closeable="true"
          type="info" />
      </view>
    </view>
    <view class="project-list">
      <view class="content" v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="item" @click="viewProjectDetail">
        <view>
          <u-image width="242rpx" height="186rpx" src="https://cdn.uviewui.com/uview/swiper/1.jpg"></u-image>
        </view>
        <view class="content-right">
          <view class="title-wrapper">远洋招商保利东湾经纪渠道</view>
          <view>
            <u-tag
              text="天河区"
              size="mini"
              :closeable="false"
              type="info" />
          </view>
          <view class="price-wrapper">
            <span class="price">均价23000</span>
            <span class="unit">元/m<span class="two">2</span></span>
          </view>
          <view class="rule">
            <span class="rule-tap">佣</span>
            <span>佣金规则</span>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryPageParameters: {
          projectName: '',
        },
        dropDownList: [
          {
            value: '', // 单选
            title: '区域',
            options: [
              {
                label: '全部区域',
                value: '1'
              },
              {
                label: '天河区',
                value: '2'
              },
              {
                label: '南沙区',
                value: '3'
              },
              {
                label: '番禺区',
                value: '4'
              },
              {
                label: '增城区',
                value: '5'
              }
            ]
          },
          {
            value: '', // 单选
            title: '均价',
            minValue: '', // 最小值
            maxValue: '', // 最大值
            titleName: 'average',
            options: [
              {
                label: '不限',
                value: '1',
                minValue: '',
                maxValue: ''
              },
              {
                label: '0-1万',
                value: '2',
                minValue: '0',
                maxValue: '1'
              },
              {
                label: '1-2万',
                value: '3',
                minValue: '1',
                maxValue: '2'
              },
              {
                label: '2-3万',
                value: '4',
                minValue: '2',
                maxValue: '3'
              },
              {
                label: '3-4万',
                value: '5',
                minValue: '3',
                maxValue: '4'
              },
              {
                label: '4-5万',
                value: '6',
                minValue: '4',
                maxValue: '5'
              },
              {
                label: '5万以上',
                value: '7',
                minValue: '',
                maxValue: ''
              }
            ]
          },
          {
            value: [],
            title: '户型', // 多选
            titleName: 'unit',
            options: [
              {
                label: '不限',
                value: '1'
              },
              {
                label: '一室',
                value: '2'
              },
              {
                label: '二室',
                value: '3'
              },
              {
                label: '三室',
                value: '4'
              },
              {
                label: '四室',
                value: '5'
              },
              {
                label: '五室',
                value: '6'
              },
              {
                label: '五室以上',
                value: '7'
              }
            ]
          },
          {
            type: '', // 类型-单选
            sort: '', // 排序-单选
            decoration: '', // 装修-单选
            title: '更多',
            titleName: 'more',
            typeOptions: [
              {
                label: '住宅',
                value: '1'
              },
              {
                label: '别墅',
                value: '2'
              },
              {
                label: '公寓',
                value: '3'
              },
              {
                label: '写字楼',
                value: '4'
              },
              {
                label: '商铺',
                value: '5'
              }
            ],
            sortOptions: [
              {
                label: '均价从高到低',
                value: '1'
              },
              {
                label: '均价从低到高',
                value: '2'
              },
              {
                label: '距离从远到近',
                value: '3'
              },
              {
                label: '距离从近到远',
                value: '4'
              }
            ],
            decorationOptions: [
              {
                label: '毛胚',
                value: '1'
              },
              {
                label: '装修',
                value: '2'
              },
              {
                label: '精装',
                value: '3'
              }
            ]
          }
        ]
      };
    },
    computed: {
      tagList() {
        return this.initTag();
      }
    },
    onLoad() {
    },
    methods: {
      // 手动关闭下拉菜单
      closeDropdown() {
        this.$refs.uDropdown && this.$refs.uDropdown.close();
      },
      // 区域方法
      handleDrop(value) {
        console.log('handleDrop', value);
        this.initTag();
      },
      // 构建选中的tag
      initTag() {
        let tagList = [];
        if (this.dropDownList.length > 0) {
          this.dropDownList.forEach((list, index) => {
            switch (index) {
              case 0 : // 区域 - 单选
                if (list.value) {
                  list.options.forEach((option) => {
                    if (option.value === list.value) {
                      tagList.push(
                        {
                          id: new Date().getTime() + tagList.length,
                          index: index,
                          label: option.label,
                          value: option.value
                        }
                      );
                    }
                  })
                }
                break;
              case 1 : // 均价 - 单选
                if (list.value) {
                  list.options.forEach((option) => {
                    if (option.value === list.value) {
                      tagList.push(
                        {
                          id: new Date().getTime() + tagList.length,
                          index: index,
                          minValue: '',
                          maxValue: '',
                          label: option.label,
                          value: option.value
                        }
                      );
                    }
                  })
                } else {
                  if (list.minValue && list.maxValue) {
                    tagList.push(`${list.minValue}-${list.maxValue}万`);
                    tagList.push(
                      {
                        id: new Date().getTime() + tagList.length,
                        index: index,
                        minValue: list.minValue,
                        maxValue: list.maxValue,
                        label: `${list.minValue}-${list.maxValue}万`,
                        value: ''
                      }
                    );
                  }
                }
                break;
              case 2 : // 户型 - 多选
                if (list.value && list.value.length > 0) {
                  list.value.forEach((item) => {
                    list.options.forEach((option) => {
                      if (option.value === item) {
                        tagList.push(
                          {
                            id: new Date().getTime() + tagList.length,
                            index: index,
                            value: option.value,
                            label: option.label
                          }
                        );
                      }
                    })
                  })
                }
                break;
              case 3 : // 更多 - 单选
                if (list.type) {
                  // 类型
                  list.typeOptions.forEach((option) => {
                    if (option.value === list.type) {
                      tagList.push(
                        {
                          id: new Date().getTime() + tagList.length,
                          type: 'type',
                          index: index,
                          value: option.value,
                          label: option.label
                        }
                      );
                    }
                  })
                }
                if (list.sort) {
                  // 排序
                  list.sortOptions.forEach((option) => {
                    if (option.value === list.sort) {
                      tagList.push(
                        {
                          id: new Date().getTime() + tagList.length,
                          type: 'sort',
                          index: index,
                          value: option.value,
                          label: option.label
                        }
                      );
                    }
                  })
                }
                if (list.decoration) {
                  // 装饰
                  list.decorationOptions.forEach((option) => {
                    if (option.value === list.decoration) {
                      tagList.push(
                        {
                          id: new Date().getTime() + tagList.length,
                          type: 'decoration',
                          index: index,
                          value: option.value,
                          label: option.label
                        }
                      );
                    }
                  })
                }
                break;
            }
          })
        }
        return tagList;
      },
      // 改变最小价格和最大价格事件
      changePrice(event) {
        // console.log('changePrice', event);
        if (this.dropDownList[1].options && this.dropDownList[1].options.length > 0) {
          let flag = false;
          this.dropDownList[1].options.forEach((option) => {
            if (option.minValue === this.dropDownList[1].minValue && option.maxValue === this.dropDownList[1].maxValue) {
              flag = true;
              this.dropDownList[1].value = option.value;
            }
          })
          if (!flag) {
            this.dropDownList[1].value = ""
          }
        }
      },
      // 下拉框自定义方法click事件
      handleChange(index, key, value) {
        // console.log('type', this.dropDownList);
        switch (index) {
          case 2 : // 户型 - 多选
            if (this.dropDownList[index][key] && this.dropDownList[index][key].length > 0) {
              if (this.dropDownList[index][key].includes(value)) {
                this.dropDownList[index][key] = this.dropDownList[index][key].filter((item) => {
                  return item !== value
                })
              } else {
                this.dropDownList[index][key].push(value);
              }
            } else {
              this.dropDownList[index][key].push(value);
            }
            break;
          default:
            // 均价和更多
            if (this.dropDownList[index][key] === value) {
              this.dropDownList[index][key] = "";
              if (index === 1) {
                this.dropDownList[index].minValue = "";
                this.dropDownList[index].maxValue = "";
              }
            } else {
              this.dropDownList[index][key] = value;
              if (index === 1) {
                // 自定义的显示值
                if (this.dropDownList[index].options && this.dropDownList[index].options.length > 0) {
                  this.dropDownList[index].options.forEach((option) => {
                    if (option.value === value) {
                      this.dropDownList[index].minValue = option.minValue;
                      this.dropDownList[index].maxValue = option.maxValue;
                    }
                  })
                }
              }
            }
            break;
        }
      },
      // 恢复默认
      handleReset() {
        this.dropDownList[3].type = '';
        this.dropDownList[3].sort = '';
        this.dropDownList[3].decoration = '';
      },
      // 关闭Tag
      closeTag(item) {
        console.log('index', item)
        console.log('tagList', this.tagList);
        if (!item.id) return;
        // 删除对应的选项
        switch (item.index) {
          case 0 : // 区域 - 单选
            this.dropDownList[item.index].value = '';
            break;
          case 1 : // 均价 - 单选
            if (item.value) {
              this.dropDownList[item.index].value = '';
              this.dropDownList[item.index].minValue = '';
              this.dropDownList[item.index].maxValue = '';
            } else {
              if (item.minValue && item.maxValue) {
                this.dropDownList[item.index].minValue = '';
                this.dropDownList[item.index].maxValue = '';
              }
            }
            break;
          case 2 : // 户型 - 多选
            if (this.dropDownList[item.index].value && this.dropDownList[item.index].value.length > 0) {
              this.dropDownList[item.index].value = this.dropDownList[item.index].value.filter((v) => {
                return v !== item.value;
              })
            }
            break;
          case 3 : // 更多 - 单选
            this.dropDownList[item.index][item.type] = '';
            break;
        }
      },
      // 查看项目详情
      viewProjectDetail() {
        uni.navigateTo({
          url: `/intermediaryPackage/homeTab/pages/projectDetail`,
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .project-list-wrapper {
    width: 100%;
    box-sizing: border-box;

    .top-wrapper {
      width: 100%;
      height: 72rpx;
      box-sizing: border-box;
      padding: 0rpx 20rpx;
      margin-top: 10rpx;
      display: flex;

      .top-location {
        width: 160rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        view {
          font-size: 30rpx;
        }
      }

      .search {
        flex: 1;
        height: 72rpx;

        /deep/ .u-content {
          height: 72rpx !important;
        }
      }
    }

    .slot-wrapper {
      width: 100%;
      background-color: #ffffff;

      .slot-item-wrapper {
        box-sizing: border-box;
        padding: 20rpx 32rpx;
        font-size: 28rpx;
        line-height: 54rpx;
        color: #606266;
        display: flex;
        flex-direction: row;
        align-items: center;

        .type {
          flex: 1;
        }

        .icon {
          /deep/.u-icon__icon {
            color: #2979ff;
          }
        }
      }
    }

    .input-wrapper, .input {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      .title {
        width: 180rpx;
      }

      .input-u {
        width: 180rpx;
        height: 70rpx;
        line-height: 70rpx;
        box-sizing: border-box;
        padding: 1rpx 22rpx;
        border: 1rpx solid #DCDFE6;
      }

      .input-gap {
        width: 30rpx;
        text-align: center;
      }
    }

    .btn {
      width: 150rpx;
      text-align: right;

      /deep/.u-btn {
        height: 60rpx;
        padding: 0rpx 50rpx;
      }
    }

    .input-wrapper {
      box-sizing: border-box;
      padding: 20rpx 32rpx;
      font-size: 28rpx;
      line-height: 54rpx;
      color: #606266;
    }

    .slot-more-wrapper {
      width: 100%;
      background-color: #ffffff;

      .type-wrapper {
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx 32rpx;
        border-bottom: 1px solid black;

        .name {
          font-size: 34rpx;
          box-sizing: border-box;
          padding: 20rpx 0rpx;
        }

        .type {
          box-sizing: border-box;
          margin-bottom: 20rpx;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          view {
            height: 60rpx;
            line-height: 20rpx;
            box-sizing: border-box;
            margin-right: 30rpx;
            margin-bottom: 30rpx;
            padding: 20rpx 20rpx;
            background-color: #f2f2f2;
          }
        }
      }

      .no-border-bottom {
        border-bottom: none;
      }

      .btn-wrapper {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        view {
          font-size: 30rpx;
          height: 80rpx;
          line-height: 80rpx;
          flex: 1;
          text-align: center;
        }

        .info {
          border-color: #f2f2f2;
          background-color: #f2f2f2;
        }

        .error {
          color: #fff;
          border-color: #fa3534;
          background-color: #fa3534;
        }
      }

      .item-selected {
        border: 2rpx solid #D9001B;
        color: #D9001B;
      }
    }

    .tag-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 8rpx 20rpx;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      border-bottom: 1rpx solid #f1f1f1;

      /deep/.u-tag {
        box-sizing: border-box;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
      }
    }

    .project-list {
      width: 100%;
      box-sizing: border-box;
      padding: 2rpx 20rpx;

      .project-scroll-view {
        min-height: 500rpx;
      }

      .content {
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx 0rpx;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #f2f2f2;

        .content-right {
          flex: 1;
          box-sizing: border-box;
          margin-left: 25rpx;

          view {
            box-sizing: border-box;
            margin-bottom: 10rpx;
          }

          .title-wrapper {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1C1C1C;
          }

          .price-wrapper {
            width: 100%;
            color: #FD4918;
            font-family: PingFang SC;

            .price {
              font-size: 32rpx;
              font-weight: 600;
            }

            .unit {
              font-size: 22rpx;
              box-sizing: border-box;
              display: inline-block;
              margin-left: 8rpx;
            }

            .two {
              vertical-align: super;
              font-size: 18rpx;
            }
          }

          .rule {
            width: 100%;

            .rule-tap {
              width: 40rpx;
              height: 40rpx;
              line-height: 40rpx;
              text-align: center;
              display: inline-block;
              background-color: orange;
              color: white;
              box-sizing: border-box;
              margin-right: 8rpx;
              border-radius: 17%;
            }
          }
        }
      }
    }
  }
</style>