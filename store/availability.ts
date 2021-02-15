import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { DateTime } from 'luxon'
import DollarApollo from 'vue-apollo'
import gql from 'graphql-tag'

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class Availability extends VuexModule {
  // wheels = 2

  private availabilityMap: Map<string, Map<string, DateTime>> = new Map<
    string,
    Map<string, DateTime>
  >()

  @Action
  async loadAvailability2(apollo: DollarApollo) {
    // const map = new Map<string, Map<string, DateTime>>()
    // this.context.commit('setAvailability', map)
    // console.log(this.$store)
    // console.log(this.context)
    // const client = this.app.apolloProvider.defaultClient
    // console.log(client)
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
    this.context.commit('setAvailability', response.data.users)
    console.log(response)
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
  setAvailability(map: Map<string, Map<string, DateTime>>) {
    this.availabilityMap = map
  }

  // get availabilityMap() {
  //   return this.availabilityMap
  // }
}
