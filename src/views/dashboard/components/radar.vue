<template>
  <div id="main" class="radarCharts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },

  methods: {
    initRadar() {
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      const radarOptions = {
        title: {
          text: '人员绩效表'
        },
        legend: {
          data: ['张三', '李四']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: 'bug数量', max: 100 },
            { name: '迟到', max: 100 },
            { name: '早退', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '摸鱼', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [80, 50, 40, 60, 100, 100],
                name: '张三'
              },
              {
                value: [80, 50, 20, 60, 20, 60],
                name: '李四'
              }
            ]
          }
        ]
      }
      myChart.setOption(radarOptions)
    }
  }
}
</script>

<style scoped lang="scss">
.radarCharts {
  width: 700px;
  height: 500px;
}
</style>
