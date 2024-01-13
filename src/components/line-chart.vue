<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  watch: {
    chartData () {
      this.$data._chart.destroy()
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
