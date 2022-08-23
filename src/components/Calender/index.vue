<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-select
        v-model="currentYear"
        size="small"
        style="width: 120px"
        @change="updateCaldaner()"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
          >{{ item }}</el-option
        >
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px; margin-left: 10px"
        @change="updateCaldaner()"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">{{
          item
        }}</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }" class="content">
        <div class="cell-box">
          <span class="text"> {{ date.getDate() }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calender',
  data() {
    return {
      currentYear: '',
      yearList: [],
      currentMonth: '', //当前年份+前五年+后五年
      currentDate: ''
    }
  },

  created() {
    this.initCaldaner()
  },

  methods: {
    initCaldaner() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      // 根据当前的年 生成可选年份 前后各加5年
      this.yearList = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i)
      this.currentDate = date
    },
    // 是否是休息日
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    // 年月份改变之后
    updateCaldaner() {
      // const year = this.currentYear
      // const month = this.currentMonth
      // this.currentDate = new Date(`${year}-${month}-1`) // 以当前月的1号为起始
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none !important;
  }
  .el-calendar-day {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.rest {
  position: relative;
  background: #fa7c4d;
  display: inline-block;
  top: -1px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  border-radius: 50%;
  color: #fff;
  margin-left: 10px;
  text-align: center;
}
</style>
