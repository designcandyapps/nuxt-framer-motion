import type {
  SelectorCache } from '../../render/dom/utils/resolve-element'
import {
  resolveElements
} from '#motion/render/dom/utils/resolve-element'
import type { ObjectTarget } from '#motion/animation/sequence/types'
import type { AnimationScope, DOMKeyframesDefinition } from '#motion/animation/types'
import { isDOMKeyframes } from '#motion/animation/utils/isDomKeyframes'

export function resolveSubjects<O extends {}>(
  subject: string | Element | Element[] | NodeListOf<Element> | O | O[],
  keyframes: DOMKeyframesDefinition | ObjectTarget<O>,
  scope?: AnimationScope,
  selectorCache?: SelectorCache
) {
  if (typeof subject === 'string' && isDOMKeyframes(keyframes)) {
    return resolveElements(subject, scope, selectorCache)
  } else if (subject instanceof NodeList) {
    return Array.from(subject)
  } else if (Array.isArray(subject)) {
    return subject
  } else {
    return [subject]
  }
}
