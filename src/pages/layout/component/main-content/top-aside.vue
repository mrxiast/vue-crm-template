<template>
  <aside class="aside__top">
    <span
      class="iconfont icon-nav toggleNavCollapse"
      :class="{active:isSidebarNavCollapse}"
      @click="toggleNavCollapse"
    ></span>
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <!-- 防止面包屑导航出现 首页/首页， v-if="route.name!='home'" -->
        <el-breadcrumb-item
          v-for="(route,i) in crumbList"
          :key="route.name"
          :to="{name:route.name}"
          v-if="route.name!='home'"
          :class="{'is-last-link':i==crumbList.length-1}"
        >{{route.meta.name}}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div class="aside__top--right">
      <div class="user-msg">
        <img class="user-img" :src="require('@/assets/image/a.png')" alt />
        <span class="user-name">Lily-叶</span>
        <el-dropdown trigger="click" placement="top">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="quit-system" @click="loginOut">
        <span class="iconfont icon-quit"></span>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['isSidebarNavCollapse', 'crumbList'])
  },
  methods: {
    toggleNavCollapse() {
      this.$store.commit('toggleNavCollapse')
    },
    loginOut() {
      this.$confirm('此操作将退出当前账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('LOGIN_OUT')
          /* 防止切换角色时addRoutes重复添加路由导致出现警告 */
      window.location.reload()
        }).catch(() => {

        });
      
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import './top-aside.scss';
</style>
