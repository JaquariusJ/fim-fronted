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
                <el-statistic group-separator="," :precision="2" :value="totalPay" title="支出"></el-statistic>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="demo-date-picker">
          <div class="container">
            <div class="block">
              <el-statistic group-separator="," :precision="2" :value="totalIncome" title="收入"></el-statistic>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="demo-date-picker">
          <div class="container">
            <div class="block">
              <el-button class="addAccount" type="success" plain @click="addAccount" color="#00a2ff">点我记账</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

<!--    所有消费记录-->
      <el-timeline class="infinite-list" v-infinite-scroll="load" style="overflow:auto" infinite-scroll-disabled="disabled">
        <el-timeline-item v-for="(accounts,accountDate) in accountDetails"  :key="accountDate"  :timestamp="accountDate+' ' + dateUtils.getCHDayName(accountDate)" placement="top">
          <el-card>
            <!--          每一行消费记录-->
              <el-row :gutter="0"  @click="openAccount(item)" v-for="item in accounts" class="infinite-list-item">
                <el-col :span="5">
                  <div>
                    <icon-item :icon-file-name="item.accountLogo.logoName" :back-color="item.accountLogo.type === 0?subShowColor:addShowColor"></icon-item>
                    <span class="mount">{{item.accountLogo.title}}</span>
                  </div>
                </el-col>
                <el-col :span="15">
                </el-col>
                <el-col :span="3">
                  <span class="mount" v-if="item.accountLogo.type === 0" >-</span>
                  <span class="mount" v-else >+</span>
                  <span class="mount">{{item.mount}} </span>
                </el-col>
                <button class="delete-btn" @click.stop="deleteAccount(item)">
                  <el-icon color="red" size="30px" ><ShoppingTrolley /></el-icon>
                </button>
              </el-row>

          </el-card>
        </el-timeline-item>
        <p v-if="noMore" style="margin-top:10px;font-size:13px;color:#ccc">到底啦</p>
      </el-timeline>

    <!--    记账表单-->
    <account-edit v-model:dialog="dialog" v-model:account="activeAccount" :is-new-create="isNewCreate"></account-edit>
  </div>

</template>

<script>
import {
  Plus,
  CirclePlusFilled,
  Check,
  Edit
} from '@element-plus/icons-vue'

import AccountEdit from "@/components/content/consume/accounts/AccountEdit.vue";
import {devServer} from "@/network/requests";
import IconItem from "@/components/SvgIcon/IconItem.vue";
import {getGroupArray,getGroupObject} from "@/common/utils/group";
import {dateUtils} from "@/common/utils/date";

export default {
  name: "AccountList",
  data(){
    return {
      currentPage: 1,//起始页数值为1
      loading: false,
      totalPages: "",//取后端返回内容的总页数
      allAccounts: [],  //从后端取的数据
      activeAccount:"",
      // 其他
      Edit,
      value1: "",
      value2: new Date().toString(),
      table: false,
      dialog: false,
      addShowColor: '#71d381',
      subShowColor: '#e86d6d',
      isNewCreate: true,
      totalPay: 0,
      totalIncome: 0
    }
  },
  computed: {
    noMore() {
      //当起始页数大于总页数时停止加载
      return this.currentPage >= this.totalPages;
    },
    disabled() {
      return this.loading || this.noMore;
    },
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
    // totalPay(){
    //   let payArr = this.acccounts.filter(e => e.accountLogo.type === 0);
    //   if(payArr.length === 0){
    //     return 0
    //   }
    //   return payArr.map(n => Number(n.mount)).reduce((n1,n2) =>  n1+n2).toFixed(2);
    // },
    // totalIncome(){
    //   let payArr = this.acccounts.filter(e => e.accountLogo.type === 1);
    //   if(payArr.length === 0){
    //     return 0
    //   }
    //   return payArr.map(n => Number(n.mount)).reduce((n1,n2) =>  n1+n2).toFixed(2);
    // },
    accountDetails(){
      return getGroupObject(this.allAccounts,"accountDate");
    }
  },
  created() {
    this.getAccountData()
    //获取统计信息
    this.getTotalInfo()

  },
  components: {
    IconItem,
    AccountEdit
  },
  methods: {
    load() {
      //滑到底部时进行加载
      this.loading = true;
      this.currentPage += 1; //页数+1
      this.getAccountData(); //调用接口，此时页数+1，查询下一页数据
      console.log("加载中");
    },
    getAccountData() {
      devServer({
        url: '/accounts/detail/pagelist',
        method: 'get',
        params: {
          pageNo: this.currentPage,
          pageNum: 2
        }

      }).then(res => {
        if(res.code === 200){
          const newAccounts = res.data.list;
          this.allAccounts = this.allAccounts.concat(newAccounts); //因为每次后端返回的都是数组，所以这边把数组拼接到一起
          this.totalPages = res.data.pages;
          this.loading = false;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    openAccount(item){
      this.changeDialog(true);
      this.activeAccount = item
      this.isNewCreate = false
    },
    changeDialog(newValue){
      this.dialog = newValue;
    },
    addAccount(){
      this.dialog = true;
      this.isNewCreate = true
    },
    deleteAccount(item){
      // 更新所有账单
      let index = 0
      for (let i = 0; i < this.allAccounts.length; i++) {
        let account = this.allAccounts[i];
        console.log(this.allAccounts);
        if(account.id === item.id){
          index = i;
          break;
        }
      }
      this.allAccounts.splice(index,1)
      //提交给后台删除
     devServer({
       url: '/accounts/detail/'+item.id,
       method: 'delete',
     }).then(res =>{
       console.log(res);
     })
    },
    getTotalInfo(){
      devServer({
        url: '/accounts/detail/totalInfo',
        method: 'get',
        params: {

        }
      }).then(res => {
        this.totalPay = res.data.totalPay
        this.totalIncome = res.data.totalIncome
      })
    }
  }
}
</script>

<style scoped>

/*删除框 start*/
.el-timeline .el-row .delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  background-image: linear-gradient(to top, #D8D9DB 0%, #fff 80%, #FDFDFD 100%);
  border-radius: 30px;
  border: 1px solid #8F9092;
  transition: all 0.2s ease;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 1px #fff;
  transform: translate(100%, 0%);
  width: 60px;
  height: 60px;
  background-color: #ff5858;
  color: #fff;
  padding: .5rem 1rem;
  position: absolute;
  right: 0;
  top: 10px;
  bottom: 0;
  opacity: 0;
}

.el-timeline .el-row:hover .delete-btn {
  transform: translate(130%, 0);
  opacity: 1;
}


.delete-btn:hover {
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 3px #CECFD1;
}

.delete-btn:active {
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
}

.delete-btn:focus {
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
}


/*删除框 end*/


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
  /*padding-right: 10px;*/
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


/*滚动条 start*/
.infinite-list {
  height: 680px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  /*color: var(--el-color-primary);*/
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
/*滚动条 end*/


</style>