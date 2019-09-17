<template>
  <div class="publicBox">
    <header class="publicHead">
      <h4 class="publicTitle left">个人博客 - 后台管理</h4>
      <el-button type="info" :icon="iconClass" class="checkIconNav left" @click="checkIconNav"></el-button>
      <p class="userInfo right">
        <el-avatar size="large" :src="icon"></el-avatar>
        admin
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
          <el-submenu v-if="item.children" :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>

            <template v-for="child in item.children">
              <router-link :to="child.link">
                <el-menu-item :index="child.index">{{child.title}}</el-menu-item>
              </router-link>
            </template>
          </el-submenu>

          <el-menu-item v-else :key="item.index" :index="item.index">
            <router-link :to="item.link" tag="p">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
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
    data() {
      return {
        iconClass: 'el-icon-menu',
        isCollapse: false,  // 导航收起
        navList: [
          {
            index: '1',
            link: '/home',
            title: '首页',
            icon: 'el-icon-s-home'
          },
          {
            index: '2',
            title: '用户管理',
            icon: 'el-icon-user-solid',
            children: [
              {
                index: '2-1',
                link: '/user/userList',
                title: '用户列表'
              },
              {
                index: '2-2',
                link: '/user/userMsg',
                title: '用户留言'
              },
            ]
          },
          {
            index: '3',
            title: '文章管理',
            icon: 'el-icon-document',
            children: [
              {
                index: '3-1',
                link: '/article/articleCateList',
                title: '文章分类'
              },
              {
                index: '3-2',
                link: '/article/articleList',
                title: '文章列表'
              },
              {
                index: '3-3',
                link: '/article/releaseArticle',
                title: '发布文章'
              },
            ]
          },
          {
            index: '4',
            link: '/labels',
            title: '标签管理',
            icon: 'el-icon-collection-tag'
          },
          {
            index: '5',
            link: '/charts',
            title: '数据统计',
            icon: 'el-icon-s-data'
          }
        ],
        icon: require('../../uploads/userIcon/1.jpg')
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
      }
    }
  }
</script>

<style scoped lang="less">
  .publicBox {
    height: 100%;

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
      display: flex;
      height: 100%;

      .publicNav {
        height: 100%;

        li, span {
          font-size: 13px;
        }

        i {
          margin-right: 0;
        }
      }

      .publicBodyMain {
        flex: 1;
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
