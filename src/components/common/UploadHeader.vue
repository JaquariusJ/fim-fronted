<template>
  <el-upload
      class="avatar-uploader"
      :headers='headers'
      action="/api/permission/file/upload"
      :show-file-list="false"
      accept=".jpg,.png,.gif,.jpeg"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
    <el-image v-if="avator" :src="avator" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script>
// 引入loading
import { ElMessage } from 'element-plus'
let loadingInstance = null
export default {
  data () {
    return {
      // 设置上传的请求头部
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
  },
  props: {
    value: {
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: 'getValue'
  },
  methods: {
    // 上传校验
    beforeAvatarUpload (file) {
      if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
      }
      return true
    },
    // 上传成功
    handleAvatarSuccess (res, file) {
      imageUrl.value = URL.createObjectURL(uploadFile.raw)
    },
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;

}
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
</style>