<template>
  <div class="select-wrap" :class="{'block': width == '100%'}">
    <div
      class="select-title"
      v-if="mode === options.textMode"
      @click="handleTitleClick"
      :class="{
        'hidden': mode !== options.textMode,
        'select-title__active': propverVisible,
        'pr24': pr24,
      }"
      :style="{'max-width': width + 'px'}"
    >
      <span class="content" :style="{'max-width': width - 24 + 'px'}">{{selectedTitle}}</span>
      <i
        v-if="canClearAll && selected.length && selected[0] !== 'all'"
        class="select-title__icon el-icon-close"
        :class="{'icon-arrow-close__canClearAll': canClearAll}"
        @click.stop="handleClearAllClick"
      ></i>
      <i
        class="select-title__icon el-icon-arrow-down"
        :class="{'icon-arrow-down__cancel': canCancel, 'icon-arrow-down__canClearAll': canClearAll}"
      ></i>
      <i class="select-title__icon el-icon-close" v-if="canCancel" @click.stop="handleCancleClick"></i>
    </div>
    <el-select
      v-model="selected"
      :placeholder="placeholder"
      :class="{'el-select-wrap': mode === options.textMode}"
      :style="{'max-width': width !== '100%' ? width + 'px' : '100%'}"
      :multiple="multiple"
      clearable
      @change="onSelectChange"
      @visible-change="onVisibleChange"
      @clear="onCear"
      ref="select"
    >
      <!-- 过滤 -->
      <li v-if="filterable" class="search-input">
        <el-input
          :placeholder="filterPlaceholder"
          v-model.trim="filterString"
          v-focus
          ref="filterHandlePerson"
        ></el-input>
      </li>
      <div class="select-scroll scrollbal-common">
        <el-option
          label="清除选中"
          value
          v-if="multiple"
          @click.native="onClearAll"
          style="font-size: 12px;height: 30px;line-height: 30px;"
        ></el-option>
        <el-option v-if="multiple" :label="allLabel" :value="allValue"></el-option>
        <!-- 分组 -->
        <div v-if="group">
          <el-option-group
            v-for="group in optionData"
            :key="group[groupLabelAttr]"
            :label="group[groupLabelAttr]"
          >
            <el-option
              v-for="item in group[groupChildAttr]"
              :key="item[valueAttr]"
              :value="item[valueAttr]"
            >
              <span>{{item[labelAttr]}}</span>
            </el-option>
          </el-option-group>
        </div>
        <!-- 不分组 -->
        <div v-else>
          <el-option
            v-for="(item, index) in optionData"
            :key="index"
            :value="item[valueAttr]"
            :label="item[labelAttr]"
          >
            <span v-if="colorAttr" v-html="createSpan(item[colorAttr], item[labelAttr])"></span>
            <span v-else>{{item[labelAttr]}}</span>
          </el-option>
        </div>
        <el-option v-if="loading" label="数据加载中..." value="loading" disabled></el-option>
        <el-option
          v-if="!optionData.length && !loading"
          :label="noDataLabel"
          :value="noDataLabel"
          disabled
        ></el-option>
      </div>
    </el-select>
  </div>
</template>
<script>
/**
 * @title 通用选择器组件
 * @desc 使用 el-select 组件
 * @author wuqian
 * @date 2019.12.6
 * props
 *    mode 选择器样式模式(可选值：text：哥伦布自定义样式，element elementUI风格)
 *    httpConfig 内置http请求配置
 *      httpConfig.method 请求方法 默认：get
 *      httpConfig.api 请求接口
 *      httpConfig.payload 请求参数
 *      httpConfig.trigger 组件内置发起http请求的方式(可选值：click 打开下拉时请求，init 初始化组件时请求) 默认值：init
 *      httpConfig.beforeRequest 钩子函数 - http请求前调用，对 httpConfig 做一些操作 默认值：null
 *      httpConfig.requested 钩子函数 - http请求完成后调用，对select组件vm做一些操作并返回组件data 默认值：null
 *        return 组件data
 * event
 *    change 选中项改变回调
 *    cancle 取消按钮回调
 *
 */
// export default {
//   name: "Selector",
//   components: {},
//   model: {
//     prop: "defaultSelected",
//     event: "change"
//   },
//   props: {
//     // 选择器模式: text element
//     mode: {
//       type: String,
//       default() {
//         return "text";
//       }
//     },
//     // 是否多选
//     multiple: {
//       type: Boolean,
//       default() {
//         return false;
//       }
//     },
//     // 是否分组
//     group: {
//       type: Boolean,
//       default() {
//         return false;
//       }
//     },
//     // 选择器标记
//     selectedLabel: {
//       type: String,
//       default() {
//         return "选中值";
//       }
//     },
//     // 取消按钮
//     canCancel: {
//       type: Boolean,
//       default() {
//         return false;
//       }
//     },
//     // 清除所选项
//     canClearAll: {
//       type: Boolean,
//       default() {
//         return true;
//       }
//     },
//     // 选择器宽度
//     width: {
//       type: [String, Number],
//       default() {
//         return "200";
//       }
//     },
//     // 显示的原始数据
//     data: {
//       type: Array,
//       default() {
//         return [];
//       }
//     },
//     // 默认选中值
//     defaultSelected: {
//       type: [String, Array, Number],
//       default() {
//         return "";
//       }
//     },
//     // 分组时子树属性
//     groupChildAttr: {
//       type: String,
//       default() {
//         return "children";
//       }
//     },
//     groupLabelAttr: {
//       type: String,
//       default() {
//         return "label";
//       }
//     },
//     // 数据项 label 属性
//     labelAttr: {
//       type: String,
//       default() {
//         return "label";
//       }
//     },
//     // 数据项 value属性
//     valueAttr: {
//       type: String,
//       default() {
//         return "value";
//       }
//     },
//     // 数据项 背景色属性
//     colorAttr: {
//       type: String
//     },
//     // 全选项的 value
//     allValue: {
//       type: String,
//       default() {
//         return "all";
//       }
//     },
//     // 全选项的 label
//     allLabel: {
//       type: String,
//       default() {
//         return "全部";
//       }
//     },
//     // 是否可过滤
//     filterable: {
//       type: Boolean,
//       default() {
//         return true;
//       }
//     },
//     // 过滤框 placeholder
//     filterPlaceholder: {
//       type: String,
//       default() {
//         return "搜索";
//       }
//     },
//     // 选择框 placeholder
//     placeholder: {
//       type: String,
//       default() {
//         return "搜索";
//       }
//     },
//     // 无数据提示信息
//     noDataLabel: {
//       type: String,
//       default() {
//         return "无数据";
//       }
//     },
//     // 内置 http 请求配置
//     httpConfig: Object,
//     defaultTitle: {
//       type: String,
//       default() {
//         return "";
//       }
//     }
//   },
//   data() {
//     return {
//       // 组件默认配置
//       options: {
//         elMode: "element", // element样式
//         textMode: "text" // 哥伦布自定义样式
//       },
//       search: "",
//       title: "",
//       defaultTitle_: "",
//       selected: ["all"],
//       filterString: "", // 过滤字段
//       optionData: [], // 组件下拉列表数据
//       optionDataCopy: [], // 拷贝组件下拉列表数据
//       selectedTitle: "全部", // 选中后显示的标题
//       propverVisible: false, // 下拉框显隐
//       focusTimer: null, //定时器时间
//       httpConfig_: {}, // 组件内置 http 配置
//       loading: false
//     };
//   },
//   watch: {
//     // 初始化 this.optionData
//     data: {
//       handler: function(val) {
//         if (Array.isArray(val) && val.length) {
//           this.copyData(val);
//         }
//       },
//       immediate: true
//     },
//     // 监听过滤操作
//     filterString(val) {
//       if (val) {
//         this.optionData = this._deepClone(this.optionDataCopy);
//         // 原始数据中过滤包含 val 的数据子项（分组模式时不过滤组名）
//         this.optionData = this.filterData(
//           this._deepClone(this.optionDataCopy),
//           val
//         );
//         // element-ui 模式时 每次过滤情况选中 避免选中值显示是 id 的问题
//         if (this.mode === this.options.elMode && this.selected) {
//           this.$emit("change", []);
//         }
//       } else {
//         // 过滤为空时恢复数据
//         this.optionData = this._deepClone(this.optionDataCopy);
//       }
//     },
//     /**
//      * @desc 初始化 this.selected 设置默认选中
//      * 传入的 defaultSelected 为引用类型 不然没法监听变化
//      * 单选：this.selected | String  多选 this.selected | Array
//      */
//     defaultSelected: {
//       handler: function(val) {
//         // 初始设置 this.selected
//         if (this.multiple) {
//           this.selected = this.filterSelectedValue(val);
//         } else {
//           this.selected = this.filterSelectedValue(val)[0] || "";
//         }
//         // 设置默认选中
//         this.setSelected(this.selected);
//       },
//       immediate: true
//     },
//     httpConfig: {
//       handler: function(config = {}) {
//         // httpConfig 默认值
//         const {
//           method = "get", // http 请求方法
//           api, // http 请求接口
//           payload, // http 请求参数
//           trigger = "init", // 组件内置发起 http 请求的方式：click -> 点击后请求，init -> 初始化组件时请求
//           beforeRequest = null, // 钩子函数 - http 请求之前，对 httpConfig 做一些操作
//           requested = null // 钩子函数 - http 请求完成后，对 select 组件 vm 做一些操作并返回组件 data
//         } = config;
//         // 初始化组件内部http配置 httpConfig_
//         this.httpConfig_ = {
//           method,
//           api,
//           trigger,
//           payload,
//           beforeRequest,
//           requested
//         };
//         // 不是init模式，初始化不请求
//         if (trigger !== "init") return;
//         this.httpRequest();
//       },
//       immediate: true
//     },
//     defaultTitle: {
//       handler: function(val) {
//         this.title = val;
//         this.defaultTitle_ = val;
//         this.setSelectedTitle(this.title);
//       },
//       immediate: true
//     }
//   },
//   computed: {
//     pr24() {
//       return (
//         !this.canCancel && (!this.selected.length || this.selected[0] === "all")
//       );
//     }
//   },
//   mounted() {
//     if (this.selectedLabel) {
//       this.setSelectedTitle(this.selected);
//     } else {
//       this.selectedTitle = "";
//     }
//   },
//   methods: {
//     // 判断是否是 function 类型
//     _isFn(val) {
//       return val && typeof val === "function";
//     },
//     // http请求获取列表数据
//     httpRequest() {
//       // 钩子 beforeRequest
//       if (this._isFn(this.httpConfig_.beforeRequest)) {
//         this.httpConfig_.beforeRequest.call(this.httpConfig_);
//       }
//       const { method, api, payload, handlerResponse } = this.httpConfig_;
//       console.log(this.httpConfig_);
//       // 如果组件data有数据，不发起http请求
//       if (this.optionData?.length) return;
//       this.loading = true;
//       setTimeout(() => {
//         $http[method.toLowerCase()](api, payload)
//           .then(res => {
//             // 钩子 requested
//             if (this._isFn(this.httpConfig_.requested)) {
//               this.copyData(this.httpConfig_.requested.call(this, res));
//             }
//           })
//           .catch(err => console.log(err))
//           .finally(_ => {
//             this.loading = false;
//           });
//       }, 3000);
//     },
//     // 深拷贝列表数据
//     copyData(val) {
//       if (!val) return;
//       this.optionData = this._deepClone(val);
//       this.optionDataCopy = this._deepClone(val);
//     },
//     onCear() {
//       this.selected = "";
//       this.$emit("change", []);
//     },
//     onClearAll() {
//       this.selected = [];
//       this.title = "";
//       this.defaultTitle_ = "";
//       this.setSelected(this.selected);
//     },
//     // 清除所有选中项
//     handleClearAllClick() {
//       this.$emit("change", []);
//     },
//     // 点击取消按钮回调
//     handleCancleClick() {
//       this.onClearAll();
//       this.$emit("cancel");
//     },
//     createSpan(color = "black", label) {
//       // return `<span class="statusbox-list-common" style="background-color: ${color}">${label}</span>`;
//     },
//     // 根据原始数据的数据项过滤选中值
//     filterSelectedValue(val) {
//       if (!val.length || !this.optionData.length)
//         return this.multiple ? [this.allValue] : [];
//       if (val[val.length - 1] === this.allValue) return val;
//       // 暂存所有子数据项value，优化搜索最大时间复杂度O(n3)
//       const dataValues = [];
//       if (this.group) {
//         // 分组模式
//         // 降维
//         this.optionData.forEach(group => {
//           const children = group[this.groupChildAttr];
//           children.forEach(item => {
//             // 兼容选中 id = 0
//             if (item[this.valueAttr] || item[this.valueAttr] === 0) {
//               dataValues.push(item[this.valueAttr]);
//             }
//           });
//         });
//       } else {
//         // 不分组模式
//         this.optionData.forEach(item => {
//           // 兼容选中 id = 0
//           if (item[this.valueAttr] || item[this.valueAttr] === 0) {
//             dataValues.push(item[this.valueAttr]);
//           }
//         });
//       }
//       // 过滤
//       return (
//         val.filter(item => {
//           return dataValues.includes(item);
//         }) || []
//       );
//     },
//     // 点击标题区域触发
//     handleTitleClick() {
//       // 打开下拉框
//       // this.$refs.select.$el.click();
//       // console.log(this.httpConfig_)
//       // // 请求列表数据
//       // if (this.httpConfig_.trigger === 'click') {
//       //   this.httpRequest()
//       // }
//     },
//     // 选中下拉列表值触发
//     onSelectChange(val) {
//       if (this.multiple) {
//         this.setSelected(val);
//         this.selected =
//           !this.selected.length ||
//           this.selected[0] === "all" ||
//           this.selected[this.selected.length - 1] === ""
//             ? []
//             : this.selected;
//       } else {
//         this.selected = [val];
//         this.setSelectedTitle(this.selected);
//       }
//       this.$emit("change", this.selected);
//     },
//     // 下拉框出现/隐藏时触发
//     onVisibleChange(isVisible) {
//       // input聚焦
//       this.propverVisible = !this.propverVisible;
//       if (!this.propverVisible) {
//         this.filterString = "";
//         // 选中为空的场景 标题部分为全部
//         if (!this.selected.length) {
//           this.setSelected(["all"]);
//         }
//       }
//     },
//     // 选中数据项时执行
//     setSelected(val) {
//       // 全选操作
//       if (this.multiple && this.isHandleAll(val)) {
//         this.selected = [this.allValue];
//       }
//       // 非全选操作移除全部
//       if (this.multiple && this.isHandleItem(val)) {
//         this.selected.splice(0, 1);
//       }
//       // text 模式动态改变 select-title 区域选中项内容
//       if (this.mode === this.options.textMode) {
//         this.setSelectedTitle(this.selected);
//       }
//     },
//     isHandleAll(val) {
//       return val && val[val.length - 1] === this.allValue;
//     },
//     isHandleItem(val) {
//       return val && val[0] === this.allValue && val.length > 1;
//     },
//     // 显示选中项内容
//     setSelectedTitle(val) {
//       const label = this.selectedLabel ? `${this.selectedLabel}: ` : "";
//       // 多选模式
//       if (Array.isArray(val) && this.selected.length) {
//         this.title = this.searchLabels(val).join(", ");
//       } else {
//         this.title = this.searchLabels([val]).join(", ");
//       }
//       // 选中项内容
//       this.selectedTitle = label + (this.title || this.defaultTitle_);
//     },
//     // 遍历原始数据, 由选中的 value 查找选中项 label（注：遍历过程中需要注意选中顺序，以队列方式查找）
//     searchLabels(values) {
//       const labels = [];
//       if (!values.length) return labels;
//       if (values[0] === this.allValue) return [this.allLabel];
//       if (this.group) {
//         // 分组模式
//         this.optionData.forEach(group => {
//           const children = group[this.groupChildAttr];
//           children.forEach(item => {
//             const indexOf = values.indexOf(item[this.valueAttr]);
//             if (indexOf !== -1) {
//               // 模拟队列 保证选中项 label 在页面的显示顺序
//               labels[indexOf] = item[this.labelAttr];
//             }
//           });
//         });
//         // 数组去假值 (弊端：0 也会被过滤)
//         return labels.filter(Boolean);
//       } else {
//         // 不分组模式
//         this.optionData.forEach(item => {
//           const indexOf = values.indexOf(item[this.valueAttr]);
//           if (indexOf !== -1) {
//             // 模拟队列 保证选中项 label 在页面的显示顺序
//             labels[indexOf] = item[this.labelAttr];
//           }
//         });
//         return labels;
//       }
//     },
//     /**
//      * @title 前端过滤算法
//      * 分组过滤：从树 groupChildAttr 子节点的 labelAttr 属性中 过滤所有包含 val 的数据项
//      * 不分组过滤：从数组 labelAttr 属性中 过滤所有包含 val 的数据项
//      */
//     filterData(source, val) {
//       // 过滤逻辑
//       const filteredList = [];
//       if (this.group) {
//         // 分组过滤
//         source.forEach((group, i) => {
//           const children = group[this.groupChildAttr];
//           if (children) {
//             const nGroup = this._deepClone(group);
//             nGroup[this.groupChildAttr] = [];
//             filteredList.push(nGroup);
//           }
//           children.forEach((item, j) => {
//             if (item[this.labelAttr] && item[this.labelAttr].includes(val)) {
//               filteredList[i][this.groupChildAttr].push(item);
//             }
//           });
//         });
//         // 剔除子树中列表为空的数据项 避免界面只显示分组的组名 但是没有数据项
//         const noEmptyList = [];
//         filteredList.forEach((item, index) => {
//           if (item[this.groupChildAttr].length) {
//             noEmptyList.push(item);
//           }
//         });
//         return noEmptyList;
//       } else {
//         // 不分组过滤
//         source.forEach((item, i) => {
//           if (item[this.labelAttr] && item[this.labelAttr].includes(val)) {
//             filteredList.push(item);
//           }
//         });
//         return filteredList;
//       }
//     },
//     // 深拷贝
//     _deepClone(source) {
//       if (!source && typeof source !== "object") {
//         throw new Error("error arguments", "shallowClone");
//       }
//       const targetObj = source.constructor === Array ? [] : {};
//       Object.keys(source).forEach(keys => {
//         if (source[keys] && typeof source[keys] === "object") {
//           targetObj[keys] = source[keys].constructor === Array ? [] : {};
//           targetObj[keys] = this._deepClone(source[keys]);
//         } else {
//           targetObj[keys] = source[keys];
//         }
//       });
//       return targetObj;
//     }
//   }
// };
</script>

 <style lang="scss" scoped>
// @import "src/styles/variables";
// @mixin ellipsis {
//   overflow: hidden !important;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
// .select-scroll {
//   margin-top: 6px;
//   height: 180px;
//   overflow: auto;
// }
// .select-wrap {
//   position: relative;
//   display: inline-block;
//   line-height: 0;
//   vertical-align: middle;
// }
// .icon-arrow-down__cancel {
//   right: 25px !important;
// }
// .icon-arrow-down__canClearAll {
//   right: 5px !important;
// }
// .icon-arrow-close__canClearAll {
//   right: 22px !important;
// }
// .pr24 {
//   padding-right: 24px !important;
// }
// @mixin active {
//   color: $--color-primary;
//   border: 1px solid $--color-primary;
//   background: $--color-primary-light-9;
//   .el-icon-close {
//     color: $--color-primary;
//     border: 1px solid $--color-primary;
//     background: $--color-primary-light-9;
//   }
// }
// .select-title {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 10px;
//   border-radius: 3px;
//   box-sizing: border-box;
//   height: 30px;
//   line-height: 28px;
//   transition: all 0.2s;
//   cursor: pointer;
//   border: 1px solid transparent;
//   &:hover {
//     @include active;
//   }
//   .content {
//     @include ellipsis;
//     line-height: 1;
//   }
//   .el-icon-close {
//     border-radius: 50%;
//     background-color: #999;
//     border: 1px solid #999;
//     color: #fff;
//     padding: 2px;
//     transform: scale(0.7);
//   }
// }
// .search-input {
//   padding: 0 10px;
// }
// .select-title__icon {
//   margin-left: 10px;
// }
// .select-title__active {
//   @include active;
// }
// .el-select-dropdown__item {
//   padding-right: 20px !important;
// }
// /deep/ .el-select-wrap {
//   position: absolute;
//   top: 0;
//   visibility: hidden;
//   width: 0;
//   .el-select__tags {
//     display: none;
//     background-color: transparent;
//   }
// }
// .block {
//   display: block;
// }
</style>
