<template>
  <div class="card">
    <el-breadcrumb separator="/">
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
              <div>{{ totalPay }}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="demo-date-picker">
          <div class="container">
            <div class="block">
              <span class="demonstration">支出</span>
              <div>{{totalIncome}}</div>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="demo-date-picker">
          <div class="container">
            <div class="block">
              <el-button class="addAccount" type="success" plain @click="changeDialog(true)" @closeDrawer="changeDialog" color="#00a2ff" >点我记账</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-timeline>
      <el-timeline-item v-for="(accounts,accountDate) in accountDetails" :timestamp="accountDate+' ' + dateUtils.getCHDayName(accountDate)" placement="top">
        <el-card>
<!--          每一行消费记录-->
          <el-row :gutter="0" v-for="item in accounts"  @click="openAccount(item)">
            <el-col :span="5">
              <div>
                <icon-item :icon-file-name="item.accountLogo.logoName" :back-color="item.accountLogo.type === 0?subShowColor:addShowColor"></icon-item>
                {{item.accountLogo.title}}
                ----{{item.mask}}
              </div>
            </el-col>
            <el-col :span="15">
            </el-col>
            <el-col :span="3">
              <span class="mount" v-if="item.accountLogo.type === 0" >-</span>
              <span class="mount" v-else >+</span>
              <span class="mount">{{item.mount}} </span>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <!--    记账表单-->
    <account-add v-model:dialog="dialog" v-model:account="activeAccount"></account-add>
  </div>

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
import IconItem from "@/components/SvgIcon/IconItem.vue";
import {getGroupArray,getGroupObject} from "@/common/utils/group";
import {dateUtils} from "@/common/utils/date";

export default {
  name: "AccountList",
  computed: {
    dateUtils() {
      return dateUtils
    },
    acccounts(){
      const pays = [];
      const map = new Map(Object.entries(this.accountDetails))
      for (const items of map.values()){
        items.forEach(e => pays.push(e))
      }
      return pays
    },
    totalPay(){
      let payArr = this.acccounts.filter(e => e.accountLogo.type === 0);
      if(payArr.length === 0){
        return 0
      }
      return payArr.map(n => Number(n.mount)).reduce((n1,n2) =>  n1+n2).toFixed(2);
    },
    totalIncome(){
      let payArr = this.acccounts.filter(e => e.accountLogo.type === 1);
      if(payArr.length === 0){
        return 0
      }
      return payArr.map(n => Number(n.mount)).reduce((n1,n2) =>  n1+n2).toFixed(2);
    }
  },
  created() {
    devServer({
      url: '/accounts/pagelist',
      method: 'get',
      params: {
        pageNo: 1,
        pageNum: 10
      }

    }).then(res => {
      if(res.code === 200){
        let result = res.data.list;
        this.accountDetails = getGroupObject(result,"accountDate");
      }
    })
  },
  data(){
    return {
      Edit,
      value1: "",
      value2: new Date().toString(),
      table: false,
      dialog: false,
      activeAccount: "",
      accountDetails: [
      ],
      addShowColor: '#71d381',
      subShowColor: '#e86d6d'
    }
  },
  components: {
    IconItem,
    AccountAdd
  },
  methods: {
    openAccount(item){
      this.changeDialog(true);
      this.activeAccount = item
    },
    changeDialog(newValue){
      this.dialog = newValue;
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
  height: 70px;
  box-shadow: 10px 10px 10px;

}

.el-timeline .totalMsg{
}

.el-timeline .el-card{
  width: 90%;
  border-radius: 30px;
  background: #e0e0e0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset;
}

.el-timeline .el-row{
  width: 90%;
  height: 80px;
  box-sizing: border-box;
  background: whitesmoke;
  border: 1px solid white;
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(6px);
  border-radius: 17px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: bolder;
  position: relative;
  margin-bottom: 5px;
}

.el-timeline .el-row:hover{
  border: 1px solid dodgerblue;
  transform: scale(1.01);
  background-color: #e8e7e3;

}


.el-timeline .el-row:active {
  transform: scale(0.95) rotateZ(1.7deg);
}

.el-timeline .el-col{
  text-align: center;
  font-size: 20px;
  line-height: 80px;
  padding-right: 10px;
}

/*金额*/
.el-timeline .el-col .mount{
  text-align: center;
  font-style: italic;
}

/*点我记账的按钮*/
.container .block .addAccount{
  appearance: none;
  background-color: transparent;
  border: 0.125em solid #1A1A1A;
  border-radius: 0.9375em;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 3.75em;
  min-width: 0;
  outline: none;
  padding: 1em 2.3em;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
}

.container .block .addAccount:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.container .block .addAccount:active {
  box-shadow: none;
  transform: translateY(0);
}

.container .block .addAccount:disabled {
  pointer-events: none;
}





</style>