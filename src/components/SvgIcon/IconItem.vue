<template>
  <div class="icon-item">
    <slot name="top-right-btn"></slot>
    <svg-icon class="icon-svg" :icon-file-name="iconFileName" :style="{'backgroundColor': backColor}"></svg-icon>
    <div v-if="iconTitle !== ''" class="icon-title">{{iconTitle}}</div>
  </div>
</template>

<script>
export default {
  name: "iconItem",
  props: {
    iconFileName: {
      type: String,
      required: true
    },
    iconTitle: {
      type: String,
      default: ''
    },
    backColor: {
      type: String
    }
  },
  methods: {
  }

}
</script>

<style scoped>

.icon-item {
  position: relative;
  width: 50px;
  height: 70px;
  text-align: center;
  float: left;
  margin: 5px;
}


.icon-title {
  font-size: 10px;
}


</style>