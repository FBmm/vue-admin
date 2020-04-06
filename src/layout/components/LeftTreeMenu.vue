<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      :default-active="leftMenus[0].name"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
    >
      <el-menu-item v-for="item in leftMenus" :key="item.name" :index="item.name">
          <template v-slot:title>
            <router-link :to="item.route">{{item.title}}</router-link>
          </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
import menus from "@/config/menu";
import variables from "@/styles/variables.scss";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    variables() {
      
      return variables;
    },
    // 当前主导航对应的左树菜单
    leftMenus() {
      const leftMenus = menus.filter((item) => {
        return this.$route.path.includes(item.name);
      });
      return leftMenus[0].children;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>