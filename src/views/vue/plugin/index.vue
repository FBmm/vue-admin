<template>
  <div class="vue-container">
    <el-row>
      <h3>1. 自定义指令 v-focus</h3>
      <input type="text" v-focus>
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