import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { DateTime, Duration, Interval } from 'luxon'
import DollarApollo from 'vue-apollo'
import gql from 'graphql-tag'
import { Series } from '~/pages/index.vue'

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class Availability extends VuexModule {
  private series: Series[] = []

  @Action
  async loadAvailability(apollo: DollarApollo) {
    const map = new Map<string, Map<string, Interval[]>>()
    const response = await apollo.query({
      query: gql`
        query UserData {
          users {
            availability {
              start
              end
              timeZone
              day
            }
            username
            userId
            timezone
          }
        }
      `,
    })
    for (const user of response.data.users) {
      map.set(user.username, new Map<string, Interval[]>())
      for (let day = 0; day < 7; day++) {
        const weekDay = DateTime.local().plus(
          Duration.fromObject({ hour: day * 24 })
        ).weekdayShort
        map.get(user.username)?.set(weekDay, [])
      }

      for (const availability of user.availability) {
        map
          .get(user.username)
          ?.set(availability.day, [
            getIntervalForTime(
              availability.start / 100,
              availability.end / 100,
              availability.timeZone
            ),
          ])
      }
    }
    this.context.commit('generateSeries', map)
  }

  @Mutation
  generateSeries(map: Map<string, Map<string, Interval[]>>) {
    const series: Series[] = [{ data: [] }]
    const today = DateTime.local().weekdayShort
    const tomorrow = DateTime.local().plus(Duration.fromObject({ hour: 24 }))
      .weekdayShort

    for (const user of map.keys()) {
      const userAvailability = map.get(user)

      for (const interval of userAvailability?.get(today) as Interval[]) {
        series[0].data.push({
          x: user,
          y: [
            interval.start.toLocal().toJSDate().getTime(),
            interval.end.toLocal().toJSDate().getTime(),
          ],
        })
      }
      for (const interval of userAvailability?.get(tomorrow) as Interval[]) {
        series[0].data.push({
          x: user,
          y: [
            interval.start
              .toLocal()
              .plus(Duration.fromObject({ day: 1 }))
              .toJSDate()
              .getTime(),
            interval.end
              .toLocal()
              .plus(Duration.fromObject({ day: 1 }))
              .toJSDate()
              .getTime(),
          ],
        })
      }
    }
    this.series = series
  }
}

export function getIntervalForTime(
  hourStart: number,
  hourEnd: number,
  timeZone: string
) {
  return Interval.fromDateTimes(
    DateTime.fromObject({ hour: hourStart, minute: 0, zone: timeZone }),
    DateTime.fromObject({ hour: hourEnd, minute: 0, zone: timeZone })
  )
}
