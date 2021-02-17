<template>
  <v-container>
    <v-card>
      <v-card-title>Availability</v-card-title>

      <v-card-text>
        {{ series }}
        <!--        <v-row v-for="serie in series.keys()" v-if="false">-->
        <!--          <v-col v-for="data of series[serie]">-->
        <!--            <v-container v-for="x in data"-->
        <!--              >{{ x.y[0] | humanDate }} = {{ x.y[1] | humanDate }}</v-container-->
        <!--            >-->
        <!--          </v-col>-->
        <!--        </v-row>-->

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
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { ApexOptions } from 'apexcharts'
import { DateTime, Duration } from 'luxon'

export interface SeriesData {}
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
        .minus(Duration.fromObject({ hour: 12 }))
        .set({
          minute: 0,
        })
        .toJSDate()
        .getTime(),
      max: DateTime.local()
        .plus(Duration.fromObject({ hour: 12 }))
        .set({
          minute: 0,
        })
        .toJSDate()
        .getTime(),
    },
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
