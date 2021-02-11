<template>
  <v-container>
    <v-card>
      {{ availabilityMap }}
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
        {{ series }}
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
import _ from 'lodash'

const availability = namespace('availability')

@Component({
  filters: {
    humanDate: (value) => {
      // DateTime.fromMillis()
      return DateTime.fromMillis(value).toFormat('yyyy-MM-dd HH:mm ZZZZ')
    },
  },
})
export default class Index extends Vue {
  @availability.State
  private availabilityMap

  @availability.Action
  private loadAvailability

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
      min: DateTime.local()
        .minus(Duration.fromObject({ hour: 8 }))
        .toJSDate()
        .getTime(),
      max: DateTime.local()
        .plus(Duration.fromObject({ hour: 8 }))
        .toJSDate()
        .getTime(),
    },
  }

  series = [
    {
      data: [],
    },
  ]

  avail: Map<string, Map<string, Interval>> = new Map<
    string,
    Map<string, Interval[]>
  >()

  mounted() {
    for (const user of ['Gwelican', 'Kiki']) {
      this.avail.set(user, new Map<string, Interval>())
      for (let day = 0; day < 7; day++) {
        const weekDay = DateTime.local().plus(
          Duration.fromObject({ hour: day * 24 })
        ).weekdayShort

        this.avail.get(user).set(weekDay, [])
      }
    }

    this.avail
      .get('Gwelican')
      .set('Thu', [
        Interval.fromDateTimes(
          DateTime.fromObject({ hour: 20, minute: 0, zone: 'PST' }),
          DateTime.fromObject({ hour: 22, minute: 0, zone: 'PST' })
        ),
        Interval.fromDateTimes(
          DateTime.fromObject({ hour: 23, minute: 0, zone: 'PST' }),
          DateTime.fromObject({ hour: 24, minute: 0, zone: 'PST' })
        ),
      ])
    this.avail
      .get('Kiki')
      .set('Wed', [
        Interval.fromDateTimes(
          DateTime.fromObject({ hour: 20, minute: 0, zone: 'EST' }),
          DateTime.fromObject({ hour: 24, minute: 0, zone: 'EST' })
        ),
      ])

    this.avail
      .get('Kiki')
      .set('Thu', [
        Interval.fromDateTimes(
          DateTime.fromObject({ hour: 1, minute: 0, zone: 'EST' }),
          DateTime.fromObject({ hour: 2, minute: 0, zone: 'EST' })
        ),
        Interval.fromDateTimes(
          DateTime.fromObject({ hour: 3, minute: 0, zone: 'EST' }),
          DateTime.fromObject({ hour: 4, minute: 0, zone: 'EST' })
        ),
      ])

    this.updateChart()
  }

  private forceUpdate = 0
  private updateChart() {
    const x = this.series.slice()
    x[0].data = []

    const today = DateTime.local().weekdayShort
    const tomorrow = DateTime.local().plus(Duration.fromObject({ hour: 24 }))
      .weekdayShort

    for (const user: string of this.avail.keys()) {
      const userAvailability = this.avail.get(user)

      const item = {
        x: user,
        y: [],
      }
      for (const interval: Interval of userAvailability.get(today)) {
        x[0].data.push({
          x: user,
          y: [
            interval.start.toLocal().toJSDate().getTime(),
            interval.end.toLocal().toJSDate().getTime(),
          ],
        })
      }
      for (const interval: Interval of userAvailability.get(tomorrow)) {
        console.log(interval.start.zone)
        x[0].data.push({
          x: user,
          y: [
            interval.start.toLocal().toJSDate().getTime(),
            interval.end.toLocal().toJSDate().getTime(),
          ],
        })
      }
    }
    this.forceUpdate++

    this.series = x
    console.log(this.series)
  }
}
</script>
