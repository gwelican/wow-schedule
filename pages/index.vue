<template>
  <v-container>
    <v-card>
      <v-card-title>Data</v-card-title>
      <v-card-text>
        <client-only>
          <apexchart
            ref="chart"
            type="rangeBar"
            :options="options"
            :series="series"
            height="200%"
          ></apexchart>
        </client-only>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ApexOptions } from 'apexcharts'
import { DateTime, Interval } from 'luxon'

@Component
export default class Index extends Vue {
  options: ApexOptions = {
    chart: {
      type: 'rangeBar',
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
        stroke: {
          width: 1,
        },
        fill: {
          type: 'solid',
          opacity: 0.6,
        },
      },
    },
    annotations: {
      xaxis: [
        {
          x: DateTime.local().setZone('PST').toJSDate().getTime(),
          label: {
            text: 'NOW',
          },
        },
      ],
    },
    xaxis: {
      tickAmount: 6,
      type: 'datetime',
      labels: {
        formatter: (value, timestamp, opts) => {
          return DateTime.fromJSDate(new Date(value)).toFormat('DD/MM HH:mm')
        },
      },
      min: DateTime.local(2021, 2, 10, 0, 0)
        .setZone('PST')
        .toJSDate()
        .getTime(),
      max: DateTime.local(2021, 2, 10, 1, 30)
        .setZone('PST')
        .toJSDate()
        .getTime(),
    },
  }

  series = [
    {
      data: [],
    },
  ]

  avail: Map<String, Interval> = new Map<String, Interval[]>()
  mounted() {
    this.avail.set('Gwelican', [
      Interval.fromDateTimes(
        DateTime.local(2021, 2, 10, 1).setZone('PST'),
        DateTime.local(2021, 2, 10, 3).setZone('PST')
      ),
    ])
    this.avail.set('Kiki', [
      Interval.fromDateTimes(
        DateTime.local(2021, 2, 10, 1).setZone('EST'),
        DateTime.local(2021, 2, 10, 3).setZone('EST')
      ),
    ])
    this.updateChart()
  }

  private updateChart() {
    const x = this.series.slice()
    x[0].data = []

    for (const user: string of this.avail.keys()) {
      for (const interval: Interval of this.avail.get(user)) {
        x[0].data.push({
          x: user,
          y: [
            interval.start.toLocal().toJSDate().getTime(),
            interval.end.toLocal().toJSDate().getTime(),
          ],
        })
      }
    }
    // this.forceRenderNumber++
    this.series = x
  }
}
</script>
