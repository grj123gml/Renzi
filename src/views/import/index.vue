<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></upload-excel>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/filters'
import { importEmployee } from '@/api/employees'
import employess from '@/constant/employees'
const { importmapKeyPath } = employess
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    // 限制上传前文件类型
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请上传xlsx文件')
        return false
      }
      return true
    },
    // 上传成功后
    async onSuccess({ header, results }) {
      // console.log(header)
      // console.log(results)
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importmapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const data = new Date((timestamp - 1) * 24 * 60 * 60 * 1000)
            data.setFullYear(data.getFullYear() - 70)
            obj[importmapKeyPath[key]] = formatTime(data)
          } else {
            obj[importmapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      // console.log(newArr)
      await importEmployee(newArr)
      this.$message.success('成功上传')
      this.$router.push('/employees')
    }
  }
}
</script>

<style scoped lang="scss"></style>
