<template>
  <div class="userListBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-table
        :data="tdObjArr"
        border
        stripe
        row-key="id"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          sortable
          prop="index"
          label="序号"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="头像"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-avatar size="large" :src="scope.row.icon" v-if="scope.row.icon != ''"></el-avatar>
            <el-avatar size="large" :src="scope.row.icon" v-else>游</el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="250">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="250">
        </el-table-column>
        <el-table-column
          prop="userType"
          label="用户类型"
          width="150"
          align="center"
          :filters="userTypeFilters"
          :filter-method="filterUserType">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.userType === 1"
              type="warning"
              disable-transitions>
              管理员
            </el-tag>
            <el-tag
              v-else-if="scope.row.userType === 2"
              disable-transitions>
              注册用户
            </el-tag>
            <el-tag
              v-else-if="scope.row.userType === 3"
              type="success"
              disable-transitions>
              游客
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable>
          <template slot-scope="scope">
            {{scope.row.createTime | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="details(scope.row.id)"
              plain>
              查看
            </el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="del(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="10"
        layout="total, prev, pager, next, sizes"
        :total="totalList">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    name: "userList",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.getData();
      this.getTotal();
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '用户管理'},
          {path: '', title: '用户列表'}
        ],
        tdObjArr: [],
        userTypeFilters: [
          {text: '管理员', value: '管理员'},
          {text: '注册用户', value: '注册用户'},
          {text: '游客', value: '游客'}
        ],
        currentPage: 1,
        totalList: 0,
      }
    },
    methods: {
      async getData() {
        var {data} = await this.$axios.get('/api/userList/getUserData', {a: 1});
        if (data.code == 200) {
          this.tdObjArr = [];
          for (let i = 0; i < data.result.length; i++) {
            var item = data.result[i];
            var obj = {};
            obj.id = item.userId;
            obj.index = i + 1;
            obj.icon = item.userIcon == null ? '' : item.userIcon;
            obj.userName = item.userName;
            obj.nickName = item.nickName;
            obj.email = item.userEmail;
            obj.userType = item.userType;
            obj.createTime = item.createTime;
            this.tdObjArr.push(obj)
          }
        }
      },
      getTotal() {
        this.$axios.get('/api/userList/totalList').then(({data}) => {
          this.totalList = data.result.length
        })
      },
      handleSelectionChange(val) {
        console.log(val)
      },
      filterUserType(value, row) {
        let userType = 0
        switch (value) {
          case '管理员' :
            userType = 1
            break
          case '注册用户' :
            userType = 2
            break
          case '游客' :
            userType = 3
            break
        }
        return row.userType === userType;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      details(userId) {
        location.hash = '/user/userDetails'
      },
      del(userId) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        console.log(userId)
      }
    }
  }
</script>

<style scoped lang="less">
</style>
