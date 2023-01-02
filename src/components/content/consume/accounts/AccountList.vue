<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">消费</el-breadcrumb-item>
    <el-breadcrumb-item>记账本</el-breadcrumb-item>
  </el-breadcrumb>


  <el-row :gutter="20">
    <el-col :span="6">
      <div class="demo-date-picker">
        <div class="container">
          <div class="block">
            <span class="demonstration">日期</span>
            <el-date-picker
                v-model="value2"
                type="date"
                placeholder="Pick a month"
                format="YYYY/MM"
                value-format="YYYY-MM"
            />
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="demo-date-picker">
        <div class="container">
          <div class="block">
            <span class="demonstration">收入</span>
            <div>200.00</div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="demo-date-picker">
        <div class="container">
          <div class="block">
            <span class="demonstration">支出</span>
            <div>200.00</div>
          </div>
        </div>
      </div>
    </el-col>

    <el-col :span="6">
      <div class="demo-date-picker">
        <div class="container">
          <div class="block">
            <el-button class="addAccount" type="success" plain @click="changeDialog" color="#00a2ff" >点我记账</el-button>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>

  <el-timeline>
    <el-timeline-item timestamp="2018/4/12" placement="top">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>

  <!--    添加输入框-->
  <account-add v-model="dialog"></account-add>
</template>

<script>
import {
  Plus,
  CirclePlusFilled,
  Check,
  Edit
} from '@element-plus/icons-vue'

import AccountAdd from "@/components/content/consume/accounts/AccountAdd.vue";
import {devServer} from "@/network/requests";

export default {
  name: "KeepAccount",
  data(){
    return {
      Edit,
      value1: "",
      value2: "",
      table: false,
      dialog: false,
    }
  },
  components: {
    AccountAdd
  },
  methods: {
    changeDialog(){
      this.dialog = true;
    }

  }
}
</script>

<style scoped>

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .container {
  flex: 1;
  border-right: solid 1px var(--el-border-color);
}
.demo-date-picker .container .block {
  border-right: none;
}
.demo-date-picker .container .block:last-child {
  border-top: solid 1px var(--el-border-color);
}
.demo-date-picker .container:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 20px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 20px;
}

.block .el-button {
  width: 300px;
  height: 60px;
  box-shadow: 10px 10px 10px;

}



</style>