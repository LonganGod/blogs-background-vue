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
        row-key="navId"
        border
        :tree-props="{children: 'children'}">
        <el-table-column
          prop="createTime"
          label="创建日期"
          sortable>
          <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
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
          prop="navJumpPage"
          label="跳转地址">
        </el-table-column>
        <el-table-column
          prop="navIndex"
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
              @click="edit(scope.row.navId)"
              plain>
              编辑
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click="disable(scope.row.navId)"
              plain
              v-if="scope.row.navStatus == 1">
              停用
            </el-button>
            <el-button
              size="mini"
              type="info"
              @click="enable(scope.row.navId)"
              plain
              v-if="scope.row.navStatus == 2">
              启用
            </el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="del(scope.row.navId)">
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
        :total="totalList">
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
    created() {
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '基本设置'},
          {path: '', title: '后台导航列表'}
        ],
        tableData: [],
        pageList: 10,
        currentPage: 1,
        totalList: 0,
        cateName: ''
      }
    },
    methods: {
      async getData() {
        let {data} = await this.$axios.get('/api/backend/getBackendNavList', {
          params: {
            currentPage: this.currentPage,
            pageList: this.pageList
          }
        })
        if (data.code == 200) {
          this.tableData = data.result
          this.totalList = data.totalPage
        }
      },
      handleSizeChange(val) {
        this.pageList = val
        this.getData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getData()
      },

      addNav() {
        this.$router.push('/config/addBackgroundNav')
      },
      edit(id) {
        this.$router.push('/config/editBackgroundNav?navId=' + id)
      },
      disable(id) {
        this.$confirm('此操作将停用该条导航, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$axios.get('/api/backend/disableBackendNav', {params: {navId: id}})
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '停用成功'
            })
            this.getData()
          }
        }).catch(() => {
          return false
        });
      },
      enable(id) {
        this.$confirm('此操作将启用该条导航, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$axios.get('/api/backend/enableBackendNav', {params: {navId: id}})
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '启用成功'
            })
            this.getData()
          }
        }).catch(() => {
          return false
        });
        console.log(id)
      },
      del(id) {
        this.$confirm('此操作将永久删除该条导航, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$axios.get('/api/backend/deleteBackendNav', {params: {navId: id}})
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getData()
          }
        }).catch(() => {
          return false
        });
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
