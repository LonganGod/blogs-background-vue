<template>
  <div class="secArticleCateListBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-row :gutter="15" class="searchBox">
        <el-col :span="4">
          <el-input
            placeholder="请输入类别名称"
            v-model="cateName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="searchBtn" size="medium">查询</el-button>
        </el-col>
        <el-col :span="4" :push="12" align="right">
          <el-button type="primary" class="addBtn" @click="addSecCate" size="medium">新建二级分类</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tdObjArr"
        border
        stripe
        row-key="id"
        style="width: 100%">
        <el-table-column
          sortable
          prop="index"
          label="序号"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="secArticleCateName"
          label="分类名称">
        </el-table-column>
        <el-table-column
          prop="articleCateName"
          label="所属一级分类">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
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
    name: "secArticleCateList",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '文章管理'},
          {path: '/article/articleCateList', title: '文章一级分类'},
          {path: '', title: '文章二级分类'}
        ],
        tdObjArr: [
          {
            id: 1,
            index: 1,
            secArticleCateName: 'HTML',
            articleCateName: 'WEB前端',
            createTime: '2019-08-12'
          },
          {
            id: 2,
            index: 2,
            secArticleCateName: 'CSS样式',
            articleCateName: 'WEB前端',
            createTime: '2019-08-12'
          },
          {
            id: 3,
            index: 3,
            secArticleCateName: 'JavaScript',
            articleCateName: 'WEB前端',
            createTime: '2019-08-11',
          },
          {
            id: 4,
            index: 4,
            secArticleCateName: 'Vue.js',
            articleCateName: 'WEB前端',
            createTime: '2019-08-15'
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
      edit(id) {
        console.log(id)
        location.hash = '/article/editSecArticleCate'
      },
      del(id) {
        this.$confirm('此操作将永久删除该类目, 是否继续?', '提示', {
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
      addSecCate() {
        location.hash = '/article/addSecArticleCate'
      }
    }
  }
</script>

<style scoped>
  .addBtn /deep/ span,
  .searchBtn /deep/ span {
    font-size: 14px;
  }
</style>
