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
          <el-row>
            <el-col :span="8">
              <el-form-item :label="`权限名称${index + 1}：`" :prop="`permissionList.${index}.navName`"
                            :rules="rules.navName">
                <el-input v-model="item.navName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item :label="`权限路径${index + 1}：`" :prop="`permissionList.${index}.navJumpPage`"
                            :rules="rules.navJumpPage">
                <el-input v-model="item.navJumpPage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button v-if="index != 0" class="del-btn" icon="el-icon-delete" size="small" round
                         @click="deletePermission(index)"></el-button>
            </el-col>
          </el-row>
        </template>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认编辑</el-button>
          <el-button type="warning" @click="addPermission('ruleForm')">新增权限</el-button>
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
      this.ruleForm.navId = location.hash.split('?')[1].split('=')[1]
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '基本设置'},
          {path: '/config/backgroundNavList', title: '后台导航列表'},
          {path: '', title: '编辑权限'}
        ],
        ruleForm: {
          navId: null,
          permissionList: [],
        },
        rules: {
          navName: [
            {required: true, message: `请输入权限分类名称`, trigger: 'blur'}
          ],
          navJumpPage: [
            {required: true, message: `请输入跳转路径`, trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      async getData() {
        let {data} = await this.$axios.get('/api/backend/getPermissionListData', {
          params: {
            id: this.ruleForm.navId
          }
        })
        if (data.code == 200) {
          this.ruleForm.permissionList = data.result.length == 0 ? [{
            navName: '',
            navJumpPage: ''
          }] : data.result
          console.log(data.result)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log(this.ruleForm)
            let {data} = await this.$axios.post('/api/backend/editPermission', this.ruleForm)
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.$router.push('/config/backgroundNavList')
            }
          }
        });
      },
      addPermission(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.ruleForm.permissionList.push({
              navName: '',
              navJumpPage: ''
            })
          }
        });
      },
      deletePermission(index) {
        this.ruleForm.permissionList.pop(this.ruleForm.permissionList[index])
      }
    }
  }
</script>

<style scoped>
  .del-btn {
    margin: 5px 20px;
  }
</style>
