<template>
  <v-container> </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

const qs = require('qs')

@Component
export default class Oauth2 extends Vue {
  async mounted() {
    const x = await this.$axios
      .$get(
        `https://wow-login.gwelican.eu/login/oauth2/code/battlenet?${qs.stringify(
          this.$route.query
        )}`,
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log(err)
      })

    const accessToken = x.accessToken
    const refreshToken = x.refreshToken
    // this.setAccessToken(accessToken)

    this.$cookies.set('AccessToken', accessToken)
    this.$cookies.set('RefreshToken', refreshToken)
  }
}
</script>
