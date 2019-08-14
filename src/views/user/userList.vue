<template>
  <div class="userListBox">
    <el-card class="box-card">
      <WSBreadcrumb :linkArr="linkArr"></WSBreadcrumb>
    </el-card>

    <el-card class="box-card userListMain">
      <WSTable :config="config"></WSTable>
    </el-card>
  </div>
</template>

<script>
  import WSBreadcrumb from '../../component/breadcrumb/breadcrumb'
  import WSTable from '../../component/table/table'

  export default {
    name: "userList",
    components: {
      'WSBreadcrumb': WSBreadcrumb,
      'WSTable': WSTable
    },
    data() {
      return {
        linkArr: [
          {path: '', title: '用户管理'},
          {path: '', title: '用户列表'}
        ],
        config: {
          thObjArr: [
            {
              attrName: 'index',
              attrValue: '序号',
              width: '80'
            }, {
              attrName: 'userName',
              attrValue: '用户名',
              width: '300'
            }, {
              attrName: 'userType',
              attrValue: '用户类型',
              width: '100'
            }, {
              attrName: 'createTime',
              attrValue: '创建时间',
              width: ''
            }, {
              attrName: '',
              attrValue: '操作',
              width: '150'
            }
          ],
          trObjArr: [
            {
              id: 1,
              index: 1,
              userName: '王小虎',
              userType: 2,
              createTime: '2016-05-02'
            }, {
              id: 2,
              index: 2,
              userName: '游客K_22323123',
              userType: 3,
              createTime: '2016-05-02'
            }, {
              id: 3,
              index: 3,
              userName: 'admin',
              userType: 1,
              createTime: '2016-05-02',
              hasChildren: true
            }, {
              id: 4,
              index: 4,
              userName: '游客K_345345',
              userType: 3,
              createTime: '2016-05-02'
            }],
          borderStyle: true,
          lazyStyle: true,
          showCheckbox: true,
          stripe: false,
          rowKey: 'id',
          handleSelectionChange(val) {
            console.log(val)
          },
          loadFun(tree, treeNode, resolve) {
            setTimeout(() => {
              resolve([
                {
                  id: 31,
                  index: 1,
                  userName: '游客K_345345',
                  userType: 3,
                  createTime: '2016-05-02'
                }, {
                  id: 32,
                  index: 2,
                  userName: '游客K_312314',
                  userType: 3,
                  createTime: '2016-05-02'
                }
              ])
            }, 1000)
          }
        }
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .userListMain {
    margin-top: 15px;
  }
</style>
