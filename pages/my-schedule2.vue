<template>
  <v-container>
    <v-card>
      <v-card-title>Schedule</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="1">
            <v-row
              v-for="i in [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
              ]"
              :key="i + 'label'"
              dense
            >
              <v-col class="pa-0">
                <div style="text-align: right; height: 10px">{{ i }}:00</div>
                <div style="height: 30px"></div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1">
            <v-row
              v-for="i in [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
              ]"
              :key="i + 'time'"
              dense
            >
              <v-col class="pa-0">
                <div class="timeblock start"></div>
                <div class="timeblock quarter"></div>
                <div class="timeblock"></div>
                <div class="timeblock quarter end">{{ i }}</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { DateTime, Interval } from 'luxon'
import { ApexOptions } from 'apexcharts'
import _ from 'lodash'
import { Series } from '~/types/apexHelper'

const myschedule = namespace('myschedule')

@Component({
  filters: {
    humanDate: (value: string) => {
      return DateTime.fromISO(value).toFormat('HH:mm')
    },
  },
  middleware: 'auth.middleware',
})
export default class Schedule extends Vue {
  private forceRenderNumber: number = 0
  private isAddButtonDisabled = false

  start: string = '08:00'
  end: string = '12:00'

  day: string = 'Mon'
  tz: string = 'PST'
  type: string = 'free'

  avail: Map<string, Interval[]> = new Map<string, Interval[]>()

  @myschedule.State
  private series!: Series[]

  @myschedule.Action
  private loadSchedule: any

  @myschedule.Action
  private addAvailability: any

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

  updateAddButton() {
    this.isAddButtonDisabled =
      this.checkStartDate() !== true || this.checkEndDate() !== true
  }

  checkStartDate() {
    const start = DateTime.fromFormat(this.start, 'HH:mm').toFormat('HHmm')
    if (start === 'Invalid DateTime') {
      return 'Invalid format, use hh:mm, with leading 0s.'
    }
    return true
  }

  checkEndDate() {
    const end = DateTime.fromFormat(this.end, 'HH:mm').toFormat('HHmm')
    const start = DateTime.fromFormat(this.start, 'HH:mm').toFormat('HHmm')
    console.log(start)
    console.log(end)
    if (end === 'Invalid DateTime') {
      return 'Invalid format, use hh:mm, with leading 0s.'
    }
    if (end <= start) {
      return 'End time must be later than start time'
    }
    return true
  }

  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  mounted() {
    this.loadSchedule(this.$apollo)
  }

  deleteAvailability(day: string, interval: Interval) {
    this.avail.set(
      day,
      _.remove(this.avail.get(day) as Interval[], (v: Interval) => {
        interval.equals(v)
      })
    )
  }

  addRange() {
    this.addAvailability({
      apollo: this.$apollo,
      start: parseInt(
        DateTime.fromFormat(this.start, 'HH:mm').toFormat('HHmm')
      ),
      end: parseInt(DateTime.fromFormat(this.end, 'HH:mm').toFormat('HHmm')),
      timezone: this.tz,
      day: this.day,
    })
    this.loadSchedule(this.$apollo)

    //
  }
}
</script>

<style lang="scss">
.timeblock {
  width: 100%;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;

  background-color: pink;
  height: 10px;
}
.quarter {
  margin-top: -1px;
}
.end {
  @apply border-b-2 border-black;
  //border-bottom: 2px solid black;
}
//.timeblock-start {
//  border-top: 2px solid black;
//}
.start {
  @apply border-t-2 border-black;
}
</style>
