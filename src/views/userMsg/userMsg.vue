<template>
  <div class="userMsgBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card main-card">
      <el-table
        :data="tableData"
        border
        stripe
        row-key="id"
        :expand-row-keys="[]"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-timeline v-if="props.row.reply.length != 0">
              <el-timeline-item
                v-for="(activity) in props.row.reply"
                :key="activity.id"
                :timestamp="activity.createTime | dateFormatSeconds">
                <span class="nickName">{{activity.nickName}}</span>
                <span>回复</span>
                <span class="nickName">{{activity.respondTo1}}</span>
                <span>:</span>
                <span>{{activity.msgDetail}}</span>
              </el-timeline-item>
            </el-timeline>
            <div align="center" v-else>暂无回复</div>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          prop="index"
          width="80"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="昵称"
          prop="nickName"
          width="180">
        </el-table-column>
        <el-table-column
          label="评论内容"
          prop="msgDetail">
        </el-table-column>
        <el-table-column
          label="评论文章"
          prop="article"
          width="350">
        </el-table-column>
        <el-table-column
          label="评论时间"
          prop="createTime"
          width="200"
          sortable>
          <template slot-scope="scope">
            {{scope.row.createTime | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80"
          align="center">
          <template slot-scope="scope">
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
    name: "userMsg",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    created() {
      this.getData()
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '用户管理'},
          {path: '', title: '用户留言'}
        ],
        tableData: [],
        currentPage: 1,
        pageList: 5,
        totalList: 0
      }
    },
    methods: {
      async getData() {
        var {data} = await this.$axios.get('/api/userMsg/getLeaveMsgData', {
          params: {
            currentPage: this.currentPage,
            pageList: this.pageList
          }
        });
        if (data.code == 200) {
          this.tableData = [];
          this.totalList = data.totalPage;
          for (let i = 0; i < data.result.length; i++) {
            var item = data.result[i];
            var obj = {};
            obj.id = item.msgId;
            obj.index = i + 1 + (this.pageList * (this.currentPage - 1));
            obj.nickName = item.nickName;
            obj.msgDetail = item.msgDetail;
            obj.article = item.articleTitle;
            obj.createTime = item.createTime;
            obj.reply = item.reply;
            this.tableData.push(obj)
          }
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
      del(msgId) {
        this.$confirm('此操作将永久删除该条评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            let {data} = await this.$axios.get('/api/userMsg/deleteMsg', {
              params: {
                msgId: msgId
              }
            })
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getData()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
    }
  }
</script>

<style scoped>
  .el-timeline-item__content span {
    font-size: 14px;
  }

  .el-timeline-item__content .nickName {
    color: #009688;
  }
</style>
