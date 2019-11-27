<template>
  <div class="loginMainBG">
    <div class="loginMainBox">
      <div class="clearfix">
        <img class="left" src="../../assets/images/dzgj-logo.png" alt="">
        <h3 class="right title">管理员登录</h3>
      </div>
      <div class="adminInfoBox">
        <el-input
          type="text"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          v-model="userName"
          clearable
        >
        </el-input>
        <el-input
          type="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="password"
          clearable
          show-password
        >
        </el-input>
        <el-button type="primary" @click="login">登&emsp;录</el-button>
        <div class="clearfix others">
          <span class="left">忘记密码？</span>
          <span class="right" @click="clearInfo">重置</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        userName: 'admin',
        password: 'admin',
      }
    },
    methods: {
      clearInfo() {
        this.userName = ''
        this.password = ''
      },
      async login() {
        let {data} = await this.$axios.post('/api/checkLogin', {
          userName: this.userName,
          password: this.password
        })
        if (data.code == 200) {
          this.$message({
            type: 'success',
            message: '登陆成功!'
          });
          window.sessionStorage.setItem('adminId', data.result.adminId)
          window.sessionStorage.setItem('adminName', data.result.adminName)
          this.$router.push('/public')
        } else {
          this.$message({
            type: 'warning',
            message: '用户名或密码不正确!'
          });
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .loginMainBG {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #2f4157;

    .loginMainBox {
      width: 450px;
      /*height: 400px;*/
      /*background-color: #fff;*/
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -70%);
    }

    .title {
      font-size: 20px;
      font-weight: 400;
      color: #FFF;
      line-height: 40px;
    }

    .el-input, .el-button {
      margin-top: 30px;
    }

    .el-button {
      width: 100%;
    }

    .others {
      margin-top: 10px;
      padding: 0 10px;
      color: #ccc;

      span {
        cursor: pointer;
      }
    }
  }
</style>
