<template>
  <div class="addSecArticleCateBox">
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
        <el-form-item label="所属一级分类：">
          <span>{{ruleForm.PcateName}}</span>
        </el-form-item>
        <el-form-item label="文章二级类别：" prop="cateName">
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
    created() {
      this.ruleForm.catePId = location.href.split('=')[1]
      this.linkArr[2].path += '?catePId=' + this.ruleForm.catePId
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '文章管理'},
          {path: '/article/articleCateList', title: '文章一级分类'},
          {path: '/article/secArticleCateList', title: '文章二级分类'},
          {path: '', title: '新增二级分类'}
        ],
        ruleForm: {
          PcateName: '',
          catePId: 0,
          cateName: ''
        },
        rules: {
          cateName: [
            {required: true, message: '请输入文章二级类别', trigger: 'blur'},
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      async getData() {
        let {data} = await this.$axios.get('/api/article/getFirCateData', {params: {id: this.ruleForm.catePId}})
        if (data.code == 200) {
          this.ruleForm.PcateName = data.result.cateName
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let {data} = await this.$axios.post('/api/article/addSecCate', this.ruleForm)
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push('secArticleCateList?catePId=' + this.ruleForm.catePId)
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
