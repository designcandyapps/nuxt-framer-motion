import type { Ref } from 'vue'
import { motionValue } from '#motion/value/index'
import { useConstant } from '#motion/utils/useConstant'
import { useEffect } from '#motion/react/useEffect'
import { useIsomorphicLayoutEffect } from '#motion/utils/useIsomorphicLayoutEffect'
import { warning } from '#motion/utils/errors'
import { scroll } from '#motion/render/dom/scroll'
import type { ScrollInfoOptions } from '#motion/render/dom/scroll/types'

export interface UseScrollOptions
  extends Omit<ScrollInfoOptions, 'container' | 'target'> {
  container?: Ref<HTMLElement>
  target?: Ref<HTMLElement>
  layoutEffect?: boolean
}

function refWarning(name: string, ref?: Ref<HTMLElement>) {
  warning(
    Boolean(!ref || ref.value),
    `You have defined a ${name} options but the provided ref is not yet hydrated, probably because it's defined higher up the tree. Try calling useScroll() in the same component as the ref, or setting its \`layoutEffect: false\` option.`
  )
}

const createScrollMotionValues = () => ({
  scrollX: motionValue(0),
  scrollY: motionValue(0),
  scrollXProgress: motionValue(0),
  scrollYProgress: motionValue(0)
})

export function useScroll({
  container,
  target,
  layoutEffect = true,
  ...options
}: UseScrollOptions = {}) {
  const values = useConstant(createScrollMotionValues)

  const useLifecycleEffect = layoutEffect
    ? useIsomorphicLayoutEffect
    : useEffect

  const offset = computed(() => JSON.stringify(options.offset))

  useLifecycleEffect(() => {
    refWarning('target', target)
    refWarning('container', container)

    return scroll(
      (_progress, { x, y }) => {
        values.scrollX.set(x.value)
        values.scrollXProgress.set(x.progress)
        values.scrollY.set(y.value)
        values.scrollYProgress.set(y.progress)
      },
      {
        ...options,
        container: container?.value || undefined,
        target: target?.value || undefined
      }
    )
  }, [container ?? ref(), target ?? ref(), offset])

  return values
}
