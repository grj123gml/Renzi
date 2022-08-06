<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools
          @add="showAddDept"
          :treeNode="company"
          :isRoot="true"
        ></TreeTools>
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools
              @add="showAddDept"
              @remove="loadergetDepts"
              @edit="showEdit"
              :treeNode="data"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹层 -->
    <addDepts
      ref="addDept"
      @add-success="loadergetDepts"
      :visiable.sync="dialogVisible"
      :currentNode="currentNode"
    ></addDepts>
  </div>
</template>

<script>
import addDepts from '@/views/departments/components/addDepts.vue'
import TreeTools from './components/tree-tools'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
export default {
  components: {
    TreeTools,
    addDepts
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        // children: 'children', //树形默认查找子节点通过children
        label: 'name' //将data中展示到树形结构中的数据名
      },
      company: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      currentNode: {}
    }
  },

  created() {
    this.loadergetDepts()
  },

  methods: {
    async loadergetDepts() {
      const res = await getDeptsApi()
      console.log(res)
      this.treeData = transListToTree(res.depts, '')
    },
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    showEdit() {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById()
    }
  }
}
</script>

<style scoped lang="scss"></style>
