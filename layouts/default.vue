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

      <v-menu v-if="$store.state.token.loggedIn" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">{{ user }}</v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-content> User settings(todo) </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn v-if="loggedIn" @click="logout"><v-icon>mdi-logout</v-icon></v-btn>
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
import { Component, namespace, Vue } from 'nuxt-property-decorator'

const token = namespace('token')
@Component
export default class Default extends Vue {
  @token.State
  private user!: string

  @token.State
  private loggedIn!: boolean

  @token.Action('clearTokens')
  private clearTokens: any

  async logout() {
    this.$cookies.remove('AccessToken')
    this.$cookies.remove('RefreshToken')

    this.clearTokens()
    await this.$router.push('/login')
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
