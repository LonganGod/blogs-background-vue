import LabelList from '../../views/labels/labelsList'
import AddLabels from '../../views/labels/addLabels'
import EditLabels from '../../views/labels/editLabels'

export default [
  {
    name: 'LabelList',
    path: '/labels',
    component: LabelList
  },
  {
    name: 'addLabels',
    path: '/labels/addLabels',
    component: AddLabels
  },
  {
    name: 'editLabels',
    path: '/labels/editLabels',
    component: EditLabels
  }
]
