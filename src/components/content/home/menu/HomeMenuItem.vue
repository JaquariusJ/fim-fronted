<template>
  <el-sub-menu :index="index">
    <template #title>
      <el-icon>
        <slot name="item-icon"></slot>
      </el-icon>
      <slot name="item-title"></slot>
    </template>
    <slot name="sub-item"></slot>
  </el-sub-menu>
</template>

<script>
export default {
  name: "HomeMenuItem",
  components: {
  },
  props: {
    index: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>