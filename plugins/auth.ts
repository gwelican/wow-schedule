import jwtDecode, { JwtPayload } from 'jwt-decode'
import { Plugin } from '@nuxt/types'

const auth: Plugin = async ({ store, $cookies }) => {
  const accessToken = $cookies.get('AccessToken')
  const refreshToken = $cookies.get('AccessToken')

  if (typeof accessToken !== 'undefined') {
    const data = jwtDecode<JwtPayload>(accessToken)
    if (Date.now() >= data.exp!) {
      console.log('Expired accessToken')
      console.log(data)
      $cookies.remove('AccessToken')
    } else {
      await store.dispatch('token/saveAccessToken', accessToken)
    }
  }

  if (typeof refreshToken !== 'undefined') {
    const data = jwtDecode<JwtPayload>(refreshToken)
    if (Date.now() >= data.exp!) {
      console.log('Expired refreshToken')
      console.log(data)
      $cookies.remove('RefreshToken')
    } else {
      await store.dispatch('token/saveRefreshToken', refreshToken)
    }
  }
}

export default auth
