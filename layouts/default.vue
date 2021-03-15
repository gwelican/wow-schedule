<template>
  <v-app>
    <v-app-bar dark dense app>
      <v-tabs center-active centered>
        <v-tab
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          :href="item.href"
        >
          <v-card v-if="item.visible === undefined">
            <v-card-title>
              {{ item.title }}
            </v-card-title>
          </v-card>
        </v-tab>
      </v-tabs>
      <v-card v-if="$auth.loggedIn">
        {{ $auth.user }}
      </v-card>

      <v-btn v-if="$auth.loggedIn" @click="logout"
        ><v-icon>mdi-logout</v-icon></v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Default extends Vue {
  async logout() {
    this.$cookies.remove('AccessToken')
    this.$cookies.remove('RefreshToken')

    await this.$router.push('/login')
    await this.$auth.logout('local')
  }

  private items = [
    {
      icon: 'mdi-apps',
      title: 'my Schedule',
      to: '/my-schedule',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Who is available',
      to: '/',
    },
  ]
}
</script>
