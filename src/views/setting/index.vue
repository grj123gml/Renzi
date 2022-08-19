<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addRoles">新增角色</el-button>
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="small" type="success" @click="setRights"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            :page-size="pageSize"
            :page-sizes="[3, 5, 10]"
            layout="sizes,prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px" class="form">
            <el-form-item label="公司名称">
              <el-input disabled v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input disabled v-model="formData.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="formData.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="formData.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 弹框 -->
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <el-form
        :model="addRoleForm"
        ref="form"
        label-width="80px"
        :rules="addRoleFormRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="region">
          <el-input v-model="addRoleForm.region"></el-input>
        </el-form-item>
      </el-form>
      <center>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onClose">取 消</el-button>
          <el-button type="primary" @click="onAddRole">确 定</el-button>
        </span>
      </center>
    </el-dialog>

    <!-- 分配权限弹框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightsDialog"
      width="30%"
      @close="onClose"
    >
      <el-tree
        ref="permTree"
        :data="permissions"
        :props="{ label: 'name' }"
        :show-checkbox="true"
        :check-strictly="true"
        :default-expand-all="true"
        :default-checked-keys="defaultCheckKeys"
        node-key="id"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleListApi, getAddRoleApi, getCompanyInfoApi } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      formData: {},
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 5,
      page: 1,
      dialogVisible: false,
      addRoleForm: {
        name: '',
        region: ''
      },
      addRoleFormRules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      setRightsDialog: false,
      permissions: [], //权限树形数据
      defaultCheckKeys: ['1', '1063315016368918528']
    }
  },

  created() {
    this.getRoleList()
    this.getCompanyInfo()
    this.getPermission()
  },

  methods: {
    async getRoleList() {
      const res = await getRoleListApi({
        page: this.page,
        pagesize: this.pageSize
      })
      console.log(res)
      this.tableData = res.rows
      this.total = res.total
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoleList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoleList()
    },
    addRoles() {
      this.dialogVisible = true
    },
    // 点击取消
    onClose() {
      this.dialogVisible = false
    },
    async onAddRole() {
      await this.$refs.form.validate()
      await getAddRoleApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.dialogVisible = false
      this.getRoleList()
    },
    // 监听对话框关闭
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.region = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      )
      console.log(res)
      this.formData = res
    },
    // 分配权限对话框
    setRights() {
      this.setRightsDialog = true
    },
    //关闭权限对话框
    onClose() {
      this.setRightsDialog = false
    },
    async getPermission() {
      const res = await getPermissionList()
      // console.log(res)
      const treePermission = transListToTree(res, '0')
      // console.log(treePermission)
      this.permissions = treePermission
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  margin-top: 20px;
}
</style>
