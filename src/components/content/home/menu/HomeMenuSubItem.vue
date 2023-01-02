<template>
  <el-menu-item :index="index" @click="toPage">
    <el-icon>
      <slot name="sub-item-icon"></slot>
    </el-icon>
    <template #title>
      <slot name="sub-item-title"></slot>
    </template>
  </el-menu-item>
</template>

<script>

export default {
  name: "HomeMenuSubItem",
  props: {
    path: String,
    index: {
      type: String,
      required: true
    }
  },
  methods: {
    toPage(){
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>

</style>