import type {
  AnimationScope,
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  ElementOrSelector
} from '#motion/animation/types'

export const createScopedWaapiAnimate = (scope?: AnimationScope) => {
  function scopedAnimate(
    elementOrSelector: ElementOrSelector,
    keyframes: DOMKeyframesDefinition,
    options?: DynamicAnimationOptions
  ) {
    return new GroupPlaybackControls(
      animateElements(
        elementOrSelector,
        keyframes as DOMKeyframesDefinition,
        options,
        scope
      )
    )
  }

  return scopedAnimate
}

export const animateMini = /* @__PURE__ */ createScopedWaapiAnimate()
