import { Module, VuexModule } from 'vuex-module-decorators'

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class Login extends VuexModule {
  isLoggedIn = false
  accessToken: string
}
