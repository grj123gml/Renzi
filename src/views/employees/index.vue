<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template #left-tag>
          <span>共{{ total }}条记录</span>
        </template>
        <template #right>
          <el-button type="danger">普通excel导出</el-button>
          <el-button type="info">复杂表头excel导出</el-button>
          <el-button type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button type="primary" @click="Addemployees">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card class="card">
        <el-table border :data="employeesInfo">
          <el-table-column label="序号" sortable="" type="index" width="70px" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像" sortable="">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatterForm"
            prop="formOfEmployment"
          >
          </el-table-column>
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#dcdfe6"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onRemove(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :total="total"
            :page-size="pages.size"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 添加弹框 -->
    <Addemployees @add-success="getEmployeesInfo" :visible.sync="showAddDialog"></Addemployees>
  </div>
</template>

<script>
import Addemployees from '@/views/employees/components/add-employees.vue'
import { getEmployeesInfoApi, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'
export default {
  data() {
    return {
      employeesInfo: [],
      total: 0,
      pages: {
        page: 1,
        size: 5
      },
      showAddDialog: false
    }
  },
  components: {
    Addemployees
  },

  created() {
    this.getEmployeesInfo()
  },

  methods: {
    // 获取员工详细信息
    async getEmployeesInfo() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.employeesInfo = rows
      this.total = total
      console.log(this.employeesInfo)
    },
    //currentPage 改变时会触发
    handleCurrentChange(val) {
      this.pages.page = val
      this.getEmployeesInfo()
    },
    formatterForm(row, column, cellValue, index) {
      // if (cellValue === 1) return '正式'
      // if (cellValue === 2) return '非正式'
      // return '未知'
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    // 删除员工信息
    async onRemove(id) {
      try {
        await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delEmployee(id)
        this.$message({
          message: '恭喜你，删除成功',
          type: 'success'
        })
        this.getEmployeesInfo()
      } catch (error) {}
    },
    // 新增员工
    Addemployees() {
      this.showAddDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-top: 10px;
}
</style>
