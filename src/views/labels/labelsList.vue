<template>
  <div class="labelsListBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-row :gutter="15" class="searchBox">
        <el-col :span="4">
          <el-input
            placeholder="请输入标签名称"
            v-model="tabName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="searchBtn" size="medium">查询</el-button>
        </el-col>
        <el-col :span="4" :push="12" align="right">
          <el-button type="primary" class="searchBtn" size="medium">新建标签</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        row-key="id"
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
          prop="tabName"
          label="标签标题">
        </el-table-column>
        <el-table-column
          prop="articles"
          label="相关文章数量">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建日期"
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
              v-if="scope.row.state == 1"
              @click="edit(scope.row.id)"
              plain>
              停用
            </el-button>
            <el-button
              size="mini"
              type="info"
              v-else
              @click="edit(scope.row.id)"
              plain>
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
    name: "labelsList",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '标签管理'},
          {path: '', title: '标签列表'}
        ],
        tableData: [
          {
            id: 1,
            index: 1,
            createDate: '2016-05-02',
            tabName: 'lalalalalla',
            articles: '1',
            state: '1'
          },
          {
            id: 2,
            index: 2,
            createDate: '2016-05-02',
            tabName: 'lalalalalla',
            articles: '1',
            state: '2'
          },
          {
            id: 3,
            index: 3,
            createDate: '2016-05-04',
            tabName: 'lalalalalla',
            articles: '1',
            state: '1'
          },
          {
            id: 4,
            index: 4,
            createDate: '2016-05-01',
            tabName: 'lalalalalla',
            articles: '1',
            state: '1'
          },
          {
            id: 5,
            index: 5,
            createDate: '2016-05-03',
            tabName: 'lalalalalla',
            articles: '2',
            state: '1'
          },
          {
            id: 6,
            index: 6,
            createDate: '2016-05-03',
            tabName: 'lalalalalla',
            articles: '1',
            state: '1'
          }
        ],
        tabName: '',
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      edit(id) {
        console.log(id)
        location.hash = '/article/editArticle'
      },
      details(id) {
        console.log(id)
      },
      del(id) {
        this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
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

</style>
