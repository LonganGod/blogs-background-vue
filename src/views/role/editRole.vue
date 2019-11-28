<template>
  <div class="editRoleBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-steps :active="action" align-center finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="权限配置"></el-step>
      </el-steps>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm">
        <template v-if="action == 0">
          <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="父级角色：" prop="rolePId">
            <el-select v-model="ruleForm.rolePId" placeholder="请选择父级导航">
              <el-option label="无" :value="0"></el-option>
              <template v-for="item in pRoleList">
                <el-option :label="item.roleName" :value="item.roleId" :key="item.roleId"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeStep(1, 'ruleForm')">下一步</el-button>
          </el-form-item>
        </template>
        <template v-if="action == 1">
          <el-tree
            :data="permissions"
            show-checkbox
            default-expand-all
            check-on-click-node
            :expand-on-click-node="false"
            node-key="navId"
            :default-checked-keys="selectPermissionsIds"
            ref="permissionsTree"
            :props="treeProps">
          </el-tree>
          <el-form-item>
            <el-button @click="changeStep(0)">上一步</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
          </el-form-item>
        </template>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    name: "editRole",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.getData()
      this.getFirRoleData()
      this.getPermissionsData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '基本设置'},
          {path: '/config/roleList', title: '角色管理列表'},
          {path: '', title: '新增角色'}
        ],
        ruleForm: {
          roleId: null,
          roleName: '',
          rolePId: 0,
          permissionsIds: ''
        },
        rules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ]
        },
        pRoleList: [],
        action: 0,
        permissions: [],
        selectPermissionsIds: [],
        treeProps: {
          children: 'children',
          label: 'navName',
          id: 'navId'
        },
        param: {}
      }
    },
    methods: {
      getLvThreeArr(arr, id, newArr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].navPId == id) {
            newArr.push(arr[i])
            arr[i].children = this.getLvThreeArr(arr, arr[i].navId, [])
          }
        }
        return newArr
      },
      async getData() {
        let paramsArr = location.href.split('?')[1].split('&')
        for (let i = 0; i < paramsArr.length; i++) {
          this.param[paramsArr[i].split('=')[0]] = paramsArr[i].split('=')[1]
        }

        this.ruleForm.roleId = this.param.roleId
        this.action = parseInt(this.param.action)

        let {data} = await this.$axios.get('/api/role/getRoleData', {
          params: {
            roleId: this.ruleForm.roleId
          }
        })
        if (data.code == 200) {
          this.ruleForm.roleName = data.result.roleName
          this.ruleForm.rolePId = data.result.rolePId
          this.ruleForm.permissionsIds = data.result.rolePermissions
          this.selectPermissionsIds = data.result.rolePermissions != null ? data.result.rolePermissions.split(',') : []
        }
      },
      async getFirRoleData() {
        let {data} = await this.$axios.get('/api/role/getFirRoleList')
        if (data.code == 200) {
          this.pRoleList = data.result
        }
      },
      async getPermissionsData() {
        let {data} = await this.$axios.get('/api/role/getPermissionsList')
        if (data.code == 200) {
          var newArr = this.getLvThreeArr(data.result, 0, [])
          this.permissions = newArr
        }
      },
      changeStep(action, formName) {
        if (action == 1) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              this.action = action
            }
          });
        } else {
          this.action = action
          this.selectPermissionsIds = this.$refs.permissionsTree.getCheckedKeys()
        }
      },
      submitForm(formName) {
        this.ruleForm.permissionsIds = this.$refs.permissionsTree.getCheckedKeys().join(',')

        let url = this.param.action == 0 ? '/api/role/editRole' : '/api/role/editRoleIncludeChildren'

        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let {data} = await this.$axios.post(url, this.ruleForm)
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.$router.push('/config/roleList')
            }
          }
        });
      }
    }
  }
</script>

<style scoped>
  .el-form {
    /*width: 650px;*/
  }

  .el-input, .el-select {
    width: 500px;
  }

  .el-steps {
    margin: 10px 0 25px;
  }

  .el-tree {
    padding: 0 150px;
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .el-tree /deep/ .el-tree-node__content {
    height: 35px;
  }

  .el-tree /deep/ .el-checkbox {
    margin-right: 10px;
  }
</style>
