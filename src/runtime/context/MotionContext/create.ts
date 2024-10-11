import { IKMotionContext, type MotionContextProps } from '#motion/context/MotionContext/index'
import { getCurrentTreeVariants } from '#motion/context/MotionContext/utils'
import type { MotionProps } from '#motion/motion/types'
import { smartInject } from '#motion/react/smartIP'
import type { ComputedRef } from 'vue'

export function useCreateMotionContext<Instance>(
  props: MotionProps
): ComputedRef<MotionContextProps<Instance>> {
  const ij = smartInject(IKMotionContext)
  console.log(ij?.animate, props.animate)

  const { initial, animate } = getCurrentTreeVariants(
    props,
    smartInject(IKMotionContext)
  )

  return computed(() => {
    return { initial, animate }
  })
}
