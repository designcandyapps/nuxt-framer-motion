import {
  convertBoundingBoxToBox,
  transformBoxPoints
} from '#motion/projection/geometry/conversion'
import { translateAxis } from '#motion/projection/geometry/deltaApply'
import type { TransformPoint } from '#motion/projection/geometry/types'
import type { IProjectionNode } from '#motion/projection/node/types'

export function measureViewportBox(
  instance: HTMLElement,
  transformPoint?: TransformPoint
) {
  return convertBoundingBoxToBox(
    transformBoxPoints(instance.getBoundingClientRect(), transformPoint)
  )
}

export function measurePageBox(
  element: HTMLElement,
  rootProjectionNode: IProjectionNode,
  transformPagePoint?: TransformPoint
) {
  const viewportBox = measureViewportBox(element, transformPagePoint)
  const { scroll } = rootProjectionNode

  if (scroll) {
    translateAxis(viewportBox.x, scroll.offset.x)
    translateAxis(viewportBox.y, scroll.offset.y)
  }

  return viewportBox
}
