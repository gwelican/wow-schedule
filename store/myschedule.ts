import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import DollarApollo from 'vue-apollo'
import gql from 'graphql-tag'
import { DateTime, Duration, Interval } from 'luxon'
import { Availability, UserData } from '~/types/types'
import { getIntervalForTime } from '~/store/availability'
import { Series, SeriesData } from '~/types/apexHelper'

interface WeekDays {
  [key: string]: number
}

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class MySchedule extends VuexModule {
  private series: Series[] = []
  private availability: Map<string, Interval[]> = new Map<string, Interval[]>()
  private timeslot = new Set()

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

    this.context.commit('generateSeries', response.data.myschedule)
  }

  @Action
  async loadSchedule2(apollo: DollarApollo) {
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

        while (end.diff(start, 'minutes').minutes > 0) {
          timeslot.add(availability.day + '_' + start.toFormat('HHmm'))
          start = start.plus(Duration.fromObject({ minutes: 15 }))
        }
      }
    }
    console.log(this.timeslot)
    await this.context.commit('setTimeslot', timeslot)
  }

  @Mutation
  setTimeslot(timeslot: Set<string>) {
    this.timeslot = timeslot
    console.log('mutate')
  }

  @Action
  async addAvailability({
    apollo,
    start,
    end,
    timezone,
    day,
  }: {
    apollo: DollarApollo
    start: number
    end: number
    timezone: string
    day: string
  }) {
    const response = await apollo.mutate({
      mutation: gql`
        mutation($start: Int!, $end: Int!, $timezone: String!, $day: String!) {
          addAvailabilityToUser(
            availability: {
              timezone: $timezone
              day: $day
              start: $start
              end: $end
            }
          ) {
            username
            availability {
              day
              intervals {
                start
                end
                timezone
              }
            }
          }
        }
      `,
      variables: {
        day,
        end,
        start,
        timezone,
      },
    })

    this.context.commit('generateSeries', response.data.addAvailabilityToUser)
  }

  @Mutation
  generateSeries(data: UserData) {
    const series: Series[] = [{ data: [] }]

    for (const availability of data.availability) {
      for (const data of availability.intervals) {
        const interval = getIntervalForTime(data.start, data.end, data.timezone)
        series[0].data.push({
          x: availability.day,
          y: [
            interval.start.set({ day: 1, month: 1 }),
            interval.end.set({ day: 1, month: 1 }),
          ],
        })
      }
    }
    series[0].data.sort((a: SeriesData, b: SeriesData) => {
      return this.weekdays[a.x] - this.weekdays[b.x]
    })
    this.series = series
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
  })
}
