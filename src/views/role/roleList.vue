<template>
  <div class="roleListBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-row :gutter="15" class="searchBox">
        <el-col :span="4">
          <el-input
            placeholder="请输入角色名称"
            v-model="roleName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="searchBtn" size="medium">查询</el-button>
        </el-col>
        <el-col :span="4" :push="12" align="right">
          <el-button type="primary" class="searchBtn" size="medium" @click="addRole">新建角色</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        row-key="roleId"
        border
        stripe>
        <el-table-column
          prop="index"
          label="序号"
          width="80"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期"
          sortable>
          <template slot-scope="scope">
            {{scope.row.createTime | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="280"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="edit(scope.row.roleId, 0)"
              plain>
              编辑
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="edit(scope.row.roleId)"
              plain>
              编辑权限
            </el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="del(scope.row.roleId)">
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
        :page-size="pageList"
        layout="total, prev, pager, next, sizes"
        :total="totalPage">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    name: "roleList",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.getDate()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '基本设置'},
          {path: '', title: '角色管理列表'}
        ],
        tableData: [],
        roleName: '',
        totalPage: 0,
        pageList: 5,
        currentPage: 1,
      }
    },
    methods: {
      async getDate() {
        let {data} = await this.$axios.get('/api/role/getRoleList', {
          params: {
            currentPage: this.currentPage,
            pageList: this.pageList,
          }
        })
        console.log(data)
        if (data.code == 200) {
          this.totalPage = data.totalPage
          for (let i = 0; i < data.result.length; i++) {
            data.result[i].index = i + 1
          }
          this.tableData = data.result
        }
      },
      handleSizeChange(val) {
        this.pageList = val
        this.getDate()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getDate()
      },
      addRole() {
        this.$router.push('/config/addRole')
      },
      edit(id, action) {
        this.$router.push(`/config/editRole?roleId=${id}&action=${action}`)
      },
      del(id) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$axios.get('/api/config/deleteRole', {
            params: {id: id}
          })

          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getDate()
          }
        })
      },
    }
  }
</script>

<style scoped>
  .roleListBox /deep/ .el-table__row--level-1 td {
    background-color: #FAFAFA;
    padding-left: 20px;
  }

  .roleListBox /deep/ .el-table__row--level-1 td:last-child,
  .roleListBox /deep/ .el-table__row--level-1 td:first-child {
    padding-left: 0;
  }
</style>
