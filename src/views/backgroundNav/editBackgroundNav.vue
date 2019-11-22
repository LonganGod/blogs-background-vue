<template>
  <div class="editBackgroundNavBox">
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
        <el-form-item class="hidden" prop="navId">
          <el-input v-model="ruleForm.navId"></el-input>
        </el-form-item>
        <el-form-item label="导航名称：" prop="navName">
          <el-input v-model="ruleForm.navName"></el-input>
        </el-form-item>
        <el-form-item label="父级导航：" prop="parentNavName">
          <el-select v-model="ruleForm.parentNavName" placeholder="请选择父级导航">
            <el-option label="无" value="0"></el-option>
            <template v-for="item in firNavList">
              <el-option :label="item.navName" :value="item.navId" :key="item.navId"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="图标：" prop="navIcon">
          <el-input v-model="ruleForm.navIcon"></el-input>
        </el-form-item>
        <el-form-item label="跳转路径：" prop="navUrl">
          <el-input v-model="ruleForm.navUrl"></el-input>
        </el-form-item>
        <el-form-item label="位置：" prop="navPosition">
          <el-input type="number" autocomplete="off" class="navPosition" v-model="ruleForm.navPosition"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：" prop="navState">
          <el-switch v-model="ruleForm.navState"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认编辑</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    name: "editBackgroundNav",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.getFirNavData()
      this.ruleForm.navId = location.hash.split('?')[1].split('=')[1]
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '基本设置'},
          {path: '/config/backgroundNavList', title: '后台导航列表'},
          {path: '', title: '编辑后台导航'}
        ],
        ruleForm: {
          navId: '',
          navName: '',
          parentNavName: '0',
          navIcon: '',
          navUrl: '',
          navPosition: '',
          navState: true,
        },
        rules: {
          navName: [
            {required: true, message: '请输入导航名称', trigger: 'blur'},
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
          navUrl: [
            {required: true, message: '请输入跳转路径', trigger: 'blur'},
          ],
          navPosition: [
            {required: true, message: '请输入位置', trigger: 'blur'}
          ]
        },
        firNavList: []
      }
    },
    methods: {
      async getFirNavData() {
        let {data} = await this.$axios.get('/api/backend/getFirBackendNavList')
        if (data.code == 200) {
          this.firNavList = data.result
        }
      },
      async getData() {
        let {data} = await this.$axios.get('/api/backend/getBackendNav', {params: {navId: this.ruleForm.navId}})
        if (data.code == 200) {
          this.ruleForm.navName = data.result.navName
          this.ruleForm.parentNavName = data.result.navPId
          this.ruleForm.navIcon = data.result.navIcon
          this.ruleForm.navUrl = data.result.navJumpPage
          this.ruleForm.navPosition = data.result.navIndex
          this.ruleForm.navState = data.result.navStatus == 1 ? true : false
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let {data} = await this.$axios.post('/api/backend/editBackendNav', this.ruleForm)
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

  .hidden {
    display: none;
  }
</style>
