<template>
  <div class="articleListBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-row :gutter="15" class="searchBox">
        <el-col :span="4">
          <el-input placeholder="请输入文章名称" v-model="articleName" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <el-cascader
            v-model="cate"
            :options="cateList"
            :props="cateKey"
            clearable
            :show-all-levels="false"
            placeholder="请选择文章分类"
          ></el-cascader>
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
      <el-table :data="tableData" row-key="id" border stripe>
        <el-table-column prop="index" label="序号" width="80" align="center" sortable></el-table-column>
        <el-table-column prop="articleTitle" label="文章标题"></el-table-column>
        <el-table-column prop="cateName" label="所属分类" width="250"></el-table-column>
        <el-table-column prop="articleLabel" label="标签" width="300" align="center">
          <template slot-scope="scope">
            <template v-for="(item, index) in scope.row.articleLabel">
              <el-tag
                v-if="index != scope.row.articleLabel.length - 1"
                style="margin-right: 10px;"
              >{{item.labelName}}</el-tag>
              <el-tag v-else>{{item.labelName}}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.status == 1">已发布</template>
            <template v-if="scope.row.status == 2">草稿</template>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期" width="200" align="center" sortable>
          <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="edit(scope.row.articleId)" plain>编辑</el-button>
            <el-button size="mini" type="danger" plain @click="del(scope.row.articleId)">删除</el-button>
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
        :total="totalPage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import WSBreadcrumb from "../../component/breadcrumb/breadcrumb";

export default {
  name: "articleList",
  components: {
    WSBreadcrumb: WSBreadcrumb
  },
  created() {
    this.getData();
    this.getCate();
  },
  data() {
    return {
      linkArr: [
        { path: "", title: "文章管理" },
        { path: "", title: "文章列表" }
      ],
      cateList: [],
      cateKey: {
        value: "cateId",
        label: "cateName",
        children: "children"
      },
      tableData: [],
      currentPage: 1,
      pageList: 5,
      totalPage: 0,
      articleName: "",
      cate: "",
      state: ""
    };
  },
  methods: {
    async getData() {
      let { data } = await this.$axios.get("/api/article/getArticleList", {
        params: {
          currentPage: this.currentPage,
          pageList: this.pageList
        }
      });

      if (data.code == 200) {
        this.tableData = data.result;
        this.totalPage = data.totalPage;
      }
    },
    async getCate() {
      let { data } = await this.$axios.get("/api/article/articlePageGetCate");
      if (data.code == 200) {
        this.cateList = data.result;
      }
    },
    handleSizeChange(val) {
      this.pageList = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    edit(id) {
      this.$router.push("/article/editArticle?articleId=" + id);
    },
    del(id) {
      this.$confirm("此操作将永久删除该篇文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(id);
    }
  }
};
</script>

<style scoped>
.el-cascader,
.el-select {
  line-height: 1;
  width: 100%;
}
</style>
