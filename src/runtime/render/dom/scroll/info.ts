import { progress } from '#motion/utils/progress'
import { velocityPerSecond } from '#motion/utils/velocityPerSecond'
import type { AxisScrollInfo, ScrollInfo } from '#motion/render/dom/scroll/types'

/**
 * A time in milliseconds, beyond which we consider the scroll velocity to be 0.
 */
const maxElapsed = 50

const createAxisInfo = (): AxisScrollInfo => ({
  value: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
})

export const createScrollInfo = (): ScrollInfo => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
})

const keys = {
  x: {
    length: 'Width',
    position: 'Left'
  },
  y: {
    length: 'Height',
    position: 'Top'
  }
} as const

function updateAxisInfo(
  element: HTMLElement,
  axisName: 'x' | 'y',
  info: ScrollInfo,
  time: number
) {
  const axis = info[axisName]
  const { length, position } = keys[axisName]

  const prev = axis.value
  const prevTime = info.time

  axis.value = element[`scroll${position}`]
  axis.scrollLength = element[`scroll${length}`] - element[`client${length}`]
  axis.offset.length = 0
  axis.offset[0] = 0
  axis.offset[1] = axis.scrollLength
  axis.progress = progress(0, axis.scrollLength, axis.value)

  const elapsed = time - prevTime
  axis.velocity
    = elapsed > maxElapsed
      ? 0
      : velocityPerSecond(axis.value - prev, elapsed)
}

export function updateScrollInfo(
  element: HTMLElement,
  info: ScrollInfo,
  time: number
) {
  updateAxisInfo(element, 'x', info, time)
  updateAxisInfo(element, 'y', info, time)
  info.time = time
}
