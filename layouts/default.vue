<template>
  <v-app>
    <v-app-bar dark dense app>
      <v-tabs center-active centered>
        <v-tab v-for="item in items" :key="item.to" :to="item.to">
          <v-card>
            <v-card-title>
              {{ item.title }}
            </v-card-title>
          </v-card>
        </v-tab>
      </v-tabs>
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
  items = [
    {
      icon: 'mdi-apps',
      title: 'my Schedule',
      to: '/schedule',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Who is available',
      to: '/',
    },
  ]
}
</script>
