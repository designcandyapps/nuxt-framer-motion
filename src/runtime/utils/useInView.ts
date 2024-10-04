import { useEffect } from '#motion/react/useEffect'
import { useState } from '#motion/react/useState'
import type { Ref } from 'vue'
import { inView, type InViewOptions } from '#motion/render/dom/viewport'

export interface UseInViewOptions
  extends Omit<InViewOptions, 'root' | 'amount'> {
  root?: Ref<Element>
  once?: boolean
  amount?: 'some' | 'all' | number
}

export function useInView(
  ref: Ref<Element>,
  { root, margin, amount, once = false }: UseInViewOptions = {}
) {
  const [isInView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.value || (once && isInView)) return

    const onEnter = () => {
      setInView(true)

      return once ? undefined : () => setInView(false)
    }

    const options: InViewOptions = {
      root: (root && root.value) || undefined,
      margin,
      amount
    }

    return inView(ref.value, onEnter, options)
  }, [root, ref, margin, once, amount])

  return isInView
}
