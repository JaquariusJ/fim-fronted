<template>
  <el-drawer
      ref="drawerRef"
      v-model="subDialog"
      title="来记一笔"
      direction="rtl"
      class="demo-drawer"
      :close-on-press-escape="true"
      :close-on-click-modal="true"
      @close="closeDrawer"
  >
      <div class="demo-drawer__content">
          <!--      表单-->
          <el-form :model="accountFrom" label-position="left" label-width="50px" size="large">
<!--            类别-->
            <el-form-item label="类别">

              <!-- 点击图标显示所有图标-->
              <el-popover
                  placement="right"
                  width="400"
                  trigger="click"
                  hide-after="100"
                  v-model:visible="evaluateVisible"
                  v-model="accountFrom.logoid"
              >
                <template #reference>
                  <icon-item :icon-file-name="showIcon.logoName" back-color="#fca60b"></icon-item>
                </template>

                <category-list @showicon="showSelectIcon" @closePopover="closePopover" v-model:showIcon="showIcon"></category-list>
              </el-popover>

              <el-link type="primary" @click="innerDrawer = true">类别管理</el-link>
<!-- 类别编辑的组件-->
              <category-edit v-model="innerDrawer"></category-edit>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="accountFrom.mask" autocomplete="off"/>
            </el-form-item>

            <el-form-item label="日期">
              <el-date-picker
                  v-model="accountFrom.accountDate"
                  type="date"
                  placeholder="Pick a date"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                  :default-value="new Date().toLocaleDateString()"
              />
            </el-form-item>
            <el-form-item label="金额">
              <el-input-number v-model="accountFrom.mount" :precision="2" :step="1" autocomplete="off" :min="1.00"/>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button type="primary" :loading="loading" @click="confirmAccount">确定</el-button>
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
import {success} from "@/common/utils/alert";


import CategoryEdit from "@/components/content/consume/accounts/CategoryEdit.vue";
import IconItem from "@/components/SvgIcon/IconItem.vue";
import CategoryList from "@/components/content/consume/accounts/CategoryList.vue";

export default {
  name: "AccountAdd",
  data(){
    return {
      selectIconBackColor: '#fca60b',
      isSelected: false,
      evaluateVisible: false,
      showIcon: {
        logoName: "canyin",
        title: "餐饮"
      },
      Edit,
      loading: false,
      innerDrawer: false,
      accountFrom: {
        logoid: "",
        mask: this.account,
        accountDate: this.account.accountDate,
        mount: this.account.mount
      },
    }
  },
  props: {
    dialog: {
      type: Boolean
    },
    account: Object,
    isNewCreate: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    //监听传进来的消费账单
    account(val){
          this.accountFrom = {
            logoid: this.account.accountLogo.id,
            mask: this.account.mask,
            accountDate: this.account.accountDate,
            mount: this.account.mount
          };
          this.showIcon = this.account.accountLogo
      }
  },
  methods: {
    showSelectIcon(item){
      this.showIcon = item
      this.accountFrom.logoid = this.showIcon.id
    },
    closePopover(newValue){
      this.evaluateVisible = newValue
    },
    closeDrawer(){
      this.$emit('update:dialog',false)
    },
    confirmAccount(){
      devServer({
        url: '/accounts/save',
        method: 'post',
        data: this.accountFrom
      }).then(res => {
        if(res.code === 200){
          success("添加成功！")
        }
      });
      this.$refs.drawerRef.close()

    }
  },
  components: {
    CategoryList,
    IconItem,
    CategoryEdit
  },
  computed: {
    subDialog() {
      return this.dialog},
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