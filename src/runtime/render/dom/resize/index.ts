import type { ElementOrSelector } from '#motion/animation/types'
import { resizeElement } from '#motion/render/dom/resize/handleElement'
import { resizeWindow } from '#motion/render/dom/resize/handleWindow'
import type { ResizeHandler } from '#motion/render/dom/resize/types'

export function resize(onResize: ResizeHandler<Window>): VoidFunction
export function resize(
  target: ElementOrSelector,
  onResize: ResizeHandler<Element>
): VoidFunction
export function resize(
  a: ResizeHandler<Window> | ElementOrSelector,
  b?: ResizeHandler<Element>
) {
  return typeof a === 'function' ? resizeWindow(a) : resizeElement(a, b!)
}
