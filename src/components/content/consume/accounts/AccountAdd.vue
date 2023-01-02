<template>
  <el-drawer
      ref="drawerRef"
      v-model="subDialog"
      title="来记一笔"
      direction="rtl"
      class="demo-drawer"
      :close-on-press-escape="true"
      :close-on-click-modal="true"
  >
      <div class="demo-drawer__content">
          <!--      表单-->
          <el-form :model="accountFrom" label-position="left" label-width="50px" size="large">
<!--            类别-->
            <el-form-item label="类别">
              <el-popover
                  placement="right"
                  width="400"
                  trigger="click">
                <template #reference>
                  <icon-item :icon-file-name="selectIcon.logoName" :back-color="selectIconBackColor"></icon-item>
                </template>
              </el-popover>
              <el-link type="primary" @click="innerDrawer = true">类别管理</el-link>
              <category-edit v-model="innerDrawer"></category-edit>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="accountFrom.mask" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                  v-model="accountFrom.accountDate"
                  type="date"
                  placeholder="Pick a month"
                  format="YYYY/MM"
                  value-format="YYYY-MM"
              />
            </el-form-item>
            <el-form-item label="金额">
              <el-input-number v-model="accountFrom.mount" :precision="2" :step="1" autocomplete="off" :min="1.00"/>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button type="primary" :loading="loading" @click="">确定</el-button>
          </div>
        </div>
  </el-drawer>
</template>

<script>

import {
  Plus,
  CirclePlusFilled,
  Check,
  Edit
} from '@element-plus/icons-vue'

import {devServer} from "@/network/requests";
import {toRaw} from "vue";


import CategoryEdit from "@/components/content/consume/accounts/CategoryEdit.vue";
import IconItem from "@/components/SvgIcon/IconItem.vue";

export default {
  name: "AccountAdd",
  data(){
    return {
      selectIconBackColor: '#fca60b',
      isSelected: false,
      selectIcon: {
        logoName: "canyin",
        title: "餐饮"
      },
      Edit,
      loading: false,
      subDialog: this.dialog,
      innerDrawer: false,
      accountFrom: {
        type: "",
        mask: "",
        accountDate: new Date(),
        mount: ""
      },
    }
  },
  model: {
    prop: 'dialog',
    event: 'input'
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dialog(new_value){
      this.subDialog = new_value
    },
    subDialog(new_value){
      this.$emit('input',new_value)

    }
  },
  methods: {
  },
  components: {
    IconItem,
    CategoryEdit
  }

}
</script>

<style scoped>
.demo-drawer__content .accountEditBtn{
  margin-left: 10px;
}

.isSelected {
  background-color: #deb15e;
}


</style>