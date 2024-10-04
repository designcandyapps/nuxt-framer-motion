import { addPointerEvent } from '#motion/events/addPointerEvent'
import { pipe } from '#motion/utils/pipe'
import { isDragActive } from '#motion/gestures/drag/utils/lock'
import type { EventInfo } from '#motion/events/types'
import type { VisualElement } from '#motion/render/VisualElement'
import { Feature } from '#motion/motion/features/Feature'
import { frame } from '#motion/frameloop'

function addHoverEvent(node: VisualElement<Element>, isActive: boolean) {
  const eventName = isActive ? 'pointerenter' : 'pointerleave'
  const callbackName = isActive ? 'onHoverStart' : 'onHoverEnd'

  const handleEvent = (event: PointerEvent, info: EventInfo) => {
    if (event.pointerType === 'touch' || isDragActive()) return

    const props = node.getProps()

    if (node.animationState && props.whileHover) {
      node.animationState.setActive('whileHover', isActive)
    }

    const callback = props[callbackName]
    if (callback) {
      frame.postRender(() => callback(event, info))
    }
  }

  return addPointerEvent(node.current!, eventName, handleEvent, {
    passive: !node.getProps()[callbackName]
  })
}

export class HoverGesture extends Feature<Element> {
  mount() {
    this.unmount = pipe(
      addHoverEvent(this.node, true),
      addHoverEvent(this.node, false)
    ) as VoidFunction
  }

  unmount() {}
}
