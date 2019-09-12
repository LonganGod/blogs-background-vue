<template>
  <div class="userEditBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
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
          {path: '', title: '编辑'}
        ],
      }
    },
  }
</script>

<style scoped>

</style>
