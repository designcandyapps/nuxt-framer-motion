import { visualElementStore } from '#motion/render/store'
import type { GenericKeyframesTarget, TargetAndTransition } from '#motion/types'
import { invariant } from '#motion/utils/errors'
import type { MotionValue } from '#motion/value'
import { isMotionValue } from '#motion/value/utils/isMotionValue'
import { animateTarget } from '#motion/animation/interfaces/visualElementTarget'
import type { ObjectTarget } from '#motion/animation/sequence/types'
import type {
  AnimationPlaybackControls,
  AnimationScope,
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  ElementOrSelector,
  ValueAnimationTransition
} from '#motion/animation/types'
import {
  createDOMVisualElement,
  createObjectVisualElement
} from '#motion/animation/utils/createVisualElement'
import { isDOMKeyframes } from '#motion/animation/utils/isDOMKeyframes'
import { resolveSubjects } from './resolveSubjects'
import { animateSingleValue } from './singleValue'

export type AnimationSubject = Element | MotionValue<any> | any
function isSingleValue(
  subject: unknown,
  keyframes: unknown
): subject is MotionValue | string | number {
  return (
    isMotionValue(subject)
    || typeof subject === 'number'
    || (typeof subject === 'string' && !isDOMKeyframes(keyframes))
  )
}
/**
 * Animate a string
 */
export function animateSubject(
  value: string | MotionValue<string>,
  keyframes: string | GenericKeyframesTarget<string>,
  options?: ValueAnimationTransition<string>
): AnimationPlaybackControls[]
/**
 * Animate a number
 */
export function animateSubject(
  value: number | MotionValue<number>,
  keyframes: number | GenericKeyframesTarget<number>,
  options?: ValueAnimationTransition<number>
): AnimationPlaybackControls[]
/**
 * Animate a Element
 */
export function animateSubject(
  element: ElementOrSelector,
  keyframes: DOMKeyframesDefinition,
  options?: DynamicAnimationOptions,
  scope?: AnimationScope
): AnimationPlaybackControls[]
/**
 * Animate a object
 */
export function animateSubject<O extends object>(
  object: O | O[],
  keyframes: ObjectTarget<O>,
  options?: DynamicAnimationOptions
): AnimationPlaybackControls[]
/**
 * Implementation
 */
export function animateSubject<O extends object>(
  subject:
    | MotionValue<number>
    | MotionValue<string>
    | number
    | string
    | ElementOrSelector
    | O
    | O[],
  keyframes:
    | number
    | string
    | GenericKeyframesTarget<number>
    | GenericKeyframesTarget<string>
    | DOMKeyframesDefinition
    | ObjectTarget<O>,
  options?:
    | ValueAnimationTransition<number>
    | ValueAnimationTransition<string>
    | DynamicAnimationOptions,
  scope?: AnimationScope
): AnimationPlaybackControls[] {
  const animations: AnimationPlaybackControls[] = []
  if (isSingleValue(subject, keyframes)) {
    animations.push(
      animateSingleValue(
        subject,
        isDOMKeyframes(keyframes)
          ? (keyframes as any).default || keyframes
          : keyframes,
        options ? (options as any).default || options : options
      )
    )
  } else {
    const subjects = resolveSubjects(
      subject,
      keyframes as DOMKeyframesDefinition,
      scope
    )
    const numSubjects = subjects.length
    invariant(Boolean(numSubjects), 'No valid elements provided.')
    for (let i = 0; i < numSubjects; i++) {
      const thisSubject = subjects[i]
      const createVisualElement
        = thisSubject instanceof Element
          ? createDOMVisualElement
          : createObjectVisualElement
      if (!visualElementStore.has(thisSubject)) {
        createVisualElement(thisSubject as any)
      }
      const visualElement = visualElementStore.get(thisSubject)!
      const transition = { ...options }
      /**
       * Resolve stagger function if provided.
       */
      if (
        'delay' in transition
        && typeof transition.delay === 'function'
      ) {
        transition.delay = transition.delay(i, numSubjects)
      }
      animations.push(
        ...animateTarget(
          visualElement,
          { ...(keyframes as {}), transition } as TargetAndTransition,
          {}
        )
      )
    }
  }
  return animations
}
