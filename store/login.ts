import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class Login extends VuexModule {
  accessToken: string = ''

  get isLoggedIn() {
    return this.accessToken && this.accessToken.length > 0
  }

  @Mutation
  setAccessToken(token: string) {
    this.accessToken = token
  }
}
