import { Action, Getter } from 'nuxt-property-decorator'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { DateTime } from 'luxon'

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
  loadAvailability() {
    const map = new Map<string, Map<string, DateTime>>()
    this.context.commit('setAvailability', map)
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
