import jwtDecode, { JwtPayload } from 'jwt-decode'
import { Plugin } from '@nuxt/types'

export const ACCESS_TOKEN_NAME = 'AccessToken'
export const REFRESH_TOKEN_NAME = 'RefreshToken'
const auth: Plugin = async ({ store, $cookies }) => {
  const accessToken = $cookies.get(ACCESS_TOKEN_NAME)
  const refreshToken = $cookies.get(REFRESH_TOKEN_NAME)

  if (typeof accessToken !== 'undefined') {
    const data = jwtDecode<JwtPayload>(accessToken)
    if (Date.now() >= data.exp! * 1000) {
      console.log(Date.now())
      console.log(data.exp)
      console.log(accessToken)
      console.log('Expired accessToken')
      console.log(data)
      $cookies.remove(ACCESS_TOKEN_NAME)
    } else {
      await store.dispatch('token/saveAccessToken', accessToken)
    }
  }

  if (typeof refreshToken !== 'undefined') {
    const data = jwtDecode<JwtPayload>(refreshToken)
    if (Date.now() >= data.exp! * 1000) {
      console.log('Expired refreshToken')
      console.log(data)
      $cookies.remove(REFRESH_TOKEN_NAME)
    } else {
      await store.dispatch('token/saveRefreshToken', refreshToken)
    }
  }
}

export default auth
