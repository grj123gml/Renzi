<template>
  <el-dialog title="新增员工" :visible="visible" width="50%" @close="onClose">
    <el-form :model="formData" :rules="rules" label-width="120px" ref="form">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <!-- 遍历只能遍历组件的数据 -->
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
        /> -->
        <el-select
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择"
          @focus="getDepts"
          ref="Select"
        >
          <!-- 遍历只能遍历组件的数据 -->
          <el-option value="" v-loading="loading" class="treeOption">
            <el-tree
              :data="depts"
              default-expand-all
              :props="treeProps"
              @node-click="TreeClick"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/constant/employees'
const { hireType } = EmployeeEnum
import { addEmployee } from '@/api/employees'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
export default {
  name: 'Addemployees',
  data() {
    return {
      hireType, // 在data中定义数据
      // 表单数据
      treeData: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      treeProps: {
        label: 'name'
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间', trigger: 'change' }
        ]
      },
      depts: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  created() {},

  methods: {
    async getAddEmployee() {
      const res = await addEmployee(this.formData)
      console.log(res)
    },
    // 关闭弹层
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
    },
    async getDepts() {
      this.loading = true
      const { depts } = await getDeptsApi()
      transListToTree(depts, '')
      this.depts = depts
      this.loading = false
    },
    TreeClick(row) {
      this.formData.departmentName = row.name
      this.$refs.Select.blur()
    },
    async onSave() {
      try {
        await this.$refs.form.validate(async (valid) => {
          if (!valid) return
          await addEmployee(this.formData)
          this.$message.success('添加成功')
          this.onClose()
          this.$emit('add-success')
        })
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="scss">
.treeOption {
  height: 200px;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
  overflow: unset;
}
</style>
