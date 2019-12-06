<template>
  <div class="addFrontDeskNavBox">
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
        <el-form-item label="导航名称：" prop="navName">
          <el-input v-model="ruleForm.navName"></el-input>
        </el-form-item>
        <el-form-item label="跳转路径：" prop="navPath">
          <el-input v-model="ruleForm.navPath"></el-input>
        </el-form-item>
        <el-form-item label="对应文章分类：" prop="cateId">
          <el-cascader
            v-model="ruleForm.cateId"
            :options="cateList"
            :props="cateKey"
            :show-all-levels="false"
            placeholder="请选择文章分类">
          </el-cascader>
        </el-form-item>
        <el-form-item label="位置：" prop="navIndex">
          <el-input type="number" autocomplete="off" class="navPosition" v-model="ruleForm.navIndex"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：" prop="navStatus">
          <el-switch v-model="ruleForm.navStatus"></el-switch>
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
    name: "addFrontDeskNav",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.getCate()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '基本设置'},
          {path: '/config/frontDeskNavList', title: '前台导航列表'},
          {path: '', title: '新增前台导航'}
        ],
        ruleForm: {
          navName: '',
          navPath: '',
          cateId: '',
          navIndex: '',
          navStatus: true,
        },
        rules: {
          navName: [
            {required: true, message: '请输入导航名称', trigger: 'blur'},
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
          navPath: [
            {required: true, message: '请输入跳转路径', trigger: 'blur'},
          ],
          navIndex: [
            {required: true, message: '请输入位置', trigger: 'blur'}
          ]
        },
        // 文章类别
        cateList: [],
        cateKey: {
          value: 'cateId',
          label: 'cateName',
          children: 'children'
        },
      }
    },
    methods: {
      async getCate() {
        let {data} = await this.$axios.get('/api/article/articlePageGetCate')
        if (data.code == 200) {
          this.cateList = data.result
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.ruleForm.cateId = this.ruleForm.cateId[1]
            let {data} = await this.$axios.post('/api/frontDesk/addFrontDeskNav', this.ruleForm)
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push('/config/frontDeskNavList')
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

  .el-cascader, .el-input, .el-select {
    width: 500px;
  }
</style>
