<template>
  <v-container>
    <v-card>
      <v-card-title>Availability</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="1">
            <v-select
              v-model="daysToShow"
              :items="[1, 2, 3, 4, 5, 6, 7]"
              label="Days to show"
            >
            </v-select
          ></v-col>
        </v-row>
        <v-row :key="forceRedrawCounter">
          <v-col>
            <client-only :key="forceRedrawCounter">
              <apexchart
                ref="chart"
                type="rangeBar"
                :options="options"
                :series="series"
                height="200%"
              ></apexchart>
            </client-only>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace, Watch } from 'nuxt-property-decorator'
import { ApexOptions } from 'apexcharts'
import { DateTime, Duration } from 'luxon'
import { Series } from '~/types/apexHelper'

const availability = namespace('availability')

@Component({
  filters: {
    humanDate(date: number) {
      return DateTime.fromMillis(date).toISO()
    },
  },
  middleware: 'auth',
})
export default class Index extends Vue {
  private forceRedrawCounter = 1
  private daysToShow = 1

  private options: ApexOptions = {
    chart: {
      type: 'rangeBar',
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
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
    tooltip: {
      enabled: true,
      y: {
        formatter(_, { seriesIndex, dataPointIndex, w }): string {
          const start = DateTime.fromMillis(
            w.config.series[seriesIndex].data[dataPointIndex].y[0]
          )
          const end = DateTime.fromMillis(
            w.config.series[seriesIndex].data[dataPointIndex].y[1]
          )
          return (
            w.config.series[seriesIndex].data[dataPointIndex].x +
            ': ' +
            start.toFormat('ccc HH:mm') +
            ' - ' +
            end.toFormat('ccc HH:mm')
          )
        },
      },
    },

    xaxis: {
      tickAmount: 6,
      tickPlacement: 'on',
      type: 'datetime',
      labels: {
        formatter: (value, _) => {
          return DateTime.fromJSDate(new Date(value)).toFormat('ccc HH:mm')
        },
      },
      min: DateTime.local()
        .set({
          minute: 0,
        })
        .toJSDate()
        .getTime(),
      max: DateTime.local()
        .plus(Duration.fromObject({ days: this.daysToShow }))
        .set({
          minute: 0,
        })
        .toJSDate()
        .getTime(),
    },
  }

  @Watch('daysToShow')
  DaysToShowChange() {
    // this.$auth.setUserToken()
    this.options!.xaxis!.min = DateTime.local()
      .set({
        minute: 0,
      })
      .toJSDate()
      .getTime()

    this.options!.xaxis!.max = DateTime.local()
      .plus(Duration.fromObject({ days: this.daysToShow }))
      .set({
        minute: 0,
      })
      .toJSDate()
      .getTime()

    this.options!.xaxis!.tickAmount = this.daysToShow * 4

    this.forceRedrawCounter++
  }

  @availability.Action
  private loadAvailability!: any

  @availability.State
  private series!: Series[]

  mounted() {
    this.loadAvailability(this.$apollo)
  }
}
</script>
