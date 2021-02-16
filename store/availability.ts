import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { DateTime, Duration, Interval } from 'luxon'
import DollarApollo from 'vue-apollo'
import gql from 'graphql-tag'
import { UserData } from '~/types/types'
import { Series } from '~/pages/index.vue'

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class Availability extends VuexModule {
  // wheels = 2

  private series: Series[] = []
  private stateCounter = 0
  private availabilityMap: Map<string, Map<string, Interval[]>> = new Map<
    string,
    Map<string, Interval[]>
  >()

  @Action
  async loadAvailability2(apollo: DollarApollo) {
    // const map = new Map<string, Map<string, DateTime>>()
    // this.context.commit('setAvailability', map)
    // console.log(this.$store)
    // console.log(this.context)
    // const client = this.app.apolloProvider.defaultClient
    // console.log(client)
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
    console.log(response.data)
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
    this.context.commit('setAvailability', map)
    this.context.commit('generateSeries', map)
    // console.log($apoll)
    // const response = await this.app.apolloProvider.defaultClient.query({
    //   query: gql`
    //     query GetGames {
    //       favoriteGames {
    //         id
    //         image
    //         name
    //         rating
    //         gameUser {
    //           id
    //           name
    //           profileImg
    //         }
    //       }
    //     }
    //   `,
    // })
    //
    // await commit('updateFavoriteGames', response.data.favoriteGames)
    // this.availabilityMap.set('Gwelican', new Map<string, DateTime>())
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

  @Mutation
  setAvailability(map: Map<string, Map<string, Interval[]>>) {
    this.availabilityMap = map
    this.stateCounter++
    // console.log(map)
  }

  // get availabilityMap() {
  //   return this.availabilityMap
  // }
}

function getIntervalForTime(
  hourStart: number,
  hourEnd: number,
  timeZone: string
) {
  return Interval.fromDateTimes(
    DateTime.fromObject({ hour: hourStart, minute: 0, zone: timeZone }),
    DateTime.fromObject({ hour: hourEnd, minute: 0, zone: timeZone })
  )
}
