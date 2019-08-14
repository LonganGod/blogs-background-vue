<template>
  <el-table
    :data="config.trObjArr"
    :border="config.borderStyle"
    :stripe="config.stripe"
    :lazy="config.lazyStyle"
    :load="config.loadFun"
    :row-key="config.rowKey"
    @selection-change="config.handleSelectionChange"
    style="width: 100%"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      v-if="config.showCheckbox"
      type="selection"
      width="45">
    </el-table-column>
    <template v-for="(thItem, thIndex) in config.thObjArr">
      <el-table-column
        :key="thIndex"
        :prop="thItem.attrName"
        :label="thItem.attrValue"
        :width="thItem.width">
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
  export default {
    name: "table",
    props: ['config'],
    methods: {
    }
  }
</script>

<style scoped>

</style>
