// import { NuxtCookies } from 'cookie-universal-nuxt'
// import Vue from 'vue'

import '@nuxt/types'
import Vue from 'vue'

// declare module 'vue/types/vue' {
//   import { NuxtCookies } from 'cookie-universal-nuxt'
//
//   interface Context {
//     $cookies: NuxtCookies
//   }
// }

// declare module 'vue/types/vue' {
//   interface Vue {
//     readonly cookies: NuxtCookies
//   }
// }
//
// declare module 'vuex/types/index' {
//   // @ts-ignore
//   interface Store<S> {
//     readonly cookies: NuxtCookies
//   }
// }

import { NuxtCookies } from 'cookie-universal-nuxt'

declare module '*.vue' {
  export default Vue
}

declare module '@nuxt/types' {
  interface Context {
    $cookies: NuxtCookies
  }
}
