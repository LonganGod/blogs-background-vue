<template>
  <div class="articleListBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-row :gutter="15" class="searchBox">
        <el-col :span="4">
          <el-input
            placeholder="请输入文章名称"
            v-model="articleName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-cascader
            v-model="cate"
            :options="cateList"
            clearable
            :show-all-levels="false"
            placeholder="请选择文章分类">
          </el-cascader>
        </el-col>
        <el-col :span="4">
          <el-select v-model="state" placeholder="请选择文章状态" clearable>
            <el-option label="已发布" value="1"></el-option>
            <el-option label="草稿" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="searchBtn" size="medium">查询</el-button>
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
          prop="articleName"
          label="文章标题">
        </el-table-column>
        <el-table-column
          prop="cate"
          label="所属分类"
          width="250">
        </el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
          width="250"
          align="center">
          <template slot-scope="scope">
            <template v-for="(item, index) in scope.row.tags">
              <el-tag v-if="index != scope.row.tags.length - 1" style="margin-right: 10px;">
                {{item.name}}
              </el-tag>
              <el-tag v-else>{{item.name}}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="80"
          align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.state == 1">已发布</template>
            <template v-if="scope.row.state == 2">草稿</template>
          </template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建日期"
          width="120"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
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
    name: "articleList",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '文章管理'},
          {path: '', title: '文章列表'}
        ],
        cateList: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则'
              },
              {
                value: 'daohang',
                label: '导航'
              }
            ]
          },
          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic'
              },
              {
                value: 'form',
                label: 'Form'
              },
              {
                value: 'data',
                label: 'Data'
              },
              {
                value: 'notice',
                label: 'Notice'
              },
              {
                value: 'navigation',
                label: 'Navigation'
              },
              {
                value: 'others',
                label: 'Others'
              }
            ]
          },
          {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'jiaohu',
                label: '组件交互文档'
              }
            ]
          }
        ],
        tableData: [
          {
            id: 1,
            index: 1,
            createDate: '2016-05-02',
            articleName: 'lalalalalla',
            cate: 'el-icon-s-home',
            tags: [
              {id: 1, name: 'JS'},
              {id: 2, name: 'CSS'},
            ],
            state: '1'
          },
          {
            id: 2,
            index: 2,
            createDate: '2016-05-02',
            articleName: 'lalalalalla',
            cate: 'el-icon-user-solid',
            tags: [
              {id: 1, name: 'WEB'},
              {id: 2, name: 'CSS'},
            ],
            state: '1'
          },
          {
            id: 3,
            index: 3,
            createDate: '2016-05-04',
            articleName: 'lalalalalla',
            cate: 'el-icon-document',
            tags: [
              {id: 1, name: 'JS'},
              {id: 2, name: 'HTML'},
            ],
            state: '1'
          },
          {
            id: 4,
            index: 4,
            createDate: '2016-05-01',
            articleName: 'lalalalalla',
            cate: 'el-icon-collection-tag',
            tags: [
              {id: 1, name: 'VUE'},
              {id: 2, name: 'WEB'},
            ],
            state: '1'
          },
          {
            id: 5,
            index: 5,
            createDate: '2016-05-03',
            articleName: 'lalalalalla',
            cate: 'el-icon-s-data',
            tags: [
              {id: 1, name: '随笔'},
              {id: 2, name: 'CSS'},
            ],
            state: '2'
          },
          {
            id: 6,
            index: 6,
            createDate: '2016-05-03',
            articleName: 'lalalalalla',
            cate: 'el-icon-setting',
            tags: [
              {id: 1, name: 'JS'},
              {id: 2, name: '随笔'},
            ],
            state: '1'
          }
        ],
        currentPage: 1,
        articleName: '',
        cate: '',
        state: ''
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
        this.$confirm('此操作将永久删除该篇文章, 是否继续?', '提示', {
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
  .el-cascader, .el-select {
    line-height: 1;
    width: 100%;
  }
</style>
