<template>
  <div class="login_container">
    <div class="login-box">
      <!--      头像区域-->
      <div class="avatar_box">
        <img src="@/assets/img/logo.jpg">
      </div>
      <div class="title">
        <div>welcome to fim</div>
      </div>
      <!--      登录表单区域-->
      <el-form ref="loginFromRef" :rules="loginFromRules" label-width="1px" class="login_form" :model="loginUser">
        <el-form-item  prop="username" >
          <el-input
              v-model="loginUser.username"
              placeholder="请输入用户名"
              prefix-icon="User"
              class="login-input"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              @keyup.enter="loginIn()"
              v-model="loginUser.password"
              type="password"
              placeholder="请输入密码"
              show-password
              prefix-icon="Lock"
              style=""
          />
        </el-form-item>
        <el-form-item class="btns">
          <el-button class="login-btn" plain type="primary" @click="loginIn()" :loading="login_ing" size="large">Login</el-button>
          <el-button type="success" plain @click="$router.push('/registry')" size="large">Sign up</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>


<script>
import {Lock, User} from "@element-plus/icons-vue";
import {devServer} from "@/network/requests";
import { ElMessage } from 'element-plus'


export default {
  name: "login",
  data() {
    return {
      login_ing: false,
      loginUser: {
        username: "",
        password: ""
      },
      loginFromRules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 5, max: 18, message: '用户名长度在5-18之间', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      },

    }
  },
  methods: {
    loginIn() {
      this.$refs.loginFromRef.validate(valid => {
        if(!valid){return};
        //发送请求
        this.login_ing = true
        devServer({
          url: "/login",
          method: "post",
          data: this.loginUser
        }).then(res => {
          if(res.data.code !== 200){
            this.login_error()
          }else{
            this.login_success()
            this.$router.push("/home")
          }
        }).catch(error => {
         this.server_error()
        }).finally(()=>{
          this.login_ing = false;
        })
      });
    },
    login_success() {
      ElMessage({
        message: "登录成功",
        type: 'success'
      })
    },
    login_error() {
      ElMessage({
        message: "用户名或密码错误",
        type: 'error'
      })
    },
    server_error() {
      ElMessage({
        message: "服务器响应错误",
        type: 'error'
      })
    }

  }
}

</script>

<style scoped>
.login_container {
  background-color: #2c3e50;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #1b2a32;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-box .title{
  margin-top: 8%;
  font: italic bold 3em "Bauhaus 93",serif;
  padding-left: 20%;
  color: #ffffff;
}

.login-box .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 6%;
  top: 5%;
  transform: translate(-50%, -50%);
  background-color: #dddddd;
}

.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: aqua;
}

.btns {
  display: flex;
  justify-content: flex-end;
  margin: auto;
}

/deep/ .el-input__inner {
  /*background-color: transparent;*/
}

/deep/ .el-form-item {
  background-color: unset !important;
}

/deep/ .el-form {
  background-color: unset !important;
}

.login_form {
  position: absolute;
  bottom: 10%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}


</style>