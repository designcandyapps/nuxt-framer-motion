import { htmlElements, svgElements } from './elements'
import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'framer-motion/nuxt',
    configKey: 'motion'
  },
  defaults: {},
  async setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.alias['#motion'] = resolve('./runtime')

    htmlElements.forEach((tag) => {
      addComponent({
        name: `Motion${tag.charAt(0).toUpperCase() + tag.slice(1)}`,
        filePath: resolve('./runtime/render/components/motion/namespace'),
        export: tag
      })
    })

    svgElements.forEach((tag) => {
      addComponent({
        name: `Motion${tag.charAt(0).toUpperCase() + tag.slice(1)}`,
        filePath: resolve('./runtime/render/components/motion/namespace'),
        export: tag
      })
    })
  }
})
