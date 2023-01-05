<template>
  <el-drawer
      v-model="subInnerDrawer"
      title="类别管理"
      :append-to-body="true"
      :open="getIconListByType(activeTypeCode)"
  >
    <el-space
        fill
        wrap
        :fill-ratio="fillRatio"
        :direction="direction"
        style="width: 100%"
    >
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>类别设置</span>
          </div>
        </template>
<!--        支出-->
        <el-tabs v-model="activeType" class="demo-tabs" @tabChange="getIconListByType(activeTypeCode)">
          <el-tab-pane label="支出" name="pay">
            <icon-item v-for="(item,index) in activeIcons" :icon-file-name="item.logoName" :icon-title="item.title" :key="index" backColor="#fca60b">
              <template #top-right-btn>
                <el-popconfirm
                    width="220"
                    confirm-button-text="OK"
                    cancel-button-text="No"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="删除类别会同时删除该类别下的所有记账"
                    @confirm="removeItem(activeIcons,index)"
                >
                  <template #reference>
                    <el-icon class="removeBtn" size="17px"><RemoveFilled /></el-icon>
                  </template>
                </el-popconfirm>
              </template>
            </icon-item>
              <icon-item :icon-file-name="plusIcon.logoName" :key="-1" @click="getDefaultIcons"></icon-item>
          </el-tab-pane>
<!--          收入-->
          <el-tab-pane label="收入" name="income">
            <icon-item v-for="(item,index) in activeIcons" :icon-file-name="item.logoName" :icon-title="item.title"  :key="index" backColor="#fca60b">
              <template #top-right-btn>
                <el-popconfirm
                    width="220"
                    confirm-button-text="OK"
                    cancel-button-text="No"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="删除类别会同时删除该类别下的所有记账"
                    @confirm="removeItem(activeIcons,index)"
                >
                  <template #reference>
                    <el-icon class="removeBtn" size="17px"><RemoveFilled /></el-icon>
                  </template>
                </el-popconfirm>
              </template>
            </icon-item>
            <icon-item :icon-file-name="plusIcon.logoName" :index="-1" :key="-1" @click="getDefaultIcons"></icon-item>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <el-card class="box-card" v-if="showAddCategory" >
        <template #header>
          <div class="card-header">
            <span>新增类别</span>
          </div>
        </template>
        <el-tabs v-model="activeIconName" class="demo-tabs">
          <el-tab-pane v-for="category in defaultIcons" :label="category.label" :name="category.label">
            <icon-item v-for="(item,index) in category.icons" :icon-file-name="item"  :key="index">
              <template #top-right-btn>
                <el-icon class="addBtn" size="17px" @click="saveCategory(item,category.code)"><CirclePlusFilled /></el-icon>
              </template>
            </icon-item>
          </el-tab-pane>
        </el-tabs>

      </el-card>
    </el-space>
  </el-drawer>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/index.vue";
import IconItem from "@/components/SvgIcon/IconItem.vue";
import { RemoveFilled,CirclePlusFilled } from '@element-plus/icons-vue'
import {devServer} from "@/network/requests";

export default {
  name: "CategoryEdit",
  components: {IconItem, SvgIcon},
  data(){
    return {
      showAddCategory: false,
      activeType: "pay",
      activeIconName: "",
      subInnerDrawer: this.innerDrawer,
      activeIcons: [],
      plusIcon: {
        logoName: "plus",
        title: "自定义"
      },
      // 默认的图标
      defaultIcons: {}
    }
  },
  methods: {
    removeItem(items,index){
      //后端删除
      let item = items[index];
      this.removeIcon(item.id)
      //前端删除
      items.splice(index,1);
    },
    saveCategory(iconName,code) {
      this.$prompt('请输入自定义类别名称(不超过4个汉字)', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '类别名称不符合要求',
        draggable: true,
        customStyle: {
          position: "absolute",
          top: '40%',
          right: '10%',
          width: '300px',

        }
      }).then((title) => {
        //添加按钮
        const newIcon = {logoName: iconName,title:title.value}
        this.activeIcons.push(newIcon)
        this.saveIcon(title,code,iconName)
      }).catch((error) => {
        console.log(error);
      });
    },
    saveIcon(title, code, iconName){
      //后端添加按钮
      devServer({
        url: '/accounts/logo/save',
        method: 'post',
        data: {
          title: title.value,
          type: this.activeType === 'pay' ? 0:1,
          category: code,
          logoName: iconName,
          isCustom: 1
        }
      })
    },
    removeIcon(iconId){
      devServer({
        url: '/accounts/logo/'+ iconId,
        method: 'delete'
      })
    },
    getDefaultIcons(){
      this.showAddCategory = true;
      devServer({
        url: '/accounts/logo/getAllCategory'
      }).then(res => {
        let allfiles = require.context("@/assets/icons/svg/",true,/\.svg$/).keys();
        //构建key
        for(let item of res.data){
          this.defaultIcons[item.name] = { label: item.title,icons: [],code: item.code}
        }
        //构建icons
        for(let filepath of allfiles){
          let i = filepath.lastIndexOf("/");
          let name = filepath.substring(2,i); //目录名
          let filename = filepath.substring(i+1,filepath.lastIndexOf("\.svg"))  //svg的filename
          let config = this.defaultIcons[name];
          if(typeof config !== 'undefined'){
            config.icons.push(filename)
          }
        }
        this.activeIconName = res.data[0].title
      })

    },
    getIconListByType(type){
      devServer({
        url: '/accounts/logo/list',
        method: 'post',
        data: {
          type: type
        }
      }).then(res => {
        this.activeIcons = res.data
      })
    }
  },
  model: {
    prop: 'innerDrawer',
    event: 'input'
  },
  props: {
    innerDrawer: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    innerDrawer(new_value){
      this.subInnerDrawer = new_value
    },
    subInnerDrawer(new_value){
      this.$emit('input',new_value)

    },

  },
  computed: {
    activeTypeCode(){
      return this.activeType === 'pay' ? 0:1
    }
  }
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.icon-item .el-icon {
  position: absolute;
  right: 0px;
  border-radius: 50%;
  background-color: #dddddd;
}

.icon-item .removeBtn:hover{
  color: #db2c13;
}

.icon-item .addBtn:hover{
  color: #42b983;
}


</style>