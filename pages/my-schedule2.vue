<template>
  <v-container>
    <div class="tw-rounded tw-bg-gray-500 tw-w-1/2 tw-m-auto">
      <div class="tw-grid tw-grid-cols-7 tw-grid-flow-col">
        <div v-for="day of availability.keys()" :key="day">
          <div
            v-for="interval of availability.get(day)"
            :key="interval.start.toISO()"
          >
            {{ day }} => {{ interval | humanDate }}
          </div>
        </div>
      </div>
      <div :key="forceRenderNumber" class="tw-bg-white tw-p-6">
        <div
          v-for="h in [
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
          :key="h"
          class="tw-grid tw-grid-flow-col tw-grid-cols-7 tw-w-auto tw-m-auto"
          @mouseup.stop="mouseUp"
        >
          <div class="timeslot-time tw-w-full">{{ h }}:00</div>

          <template v-for="day of days">
            <div
              v-for="m in [0, 15, 30, 45]"
              :key="`${day}_${h * 100 + m}`"
              :ref="`${day}_${h * 100 + m}`"
              :class="getTimeslotClasses(day, h * 100 + m)"
              @mouseover="mouseOver(day, h * 100 + m)"
              @mousedown="mouseDown(day, h * 100 + m)"
              @mouseup.stop="mouseUp"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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

@Component({
  filters: {
    humanDate(interval: Interval) {
      return (
        interval.start.toFormat('HH:mm') + '-' + interval.end.toFormat('HH:mm')
      )
    },
  },
})
export default class Schedule extends Vue {
  private forceRenderNumber: number = 100
  private timeslot = new Set()

  private days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  private availability: Map<string, Interval[]> = new Map<string, Interval[]>()

  private mouseButtonState = MouseButtonState.UP
  private operation: OperationType

  private mouseUp() {
    this.mouseButtonState = MouseButtonState.UP
    this.forceRenderNumber++
    console.log('redraw')

    if (this.timeslot.size > 1) {
      const groupByDay = _.groupBy(
        Array.from(this.timeslot),
        (e) => e.split('_')[0]
      )
      for (const day of Object.keys(groupByDay)) {
        console.log(day)
        const newIntervals = groupByDay[day].map((day) => {
          const [_, slot] = day.split('_')
          return Interval.fromDateTimes(
            DateTime.fromObject({
              hour: parseInt(slot / 100),
              minute: slot % 100,
            }),
            DateTime.fromObject({
              hour: parseInt(slot / 100),
              minute: slot % 100,
            }).plus(Duration.fromObject({ minutes: 15 }))
          )
        })
        const merged = Interval.merge(newIntervals)
        this.availability.set(day, merged)
      }
    }
  }

  private mouseOver(day: string, slot: number) {
    if (this.mouseButtonState === MouseButtonState.DOWN) {
      if (this.$refs[Schedule.createKey(day, slot)]) {
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
    if (this.$refs[key] && this.$refs[key].length > 0) {
      this.$refs[key][0].classList.add('selected')
    }
    this.timeslot.add(key)
  }

  private deSelectTimeslot(day: string, slot: number) {
    const key = Schedule.createKey(day, slot)
    if (this.$refs[key] && this.$refs[key].length > 0) {
      this.$refs[key][0].classList.remove('selected')
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
    if (num % 100 === 30) {
      classes.push('tw-border-t-2 tw-border-black border-top-dotted')
    }
    if (num % 100 === 0) {
      classes.push('tw-border-t-2 tw-border-solid tw-border-black')
    }
    return classes
  }
}
</script>

<style lang="scss">
//.timeblock {
//  width: 100%;
//  border-bottom: 1px solid black;
//  border-left: 1px solid black;
//  border-right: 1px solid black;
//
//  background-color: pink;
//  height: 10px;
//}
//.quarter {
//  margin-top: -1px;
//}
//.end {
//  @apply tw-border-b-2 tw-border-black;
//  //border-bottom: 2px solid black;
//}
////.timeblock-start {
////  border-top: 2px solid black;
////}
//.start {
//  @apply tw-border-t-2 tw-border-black;
//}
.timeslot {
  @apply tw-bg-pink-200 tw-w-8 tw-h-1.5 tw-border-l-2 tw-border-r-2 tw-border-solid tw-border-black tw-gap-0;
}

//.timeslot:nth-child(3n + 0) {
//  @apply tw-border-t-2 tw-border-solid tw-border-black;
//}
//
//.timeslot:nth-child(5n + 0) {
//  border-top-style: dotted;
//  @apply tw-border-t-2 tw-border-black;
//}

.border-top-dotted {
  border-top-style: dotted;
}
.timeslot-time {
  @apply tw-row-span-4 tw-row-start-2 tw-text-right tw--mt-3 tw-pr-1 tw-text-black;
}

.selected {
  @apply tw-bg-green-400;
}
</style>
