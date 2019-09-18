import ArticleCateList from '../../views/articleCate/articleCateList'
import AddArticleCate from '../../views/articleCate/addArticleCate'
import EditArticleCate from '../../views/articleCate/editArticleCate'
import SecArticleCateList from '../../views/secArticleCate/secArticleCateList'
import AddSecArticleCate from '../../views/secArticleCate/addSecArticleCate'
import EditSecArticleCate from '../../views/secArticleCate/editSecArticleCate'

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
]
