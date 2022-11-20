import presetWebFonts from '@unocss/preset-web-fonts'
import {
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default {
  modules: [
    '@unocss/nuxt',
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
