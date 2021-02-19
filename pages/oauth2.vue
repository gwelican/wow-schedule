<template>
  <v-container> </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Oauth2 extends Vue {
  mounted() {
    console.log(this.$route)
  }
}
</script>
