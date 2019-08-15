<template>
  <div class="userListBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card userListMain">
      <el-table
        :data="tdObjArr"
        border
        stripe
        row-key="id"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="45">
        </el-table-column>
        <el-table-column
          sortable
          prop="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="300">
        </el-table-column>
        <el-table-column
          prop="userType"
          label="用户类型"
          width="100"
          :filters="userTypeFilters"
          :filter-method="filterUserType">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.userType === 1"
              type="warning"
              disable-transitions>
              管理员
            </el-tag>
            <el-tag
              v-else-if="scope.row.userType === 2"
              disable-transitions>
              注册用户
            </el-tag>
            <el-tag
              v-else-if="scope.row.userType === 3"
              type="success"
              disable-transitions>
              游客
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable
          :filters="createTimeFilters"
          :filter-method="filterCreateTime">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'

  export default {
    name: "userList",
    components: {
      'WSBreadcrumb': WSBreadcrumb
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '用户管理'},
          {path: '', title: '用户列表'}
        ],
        tdObjArr: [
          {
            id: 1,
            index: 1,
            userName: '王小虎',
            userType: 2,
            createTime: '2019-08-12'
          }, {
            id: 2,
            index: 2,
            userName: '游客K_22323123',
            userType: 3,
            createTime: '2019-08-12'
          }, {
            id: 3,
            index: 3,
            userName: 'admin',
            userType: 1,
            createTime: '2019-08-11',
            hasChildren: true
          }, {
            id: 4,
            index: 4,
            userName: '游客K_345345',
            userType: 3,
            createTime: '2019-08-15'
          }],
        userTypeFilters: [
          {text: '管理员', value: '管理员'},
          {text: '注册用户', value: '注册用户'},
          {text: '游客', value: '游客'}
        ],
        createTimeFilters: [
          {text: '2019-08-11', value: '2019-08-11'},
          {text: '2019-08-12', value: '2019-08-12'},
          {text: '2019-08-13', value: '2019-08-13'},
          {text: '2019-08-14', value: '2019-08-14'},
          {text: '2019-08-15', value: '2019-08-15'},
        ],
      }
    },
    methods: {
      handleSelectionChange(val) {
        console.log(val)
      },
      filterCreateTime(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      filterUserType(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>

<style scoped lang="less">
  .userListMain {
    margin-top: 15px;
  }
</style>
