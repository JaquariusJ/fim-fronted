<template>
  <div class="wave-group">
    <input required="" :type="inputType" class="input" @input="sendValue">
    <span class="bar"></span>
    <label class="label">
      <span class="label-char" :style="'--index:'+index" v-for="(item,index) in titleArray">{{item}}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    title: String,
    inputValue: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    sendValue(event){
      this.$emit('update:inputValue',event.target.value)
    }
  },
  computed: {
    titleArray(){
      const arr = []
      for (let i = 0; i < this.title.length; i++) {
        arr.push(this.title[i])
      }
      return arr;
    }
  },
}
</script>

<style scoped>

@import "@/assets/css/login/loginInput.css";

</style>