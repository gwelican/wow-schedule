import { Middleware } from '@nuxt/types'

const loginCheck: Middleware = (context) => {
  context.redirect('http://localhost:8080/oauth2/authorization/battlenet')
}

export default loginCheck
