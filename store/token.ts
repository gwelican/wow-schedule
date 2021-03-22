import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import jwtDecode, { JwtPayload } from 'jwt-decode'

type MyJwtPayload = {
  battle_tag: string
}

@Module({
  stateFactory: true,
  namespaced: true,
})
export default class Token extends VuexModule {
  private accessToken!: string
  private refreshToken!: string
  private loggedIn: boolean = false
  private user!: string

  @Action
  clearTokens() {
    this.context.commit('setAccessToken', '')
    this.context.commit('setRefreshToken', '')
    this.context.commit('setUser', '')
    this.context.commit('setLoggedIn', false)
  }

  @Action
  async saveAccessToken(accessToken: string) {
    const data = jwtDecode<JwtPayload & MyJwtPayload>(accessToken)
    if (data?.exp && data.exp < Date.now()) {
      this.context.commit('setUser', data.battle_tag)
      this.context.commit('setLoggedIn', true)
      this.context.commit('setAccessToken', accessToken)
    }
  }

  @Mutation
  setAccessToken(accessToken: string) {
    this.accessToken = accessToken
  }

  @Action
  saveRefreshToken(refreshToken: string) {
    const data = jwtDecode<JwtPayload & MyJwtPayload>(refreshToken)
    if (data?.exp && data.exp < Date.now()) {
      this.context.commit('setRefreshToken', refreshToken)
    }
  }

  @Mutation
  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken
  }

  @Mutation
  setUser(user: string) {
    this.user = user
  }

  @Mutation
  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn
  }
}
