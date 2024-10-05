import { smartInject } from '#motion/react/smartIP'
import { useInsertionEffect } from '#motion/react/useInsertionEffect'
import type { MotionValue } from '#motion/value/index'
import { isMotionValue } from '#motion/value/utils/isMotionValue'
import { useMotionValue } from '#motion/value/useMotionValue'
import {
  IKMotionConfigContext
} from '#motion/context/MotionConfigContext'
import type { SpringOptions } from '#motion/animation/types'
import { useIsomorphicLayoutEffect } from '#motion/utils/useIsomorphicLayoutEffect'
import { frame, frameData } from '#motion/frameloop'
import {
  animateValue,
  type MainThreadAnimation
} from '#motion/animation/animators/MainThreadAnimation'

function toNumber(v: string | number) {
  if (typeof v === 'number') return v
  return Number.parseFloat(v)
}

/**
 * Creates a `MotionValue` that, when `set`, will use a spring animation to animate to its new state.
 *
 * It can either work as a stand-alone `MotionValue` by initialising it with a value, or as a subscriber
 * to another `MotionValue`.
 *
 * @remarks
 *
 * ```jsx
 * const x = useSpring(0, { stiffness: 300 })
 * const y = useSpring(x, { damping: 10 })
 * ```
 *
 * @param inputValue - `MotionValue` or number. If provided a `MotionValue`, when the input `MotionValue` changes, the created `MotionValue` will spring towards that value.
 * @param springConfig - Configuration options for the spring.
 * @returns `MotionValue`
 *
 * @public
 */
export function useSpring(
  source: MotionValue<string> | MotionValue<number> | number,
  config: SpringOptions = {}
) {
  const { isStatic } = smartInject(IKMotionConfigContext)
  const activeSpringAnimation = ref<MainThreadAnimation<number> | null>(
    null
  )
  const value = useMotionValue(
    isMotionValue(source) ? toNumber(source.get()) : source
  )
  const latestValue = ref<number>(value.get())
  const latestSetter = ref<(v: number) => void>(() => {})

  const startAnimation = () => {
    /**
     * If the previous animation hasn't had the chance to even render a frame, render it now.
     */
    const animation = activeSpringAnimation.current

    if (animation && animation.time === 0) {
      animation.sample(frameData.delta)
    }

    stopAnimation()

    activeSpringAnimation.current = animateValue({
      keyframes: [value.get(), latestValue.current],
      velocity: value.getVelocity(),
      type: 'spring',
      restDelta: 0.001,
      restSpeed: 0.01,
      ...config,
      onUpdate: latestSetter.current
    })
  }

  const stopAnimation = () => {
    if (activeSpringAnimation.current) {
      activeSpringAnimation.current.stop()
    }
  }

  useInsertionEffect(() => {
    return value.attach((v, set) => {
      /**
       * A more hollistic approach to this might be to use isStatic to fix VisualElement animations
       * at that level, but this will work for now
       */
      if (isStatic) return set(v)

      latestValue.current = v
      latestSetter.current = set

      frame.update(startAnimation)

      return value.get()
    }, stopAnimation)
  }, [JSON.stringify(config)])

  useIsomorphicLayoutEffect(() => {
    if (isMotionValue(source)) {
      return source.on('change', v => value.set(toNumber(v)))
    }
  }, [value])

  return value
}
