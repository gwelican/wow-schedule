<template>
  <v-container>
    <v-card>
      <v-card-title>Availability</v-card-title>
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
        <!--        <v-container :key="forceUpdate">-->
        <!--          <v-card v-for="user in series[0].data" :key="user">-->
        <!--            <v-card-title>{{ user }} </v-card-title>-->
        <!--            <v-card-text>-->
        <!--              <v-row>-->
        <!--                <v-col v-for="y in user.y" :key="y"> {{ y | humanDate }}</v-col>-->
        <!--              </v-row>-->
        <!--            </v-card-text>-->
        <!--          </v-card>-->
        <!--        </v-container>-->
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { ApexOptions } from 'apexcharts'
import { DateTime, Duration, Interval } from 'luxon'

export interface SeriesData {}
export interface Series {
  data: SeriesData[]
}

const availability = namespace('availability')

@Component({
  filters: {
    // humanDate: (value) => {
    //   // DateTime.fromMillis()
    //   return DateTime.fromMillis(value).toFormat('yyyy-MM-dd HH:mm ZZZZ')
    // },
  },
})
export default class Index extends Vue {
  @availability.State
  private availabilityMap!: Map<string, Map<string, Interval[]>>

  @availability.Action
  private loadAvailability!: any

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
        formatter: (value, _, _) => {
          return DateTime.fromJSDate(new Date(value)).toFormat('ccc HH:mm')
        },
      },
      min: DateTime.local()
        .minus(Duration.fromObject({ hour: 1 }))
        .set({
          minute: 0,
        })
        .toJSDate()
        .getTime(),
      max: DateTime.local()
        .plus(Duration.fromObject({ hour: 6 }))
        .set({
          minute: 0,
        })
        .toJSDate()
        .getTime(),
    },
  }

  series: Series[] = [
    {
      data: [],
    },
  ]

  // series: ApexAxisChartSeries = []
  // {
  //   data: as SeriesData[],
  // },
  // ]

  avail: Map<string, Map<string, Interval[]>> = new Map<
    string,
    Map<string, Interval[]>
  >()

  mounted() {
    for (const user of ['Gwelican', 'Kiki', 'JP']) {
      this.avail.set(user, new Map<string, Interval[]>())
      for (let day = 0; day < 7; day++) {
        const weekDay = DateTime.local().plus(
          Duration.fromObject({ hour: day * 24 })
        ).weekdayShort

        this.avail.get(user)?.set(weekDay, [])
      }
    }

    this.avail
      .get('Gwelican')
      ?.set('Thu', [this.getIntervalForTime(20, 24, 'PST')])
    this.avail
      .get('Gwelican')
      ?.set('Fri', [this.getIntervalForTime(20, 24, 'PST')])

    this.avail.get('Kiki')?.set('Fri', [this.getIntervalForTime(15, 23, 'PST')])
    this.avail.get('Kiki')?.set('Thu', [this.getIntervalForTime(15, 18, 'PST')])
    this.avail.get('Kiki')?.set('Thu', [this.getIntervalForTime(18, 23, 'PST')])

    this.avail.get('JP')?.set('Thu', [this.getIntervalForTime(16, 23, 'PST')])
    this.avail.get('JP')?.set('Mon', [this.getIntervalForTime(16, 23, 'PST')])
    this.avail.get('JP')?.set('Wed', [this.getIntervalForTime(16, 23, 'PST')])

    this.updateChart()
  }

  private getIntervalForTime(
    hourStart: number,
    hourEnd: number,
    timeZone: string
  ) {
    return Interval.fromDateTimes(
      DateTime.fromObject({ hour: hourStart, minute: 0, zone: timeZone }),
      DateTime.fromObject({ hour: hourEnd, minute: 0, zone: timeZone })
    )
  }

  private forceUpdate = 0
  private updateChart() {
    const x = this.series.slice()
    // const t = {}
    // x.push(t)
    const today = DateTime.local().weekdayShort
    const tomorrow = DateTime.local().plus(Duration.fromObject({ hour: 24 }))
      .weekdayShort
    for (const user of this.avail.keys()) {
      const userAvailability = this.avail.get(user)

      for (const interval of userAvailability?.get(today) as Interval[]) {
        x[0].data.push({
          x: user,
          y: [
            interval.start.toLocal().toJSDate().getTime(),
            interval.end.toLocal().toJSDate().getTime(),
          ],
        })
      }
      for (const interval of userAvailability?.get(tomorrow) as Interval[]) {
        x[0].data.push({
          x: user,
          y: [
            interval.start
              .toLocal()
              .plus(Duration.fromObject({ day: 1 }))
              .toJSDate()
              .getTime(),
            interval.end
              .toLocal()
              .plus(Duration.fromObject({ day: 1 }))
              .toJSDate()
              .getTime(),
          ],
        })
      }
    }
    this.forceUpdate++
    this.series = x
    console.log(JSON.stringify(this.series))
    // [{"data":[{"x":"Gwelican","y":[1613102400000,1613116800000]},{"x":"Gwelican","y":[1613102400000,1613116800000]},{"x":"Kiki","y":[1613095200000,1613113200000]},{"x":"Kiki","y":[1613084400000,1613113200000]}]}]
    // [{"data":[]},{"name":"Gwelican","data":[{"x":"Gwelican","y":[1613102400000,1613116800000]},{"x":"Gwelican","y":[1613188800000,1613203200000]}]},{"name":"Kiki","data":[{"x":"Kiki","y":[1613095200000,1613113200000]},{"x":"Kiki","y":[1613170800000,1613199600000]}]}]
  }
}
</script>
