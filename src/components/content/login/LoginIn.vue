<template>
  <div class="login_container">
    <div class="login-box">
      <!--      头像区域-->
      <div class="avatar_box">
        <img src="@/assets/img/logo.jpg">
      </div>
      <!--      登录表单区域-->
      <el-form :rules="loginFromRules" label-width="1px" class="login_form" :model="user">
        <el-form-item  prop="username">
          <el-input
              v-model="user.username"
              placeholder="请输入用户名"
              :prefix-icon="User"/>
        </el-form-item>
        <el-form-item>
          <el-input
              v-model="user.password"
              type="password"
              placeholder="请输入密码"
              show-password
              :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" plain>登录</el-button>
          <el-button type="success" plain>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>


<script>
import {User, Lock} from "@element-plus/icons-vue";

export default {
  name: "Login",
  data() {
    return {
      User,
      Lock,
      user: {
        username: "xiaojian",
        password: "111"
      },
      loginFromRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '用户名长度在6-18之间', trigger: 'blur' },
        ]
      }
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
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-box .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
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
}

.login_form {
  position: absolute;
  bottom: 10%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}


</style>