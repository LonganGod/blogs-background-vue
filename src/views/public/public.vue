<template>
  <div class="publicBox">
    <header class="publicHead">
      <h4 class="publicTitle left">个人博客 - 后台管理</h4>
      <el-button type="info" :icon="iconClass" class="checkIconNav left" @click="checkIconNav"></el-button>
      <p class="userInfo right">
        <el-avatar size="large" :src="icon"></el-avatar>
        {{adminName}}
      </p>
    </header>
    <div class="publicBody">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo publicNav"
        background-color="#24292e"
        text-color="#ccc"
        active-text-color="#fff"
        :collapse="isCollapse"
        unique-opened
      >
        <template v-for="item in navList">
          <el-submenu v-if="item.children.length != 0" :index="String(item.navIndex)" :key="item.navIndex">
            <template slot="title">
              <i :class="item.navIcon"></i>
              <span>{{item.navName}}</span>
            </template>

            <template v-for="child in item.children">
              <router-link :to="child.navJumpPage">
                <el-menu-item :index="String(child.navIndex)">{{child.navName}}</el-menu-item>
              </router-link>
            </template>
          </el-submenu>

          <el-menu-item v-else :key="item.navIndex" :index="String(item.navIndex)">
            <router-link :to="item.navJumpPage" tag="p">
              <i :class="item.navIcon"></i>
              <span>{{item.navName}}</span>
            </router-link>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="publicBodyMain">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "public",
    created() {
      this.getData()
    },
    data() {
      return {
        iconClass: 'el-icon-menu',
        isCollapse: false,  // 导航收起
        navList: [],
        adminName: '',
        icon: ''
      }
    },
    methods: {
      checkIconNav() {
        if (this.isCollapse) {
          this.isCollapse = false
          this.iconClass = 'el-icon-menu'
        } else {
          this.isCollapse = true
          this.iconClass = 'el-icon-s-unfold'
        }
      },
      getPermissionList(arr, permissions) {
        let len = arr.length
        for (let i = 0; i < len; i++) {
          if (arr[i].children.length == 0 && !permissions.includes(arr[i].navId)) {
            arr.splice(i, 1)
            i--
            len--
          } else if (arr[i].children.length != 0) {
            arr[i].children = this.getPermissionList(arr[i].children, permissions)
            if (arr[i].children.length == 0) {
              arr.splice(i, 1)
              i--
              len--
            }
          }
        }
        return arr
      },
      getNavList(arr) {
        let len = arr.length
        if (len != 0) {
          for (let i = 0; i < len; i++) {
            if (arr[i].type == 0) {
              arr.splice(i, 1)
              i--
              len--
            } else {
              if (arr[i].children.length != 0) {
                arr[i].children = this.getNavList(arr[i].children)
              }
            }
          }
        }
        return arr
      },
      async getData() {
        let adminPermissions = []

        let {data: adminData} = await this.$axios.get('/api/public/getAdminData', {
          params: {
            id: window.sessionStorage.getItem('adminId')
          }
        })
        if (adminData.code == 200) {
          this.adminName = adminData.result.adminName
          this.icon = adminData.result.adminIcon
          adminPermissions = adminData.result.rolePermissions.split(',')
          adminPermissions.forEach((item, index) => {
            adminPermissions[index] = parseInt(item)
          })
        }

        let {data: backendNav} = await this.$axios.get('/api/public/getBackendNavList')
        if (backendNav.code == 200) {
          let navList = this.getPermissionList(backendNav.result, adminPermissions)
          this.navList = this.getNavList(navList)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .publicBox {
    height: 100%;
    display: flex;
    flex-direction: column;

    .publicHead {
      height: 60px;
      line-height: 60px;
      color: #fff;
      background-color: #24292e;

      .publicTitle {
        width: 200px;
        text-align: center;
      }

      .checkIconNav {
        padding: 6px;
        margin-top: 15px;
      }

      .userInfo {
        margin-right: 30px;
      }
    }

    .publicBody {
      flex: 1;

      .publicNav {
        height: 100%;
        float: left;

        li, span {
          font-size: 13px;
        }

        i {
          margin-right: 0;
        }
      }

      .publicBodyMain {
        overflow: auto;
        height: 100%;
        background-color: #fafafa;
        box-sizing: border-box;
        padding: 20px;
      }
    }
  }

  .el-avatar {
    margin-right: 10px;
  }
</style>
