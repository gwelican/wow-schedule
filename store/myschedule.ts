import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import DollarApollo from 'vue-apollo'
import gql from 'graphql-tag'
import { Series, SeriesData } from '~/pages/index.vue'
import { UserData } from '~/types/types'
import { getIntervalForTime } from '~/store/availability'

interface WeekDays {
  [key: string]: number
}

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class MySchedule extends VuexModule {
  private series: Series[] = []

  @Action
  async loadSchedule(apollo: DollarApollo) {
    // const map = new Map<string, Map<string, Interval[]>>()
    const response = await apollo.query({
      query: gql`
        query UserData {
          myschedule {
            availability {
              day
              intervals {
                end
                start
                timeZone
              }
            }
          }
        }
      `,
    })

    this.context.commit('generateSeries', response.data.myschedule)
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
        mutation(
          $username: String
          $start: Int!
          $end: Int!
          $timeZone: String!
          $day: String!
        ) {
          addAvailabilityToUser(
            username: $username
            availability: {
              timeZone: $timeZone
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
                timeZone
              }
            }
          }
        }
      `,
      variables: {
        day,
        end,
        start,
        timeZone: timezone,
        username: 'Gwelican',
      },
    })

    this.context.commit('generateSeries', response.data.addAvailabilityToUser)
  }

  @Mutation
  generateSeries(data: UserData) {
    const series: Series[] = [{ data: [] }]

    for (const availability of data.availability) {
      for (const data of availability.intervals) {
        const interval = getIntervalForTime(data.start, data.end, data.timeZone)
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
