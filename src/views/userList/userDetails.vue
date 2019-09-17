<template>
  <div class="userDetailsBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>
    <el-card class="box-card main-card">
      <el-row>
        <el-col :span="2">用户头像</el-col>
        <el-col :span="22">
          <el-avatar size="large" :src="circleUrl"></el-avatar>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">用户名</el-col>
        <el-col :span="22">ws123456</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">昵称</el-col>
        <el-col :span="22">啊啊啊啊啊</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">邮箱</el-col>
        <el-col :span="22">ws15531085321@163.com</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">用户类型</el-col>
        <el-col :span="22">注册用户</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">创建时间</el-col>
        <el-col :span="22">2019-04-15</el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    name: "userEdit",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '用户管理'},
          {path: '/user/userList', title: '用户列表'},
          {path: '', title: '查看'}
        ],
        circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }
    },
  }
</script>

<style scoped lang="less">
  .el-row {
    padding: 10px;
    display: flex;
    align-items: center;

    & > .el-col:first-child {
      text-align: right;
      padding-right: 50px;
    }

    & > .el-col:nth-child(2) {
      padding-left: 10px;
    }
  }
</style>
