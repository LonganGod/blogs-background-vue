<template>
  <div class="addPermissionCateBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm">
        <el-form-item label="权限分类名称：" prop="permissionsName">
          <el-input v-model="ruleForm.permissionsName"></el-input>
        </el-form-item>
        <el-form-item label="父级权限分类：" prop="permissionsPId">
          <el-select v-model="ruleForm.permissionsPId" placeholder="请选择父级权限分类">
            <el-option label="无" :value="0"></el-option>
            <template v-for="item in firPermissionList">
              <el-option :label="item.permissionsName" :value="item.permissionsId" :key="item.permissionsId"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转路径：" prop="permissionsUrl">
          <el-input v-model="ruleForm.permissionsUrl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    name: "addPermissionCate",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '基本设置'},
          {path: '/config/permissionList', title: '权限分类列表'},
          {path: '', title: '新增权限分类'}
        ],
        ruleForm: {
          permissionsName: '',
          permissionsPId: 0,
          permissionsUrl: '',
          type: 1,
        },
        rules: {
          permissionsName: [
            {required: true, message: '请输入权限分类名称', trigger: 'blur'}
          ],
          permissionsUrl: [
            {required: true, message: '请输入跳转路径', trigger: 'blur'},
          ]
        },
        firPermissionList: []
      }
    },
    methods: {
      async getData() {
        let {data} = await this.$axios.get('/api/permission/getFirPermissionList')
        if (data.code == 200) {
          this.firPermissionList = data.result
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let {data} = await this.$axios.post('/api/permission/addPermissionCate', this.ruleForm)
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push('/config/permissionList')
            }
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-form {
    width: 650px;
  }

  .el-input, .el-select {
    width: 500px;
  }
</style>
