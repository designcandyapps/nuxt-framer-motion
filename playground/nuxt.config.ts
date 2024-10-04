export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: 'antialiased font-sans bg-white dark:bg-gray-900'
      }
    }
  },

  modules: [
    '@nuxt/ui',
    '../src/module'
  ],

  future: {
    compatibilityVersion: 4
  },

  devtools: {
    enabled: true
  },

  compatibilityDate: '2024-09-23'
})
