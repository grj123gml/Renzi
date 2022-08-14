<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="forDate.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="forDate.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onUpdate">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <UserInfo></UserInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" />
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import UserInfo from '@/views/employees/components/user-info.vue'
import { getUserDetail, saveUserDetailById } from '@/api/user'
export default {
  data() {
    return {
      forDate: [],
      activeName: Cookies.get('employeeDetailTab') || 'account'
    }
  },
  components: {
    UserInfo
  },
  created() {
    this.loadUserDetail()
  },

  methods: {
    async loadUserDetail() {
      const res = await getUserDetail(this.$route.params.id)
      console.log(res)
      this.forDate = res
    },
    async onUpdate() {
      await saveUserDetailById(this.forDate)
      this.$message.success('更新成功')
    },
    handleTabClick() {
      Cookies.set('employeeDetailTab', this.activeName)
    }
  }
}
</script>

<style scoped></style>
