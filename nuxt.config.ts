export default {
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  unocss: {
    preflight: true,
  },
}
