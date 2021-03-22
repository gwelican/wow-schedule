<template>
  <v-container> </v-container>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'

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
        console.log(err)
      })

    const accessToken = loginTokens.accessToken
    const refreshToken = loginTokens.refreshToken

    this.saveAccessToken(accessToken)
    this.saveRefreshToken(refreshToken)

    this.$cookies.set('AccessToken', accessToken)
    this.$cookies.set('RefreshToken', refreshToken)

    await this.$router.replace({
      path: '/',
      query: {},
    })
  }
}
</script>
