<template>
  <v-container>
    <v-card>
      <v-card-title>Schedule</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Free days</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col offset-lg="2" lg="1">
                    <v-text-field v-model="start" label="start"></v-text-field>
                  </v-col>
                  <v-col lg="1">
                    <v-text-field v-model="end" label="end"></v-text-field>
                  </v-col>
                  <v-col lg="1">
                    <v-select
                      v-model="tz"
                      label="Timezone"
                      :items="['PST', 'EST', 'CST', 'MYS']"
                    />
                  </v-col>
                  <v-col lg="1">
                    <v-select v-model="day" label="Day" :items="weekdays" />
                  </v-col>
                  <v-col offset-lg="2" lg="4" class="justify-end">
                    <v-chip-group :key="forceRenderNumber" multiple column>
                      <v-container
                        v-for="day in Array.from(avail.keys())"
                        :key="day"
                      >
                        <v-row>
                          <v-chip
                            v-for="interval in avail.get(day)"
                            :key="day + interval.start"
                            close
                            @click="deleteAvailability(day, interval)"
                            @click:close="deleteAvailability(day, interval)"
                          >
                            {{ day }} {{ interval.start | humanDate }} -
                            {{ interval.end | humanDate }}
                          </v-chip>
                        </v-row>
                      </v-container>
                    </v-chip-group>
                  </v-col>
                </v-row>
                <v-btn @click="addRange()">Add</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <client-only>
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
import { Component, Vue } from 'nuxt-property-decorator'
import { DateTime, Interval } from 'luxon'
import { ApexOptions } from 'apexcharts'
import _ from 'lodash'
import { Series } from '~/pages/index.vue'

// type ChartData = {
// {
//   x: any; y: any
// }
// }

@Component({
  filters: {
    humanDate: (value: string) => {
      return DateTime.fromISO(value).toFormat('HH:mm')
    },
  },
})
export default class Schedule extends Vue {
  private forceRenderNumber: number = 0
  start: string = '08:00'
  end: string = '12:00'

  day: string = 'mon'
  tz: string = 'PST'
  type: string = 'free'

  avail: Map<string, Interval[]> = new Map<string, Interval[]>()

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
    dataLabels: {
      formatter(_): string {
        return 'Available'
      },
    },
    tooltip: {
      enabled: false,
    },
    noData: {
      text: 'No data',
    },
    annotations: {
      xaxis: [],
    },
    xaxis: {
      tickAmount: 24,
      type: 'datetime',
      labels: {
        formatter: (value, _) => {
          return DateTime.fromJSDate(new Date(value)).toFormat('HH:mm')
        },
      },
      min: DateTime.local(2021, 1, 1, 0, 0).toJSDate().getTime(),
      max: DateTime.local(2021, 1, 2, 0, 0).toJSDate().getTime(),
    },
  }

  series: Series[] = [
    {
      data: [],
    },
  ]

  weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

  mounted() {
    for (let i = 0; i < 7; i++) {
      // const start = DateTime.local(2021, 1, 1, 8, 0)
      // const end = DateTime.local(2021, 1, 1, 10, 0)

      if (!this.avail.has(this.weekdays[i])) {
        this.avail.set(this.weekdays[i], [])
      }
      // this.avail.get(this.weekdays[i]).push(Interval.fromDateTimes(start, end))
    }

    this.updateChart()
  }

  deleteAvailability(day: string, interval: Interval) {
    this.avail.set(
      day,
      _.remove(this.avail.get(day) as Interval[], (v: Interval) => {
        interval.equals(v)
      })
    )

    this.updateChart()
  }

  addRange() {
    const start = DateTime.fromFormat(this.start, 'hh:mm')
      .set({
        day: 1,
        year: 2021,
        month: 1,
      })
      .setZone('PST')

    const newInterval = Interval.fromDateTimes(
      start,
      DateTime.fromFormat(this.end, 'hh:mm')
        .set({
          day: 1,
          year: 2021,
          month: 1,
        })
        .setZone('PST')
    )

    // // const isOverlap = _.find(this.avail.get(this.day), (val) => {
    // //   return newInterval.overlaps(val)
    // })

    const currentIntervals = this.avail.get(this.day) as Interval[]
    currentIntervals.push(newInterval)
    this.avail.set(this.day, Interval.merge(currentIntervals))
    // if (isOverlap) {
    //   for (const index in currentIntervals) {
    //     if (currentIntervals[index].overlaps(newInterval)) {
    //       currentIntervals[index] = Interval.merge([
    //         currentIntervals[index],
    //         newInterval,
    //       ])
    //     }
    //   }
    //   this.avail.set(this.day, currentIntervals)
    // } else {
    //   this.avail.get(this.day)?.push(newInterval)
    // }
    // if (isOverlap) {
    //   const mergedInterval = _.flatMap(
    //     this.avail.get(this.day),
    //     (val: Interval) => {
    //       if (val.overlaps(newInterval)) {
    //         return Interval.merge([newInterval, val])
    //       }
    //     }
    //   ) as Interval[]
    //
    //   this.avail.set(this.day, mergedInterval)
    // } else {
    //   this.avail.get(this.day)?.push(newInterval)
    // }
    // currentIntervals?.push(newInterval)
    this.updateChart()
  }

  private updateChart() {
    const x = this.series.slice()

    for (const day of this.avail.keys()) {
      for (const interval of this.avail?.get(day) as Interval[]) {
        x[0].data.push({
          x: day,
          y: [
            interval.start.set({ day: 1 }).toJSDate().getTime(),
            interval.end.set({ day: 1 }).toJSDate().getTime(),
          ],
        })
      }
      if (this.avail.get(day)?.length === 0) {
        // x.push({
        //   name: 'test',
        //   data: [
        //     {
        //       x: day,
        //       y: [DateTime.local(2021, 1, 1), DateTime.local(2021, 1, 1)],
        //     },
        //   ],
        // })
        // x[0].data.push({
        //   x: day,
        //   y: [DateTime.local(2021, 1, 1), DateTime.local(2021, 1, 1)],
        // } as ChartData)
      }
    }
    this.forceRenderNumber++
    this.series = x
  }
}
</script>
