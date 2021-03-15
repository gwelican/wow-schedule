<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="2">
        <v-card elevation="2" class="text-center pa-2">
          <v-card-title class="justify-center"
            >You are not logged in</v-card-title
          >
          <v-card-text>Please log in</v-card-text>
          <v-card-actions class="justify-center">
            <a
              href="https://wow-login.gwelican.eu/oauth2/authorization/battlenet"
            >
              Login
            </a>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { DateTime } from 'luxon'

@Component({
  filters: {
    humanDate(date: number) {
      return DateTime.fromMillis(date).toISO()
    },
  },
  middleware: 'auth',
})
export default class Login extends Vue {
  login2() {
    // this.$auth
    // this.$auth.refreshTokens()
    this.$auth.loginWith('local')
  }
}
</script>
<!--href: 'https://wow-login.gwelican.eu/oauth2/authorization/battlenet',-->
