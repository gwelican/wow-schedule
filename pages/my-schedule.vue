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
                    <v-text-field
                      v-model="start"
                      label="start"
                      :rules="[checkStartDate]"
                      @keyup="updateAddButton"
                    ></v-text-field>
                  </v-col>
                  <v-col lg="1">
                    <v-text-field
                      v-model="end"
                      label="end"
                      :rules="[checkEndDate]"
                      @keyup="updateAddButton"
                    ></v-text-field>
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
                <v-btn :disabled="isAddButtonDisabled" @click="addRange()"
                  >Add</v-btn
                >
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
