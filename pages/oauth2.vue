<template>
  <v-container> </v-container>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'

const qs = require('qs')

const login = namespace('login')

@Component
export default class Oauth2 extends Vue {
  @login.Mutation
  private setAccessToken

  async mounted() {
    console.log('mount')
    const x = await this.$axios
      .get(
        `http://localhost:8080/login/oauth2/code/battlenet?${qs.stringify(
          this.$route.query
        )}`,
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log(err)
      })

    console.log('auth done')
    console.log(x)
    const token = await this.$axios.$get(`http://localhost:8080/oauth2/token`, {
      withCredentials: true,
    })
    this.$axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    }
    this.setAccessToken(token)

    this.$axios.get('http://localhost:8080/api/me')
  }
}
</script>
