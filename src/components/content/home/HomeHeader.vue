<template>
  <div class="home-header">
    <el-dropdown>
      <div class="head-img">
        <img src="@/assets/img/logo.jpg"/>
      </div>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>我的信息</el-dropdown-item>
          <el-dropdown-item divided @click="loginout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue'
import {devServer} from "@/network/requests";
import {ElMessage} from "element-plus";
export default {
  name: "HomeHeader",
  methods: {
    loginout() {
      devServer({
        url: "/loginout",
        method: 'get'
      }).then(res => {
        if (res.data.code !== 200) {
          this.login_success()
          //清理token
          window.localStorage.clear()
          //跳转到登录页面
          this.$router.push("/login")
        }
      })
    },
    login_success(){
      ElMessage({
        message: "退出成功",
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.home-header {
  position: relative;
  width: 100%;
  height: 100%;
}

.head-img {
  position: absolute;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  left: 1630px;
  top: 3px;
  box-shadow: 0 0 10px #ddd;
}


.head-img:hover {
  background-color: black;
  box-shadow: 0px 0px 30px black;
}

.head-img img{
  width: 100%;
  height: 100%;
  border-radius: 50%;

}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>