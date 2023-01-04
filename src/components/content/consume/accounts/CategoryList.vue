<template>
  <el-tabs v-model="activeType" class="demo-tabs" @tabChange="getIconListByType(activeTypeCode)">
    <el-tab-pane v-for="type in allTypes" :label="type.alias" :name="type.name" :key="type.code">
      <icon-item v-for="(item,index) in activeIcons" :icon-file-name="item.logoName" :icon-title="item.title" :key="index"
                 :back-color="item.id === selectIcon.id?selectIconBgColor:''"
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
  created() {
    this.getALLTypes();
    this.getIconListByType(this.activeTypeCode);
  },
  data(){
    return {
      activeType: "",
      activeIcons: [],
      selectIcon: this.showIcon,
      selectIconBgColor: '#fca60b',
      allTypes: [],
      plusIcon: {
        logoName: "plus",
        title: "自定义"
      },
    }
  },
  methods: {
    //根据类型获取所有的图标
    getIconListByType(type){
      devServer({
        url: '/accounts/logo/list',
        method: 'post',
        data: {
          type: type
        }
      }).then(res => {
        this.activeIcons = res.data
        // if(this.activeIcons.length>0){
        //   this.selectIcon = this.activeIcons[0]
        // }
      })
    },
    // 获取所有的类型，支出或者收入
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
      this.$emit("showicon",newItem)
    },
    showIcon(newItem){
      this.selectIcon = this.showIcon
      this.activeType = this.showIcon.type === 0 ? 'pay':'income'
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
    },
    showIcon: Object
  }
}
</script>

<style scoped>

</style>