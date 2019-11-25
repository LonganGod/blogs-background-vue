<template>
  <div class="editPermissionBox">
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
        <template v-for="(item, index) in ruleForm.permissionList">
          <el-form-item :label="`权限名称${index + 1}：`" :prop="`permissionList.${index}.permissionsName`"
                        :rules="rules.permissionsName">
            <el-input v-model="item.permissionsName"></el-input>
          </el-form-item>
          <el-form-item :label="`权限路径${index + 1}：`" :prop="`permissionList.${index}.permissionsUrl`"
                        :rules="rules.permissionsUrl">
            <el-input v-model="item.permissionsUrl"></el-input>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认编辑</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    name: "editPermission",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.ruleForm.permissionsId = location.hash.split('?')[1].split('=')[1]
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '基本设置'},
          {path: '/config/permissionList', title: '权限分类列表'},
          {path: '', title: '编辑权限'}
        ],
        ruleForm: {
          permissionsId: null,
          permissionList: [],
        },
        rules: {
          permissionsName: [
            {required: true, message: `请输入权限分类名称`, trigger: 'blur'}
          ],
          permissionsUrl: [
            {required: true, message: `请输入跳转路径`, trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      async getData() {
        let {data} = await this.$axios.get('/api/permission/getPermissionListData', {
          params: {
            id: this.ruleForm.permissionsId
          }
        })
        if (data.code == 200) {
          this.ruleForm.permissionList = data.result
          console.log(data.result)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let {data} = await this.$axios.post('/api/permission/editPermissionCate', this.ruleForm)
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.$router.push('/config/permissionList')
            }
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeInput(value, prop) {
        this.ruleForm[prop] = value
      }
    }
  }
</script>

<style scoped>
  .el-form {
    width: 1000px;
  }

  .el-input, .el-select {
    width: 850px;
  }
</style>
