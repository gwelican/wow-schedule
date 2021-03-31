import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import DollarApollo from 'vue-apollo'
import gql from 'graphql-tag'
import { DateTime, Duration, Interval } from 'luxon'
import { Availability } from '~/types/types'

interface WeekDays {
  [key: string]: number
}

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class MySchedule extends VuexModule {
  private timeslot = new Set()

  @Action
  async saveSchedule({
    apollo,
    schedule,
    timezone,
  }: {
    apollo: DollarApollo
    schedule: Interval[]
    timezone: string
  }) {
    return await apollo.mutate({
      mutation: gql`
        mutation($schedule: [IntervalInput], $timezone: String) {
          saveSchedule(schedule: $schedule, timezone: $timezone) {
            availability {
              day
              intervals {
                day
                end
                start
                timezone
              }
            }
          }
        }
      `,
      variables: {
        schedule,
        timezone,
      },
    })
  }

  @Action
  async loadSchedule(apollo: DollarApollo) {
    const response = await apollo.query({
      query: gql`
        query UserData {
          myschedule {
            availability {
              day
              intervals {
                end
                start
                timezone
              }
            }
          }
        }
      `,
    })

    const timeslot = new Set<string>()
    for (const availability of response.data.myschedule
      .availability as Availability[]) {
      for (const interval of availability.intervals) {
        let start = getDateTimeFromInterval(interval.start)
        const end = getDateTimeFromInterval(interval.end)

        const day = availability.day
        while (end.diff(start, 'minutes').minutes > 0) {
          timeslot.add(day + '_' + start.toFormat('HHmm'))
          start = start.plus(Duration.fromObject({ minutes: 15 }))
        }
      }
    }
    await this.context.commit('setTimeslot', timeslot)
  }

  @Mutation
  addTimeslotKey(key: string) {
    this.timeslot.add(key)
  }

  @Mutation
  deleteTimeslotKey(key: string) {
    this.timeslot.delete(key)
  }

  @Mutation
  setTimeslot(timeslot: Set<string>) {
    this.timeslot = timeslot
  }

  weekdays: WeekDays = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  }
}

function getDateTimeFromInterval(slot: number) {
  return DateTime.now().set({
    hour: slot / 100,
    minute: slot % 100,
    second: 0,
    millisecond: 0,
  })
}
