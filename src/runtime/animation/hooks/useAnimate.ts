import { useConstant } from '#motion/utils/useConstant'
import { useUnmountEffect } from '#motion/utils/useUnmountEffect'
import { createScopedAnimate } from '#motion/animation/animate'
import type { AnimationScope } from '#motion/animation/types'

export function useAnimate<T extends Element = any>() {
  const scope: AnimationScope<T> = useConstant(() => ({
    value: null!, // Will be hydrated by Vue
    animations: []
  }))

  const animate = useConstant(() => createScopedAnimate(scope))

  useUnmountEffect(() => {
    scope.animations.forEach(animation => animation.stop())
  })

  return [scope, animate] as [AnimationScope<T>, typeof animate]
}
