import colors from 'vuetify/es5/util/colors'
import webpack from 'webpack'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - wow-schedule',
    title: 'wow-schedule',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'initial-scale=1, user-scalable=no, width=device-width, height=device-height, viewport-fit=cover',
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/apexcharts', ssr: false }, '~/plugins/auth'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // 'nuxt-purgecss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    ['cookie-universal-nuxt', { alias: 'cookies' }],
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',

    // '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          process.env.NODE_ENV === 'production'
            ? 'https://wow-data.gwelican.eu/graphql'
            : 'http://localhost:8081/graphql',
        tokenName: 'AccessToken',
      },
    },
  },
  router: {
    base: '/wow-schedule/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
      }),
    ],
  },
  publicRuntimeConfig: {
    LOGIN_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://wow-login.gwelican.eu'
        : 'http://localhost:8080',
    DATA_URL: process.env.NODE_ENV
      ? 'https://wow-data.gwelican.eu'
      : 'http://localhost:8081',
  },
  privateRuntimeConfig: {},
  purgeCSS: {},
}
