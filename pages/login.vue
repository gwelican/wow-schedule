<template>
  <v-container> </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Login extends Vue {
  mounted() {
    console.log(this.$route)
    this.$auth.loginWith('discord')
  }
}
</script>
