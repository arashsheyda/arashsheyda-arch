export default defineNuxtConfig({
  devtools: false,
  extends: ['nuxt-arch'],
  modules: [
    'nuxtjs/plausible',
  ],

  plausible: {
    domain: 'arashsheyda.me',
  },
})
