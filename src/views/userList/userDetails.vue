<template>
  <div class="userDetailsBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>
    <el-card class="box-card main-card">
      <el-row>
        <el-col :span="2">用户头像</el-col>
        <el-col :span="22">
          <el-avatar size="large" :src="userDetails.userIcon" v-if="userDetails.userIcon != ''"></el-avatar>
          <el-avatar size="large" v-else>游</el-avatar>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">用户名</el-col>
        <el-col :span="22">{{userDetails.userName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">昵称</el-col>
        <el-col :span="22">{{userDetails.nickName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">邮箱</el-col>
        <el-col :span="22">{{userDetails.userEmail}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">用户类型</el-col>
        <el-col :span="22" v-if="userDetails.userType == 1">管理员</el-col>
        <el-col :span="22" v-else-if="userDetails.userType == 2">注册用户</el-col>
        <el-col :span="22" v-else>游客</el-col>
      </el-row>
      <el-row>
        <el-col :span="2">创建时间</el-col>
        <el-col :span="22">{{userDetails.createTime | dateFormat}}</el-col>
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
    created() {
      this.getDate()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '用户管理'},
          {path: '/user/userList', title: '用户列表'},
          {path: '', title: '查看'}
        ],
        userDetails: {}
      }
    },
    methods: {
      async getDate() {
        let userId = location.href.split('?')[1].split('=')[1]
        let {data} = await this.$axios.get('/api/userList/showUserDetail', {
          params: {
            userId: userId
          }
        })
        if (data.code == 200) {
          this.userDetails = data.result
        }
        console.log(data)
      }
    }
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
