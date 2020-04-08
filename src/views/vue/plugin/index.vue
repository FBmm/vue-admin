<template>
  <div class="vue-container">
    <el-row>
      <h3>插件</h3>
      <p>1. Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象</p>
      <pre>
        const MyPlugin = function (Vue, options) {

          // 在 vue 实例上扩展

        }
      </pre>
      <p>2. 通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成</p>
      <pre>
        // 调用 `MyPlugin.install(Vue)`

        Vue.use(MyPlugin)
      </pre>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style>
</style>