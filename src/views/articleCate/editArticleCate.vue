<template>
  <div class="editArticleCateBox">
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即更改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    name: "editArticleCate",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.cateId = location.href.split('=')[1]
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '文章管理'},
          {path: '/article/articleCateList', title: '文章一级分类'},
          {path: '', title: '编辑一级分类'}
        ],
        ruleForm: {
          cateName: '',
        },
        rules: {
          cateName: [
            {required: true, message: '请输入文章一级类别', trigger: 'blur'},
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
        },
        cateId: 0
      }
    },
    methods: {
      async getData() {
        let {data} = await this.$axios.get('/api/article/getFirCateData', {params: {id: this.cateId}})
        if (data.code == 200) {
          this.ruleForm.cateName = data.result.cateName
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let {data} = await this.$axios.post('/api/article/editFirCateData', {
              formData: this.ruleForm,
              cateId: this.cateId,
            })
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '编辑成功'
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
