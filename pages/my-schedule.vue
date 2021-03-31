<template>
  <v-container>
    <div
      class="tw-rounded tw-bg-gray-700 lg:tw-w-1/2 xs:tw-w-1/2 md:tw-w-1 tw-mx-auto tw-flex"
    >
      <div
        class="lg:tw-w-1/2 xs:tw-w-1/3 tw-m-1 tw-flex-col tw-flex tw-items-center"
      >
        <v-select
          background-color="#035b45"
          rounded
          class="tw-w-2/3"
          style="flex-grow: 0; flex-direction: column-reverse"
          :items="timezones"
          label="timezone"
        >
        </v-select>
        <div
          v-for="day of Array.from(availability.keys()).sort(daySortFunction)"
          :key="day"
          class="tw-rounded tw-bg-gray-500 tw-mt-2 tw-p-2 hover:tw-bg-blue-800 tw-w-full"
        >
          {{ day }}:
          <span
            v-for="interval of availability.get(day)"
            :key="interval.start.toISO()"
            class="tw-h-auto"
          >
            [{{ interval | humanDate }}]
          </span>
        </div>
        <v-btn class="tw-w-1/2 tw-mt-2" @click="save">Save</v-btn>
      </div>
      <div
        :key="forceRenderNumber"
        class="tw-bg-white tw-p-6 lg:tw-w-1/2 xs:tw-w-2/3 tw-rounded tw-px-2 tw-py-1 tw-m-1"
      >
        <div
          class="tw-grid tw-grid-flow-col tw-grid-cols-7 tw-w-auto tw-m-auto tw-text-black tw-col-start-2"
        >
          <div
            v-for="(day, index) in days"
            :key="index"
            :class="`tw-col-start-${index + 2}`"
          >
            <span class="xs:tw-text-xs">
              {{ day }}
            </span>
          </div>
        </div>
        <div
          v-for="h in hours"
          :key="h"
          class="tw-grid tw-grid-flow-col tw-grid-cols-7 tw-w-auto tw-m-auto"
          @mouseup.stop="mouseUp"
        >
          <div class="timeslot-time tw-w-full xs:tw-text-2xs">{{ h }}:00</div>

          <template v-for="day of days">
            <div
              v-for="m in [0, 15, 30, 45]"
              :key="`${day}_${createSlot(h, m)}`"
              :ref="`${day}_${createSlot(h, m)}`"
              :data-time="`${day}_${createSlot(h, m)}`"
              :class="getTimeslotClasses(day, createSlot(h, m))"
              @mouseover="mouseOver(day, createSlot(h, m))"
              @mousedown="mouseDown(day, createSlot(h, m))"
              @mouseup.stop="mouseUp"
              @touchstart.stop="mouseDown(day, createSlot(h, m))"
              @touchend.stop="mouseUp"
              @touchmove.stop="mouseOver(day, createSlot(h, m))"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { DateTime, Duration, Interval } from 'luxon'
import _ from 'lodash'
import { IntervalInput } from '~/types/types'

enum OperationType {
  DELETE,
  ADD,
}

enum MouseButtonState {
  DOWN,
  UP,
}

const myschedule = namespace('myschedule')

@Component({
  filters: {
    humanDate(interval: Interval) {
      return (
        interval.start.toFormat('HH:mm') + '-' + interval.end.toFormat('HH:mm')
      )
    },
  },
  middleware: 'auth.middleware',
})
export default class Schedule extends Vue {
  private forceRenderNumber: number = 100

  @myschedule.Mutation
  private deleteTimeslotKey: any

  @myschedule.Mutation
  private addTimeslotKey: any

  @myschedule.State
  private timeslot: any

  @myschedule.Action
  private loadSchedule: any

  @myschedule.Action
  private saveSchedule: any

  private timezone: string = 'PST'
  private timezones = ['PST', 'EST']
  private availability: Map<string, Interval[]> = new Map<string, Interval[]>()
  private days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  private mouseButtonState = MouseButtonState.UP
  private operation: OperationType = OperationType.ADD

  private save() {
    const schedule = Array.from(this.availability).map(
      ([day, intervals]: [day: string, intervals: Interval[]]) => {
        return intervals.map((interval: Interval) => {
          return {
            start: Number(interval.start.toFormat('HHmm')),
            end: Number(interval.end.toFormat('HHmm')),
            timezone: this.timezone,
            day,
          } as IntervalInput
        })
      }
    )
    this.saveSchedule({
      apollo: this.$apollo,
      timezone: this.timezone,
      schedule: schedule.flat(),
    }).then(() => {
      this.$toast.success('Saved').goAway(2000)
    })
  }

  get daySortFunction() {
    return (a: string, b: string) => {
      const aIndex = this.days.findIndex((v) => v === a)
      const bIndex = this.days.findIndex((v) => v === b)
      if (aIndex === bIndex) {
        return 0
      } else {
        return aIndex < bIndex ? -1 : 1
      }
    }
  }

  get hours() {
    const hours = []
    for (let i = 0; i < 24; i++) {
      hours.push(i)
    }
    return hours
  }

  private mouseUp() {
    this.mouseButtonState = MouseButtonState.UP
    this.createAvailabilityRangesFromTimeslots()

    this.forceRenderNumber++
  }

  private createAvailabilityRangesFromTimeslots() {
    if (this.timeslot.size > 1) {
      const groupByDay = _.groupBy(
        Array.from(this.timeslot),
        (e: string) => e.split('_')[0]
      )
      const activeDays = Object.keys(groupByDay)
      this.cleanupInactiveDays(activeDays)
      for (const day of activeDays) {
        const days = groupByDay[day] as string[]
        const newIntervals: Interval[] = days.map((dayAndInterval: string) => {
          const slot = parseInt(dayAndInterval.split('_')[1])
          const windowEnd = slot === 2345 ? 14 : 15 // only add 14 minutes to 2345, so it wont be 00:00
          return Interval.fromDateTimes(
            DateTime.fromObject({
              hour: Math.floor(slot / 100),
              minute: slot % 100,
            }),
            DateTime.fromObject({
              hour: Math.floor(slot / 100),
              minute: slot % 100,
            }).plus(Duration.fromObject({ minutes: windowEnd }))
          )
        })
        const merged = Interval.merge(newIntervals)
        this.availability.set(day, merged)
      }
    }
    this.forceRenderNumber++
  }

  private cleanupInactiveDays(activateDaysKeys: string[]) {
    Array.from(this.availability.keys())
      .filter((key) => {
        return !activateDaysKeys.includes(key)
      })
      .forEach((key) => {
        this.availability.delete(key)
      })
  }

  private mouseOver(day: string, slot: string) {
    const key = Schedule.createKey(day, slot)
    if (this.mouseButtonState === MouseButtonState.DOWN) {
      if (this.$refs[key]) {
        if (this.operation === OperationType.ADD) {
          this.selectTimeslot(day, slot)
        } else if (this.operation === OperationType.DELETE) {
          this.deSelectTimeslot(day, slot)
        }
      }
    }
  }

  private selectTimeslot(day: string, slot: string) {
    const key = Schedule.createKey(day, slot)
    if (this.$refs[key]) {
      const ref = this.$refs[key] as Element[]
      if (ref.length > 0) {
        ref[0].classList.add('selected')
      }
    }
    this.addTimeslotKey(key)
  }

  private deSelectTimeslot(day: string, slot: string) {
    const key = Schedule.createKey(day, slot)
    if (this.$refs[key]) {
      const ref = this.$refs[key] as Element[]
      if (ref.length > 0) {
        ref[0].classList.remove('selected')
      }
    }
    this.deleteTimeslotKey(key)
  }

  private mouseDown(day: string, slot: string) {
    this.operation = this.timeslot.has(Schedule.createKey(day, slot))
      ? OperationType.DELETE
      : OperationType.ADD
    this.mouseButtonState = MouseButtonState.DOWN
    this.mouseOver(day, slot)
  }

  private createSlot(hour: number, minutes: number) {
    return String(hour).padStart(2, '0') + String(minutes).padStart(2, '0')
  }

  private static createKey(day: string, slot: string) {
    return `${day}_${slot}`
  }

  private getTimeslotClasses(day: string, slot: string) {
    const classes = ['timeslot']
    if (this.timeslot.has(Schedule.createKey(day, slot))) {
      classes.push('selected')
    }
    return classes
  }

  mounted() {
    this.loadSchedule(this.$apollo).then(() => {
      this.createAvailabilityRangesFromTimeslots()
    })
  }
}
</script>

<style lang="scss">
.timeslot {
  @apply tw-bg-blue-200 tw-w-8 tw-h-1.5 tw-border-l-2 tw-border-r-2 tw-border-solid tw-border-black tw-gap-0;
}

.timeslot:nth-child(2n + 0) {
  @apply tw-border-t-2 tw-border-solid tw-border-black;
}

.timeslot:nth-child(4n + 0) {
  border-top-style: dotted;
  @apply tw-border-t-2 tw-border-black;
}

.timeslot-time {
  @apply tw-row-span-3 tw-row-start-2 tw-text-right tw--mt-3 tw-pr-1 tw-text-black;
}

.selected {
  @apply tw-bg-green-700;
}
</style>
