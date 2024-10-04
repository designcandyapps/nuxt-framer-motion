import { resolveElements } from '#motion/render/dom/utils/resolveElement'
import { visualElementStore } from '#motion/render/store'
import { invariant } from '#motion/utils/errors'
import type { MotionValue } from '#motion/value'
import { GroupPlaybackControls } from '#motion/animation/GroupPlaybackControls'
import type {
  AnimationPlaybackControls,
  AnimationScope,
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  ElementOrSelector,
  ValueAnimationTransition
} from '#motion/animation/types'
import { isDOMKeyframes } from '#motion/animation/utils/defaultTransitions'
import { animateTarget } from '#motion/animation/interfaces/visualElementTarget'
import type { GenericKeyframesTarget, TargetAndTransition } from '#motion/types'
import { createVisualElement } from '#motion/animation/utils/createVisualElement'
import { animateSingleValue } from '#motion/animation/interfaces/singleValue'
import type { AnimationSequence, SequenceOptions } from '#motion/animation/sequence/types'
import { createAnimationsFromSequence } from '#motion/animation/sequence/create'
import { isMotionValue } from '#motion/value/utils/isMotionValue'
import { spring } from '#motion/animation/generators/spring'

function animateElements(
  elementOrSelector: ElementOrSelector,
  keyframes: DOMKeyframesDefinition,
  options?: DynamicAnimationOptions,
  scope?: AnimationScope
): AnimationPlaybackControls {
  const elements = resolveElements(elementOrSelector, scope)
  const numElements = elements.length

  invariant(Boolean(numElements), 'No valid element provided.')

  const animations: AnimationPlaybackControls[] = []

  for (let i = 0; i < numElements; i++) {
    const element = elements[i]

    /**
     * Check each element for an associated VisualElement. If none exists,
     * we need to create one.
     */
    if (!visualElementStore.has(element)) {
      /**
       * TODO: We only need render-specific parts of the VisualElement.
       * With some additional work the size of the animate() function
       * could be reduced significantly.
       */
      createVisualElement(element as HTMLElement | SVGElement)
    }

    const visualElement = visualElementStore.get(element)!

    const transition = { ...options }

    /**
     * Resolve stagger function if provided.
     */
    if (typeof transition.delay === 'function') {
      transition.delay = transition.delay(i, numElements)
    }

    animations.push(
      ...animateTarget(
        visualElement,
        { ...keyframes, transition } as TargetAndTransition,
        {}
      )
    )
  }

  return new GroupPlaybackControls(animations)
}

const isSequence = (value: unknown): value is AnimationSequence =>
  Array.isArray(value) && Array.isArray(value[0])

function animateSequence(
  sequence: AnimationSequence,
  options?: SequenceOptions,
  scope?: AnimationScope
) {
  const animations: AnimationPlaybackControls[] = []
  const animationDefinitions = createAnimationsFromSequence(
    sequence,
    options,
    scope,
    { spring }
  )

  animationDefinitions.forEach(({ keyframes, transition }, subject) => {
    let animation: AnimationPlaybackControls

    if (isMotionValue(subject)) {
      animation = animateSingleValue(
        subject,
        keyframes.default,
        transition.default
      )
    } else {
      animation = animateElements(subject, keyframes, transition)
    }

    animations.push(animation)
  })

  return new GroupPlaybackControls(animations)
}

export const createScopedAnimate = (scope?: AnimationScope) => {
  /**
   * Animate a single value
   */
  function scopedAnimate<V>(
    from: V,
    to: V | GenericKeyframesTarget<V>,
    options?: ValueAnimationTransition<V>
  ): AnimationPlaybackControls
  /**
   * Animate a MotionValue
   */
  function scopedAnimate<V>(
    value: MotionValue<V>,
    keyframes: V | GenericKeyframesTarget<V>,
    options?: ValueAnimationTransition<V>
  ): AnimationPlaybackControls
  /**
   * Animate DOM
   */
  function scopedAnimate(
    value: ElementOrSelector,
    keyframes: DOMKeyframesDefinition,
    options?: DynamicAnimationOptions
  ): AnimationPlaybackControls
  /**
   * Animate sequences
   */
  function scopedAnimate(
    sequence: AnimationSequence,
    options?: SequenceOptions
  ): AnimationPlaybackControls
  /**
   * Implementation
   */
  function scopedAnimate<V extends string | number>(
    valueOrElementOrSequence:
      | AnimationSequence
      | ElementOrSelector
      | MotionValue<V>
      | V,
    keyframes:
      | SequenceOptions
      | DOMKeyframesDefinition
      | V
      | GenericKeyframesTarget<V>,
    options?: ValueAnimationTransition<V> | DynamicAnimationOptions
  ): AnimationPlaybackControls {
    let animation: AnimationPlaybackControls

    if (isSequence(valueOrElementOrSequence)) {
      animation = animateSequence(
        valueOrElementOrSequence,
        keyframes as SequenceOptions,
        scope
      )
    } else if (isDOMKeyframes(keyframes)) {
      animation = animateElements(
        valueOrElementOrSequence as ElementOrSelector,
        keyframes,
        options as DynamicAnimationOptions | undefined,
        scope
      )
    } else {
      animation = animateSingleValue(
        valueOrElementOrSequence as MotionValue<V> | V,
        keyframes as V | GenericKeyframesTarget<V>,
        options as ValueAnimationTransition<V> | undefined
      )
    }

    if (scope) {
      scope.animations.push(animation)
    }

    return animation
  }

  return scopedAnimate
}

export const animate = createScopedAnimate()
