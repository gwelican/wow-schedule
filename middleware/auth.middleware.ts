import { Middleware } from '@nuxt/types'

export const auth: Middleware = ({ redirect, store }) => {
  if (!store.state.token.loggedIn) {
    console.log('redirect to login')
    return redirect('/login')
  }
}

export default auth
