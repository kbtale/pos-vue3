<template>
  <div>
    <Line :data="chartData"></Line>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

export default {
  name: 'ChartComponent',
  components: {
    Line
  },
  props: {
    chartData: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const canvas = ref(null)

    watch(() => props.chartData, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // Destroy and re-render chart
      }
    })

    onMounted(() => {
      console.log(props.chartData)
      /*
      const chart = new Line(canvas.value.getContext('2d'), {
        data: props.chartData,
        options: {} // You can define default options here
      })
      */
    })

    return {
      
    }
  }
}
</script>
