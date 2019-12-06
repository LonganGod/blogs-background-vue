<template>
  <div class="frontDeskNavListBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-row :gutter="15" class="searchBox">
        <el-col :span="4">
          <el-input
            placeholder="请输入导航名称"
            v-model="navName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="searchBtn" size="medium">查询</el-button>
        </el-col>
        <el-col :span="4" :push="12" align="right">
          <el-button type="primary" class="searchBtn" size="medium" @click="addFrontDeskNav">新增导航</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        row-key="labelId"
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
          prop="navName"
          label="导航名称">
        </el-table-column>
        <el-table-column
          prop="navPath"
          label="导航路由">
        </el-table-column>
        <el-table-column
          prop="cateName"
          label="对应文章分类">
        </el-table-column>
        <el-table-column
          prop="navIndex"
          label="导航位置">
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
              v-if="scope.row.navStatus == 1"
              @click="change(scope.row.navId, 0)"
              plain>
              停用
            </el-button>
            <el-button
              size="mini"
              type="info"
              v-else
              @click="change(scope.row.navId, 1)"
              plain>
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
        :total="totalPage">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    name: "frontDeskNavList",
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
          {path: '', title: '前台导航设置'}
        ],
        tableData: [],
        navName: '',
        totalPage: 0,
        pageList: 5,
        currentPage: 1,
      }
    },
    methods: {
      async getDate() {
        let {data} = await this.$axios.get('/api/frontDesk/getFrontDeskNavList', {
          params: {
            currentPage: this.currentPage,
            pageList: this.pageList,
          }
        })
        if (data.code == 200) {
          this.totalPage = data.totalPage
          for (let i = 0; i < data.result.length; i++) {
            data.result[i].index = i + 1 + (this.pageList * (this.currentPage - 1))
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
      addFrontDeskNav() {
        this.$router.push('/config/addFrontDeskNav')
      },
      edit(id) {
        this.$router.push('/config/editFrontDeskNav?id=' + id)
      },
      change(id, status) {
        this.$confirm('此操作将改变该导航状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$axios.get('/api/frontDesk/changeFrontDeskNavStatus', {
            params: {
              status: status,
              navId: id
            }
          })

          if (data.code == 200 && status == 0) {
            this.$message({
              type: 'success',
              message: '停用成功!'
            });
            this.getDate()
          } else if (data.code == 200 && status == 1) {
            this.$message({
              type: 'success',
              message: '启用成功!'
            });
            this.getDate()
          }
        })
      },
      del(id) {
        this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$axios.get('/api/frontDesk/deleteFrontDeskNav', {
            params: {navId: id}
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

</style>
