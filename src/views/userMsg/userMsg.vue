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
                :timestamp="activity.createTime">
                <span class="nickName">{{activity.nickName}}</span>
                <span>回复</span>
                <span class="nickName">{{activity.respondTo}}</span>
                <span>:</span>
                <span>{{activity.desc}}</span>
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
          prop="desc">
        </el-table-column>
        <el-table-column
          label="评论文章"
          prop="article"
          width="250">
        </el-table-column>
        <el-table-column
          label="评论时间"
          prop="createTime"
          width="200"
          sortable>
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
    name: "userMsg",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '用户管理'},
          {path: '', title: '用户留言'}
        ],
        tableData: [
          {
            id: 1,
            index: '1',
            nickName: '鸡蛋仔',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            article: '相关文章',
            createTime: '2019-09-17',
            reply: [
              {
                id: 30,
                index: '1',
                nickName: 'admin',
                respondTo: '鸡蛋仔',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                createTime: '2019-09-17',
              },
              {
                id: 31,
                index: '2',
                nickName: '鸡蛋仔',
                respondTo: 'admin',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                createTime: '2019-09-17',
              },
              {
                id: 32,
                index: '3',
                nickName: 'admin',
                respondTo: '鸡蛋仔',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                createTime: '2019-09-17',
              }
            ]
          },
          {
            id: 2,
            index: '2',
            nickName: '好滋好味',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            article: '相关文章',
            createTime: '2019-09-15',
            reply: []
          },
          {
            id: 3,
            index: '3',
            nickName: '桂圆上火',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            article: '相关文章',
            createTime: '2019-09-14',
            reply: []
          },
          {
            id: 5,
            index: '4',
            nickName: '好吃不过饺子',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            article: '相关文章',
            createTime: '2019-09-11',
            reply: []
          }
        ],
        currentPage: 1
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      del(id) {
        this.$confirm('此操作将永久删除该条评论, 是否继续?', '提示', {
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
  .el-timeline-item__content span {
    font-size: 14px;
  }

  .el-timeline-item__content .nickName {
    color: #009688;
  }
</style>
