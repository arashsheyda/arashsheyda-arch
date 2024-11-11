export default defineNuxtConfig({
  devtools: false,
  extends: ['nuxt-arch'],
  css: [
    '~/styles/style.scss',
  ],
  runtimeConfig: {
    public: {
      siteUrl: 'https://arashsheyda.me',
      siteName: 'Arch',
      siteDescription: 'Arash Sheyda\'s Personal Website',
      language: 'en',
    }
  },
})
