import type { DefineComponent } from 'vue'
import { lowercaseSVGElements } from '#motion/render/svg/lowercaseElements'

export function isSVGComponent(
  component: string | DefineComponent
) {
  if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof component !== 'string'
    /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    || component.includes('-')
  ) {
    return false
  } else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.includes(component)
    /**
     * If it contains a capital letter, it's an SVG component
     */
    || /[A-Z]/u.test(component)
  ) {
    return true
  }

  return false
}
