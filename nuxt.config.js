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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/apexcharts', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    ['cookie-universal-nuxt', { alias: 'cookies' }],
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/auth-next',
  ],

  auth: {
    redirect: {
      login: '/login',
      home: '/schedule',
      logout: '/',
    },
    plugins: ['~/plugins/auth.js'],
    strategies: {
      local: {
        scheme: 'refresh',
        user: {
          property: 'principal.claims.battle_tag',
          // autoFetch: true
        },
        token: {
          property: 'accessToken',
          maxAge: 1800,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        endpoints: {
          login: {
            url: 'https://wow-login.gwelican.eu/login/token',
            method: 'get',
            withCredentials: true,
          },
          refresh: {
            url: 'https://wow-login.gwelican.eu/login/token',
            withCredentials: true,
            method: 'get',
          },
          user: false,
          // user: {
          //   url: 'https://wow-login.gwelican.eu/login/me',
          //   method: 'get',
          //   withCredentials: true,
          // },
          logout: false,
        },
      },
    },
  },

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
        httpEndpoint: 'https://wow-data.gwelican.eu/graphql',
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
}
