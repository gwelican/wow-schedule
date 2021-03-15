import { Middleware } from '@nuxt/types'

const loginCheck: Middleware = (context) => {
  // context.$cookies.set('test', 'test2')

  // context.store
  const token = context.$cookies.get('AccessToken')
  const refreshToken = context.$cookies.get('RefreshToken')
  if (token) {
    // context.store.commit('login/setAccessToken', token)
    // context.$axios.defaults.headers.common = {
    //   Authorization: `Bearer ${token}`,
    // }
    console.log('setting tokens')
    // context.$auth.setUserToken(token, refreshToken)
    // context.$auth.fetchUser()

    // context.$auth.setUser('Gwelican')

    // context.store.setAccessToken()
    // login().set(context.$cookies.get('AccessToken'))
  }
  // context.$auth.setUserToken()
  // console.log(context.store)
  if (!context.store.state.login.accessToken) {
    // context.$auth.loginWith()
    console.log('not logged in')
    // context.redirect('http://localhost:8080/oauth2/authorization/battlenet')
  }
  // console.log(context)
}

export default loginCheck
