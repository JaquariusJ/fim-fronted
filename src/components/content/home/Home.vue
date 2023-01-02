<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <home-header></home-header>
      </el-header>

      <el-container>
        <el-aside :width="isCollapsed ? '100px':'200px'">
          <home-menu :isCollapse="isCollapsed">
              <home-menu-item index="1">
                  <template #item-icon>
                    <coordinate />
                  </template>
                  <template #item-title>
                      消费
                  </template>
                  <template #sub-item>
                      <home-menu-sub-item index="1-1" path="/reports">
                          <template #sub-item-icon>
                            <pie-chart />
                          </template>
                          <template #sub-item-title>
                            消费统计
                          </template>
                      </home-menu-sub-item>
                      <home-menu-sub-item index="1-2" path="/accounts">
                          <template #sub-item-icon>
                              <notebook />
                          </template>
                          <template #sub-item-title>
                            记账本
                          </template>
                    </home-menu-sub-item>
                  </template>
              </home-menu-item>
            <home-menu-item index="2">
              <template #item-icon>
                <coordinate />
              </template>
              <template #item-title>
                投资
              </template>
              <template #sub-item>
                    <home-menu-sub-item index="2-1">
                      <template #sub-item-icon>
                        <pie-chart />
                      </template>
                      <template #sub-item-title>
                        投资计划
                      </template>
                    </home-menu-sub-item>
              </template>
            </home-menu-item>
          </home-menu>
        </el-aside>
        <div class="toggle-button" @click="toggleCollapse">
          <el-icon>
              <arrow-left v-if="!isCollapsed" size="20px"/>
              <arrow-right v-else size="20px"/>
          </el-icon>
        </div>
        <el-main>
          <router-view></router-view>
        </el-main>
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
    ArrowLeft,
    ArrowRight
} from '@element-plus/icons-vue'
import HomeHeader from "@/components/content/home/HomeHeader.vue";

import HomeMenu from "@/components/content/home/menu/HomeMenu.vue";
import HomeMenuItem from "@/components/content/home/menu/HomeMenuItem.vue";
import HomeMenuSubItem from "@/components/content/home/menu/HomeMenuSubItem.vue";


export default {
  name: "Home",
  data(){
    return {
      asideWidth: "200px",
      isCollapsed: false
    }
  },
  components: {
    HomeMenu,
    HomeMenuItem,
    HomeMenuSubItem,
    HomeHeader
  },
  methods: {
    //折叠与展开
    toggleCollapse(){
      this.isCollapsed = ! this.isCollapsed
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #545c64;
  border-bottom: 1px solid #313131;
  padding: 0px;
}
.el-aside {
  background-color: #333744;
  height: 100%;


}
.el-main {
  background-color: #ffffff;
}

.common-layout {
  height: 100%;
}
.el-container {
  height: 100%;
}
.toggle-button {
  background-color: #333744;
  color: #dddddd;
  width: 10px;

}
.toggle-button .el-icon{
  top: 50%;
  background-color: #333744;
  border-radius: 50%;
  height: 20px;
  width: 20px;
}

</style>