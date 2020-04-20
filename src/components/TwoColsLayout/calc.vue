<template>
  <div class="two-cols-layout">
    <div class="col__left" v-if="colLeftExpanded">
      <slot name="left"></slot>
    </div>
    <div class="division_middle">
      <div class="switch-btn" @click="toggleCol"></div>
    </div>
    <div class="col__right" :style="{'width': colRightWidth}">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
/**
* @title 两栏布局 calc 版
* @des 使用 width: calc(100vh - [左边宽度]) 实现
*
* 功能：
*   1. 左边定宽、右边自适应布局
*   2. 左边定宽、右边自适应布局
*/
export default {
  name: 'TwoColsLayoutCalc',
  data() {
    return {
      colLeftExpanded: true,
    }
  },
  computed: {
    colRightWidth() {
      return this.colLeftExpanded ? 'calc(100% - 240px - 10px)' : 'calc(100% - 10px)';
    }
  },
  methods: {
    toggleCol() {
      this.colLeftExpanded = !this.colLeftExpanded;
    }
  }
}
</script>

<style lang="scss" scoped>
.two-cols-layout {
  height: calc(100vh - 61px);
  .col__left {
    height: 100%;
    width: 240px;
    float: left;
    background-color: #333;
  }
  .division_middle {
    height: 100%;
    background-color: #f2f2f2;
    width: 10px;
    float: left;
    .switch-btn {
      position: absolute;
      top: 50%;
      margin-top: -10px;
      width: 10px;
      height: 20px;
      background-color: red;
    }
  }
  .col__right {
    width: calc(100% - 240px - 10px);
    height: 100%;
    float: right;
    background-color: #666;
  }
}
</style>