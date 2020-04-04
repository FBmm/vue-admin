<template>
  <div class="vue-container">
    <el-row>
      <h3>1. 自定义指令 v-focus</h3>
      <input type="text" v-focus>
    </el-row>
    <el-row>
      <h3>2. 自定义指令钩子函数及参数 F12查看 directive-hook</h3>
      <input type="text" v-directive-hook>
    </el-row>
    <el-row>
      <h3>3. bind函数参数测试 bind-attr</h3>
      <div v-bind-attr></div>
    </el-row>
    <el-row>
      <h3>4. 动态指令测试 dynamic-directive</h3>
      <div v-dynamic-directive = 'value'></div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
    }
  }
}
</script>

<style>

</style>