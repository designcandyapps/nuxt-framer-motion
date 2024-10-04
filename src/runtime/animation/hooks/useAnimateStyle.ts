import { useConstant } from '#motion/utils/useConstant'
import { useUnmountEffect } from '#motion/utils/useUnmountEffect'
import { createScopedWaapiAnimate } from '#motion/animation/animators/waapi/animateStyle'
import type { AnimationScope } from '#motion/animation/types'

export function useAnimateMini<T extends Element = any>() {
  const scope: AnimationScope<T> = useConstant(() => ({
    value: null!, // Will be hydrated by React
    animations: []
  }))

  const animate = useConstant(() => createScopedWaapiAnimate(scope))

  useUnmountEffect(() => {
    scope.animations.forEach(animation => animation.stop())
  })

  return [scope, animate] as [AnimationScope<T>, typeof animate]
}
