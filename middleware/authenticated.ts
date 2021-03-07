import { Middleware } from '@nuxt/types'
import login from '~/store/login'

const loginCheck: Middleware = (context) => {
  // context.$cookies.set('test', 'test2')

  // context.store
  const token = context.$cookies.get('AccessToken')
  if (token) {
    context.store.commit('login/setAccessToken', token)
    context.$axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    }

    // context.store.setAccessToken()
    // login().set(context.$cookies.get('AccessToken'))
  }
  console.log(context.store)
  if (!context.store.state.login.accessToken) {
    // context.$auth.loginWith()
    console.log('not logged in')
    // context.redirect('http://localhost:8080/oauth2/authorization/battlenet')
  }
  // console.log(context)
}

export default loginCheck
