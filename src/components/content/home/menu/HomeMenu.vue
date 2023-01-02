<template>
  <el-menu
      default-active="1-2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      text-color="#ffffff"
      background-color="#333744"
      unique-opened="true"
      :collapse-transition="false"
  >
    <slot></slot>
  </el-menu>
</template>

<script>
export default {
  name: "HomeMenu",
  data(){
    return {
    }
  },
  props: {
    isCollapse: Boolean
  }
}
</script>

<style scoped>
.el-menu {
  border-right: none
}

</style>