<template>
  <div class="registry_container">
    <div class="registry-box">
      <!--      登录表单区域-->
      <el-form ref="registryFromRef" :rules="registryFromRules" label-width="auto"  class="registry-Form"
               :size="formSize" :model="registryUser">
        <!--      头像区域-->
        <el-form-item prop="headImg" class="headImg" show-message>
          <div class="avatar_box">
            <upload-header></upload-header>
          </div>
        </el-form-item>

        <el-form-item label="用户名" prop="username" required >
          <el-input v-model="registryUser.username" clearable/>
        </el-form-item>

        <el-form-item label="密码" prop="password" required >
          <el-input
              v-model="registryUser.password"
              type="password"
              show-password
              clearable
          />
        </el-form-item>

        <el-form-item label="确认密码" required >
          <el-input
              v-model="confirmPassWord"
              type="password"
              show-password
              clearable
          />
        </el-form-item>


        <el-form-item label="性别" prop="sex" required>
          <el-radio-group v-model="registryUser.sex">
            <el-radio label="1">GG</el-radio>
            <el-radio label="0">MM</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日" required>
          <el-col :span="11">
            <el-form-item prop="birthday">
              <el-date-picker
                  v-model="registryUser.birthday"
                  value-format="YYYY-MM-DD"
                  type="date"
                  label="Pick a date"
                  placeholder=""
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registryUser.email" clearable>
<!--            <template #append>.com</template>-->
          </el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="iphone">
          <el-input v-model="registryUser.iphone" clearable/>
        </el-form-item>

        <el-form-item>
          <el-button plain type="primary" @click="registryUserInfo()" :loading="registry_loading">Confirm</el-button>
          <el-button type="success" plain @click="$router.push('/login')">back to Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import {devServer} from "@/network/requests";
import UploadHeader from '@/components/common/UploadHeader.vue'
import {encodePassWord} from "@/common/utils/security";

export default {
  name: "Registry",
  data(){
    const validate_pass = (rule,value,callback) =>{
        if(value.length !== this.registryUser.password.length){
          callback(new Error("与密码长度不匹配"))
        }else if(value !== this.registryUser.password){
          callback(new Error("与原密码不匹配"))
        }else{
          callback()
        }
    }

    return {
      registry_loading: false,
      confirmPassWord: "",
      registryUser: {
        headImg: "",
        username: "",
        password: "",
        sex: "1",
        birthday: "",
        email: "",
        iphone: ""
      },

      registryFromRules: {
        headImg: [
          {message: '头像需要上传', trigger: 'blur'},
        ],
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 4, max: 16, message: '用户名长度在4-16之间', trigger: 'blur'},
          {pattern: "^[a-zA-Z0-9_-]{4,16}$",message: "用户名不合法", trigger: 'blur'},
          {validator: this.check_user_exist,trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ],
        confirmPassWord: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {validator: this.validate_pass,trigger: 'blur'}
        ],
        birthday: [
          {required: true, message: '生日不能为空', trigger: 'blur'},
        ],
        email: [
          {pattern: "^([a-zA-Z0-9]+[-_\\.]?)+@[a-zA-Z0-9]+\\.[a-z]+$",message: '格式非邮箱格式',trigger: 'blur'}
        ],
        iphone: [

        ]
      },

    }

  },
  methods: {
    registryUserInfo() {
      this.$refs.registryFromRef.validate(valid => {
        if(!valid){return};
        this.registry_loading = true
        this.registryUser.password = encodePassWord(this.registryUser.password)
        console.log(this.registryUser);
        //发送请求
        devServer({
          url: "/registry/createUser",
          method: "post",
          data: this.registryUser
        }).then(res => {
          if(res.data.code !== 200){
            this.registry_error()
          }else{
            this.registry_success()
            this.$router.push("/login")
          }
        }).catch(error => {
          this.registry_error(error)
        })
      }).finally(()=>{
        this.registry_loading = false
      });

    },
    registry_error(){
      ElMessage({
        message: "服务器异常",
        type: 'error'
      })
    },
    registry_success(){
      ElMessage({
        message: "注册成功",
        type: 'success'
      })
    },
    validate_pass(rule,value,callback) {
      if(value.length !== this.registryUser.password.length){
        callback(new Error("与密码长度不匹配"))
      }else if(value !== this.registryUser.password){
        callback(new Error("与原密码不匹配"))
      }else{
        callback()
      }
    },
    check_user_exist(rule,value,callback){
      devServer({
        url: "/registry/checkUserExist",
        method: "get",
        params: {
          username: this.registryUser.username
        }
      }).then(res => {
        if(res.data.data ===true){
          callback(new Error("用户名已存在"))
        }else{
          callback()
        }
      }).catch(error => {
        this.registry_error()
      })
    }

  },
  components: {
    UploadHeader
  }
}
</script>

<style scoped>
.registry_container {
  background-color: #2c3e50;
  height: 100%;
}

.registry-box {
  width: 600px;
  height: 600px;
  background-color: #1b2a32;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.registry-box .avatar_box {
  height: 100px;
  width: 100px;
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

.registry-Form {
  position: absolute;
  top: 25%;
  bottom: 10%;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

</style>