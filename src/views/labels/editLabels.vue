<template>
  <div class="editLabelsBox">
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
        <el-form-item label="标签名称：" prop="labelName">
          <el-input v-model="ruleForm.labelName"></el-input>
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
    name: "editLabels",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.labelId = location.href.split('=')[1]
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '文章管理'},
          {path: '/labels', title: '标签列表'},
          {path: '', title: '新增标签'}
        ],
        ruleForm: {
          labelName: '',
        },
        rules: {
          labelName: [
            {required: true, message: '请输入标签名', trigger: 'blur'},
            {min: 2, max: 15, message: '长度在 2 到 6 个字符', trigger: 'blur'}
          ],
        },
        labelId: 0
      }
    },
    methods: {
      async getData() {
        let {data} = await this.$axios.get('/api/labels/getLabelData', {params: {id: this.labelId}})
        if (data.code == 200) {
          this.ruleForm.labelName = data.result.labelName
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let {data} = await this.$axios.post('/api/labels/editLabels', {
              formData: this.ruleForm,
              labelId: this.labelId,
            })
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.$router.push('/labels')
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
