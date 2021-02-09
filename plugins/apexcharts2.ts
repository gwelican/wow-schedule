// import VueApexCharts from 'vue-apexcharts'
// import Vue from 'vue'
// // Vue.use(VueApexCharts);
// Vue.component('Apexchart', VueApexCharts)

import VueApexCharts from 'vue-apexcharts'
import { Vue } from 'nuxt-property-decorator'

const apexcharts2: () => void = () => {
  ;(window as any).Apex = {
    chart: {
      foreColor: '#ccc',
      toolbar: {
        show: true,
      },
    },
    stroke: {
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'dark',
    },
    grid: {
      borderColor: '#535A6C',
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
  Vue.component('Apexchart', VueApexCharts)
  // Vue.use(VueFusionCharts, FusionCharts, Charts)
}
export default apexcharts2
