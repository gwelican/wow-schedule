<template>
  <v-container> </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

const qs = require('qs')

@Component
export default class Oauth2 extends Vue {
  async mounted() {
    const loginTokens = await this.$axios
      .$get(
        `https://wow-login.gwelican.eu/login/oauth2/code/battlenet?${qs.stringify(
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

    this.$cookies.set('AccessToken', accessToken)
    this.$cookies.set('RefreshToken', refreshToken)
    try {
      this.$auth.setUserToken(accessToken, refreshToken)
    } catch (e) {
      // FIXME: log me
      console.log(e)
    }

    await this.$router.push('/')
  }
}
</script>
