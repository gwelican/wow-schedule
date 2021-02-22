import { Middleware } from '@nuxt/types'
import login from '~/store/login'

const loginCheck: Middleware = (context) => {
  // context.store.
  if (!login.state.isLoggedIn) {
    // context.redirect('http://localhost:8080/oauth2/authorization/battlenet')
  }
  console.log(context)
}

export default loginCheck
