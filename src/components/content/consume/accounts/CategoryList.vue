<template>
  <el-tabs v-model="activeType" class="demo-tabs" @tabChange="getIconListByType(activeTypeCode)">
    <el-tab-pane v-for="type in allTypes" :label="type.alias" :name="type.name" :key="type.code">
      <icon-item v-for="(item,index) in activeIcons" :icon-file-name="item.logoName" :icon-title="item.title" :key="index"
                 :back-color="item === selectIcon?selectIconBgColor:''"
                 @click="positionIcon(item)"
      ></icon-item>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {devServer} from "@/network/requests";
import IconItem from "@/components/SvgIcon/IconItem.vue";

export default {
  name: "CategoryList",
  components: {IconItem},
  mounted() {

    this.getALLTypes();
    this.getIconListByType(this.activeTypeCode);
  },
  data(){
    return {
      activeType: "",
      activeIcons: [],
      selectIcon: '',
      selectIconBgColor: '#fca60b',
      subEvaluateVisible: this.evaluateVisible,
      allTypes: [],
      plusIcon: {
        logoName: "plus",
        title: "自定义"
      },
    }
  },
  methods: {
    getIconListByType(type){
      devServer({
        url: '/accounts/logo/list',
        method: 'post',
        data: {
          type: type
        }
      }).then(res => {
        this.activeIcons = res.data
        if(this.activeIcons.length>0){
          this.selectIcon = this.activeIcons[0]
        }
      })
    },
    getALLTypes(){
      devServer({
        url: '/accounts/logo/getAllType',
        method: 'get',
      }).then(res => {
        this.allTypes = res.data
        if(this.allTypes.length>0){
          this.activeType = this.allTypes[0].name
        }
      })
    },
    positionIcon(item){
      this.selectIcon = item;
    },
  },
  watch: {
    selectIcon(newItem){
      console.log(this.subEvaluateVisible);
      this.$emit("showicon",newItem)
    },
    subEvaluateVisible(newValue){
      this.$emit("closePopover",newValue)
    }
  },
  computed: {
    activeTypeCode(){
      return this.activeType === 'pay' ? 0:1
    }
  },
  props: {
    evaluateVisible: {
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>