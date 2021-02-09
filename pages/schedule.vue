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
              width="80%"
            ></apexchart>
          </client-only>
          {{ series }}
        </v-container>
        <v-card v-for="range in ranges" :key="range.start.toISOString()">
          <v-card-text
            >{{ range.start.hours() }}:{{ range.start.minutes() }} -
            {{ range.end.hour() }}:{{ range.end.minutes() }}</v-card-text
          >
        </v-card>
        {{ ranges }}
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Free days</v-card-title>
              <v-card-text>
                <v-text-field v-model="start" label="start"></v-text-field>
                <v-text-field v-model="end" label="end"></v-text-field>
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
// import moment, { Moment } from 'moment'
import * as moment from 'moment'

class Interval {
  start: moment.Moment
  end: moment.Moment
  type: string
  constructor(start: moment.Moment, end: moment.Moment, type: string) {
    this.start = start
    this.end = end
    this.type = type
  }
}

@Component
export default class Schedule extends Vue {
  ranges: Interval[] = []
  start: string = '08:00'
  end: string = '12:00'

  options = {
    chart: {
      type: 'rangeBar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (vals, opts) => {
        console.log(vals)
        const label = opts.w.globals.labels[opts.dataPointIndex]
        console.log(label)
        return label
      },
    },
    xaxis: {
      type: 'datetime',
      min: new Date('2019-03-01').getTime(),
      max: new Date('2019-03-08').getTime(),
    },
  }

  series = [
    {
      data: [
        {
          x: 'Gwelican',
          y: [
            new Date('2019-03-02').getTime(),
            new Date('2019-03-04').getTime(),
          ],
        },
      ],
    },
  ]

  addRange() {
    this.ranges.push(
      new Interval(
        moment(this.start, 'hh:mm'),
        moment(this.end, 'hh:mm'),
        'free'
      )
    )
    const x = this.series.slice()

    for (const range: Interval of this.ranges) {
      console.log(range)
      x[0].data.push({
        x: 'Gwelican',
        y: [range.start.toDate().getTime(), range.end.toDate().getTime()],
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
