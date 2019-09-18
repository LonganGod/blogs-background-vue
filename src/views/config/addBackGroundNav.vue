<template>
  <div class="addBackgroundNavBox">
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
        <el-form-item label="父级导航：" prop="parentNavName">
          <el-select v-model="ruleForm.parentNavName" placeholder="请选择父级导航">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
        <el-form-item label="即时配送：" prop="navState">
          <el-switch v-model="ruleForm.navState"></el-switch>
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
    name: "addBackGroundNav",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '基本设置'},
          {path: '/config/backgroundNavList', title: '后台导航列表'},
          {path: '', title: '新增后台导航'}
        ],
        ruleForm: {
          navName: '',
          parentNavName: 'shanghai',
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
            {required: true, message: '请输入跳转路径', trigger: 'blur'},
          ],
          navPosition: [
            {required: true, message: '请输入位置', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
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
