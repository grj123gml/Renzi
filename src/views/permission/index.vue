<template>
  <div class="dashboard-container">
    <div class="app-container">
      <template>
        <div class="dashboard-container">
          <div class="app-container">
            <!-- 靠右的按钮 -->
            <page-tools>
              <template #left-tag>
                <span>共条记录</span>
              </template>
              <template slot="right">
                <el-button
                  type="primary"
                  size="small"
                  @click="showAddDialog('0', 1)"
                  >添加权限</el-button
                >
              </template>
            </page-tools>
            <!-- 表格 -->
            <el-table
              ref="table"
              border
              :data="permissions"
              slot="right"
              row-key="id"
              style="width: 100%"
            >
              <el-table-column align="center" label="名称">
                <template v-slot="{ row }">
                  <i
                    v-if="row.children"
                    style="margin-top: 20px"
                    class="el-icon-folder-opened"
                    @click="expend(row)"
                  ></i>
                  <!-- <i v-else style="margin-right: 5px" class="el-icon-folder" /> -->
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="code" label="标识" />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button type="text" @click="showAddDialog(row.id, 2)"
                    >添加</el-button
                  >
                  <el-button type="text">编辑</el-button>
                  <el-button type="text">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </template>

      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog title="添加权限点" :visible.sync="showDialog" @close="onClose">
        <!-- 表单 -->
        <el-form
          ref="form"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width: 90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="onSave"
              >确定</el-button
            >
            <el-button size="small" @click="onClose">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      permissions: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false
    }
  },

  created() {
    this.getPermission()
  },

  methods: {
    // 获取权限列表
    async getPermission() {
      const res = await getPermissionList()
      console.log(res)
      this.permissions = transListToTree(res, '0')
    },
    // 点击展开
    expend(row) {
      row.isExpand = !row.isExpand
      this.$refs.table.toggleRowExpansion(row, row.isExpand)
    },
    // 关闭对话框
    onClose() {
      this.showDialog = false
    },
    // 展示添加对话框
    showAddDialog(id, type) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
    // 确定添加
    onSave() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        await addPermission(this.formData)
        this.$message.success('添加成功')
        this.onClose()
        this.getPermission()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-table thead {
  color: #909399;
  margin: 20px 0;
  font-weight: 500;
}
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
