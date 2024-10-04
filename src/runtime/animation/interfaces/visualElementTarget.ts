import { transformProps } from '#motion/render/html/utils/transform'
import type { AnimationTypeState } from '#motion/render/utils/animationState'
import type { VisualElement } from '#motion/render/VisualElement'
import type { TargetAndTransition } from '#motion/types'
import type { VisualElementAnimationOptions } from '#motion/animation/interfaces/types'
import { animateMotionValue } from '#motion/animation/interfaces/motionValue'
import { setTarget } from '#motion/render/utils/setters'
import type { AnimationPlaybackControls } from '#motion/animation/types'
import { getValueTransition } from '#motion/animation/utils/getValueTransition'
import { frame } from '#motion/frameloop'
import { getOptimisedAppearId } from '#motion/animation/optimizedAppear/getAppearId'
import { addValueToWillChange } from '#motion/value/useWillChange/addWillChange'

/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */
function shouldBlockAnimation(
  { protectedKeys, needsAnimating }: AnimationTypeState,
  key: string
) {
  const shouldBlock
    = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true

  needsAnimating[key] = false
  return shouldBlock
}

export function animateTarget(
  visualElement: VisualElement,
  targetAndTransition: TargetAndTransition,
  { delay = 0, transitionOverride, type }: VisualElementAnimationOptions = {}
): AnimationPlaybackControls[] {
  let {
    transition = visualElement.getDefaultTransition(),
    transitionEnd,
    ...target
  } = targetAndTransition

  if (transitionOverride) transition = transitionOverride

  const animations: AnimationPlaybackControls[] = []

  const animationTypeState
    = type
    && visualElement.animationState
    && visualElement.animationState.getState()[type]

  for (const key in target) {
    const value = visualElement.getValue(
      key,
      visualElement.latestValues[key] ?? null
    )
    const valueTarget = target[key as keyof typeof target]

    if (
      valueTarget === undefined
      || (animationTypeState
        && shouldBlockAnimation(animationTypeState, key))
    ) {
      continue
    }

    const valueTransition = {
      delay,
      ...getValueTransition(transition || {}, key)
    }

    /**
     * If this is the first time a value is being animated, check
     * to see if we're handling off from an existing animation.
     */
    let isHandoff = false
    if (window.MotionHandoffAnimation) {
      const appearId = getOptimisedAppearId(visualElement)

      if (appearId) {
        const startTime = window.MotionHandoffAnimation(
          appearId,
          key,
          frame
        )

        if (startTime !== null) {
          valueTransition.startTime = startTime
          isHandoff = true
        }
      }
    }

    addValueToWillChange(visualElement, key)

    value.start(
      animateMotionValue(
        key,
        value,
        valueTarget,
        visualElement.shouldReduceMotion && transformProps.has(key)
          ? { type: false }
          : valueTransition,
        visualElement,
        isHandoff
      )
    )

    const animation = value.animation

    if (animation) {
      animations.push(animation)
    }
  }

  if (transitionEnd) {
    Promise.all(animations).then(() => {
      frame.update(() => {
        transitionEnd && setTarget(visualElement, transitionEnd)
      })
    })
  }

  return animations
}
