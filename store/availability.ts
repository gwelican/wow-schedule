import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { DateTime, Duration, Interval } from 'luxon'
import DollarApollo from 'vue-apollo'
import gql from 'graphql-tag'

import { UserData } from '~/types/types'
import { Series } from '~/pages/index.vue'

type AvailabilityMap = Map<string, Map<string, Interval[]>>

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class Availability extends VuexModule {
  private series: Series[] = []

  @Action
  async loadAvailability(apollo: DollarApollo) {
    const response = await apollo.query({
      query: gql`
        query UserData {
          users {
            availability {
              intervals {
                start
                end
                timeZone
              }
              day
            }
            username
            userId
            timezone
          }
        }
      `,
    })

    const map = convertResponseToMap(response.data.users as UserData[])

    const series = convertMapToSeries(map)

    this.context.commit('setSeries', series)
  }

  @Mutation
  setSeries(series: Series[]) {
    this.series = series
  }
}

export function getIntervalForTime(
  hourStart: number,
  hourEnd: number,
  timeZone: string
) {
  return Interval.fromDateTimes(
    DateTime.fromObject({
      hour: Math.floor(hourStart / 100),
      minute: Math.floor(hourStart % 100),
      zone: timeZone,
    }),
    DateTime.fromObject({
      hour: Math.floor(hourEnd / 100),
      minute: Math.floor(hourEnd % 100),
      zone: timeZone,
    })
  )
}

function convertResponseToMap(users: UserData[]): AvailabilityMap {
  const map = new Map<string, Map<string, Interval[]>>()

  for (const user of users) {
    map.set(user.username, new Map<string, Interval[]>())

    for (const availability of user.availability) {
      const intervals = []
      for (const interval of availability.intervals) {
        intervals.push(
          getIntervalForTime(interval.start, interval.end, interval.timeZone)
        )
      }

      map.get(user.username)?.set(availability.day, Interval.merge(intervals))
    }
  }

  return map
}

function convertMapToSeries(map: AvailabilityMap): Series[] {
  const series: Series[] = [
    {
      data: [],
    },
  ]

  const offsets = [-72, -48, -24, 0, 24, 48, 72]

  for (const user of map.keys()) {
    const userAvailability = map.get(user)!

    for (const offset of offsets) {
      const day = DateTime.local().plus(Duration.fromObject({ hour: offset }))
        .weekdayShort
      if (userAvailability.has(day)) {
        for (const interval of userAvailability?.get(day) as Interval[]) {
          series[0].data.push({
            x: user,
            y: [
              interval.start
                .toLocal()
                .plus(Duration.fromObject({ hour: offset }))
                .toJSDate()
                .getTime(),
              interval.end
                .toLocal()
                .plus(Duration.fromObject({ hour: offset }))
                .toJSDate()
                .getTime(),
            ],
          })
        }
      }
    }
  }
  return series
}
