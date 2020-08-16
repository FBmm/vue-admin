<template>
  <div>
    <div class="content" v-drag="v"></div>
    
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Drag',
  components: {},
  data() {
    return {
      v: 1,
      dialogVisible: false,
    }
  },
  computed: {},
  created(){
    setTimeout(() => {
      this.v = 2;
    }, 10);
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  width: 200px;
  height: 100px;
  border: 1px solid #ccc;
  position: fixed;
  left: 500px;
}
</style>