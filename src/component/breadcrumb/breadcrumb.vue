<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <template v-for="(item, index) in linkArr">
      <el-breadcrumb-item v-if="item.path == ''" :key="index">{{item.title}}</el-breadcrumb-item>
      <el-breadcrumb-item v-else :to="{path: item.path}" :key="index">{{item.title}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "breadcrumb",
    props: ['linkArr']
  }
</script>

<style scoped>

</style>
