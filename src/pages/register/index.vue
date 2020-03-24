

<style lang="scss" scoped>
@import './index.scss';
</style>

<template>
  <div class="bigbox">
    <div class="box">
      <div class="title">新用户注册</div>
      <el-form
        :model="subForm"
        label-position="left"
        label-width="80px"
        :rules="rules"
        ref="subForm"
      >
        <el-form-item label="注册账号" prop="userName">
          <el-input prefix-icon="el-icon-user" v-model="subForm.userName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="注册密码" prop="password" style="margin-top:30px">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="subForm.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="subForm.idCard" placeholder="请输身份证号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="subForm.email" placeholder="请输邮箱号"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="sub">注册</el-button>
    </div>
  </div>
</template>

<script>
import { register } from './api.js'
import encrypt from '@/utils/encrypt'
export default {
  data() {
    return {
      subForm: {},
      rules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      }
    }
  },
  methods: {
    sub() {
      let that = this
      let reg = /^\S*$/
      this.$refs['subForm'].validate(valid => {
        let reg = /^\S*$/
        for (let item in this.subForm) {
          if (!reg.test(this.subForm[item])) {
            this.$message.error('输入内容包含空格，请出新输入!')
            return false
          }
        }
        let data = JSON.parse(JSON.stringify(this.subForm))
        data.password = encrypt.Encrypt(data.password)
        console.log(data, '00123456')
        register(data).then(res => {
          if (res.code === 200) {
            this.$message.success('注册成功')
            setTimeout(function() {
              that.$router.replace('/login')
            }, 1000)
          } else {
            this.$message.error(res.message)
          }
        })
      })
    }
  }
}
</script>