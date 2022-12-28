<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

export default {
  name: "Home"
}
</script>

<style scoped>
.el-header {
  background-color: #374d41;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #aeedf1;
}

.common-layout {
  height: 100%;
}
.el-container {
  height: 100%;
}

</style>