<template>
  <v-container>
    <v-card>
      <v-card-title>Availability</v-card-title>
      <!--      <v-btn v-if="$auth.loggedIn === false" text to="/login">Login</v-btn>-->
      <!--      {{ $auth.loggedIn }}-->
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
        <!--        {{ series }}-->
        <!--        <v-row v-for="serie in series.keys()" v-if="false">-->
        <!--          <v-col v-for="data of series[serie]">-->
        <!--            <v-container v-for="x in data"-->
        <!--              >{{ x.y[0] | humanDate }} = {{ x.y[1] | humanDate }}</v-container-->
        <!--            >-->
        <!--          </v-col>-->
        <!--        </v-row>-->

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

export interface SeriesData {
  x: string
  y: number[] | DateTime[]
}

export interface Series {
  data: SeriesData[]
}

const availability = namespace('availability')

@Component({
  filters: {
    humanDate(date: number) {
      return DateTime.fromMillis(date).toISO()
    },
  },
  middleware: 'authenticated',
})
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
    // dataLabels: {
    //   enabled: true,
    //   formatter(
    //     value: number,
    //     { seriesIndex, dataPointIndex, w }
    //   ): string | number {
    //     return w.config.series[seriesIndex].name + ': ' + value
    //   },
    // },
    xaxis: {
      tickAmount: 7,
      tickPlacement: 'on',
      type: 'datetime',
      labels: {
        formatter: (value, _) => {
          return DateTime.fromJSDate(new Date(value)).toFormat('ccc HH:mm')
        },
      },
      min: DateTime.local()
        .minus(Duration.fromObject({ days: this.daysToShow }))
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

  private forceRedrawCounter = 1
  private daysToShow = 1

  @Watch('daysToShow')
  DaysToShowChange() {
    this.options!.xaxis!.min = DateTime.local()
      .set({
        minute: 0,
      })
      .toJSDate()
      .getTime()

    this.options!.xaxis!.max = DateTime.local()
      .minus(Duration.fromObject({ days: this.daysToShow }))
      .set({
        minute: 0,
      })
      .toJSDate()
      .getTime()

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
