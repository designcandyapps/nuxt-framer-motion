import { useMemo } from '#motion/composables/useMemo'
import { IKMotionContext, type MotionContextProps } from '#motion/context/MotionContext/index'
import { getCurrentTreeVariants } from '#motion/context/MotionContext/utils'
import type { MotionProps } from '#motion/motion/types'

export function useCreateMotionContext<Instance>(
  props: MotionProps
): MotionContextProps<Instance> {
  const { initial, animate } = getCurrentTreeVariants(
    props,
    inject<MotionContextProps<Instance>>(IKMotionContext, {})
  )

  return useMemo(
    () => ({ initial, animate }),
    [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]
  )
}

function variantLabelsAsDependency(
  prop: undefined | string | string[] | boolean
) {
  return Array.isArray(prop) ? prop.join(' ') : prop
}
