import { addDomEvent } from '#motion/events/addDomEvent'
import { createProjectionNode } from '#motion/projection/node/createProjectionNode'

export const DocumentProjectionNode = createProjectionNode<Window>({
  attachResizeListener: (
    ref: Window | Element,
    notify: VoidFunction
  ): VoidFunction => addDomEvent(ref, 'resize', notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
})
