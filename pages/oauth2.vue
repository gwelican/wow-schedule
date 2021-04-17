<template>
  <v-container> </v-container>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '~/plugins/auth'

const qs = require('qs')
const token = namespace('token')

@Component
export default class Oauth2 extends Vue {
  @token.Action('saveAccessToken')
  private saveAccessToken: any

  @token.Action('saveRefreshToken')
  private saveRefreshToken: any

  async mounted() {
    const loginTokens = await this.$axios
      .$get(
        `${this.$config.LOGIN_URL}/login/oauth2/code/battlenet?${qs.stringify(
          this.$route.query
        )}`,
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        // FIXME: log me
        throw err
      })

    const accessToken = loginTokens?.accessToken
    const refreshToken = loginTokens?.refreshToken

    this.saveAccessToken(accessToken)
    this.saveRefreshToken(refreshToken)

    this.$cookies.set(ACCESS_TOKEN_NAME, accessToken)
    this.$cookies.set(REFRESH_TOKEN_NAME, refreshToken)

    await this.$router.replace({
      path: '/',
      query: {},
    })
    this.$toast
      .success(`You are logged in. ${this.$store.state.token.user}`)
      .goAway(2000)
  }
}
</script>
