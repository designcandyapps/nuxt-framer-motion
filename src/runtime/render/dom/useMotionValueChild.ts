import type { VisualElement } from '#motion/render/VisualElement'
import { useConstant } from '#motion/utils/useConstant'
import type { MotionValue } from '#motion/value'

export function useMotionValueChild(
  children: MotionValue<number | string>,
  visualElement?: VisualElement<HTMLElement | SVGElement>
) {
  const render = useConstant(() => children.get())

  useMotionValueEvent(children, 'change', (latest) => {
    if (visualElement && visualElement.value) {
      visualElement.value.textContent = `${latest}`
    }
  })

  return render
}
