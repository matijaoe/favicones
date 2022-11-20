import presetWebFonts from '@unocss/preset-web-fonts'
import {
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

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
    attributify: true,

    // core options
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  },
}
