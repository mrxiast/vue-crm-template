<template>
  <el-menu
    :collapse="$store.state.isSidebarNavCollapse"
    background-color="#304156"
    text-color="#eee"
    active-text-color="#4dbcff"
    :default-active="$store.state.currentMenu"
  >
    <slot v-if="!$store.state.isSidebarNavCollapse">
      <div class="title">香格里拉</div>
    </slot>
    <DynamicMenu :menuList="$store.state.sidebarMenu"></DynamicMenu>
  </el-menu>
</template>

<script>
import DynamicMenu from '@/components/dynamic-menu'

export default {
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {},
  components: {
    DynamicMenu
  }
}
</script>
<style lang="scss" scoped>
@import './sidebar-nav.scss';
</style>
