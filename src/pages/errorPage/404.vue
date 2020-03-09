

<style lang="scss" scoped>
@import './404.scss';
</style>

<template>
  <div class="error404">
    <div class="error404-body-con">
      <el-card>
        <div class="error404-body-con-title">
          4
          <span>
            <i class="el-icon-discover"></i>
          </span>
          4
        </div>
        <p class="error404-body-con-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
        <div class="error404-btn-con">
          <el-button @click="backToHome" size="large" style="width: 200px;" type="text">返回首页</el-button>
          <el-button
            @click="backPage"
            size="large"
            style="width: 200px;margin-left: 40px;"
            type="primary"
          >返回上一页</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page404',
  data() {
    return {}
  },
  methods: {
    backToHome() {
      this.$router.push('/')
    },
    backPage() {
      this.$router.go(-1)
    }
  },
  computed: {
    message() {
      return ''
    }
  }
}
</script>