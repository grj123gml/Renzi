<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools :treeNode="company" :isRoot="true"></TreeTools>
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools :treeNode="data"></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        // children: 'children', //树形默认查找子节点通过children
        label: 'name' //将data中展示到树形结构中的数据名
      },
      company: { name: '传智教育', manager: '负责人' }
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="less"></style>
