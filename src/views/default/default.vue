<template>
  <div id="defaultBox">
    <header class="defaultHead">
      <el-row :gutter="20">
        <el-col :span="6"><h4>后台管理系统</h4></el-col>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="6" :offset="10"><div>admin</div></el-col>
      </el-row>
    </header>
    <div class="defaultBody">

    </div>
  </div>
</template>

<script>
  export default {
    name: "default"
  }
</script>

<style scoped lang="less">
  .defaultHead {
    color: #fff;
    height: 40px;
    line-height: 40px;
    background-color: #2f4157;
  }
</style>
