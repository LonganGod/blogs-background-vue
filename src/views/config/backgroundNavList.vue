<template>
  <div class="backgroundNavListBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-row :gutter="15" class="searchBox">
        <el-col :span="4">
          <el-input
            placeholder="请输入导航名称"
            v-model="cateName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="searchBtn" size="medium">查询</el-button>
        </el-col>
        <el-col :span="4" :push="12" align="right">
          <el-button type="primary" class="addBtn" @click="addNav" size="medium">新增导航</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        row-key="id"
        border
        :tree-props="{children: 'children'}">
        <el-table-column
          prop="createDate"
          label="创建日期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="navName"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="navIcon"
          label="图标">
        </el-table-column>
        <el-table-column
          prop="navUrl"
          label="跳转地址">
        </el-table-column>
        <el-table-column
          prop="position"
          label="位置"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="edit(scope.row.id)"
              plain>
              编辑
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="disable(scope.row.id)"
              plain
              v-if="scope.row.state == 1">
              停用
            </el-button>
            <el-button
              size="mini"
              type="info"
              @click="enable(scope.row.id)"
              plain
              v-if="scope.row.state == 2">
              启用
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
        :total="400">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    navName: "backgroundNavList",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '基本设置'},
          {path: '', title: '后台导航列表'}
        ],
        tableData: [
          {
            id: 1,
            createDate: '2016-05-02',
            navName: '首页',
            navIcon: 'el-icon-s-home',
            navUrl: '/home',
            state: '1',
            position: '1'
          },
          {
            id: 2,
            createDate: '2016-05-02',
            navName: '用户管理',
            navIcon: 'el-icon-user-solid',
            navUrl: '/user',
            state: '1',
            position: '2',
            children: [
              {
                id: 21,
                createDate: '2016-05-02',
                navName: '用户列表',
                navIcon: '',
                navUrl: '/user/userList',
                state: '1',
                position: '1'
              },
              {
                id: 22,
                createDate: '2016-05-02',
                navName: '用户留言',
                navIcon: '',
                navUrl: '/user/userMsg',
                state: '1',
                position: '2'
              }
            ]
          },
          {
            id: 3,
            createDate: '2016-05-04',
            navName: '文章管理',
            navIcon: 'el-icon-document',
            navUrl: '/article',
            state: '1',
            position: '3',
            children: [
              {
                id: 31,
                createDate: '2016-05-02',
                navName: '文章分类',
                navIcon: '',
                navUrl: '/article/articleCateList',
                state: '1',
                position: '1'
              },
              {
                id: 32,
                createDate: '2016-05-02',
                navName: '文章列表',
                navIcon: '',
                navUrl: '/article/articleList',
                state: '2',
                position: '2'
              },
              {
                id: 33,
                createDate: '2016-05-02',
                navName: '发布文章',
                navIcon: '',
                navUrl: '/article/releaseArticle',
                state: '2',
                position: '3'
              }
            ]
          },
          {
            id: 4,
            createDate: '2016-05-01',
            navName: '标签管理',
            navIcon: 'el-icon-collection-tag',
            navUrl: '/labels',
            state: '1',
            position: '4'
          },
          {
            id: 5,
            createDate: '2016-05-03',
            navName: '数据统计',
            navIcon: 'el-icon-s-data',
            navUrl: '/charts',
            state: '2',
            position: '5'
          },
          {
            id: 6,
            createDate: '2016-05-03',
            navName: '基本设置',
            navIcon: 'el-icon-setting',
            navUrl: '/config',
            state: '1',
            position: '6',
            children: [
              {
                id: 61,
                createDate: '2016-05-02',
                navName: '后台导航列表',
                navIcon: '',
                navUrl: '/config/backgroundNavList',
                state: '1',
                position: '1'
              },
              {
                id: 62,
                createDate: '2016-05-02',
                navName: '前台导航列表',
                navIcon: '',
                navUrl: '/config/frontDeskNav',
                state: '1',
                position: '2'
              },
              {
                id: 63,
                createDate: '2016-05-02',
                navName: '权限管理',
                navIcon: '',
                navUrl: '/config/permissions',
                state: '1',
                position: '3'
              }
            ]
          }
        ],
        currentPage: 1,
        cateName: ''
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      addNav() {
        location.hash = '/config/addBackgroundNav'
      },
      edit(id) {
        console.log(id)
        location.hash = '/config/editBackgroundNav'
      },
      disable(id) {
        this.$confirm('此操作将停用该条导航, 是否继续?', '提示', {
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
        console.log(id)
      },
      enable(id) {
        this.$confirm('此操作将启用该条导航, 是否继续?', '提示', {
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
        console.log(id)
      },
      del(id) {
        this.$confirm('此操作将永久删除该条导航, 是否继续?', '提示', {
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
        console.log(id)
      },
    }
  }
</script>

<style scoped>
  .backgroundNavListBox /deep/ .el-table__row--level-1 td {
    background-color: #FAFAFA;
    padding-left: 20px;
  }

  .backgroundNavListBox /deep/ .el-table__row--level-1 td:last-child,
  .backgroundNavListBox /deep/ .el-table__row--level-1 td:first-child {
    padding-left: 0;
  }
</style>
