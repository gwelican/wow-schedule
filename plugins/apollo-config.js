// apollo-config.js
import { onError } from '@apollo/client/link/error'
import { ACCESS_TOKEN_NAME } from '~/plugins/auth'

export default function (context) {
  const httpEndpoint =
    process.env.NODE_ENV === 'production'
      ? 'https://wow-data.gwelican.eu/graphql'
      : 'http://localhost:8081/graphql'

  const link = onError(({ networkError, graphQLErrors }) => {
    if (networkError.statusCode) {
      context.$toast.error('Failed to talk to the server')
    }
    if (graphQLErrors) {
      context.$toast.error('Server error')
    }
  })

  return {
    link,
    getToken: (tokenName = ACCESS_TOKEN_NAME) => {
      return context.$cookies.get(tokenName)
    },
    httpEndpoint,
  }
}
