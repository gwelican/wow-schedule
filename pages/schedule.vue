<template>
  <v-container>
    <v-card>
      <v-card-title>Schedule</v-card-title>
      <v-card-text>
        <v-container>
          <client-only>
            <apexchart
              ref="chart"
              type="rangeBar"
              :options="options"
              :series="series"
              height="100%"
              width="100%"
            ></apexchart>
          </client-only>
          {{ series }}
        </v-container>
        <v-card v-for="range in ranges" :key="range.start.toISO()">
          <v-card-text
            >{{ range.start.hour }}:{{ range.start.minute }} -
            {{ range.end.hour }}:{{ range.end.minute }}</v-card-text
          >
        </v-card>
        Ranges: {{ ranges }}
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Free days</v-card-title>
              <v-card-text>
                <v-text-field v-model="start" label="start"></v-text-field>
                <v-text-field v-model="end" label="end"></v-text-field>
                <v-text-field v-model="tz" label="Timezone" />
                <v-text-field v-model="day" label="Day"></v-text-field>
                <v-btn @click="addRange()"></v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { DateTime } from 'luxon'
import { ApexOptions } from 'apexcharts'

class Interval {
  start: DateTime
  end: DateTime
  type: string
  day: string

  constructor(start: DateTime, end: DateTime, type: string, day: string) {
    this.start = start
    this.end = end
    this.type = type
    this.day = day
  }
}

@Component
export default class Schedule extends Vue {
  ranges: Interval[] = []
  start: string = '08:00'
  end: string = '12:00'

  day: string = 'mon'
  tz: string = 'PST'

  options: ApexOptions = {
    chart: {
      type: 'rangeBar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
      },
    },
    annotations: {
      xaxis: [
        // {
        //   x: DateTime.local(2021, 1, 1, 0, 0).toJSDate().getTime(),
        //   borderColor: '#775DD0',
        //   style: {
        //     color: '#fff',
        //   },
        //
        //   label: {
        //     orientation: 'horizontal',
        //     text: 'monday',
        //   },
        // },
        // {
        //   x: DateTime.local(2021, 1, 10).toJSDate().getTime(),
        //   label: {
        //     orientation: 'horizontal',
        //     text: 'Sunday',
        //   },
        // },
      ],
    },
    dataLabels: {
      enabled: false,
      formatter: (vals, opts) => {
        const label = opts.w.globals.labels[opts.dataPointIndex]
        return label
      },
    },
    xaxis: {
      tickAmount: 24,
      type: 'datetime',
      labels: {
        // offsetX: -35,
        formatter: (value, timestamp, opts) => {
          const x = DateTime.fromJSDate(new Date(value))
          return x.toFormat('HH:mm')
          // return opts.dateFormatter(new Date(timestamp)).format('dd MMM')
        },
      },
      min: DateTime.local(2021, 1, 1, 0, 0).toJSDate().getTime(),
      max: DateTime.local(2021, 1, 2, 0, 0).toJSDate().getTime(),
    },
  }

  series = [
    {
      data: [],
    },
  ]

  weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

  mounted() {
    for (let i = 0; i < 7; i++) {
      this.ranges.push(
        new Interval(
          DateTime.local(2021, 1, 1, 8, 0),
          DateTime.local(2021, 1, 1, 10, 0),
          'free',
          this.weekdays[i]
        )
      )
    }
    // this.ranges.push(
    //   new Interval(
    //     DateTime.local(2021, 1, 4, 8, 0),
    //     DateTime.local(2021, 1, 4, 10, 0),
    //     'free',
    //     'mon'
    //   )
    // )
    // this.ranges.push(
    //   new Interval(
    //     DateTime.local(2021, 1, 4, 8, 0),
    //     DateTime.local(2021, 1, 4, 10, 0),
    //     'free',
    //     'tue'
    //   )
    // )
    this.updateChart()
  }

  addRange() {
    const startDate = DateTime.fromFormat(this.start, 'hh:mm').set({
      day: 4,
      year: 2021,
      month: 1,
    })
    const endDate = DateTime.fromFormat(this.end, 'hh:mm').set({
      day: 4,
      year: 2021,
      month: 1,
    })

    this.ranges.push(new Interval(startDate, endDate, 'free'))
    this.updateChart()
  }

  private updateChart() {
    const x = this.series.slice()
    x[0].data = []

    for (const range: Interval of this.ranges) {
      console.log(range)
      x[0].data.push({
        x: range.day,
        y: [range.start.toJSDate().getTime(), range.end.toJSDate().getTime()],
      })
    }

    // x[0].data.push({
    //   x: 'Gwelican',
    //   y: [new Date('2019-03-07').getTime(), new Date('2019-03-11').getTime()],
    // })
    this.series = x
  }
}
</script>
