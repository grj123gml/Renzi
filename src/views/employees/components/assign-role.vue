<template>
  <el-dialog
    title="分配角色"
    :visible="visible"
    width="30%"
    @close="onClose"
    @open="onOpen"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :label="item.id" :key="item.id">
        <!-- 插槽可用于渲染 -->
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUserDetail } from '@/api/user'
import { getRolesApi } from '@/api/role'
import { assignRoles } from '@/api/employees'
export default {
  name: 'Role',
  data() {
    return {
      checkList: [], //记录选中的角色
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    employeesId: {
      type: String,
      required: true
    }
  },

  created() {},

  methods: {
    // 关闭事件
    onClose() {
      this.$emit('update:visible', false)
    },
    //  获取所有角色
    async getRoleList() {
      const { rows } = await getRolesApi()
      console.log(rows)
      this.roles = rows
    },
    // 监听对话框打开
    onOpen() {
      this.getRoleList()
      this.getEmployeesRoles()
    },
    // 获取员工角色
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetail(this.employeesId)
      this.checkList = roleIds
      console.log(this.checkList)
    },
    // 分配角色
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请分配角色')
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.onClose()
    }
  }
}
</script>

<style scoped></style>
