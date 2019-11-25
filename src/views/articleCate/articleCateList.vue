<template>
  <div class="articleCateListBox">
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
          <el-button type="primary" class="addBtn" @click="addCate" size="medium">新建一级分类</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tdObjArr"
        border
        stripe
        row-key="cateId"
        style="width: 100%">
        <el-table-column
          sortable
          prop="index"
          label="序号"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cateName"
          label="分类名称">
          <template slot-scope="scope">
            <a
              href="javascript:void(0)"
              class="articleCateName"
              @click="showSecCate(scope.row.cateId)">
              {{scope.row.cateName}}
            </a>
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
          width="250"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="edit(scope.row.cateId)"
              plain>
              编辑
            </el-button>
            <el-button
              v-if="scope.row.cateStatus == 1"
              size="mini"
              type="warning"
              @click="changeStatus(scope.row.cateId, 2)"
              plain>
              停用
            </el-button>
            <el-button
              v-else
              size="mini"
              type="info"
              @click="changeStatus(scope.row.cateId, 1)"
              plain>
              启用
            </el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="del(scope.row.cateId)">
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
    name: "articleCateList",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '文章管理'},
          {path: '', title: '文章一级分类'}
        ],
        tdObjArr: [],
        totalList: 0,
        pageList: 5,
        currentPage: 1,
        cateName: ''
      }
    },
    methods: {
      async getData() {
        let {data} = await this.$axios.get('/api/article/getFirCateList', {
          params: {
            currentPage: this.currentPage,
            pageList: this.pageList
          }
        })

        if (data.code == 200) {
          for (let i = 0; i < data.result.length; i++) {
            data.result[i].index = i + 1 + (this.pageList * (this.currentPage - 1))
          }
          this.tdObjArr = data.result
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
      changeStatus(id, status) {
        let quertion = status == 1 ? '此操作将启用该条分类, 是否继续?' : '此操作将停用该条分类, 是否继续?'
        let resultStr = status == 1 ? '启用成功' : '停用成功'

        this.$confirm(quertion, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$axios.get('/api/article/changeFirCateStatus', {params: {id, status}})
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: resultStr
            })
            this.getData()
          }
        }).catch(() => {
          return false
        });
      },
      del(id) {
        this.$confirm('此操作将永久删除该类目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {data} = await this.$axios.get('/api/article/deleteFirCate', {params: {id}})
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getData()
          }
        }).catch(() => {
          return false
        });
      },
      edit(id) {
        this.$router.push('/article/editArticleCate?id=' + id)
      },
      showSecCate(id) {
        this.$router.push('/article/secArticleCateList?catePid=' + id)
      },
      addCate() {
        location.hash = '/article/addArticleCate'
      }
    }
  }
</script>

<style scoped>
  .articleCateName {
    color: #009688;
  }

  .addBtn /deep/ span,
  .searchBtn /deep/ span {
    font-size: 14px;
  }
</style>
