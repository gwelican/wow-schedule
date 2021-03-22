import { Middleware } from '@nuxt/types'
import jwtDecode, { JwtPayload } from 'jwt-decode'

export const auth: Middleware = async ({ redirect, store, $cookies }) => {
  if (!store.state.token.loggedIn) {
    console.log('redirect to login')
    return redirect('/login')
  }
}

export default auth
