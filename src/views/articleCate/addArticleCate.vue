<template>
  <div class="addArticleCateBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm">
        <el-form-item label="文章一级类别：" prop="cateName">
          <el-input v-model="ruleForm.cateName"></el-input>
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
    name: "addArticleCate",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '文章管理'},
          {path: '/article/articleCateList', title: '文章一级分类'},
          {path: '', title: '新增一级分类'}
        ],
        ruleForm: {
          cateName: '',
        },
        rules: {
          cateName: [
            {required: true, message: '请输入文章一级类别', trigger: 'blur'},
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let {data} = await this.$axios.post('/api/article/addFirCate', this.ruleForm)
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push('/article/articleCateList')
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
</style>
