<template>
  <el-card class="elCardMargin">
    <router-view class="content"></router-view>
  </el-card>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import './content.scss';
</style>
