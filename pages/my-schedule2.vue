<template>
  <v-container>
    <div
      class="tw-rounded tw-bg-gray-700 lg:tw-w-1/2 xs:tw-w-1/2 md:tw-w-1 tw-mx-auto tw-flex"
    >
      <div class="lg:tw-w-1/2 xs:tw-w-1/3 tw-m-1 tw-flex-col tw-flex">
        <div
          v-for="day of availability.keys()"
          :key="day"
          class="tw-rounded tw-bg-gray-500 tw-mt-2 tw-p-2 hover:tw-bg-blue-800"
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
        <v-btn class="tw-mt-auto">Save</v-btn>
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
              :key="`${day}_${h * 100 + m}`"
              :ref="`${day}_${h * 100 + m}`"
              :data-time="`${day}_${h * 100 + m}`"
              :class="getTimeslotClasses(day, h * 100 + m)"
              @mouseover="mouseOver(day, h * 100 + m)"
              @mousedown="mouseDown(day, h * 100 + m)"
              @mouseup.stop="mouseUp"
              @touchstart.stop="mouseDown(day, h * 100 + m)"
              @touchend.stop="mouseUp"
              @touchmove.stop="mouseOver(day, h * 100 + m)"
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
      // return interval
      return (
        interval.start.toFormat('HH:mm') + '-' + interval.end.toFormat('HH:mm')
      )
    },
  },
})
export default class Schedule extends Vue {
  private forceRenderNumber: number = 100

  @myschedule.State
  private timeslot: any

  private days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  private availability: Map<string, Interval[]> = new Map<string, Interval[]>()

  private mouseButtonState = MouseButtonState.UP
  private operation: OperationType = OperationType.ADD

  get hours() {
    const hours = []
    for (let i = 0; i < 24; i++) {
      hours.push(i)
    }
    return hours
  }

  private mouseUp() {
    this.mouseButtonState = MouseButtonState.UP
    this.forceRenderNumber++
    console.log('redraw')

    if (this.timeslot.size > 1) {
      console.log(this.timeslot)
      const groupByDay = _.groupBy(
        Array.from(this.timeslot),
        (e: string) => e.split('_')[0]
      )
      for (const day of Object.keys(groupByDay)) {
        console.log(day)
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
  }

  private mouseOver(day: string, slot: number) {
    const key = Schedule.createKey(day, slot)
    console.log('mouseover: ' + key)
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

  private selectTimeslot(day: string, slot: number) {
    const key = Schedule.createKey(day, slot)
    console.log('selecting timeslot: ' + key)
    if (this.$refs[key]) {
      const ref = this.$refs[key] as Element[]
      if (ref.length > 0) {
        ref[0].classList.add('selected')
      }
    }
    this.timeslot.add(key)
  }

  private deSelectTimeslot(day: string, slot: number) {
    const key = Schedule.createKey(day, slot)
    console.log('deselecting timeslot: ' + key)
    if (this.$refs[key]) {
      const ref = this.$refs[key] as Element[]
      if (ref.length > 0) {
        ref[0].classList.remove('selected')
      }
    }
    this.timeslot.delete(key)
  }

  private mouseDown(day: string, num: number) {
    this.operation = this.timeslot.has(Schedule.createKey(day, num))
      ? OperationType.DELETE
      : OperationType.ADD
    console.log('mouse down' + num)
    this.mouseButtonState = MouseButtonState.DOWN
    this.mouseOver(day, num)
  }

  private static createKey(day: string, num: number) {
    return `${day}_${num}`
  }

  private getTimeslotClasses(day: string, num: number) {
    const classes = ['timeslot']
    if (this.timeslot.has(Schedule.createKey(day, num))) {
      classes.push('selected')
    }
    return classes
  }

  @myschedule.Action
  private loadSchedule2: any

  mounted() {
    this.loadSchedule2(this.$apollo).then(() => {
      this.forceRenderNumber++
      console.log(this.timeslot)
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
