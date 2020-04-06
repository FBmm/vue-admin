<template>
  <div class="vue-container" style="height: 1000px;">
    <el-row>
      <h3>1. 自定义指令 v-focus</h3>
      <input type="text" v-focus>
    </el-row>
    <el-row>
      <h3>2. 自定义指令钩子函数及参数 F12查看 v-directive-hook</h3>
      <input type="text" v-directive-hook>
    </el-row>
    <el-row>
      <h3>3. bind函数参数测试 v-bind-attr</h3>
      <div v-bind-attr></div>
    </el-row>
    <el-row>
      <h3>4. 动态指令测试 v-dynamic-directive</h3>
      <div v-dynamic-directive = 'value'></div>
    </el-row>
    <el-row>
      <h3>5. 动态指令参数 v-pin</h3>
      <div>
        <p>Scroll down the page</p>
        <p v-pin="560">这是固定在页面的内容</p>
      </div>
    </el-row>
    <el-row>
      <h3>6. 动态指令参数 v-arg-pin</h3>
      <div>
        <p>Scroll down the page</p>
        <p v-arg-pin:[direction]="500">这是固定在页面的内容-带方向参数</p>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '这是vm.data的值',
      direction: 'left'
    }
  }
}
</script>

<style>
</style>