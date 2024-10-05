import { IKMotionContext, type MotionContextProps } from '#motion/context/MotionContext/index'
import { getCurrentTreeVariants } from '#motion/context/MotionContext/utils'
import type { MotionProps } from '#motion/motion/types'
import { smartInject } from '#motion/react/smartIP'

export function useCreateMotionContext<Instance>(
  props: MotionProps
): MotionContextProps<Instance> {
  const { initial, animate } = getCurrentTreeVariants(
    props,
    smartInject(IKMotionContext)
  )

  return computed(() => {
    return { initial, animate }
  })
}
