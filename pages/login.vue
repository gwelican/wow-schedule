<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col lg="2">
        <v-card elevation="2" class="text-center pa-2">
          <v-card-title class="justify-center"
            >You are not logged in</v-card-title
          >
          <v-card-text>Please log in</v-card-text>
          <v-card-actions class="justify-center">
            <a :href="`${$config.LOGIN_URL}/oauth2/authorization/battlenet`">
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
})
export default class Login extends Vue {
  mounted() {
    if (this.$store.state.token.loggedIn) {
      this.$router.replace({
        path: '/',
        query: {},
      })
    }
  }
}
</script>
