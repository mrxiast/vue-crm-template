<template>
  <div class="clearfix" id="login_wrap">
    <div id="login">
      <h2 class="title">香格里拉后台管理</h2>
      <el-form
        :model="subForm"
        label-position="left"
        label-width="80px"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input prefix-icon="el-icon-user" v-model="subForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="margin-top:30px">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="subForm.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top:50px">
          <el-button style="margin-left:50px;width:150px;" type="primary" @click="clickLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from './api'
export default {
  data() {
    return {
      subForm: {
        account: '',
        password: ''
      },

      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async subLogin() {
      try {
        let params = this.subForm
        let data = await login(params)
        let token = data.data.token
        this.$store.commit('LOGIN_IN', token)
        this.$router.replace('/')
      } catch (e) {
        console.log(e)
      }
    },
    clickLogin() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.subLogin()
        } else {
          // this.$message.error('提交出错')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
