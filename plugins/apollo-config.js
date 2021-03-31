// apollo-config.js
import { onError } from '@apollo/client/link/error'
import Cookie from 'universal-cookie'
import { ACCESS_TOKEN_NAME } from '~/plugins/auth'

export default function ({ $toast, req }) {
  const httpEndpoint =
    process.env.NODE_ENV === 'production'
      ? 'https://wow-data.gwelican.eu/graphql'
      : 'http://localhost:8081/graphql'

  const link = onError(({ networkError, graphQLErrors }) => {
    if (networkError.statusCode) {
      $toast.error('Failed to talk to the server')
    }
    if (graphQLErrors) {
      $toast.error('Server error')
    }
  })

  const cookies = new Cookie(req && req.headers.cookie)
  return {
    link,
    getAuth: () => {
      return 'Bearer ' + cookies.get(ACCESS_TOKEN_NAME)
    },
    httpEndpoint,
  }
}
