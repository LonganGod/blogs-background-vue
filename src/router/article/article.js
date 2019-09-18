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
    path: '/article/AddArticleCate',
    component: AddArticleCate
  },
  {
    name: 'EditArticleCate',
    path: '/article/EditArticleCate',
    component: EditArticleCate
  },
  {
    name: 'SecArticleCateList',
    path: '/article/SecArticleCateList',
    component: SecArticleCateList
  },
  {
    name: 'AddSecArticleCate',
    path: '/article/AddSecArticleCate',
    component: AddSecArticleCate
  },
  {
    name: 'EditSecArticleCate',
    path: '/article/EditSecArticleCate',
    component: EditSecArticleCate
  },
]
