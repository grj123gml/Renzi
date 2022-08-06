<template>
  <el-dialog @close="onClose" title="新增部门" :visible="visiable" width="50%">
    <el-form
      ref="form"
      :model="formData"
      label-width="100px"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input placeholder="1-50个字符" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input placeholder="1-50个字符" v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width：100%"
          placeholder="请选择负责人"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="1-300个字符"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi, addDeptApi } from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'
export default {
  data() {
    const checkDeptName = (rule, value, callback) => {
      //如果没有子部门，直接进行回调
      if (!this.currentNode.children) return callback()
      const isRepeat = this.currentNode.children.some(
        (item) => item.name === value
      )
      isRepeat ? callback(new Error('部门重复')) : callback()
    }
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      const isRepeat = depts.some((item) => item.code === value)
      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      // 定义表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            //自定义函数校验规则
            trigger: 'blur',
            validator: checkDeptName
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            //自定义函数校验规则
            trigger: 'blur',
            validator: checkDeptCode
          }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' }
        ]
      },
      employees: []
    }
  },
  props: {
    visiable: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },

  created() {
    this.getEmployees()
  },

  methods: {
    async getEmployees() {
      const res = await getEmployeesApi()
      console.log(res)
      this.employees = res
    },
    //关闭弹框
    onClose() {
      this.$emit('update:visiable', false)
    },
    //确定按钮
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentNode.id

      try {
        await addDeptApi(this.formData)
        this.$message.success('新增部门成功')
        this.onClose()
        this.$emit('add-success')
      } catch (error) {
        this.$message.error('新增部门失败')
      }
    },
    getDeptById() {
      console.log(123)
    }
  }
}
</script>

<style scoped></style>
