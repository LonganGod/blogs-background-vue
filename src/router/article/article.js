import ArticleCateList from '../../views/articleCate/articleCateList'
import AddArticleCate from '../../views/articleCate/addArticleCate'
import EditArticleCate from '../../views/articleCate/editArticleCate'

import SecArticleCateList from '../../views/secArticleCate/secArticleCateList'
import AddSecArticleCate from '../../views/secArticleCate/addSecArticleCate'
import EditSecArticleCate from '../../views/secArticleCate/editSecArticleCate'

import ArticleList from '../../views/articleList/articleList'
import ReleaseArticle from '../../views/articleList/releaseArticle'
import EditArticle from '../../views/articleList/editArticle'

export default [
  {
    name: 'ArticleCateList',
    path: '/article/articleCateList',
    component: ArticleCateList
  },
  {
    name: 'AddArticleCate',
    path: '/article/addArticleCate',
    component: AddArticleCate
  },
  {
    name: 'EditArticleCate',
    path: '/article/editArticleCate',
    component: EditArticleCate
  },
  {
    name: 'SecArticleCateList',
    path: '/article/secArticleCateList',
    component: SecArticleCateList
  },
  {
    name: 'AddSecArticleCate',
    path: '/article/addSecArticleCate',
    component: AddSecArticleCate
  },
  {
    name: 'EditSecArticleCate',
    path: '/article/editSecArticleCate',
    component: EditSecArticleCate
  },
  {
    name: 'ArticleList',
    path: '/article/articleList',
    component: ArticleList
  },
  {
    name: 'ReleaseArticle',
    path: '/article/releaseArticle',
    component: ReleaseArticle
  },
  {
    name: 'EditArticle',
    path: '/article/editArticle',
    component: EditArticle
  },
]
