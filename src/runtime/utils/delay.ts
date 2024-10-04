import { cancelFrame, frame } from '#motion/frameloop'
import { time } from '#motion/frameloop/syncTime'
import type { FrameData } from '#motion/frameloop/types'

export type DelayedFunction = (overshoot: number) => void

/**
 * Timeout defined in ms
 */
export function delay(callback: DelayedFunction, timeout: number) {
  const start = time.now()

  const checkElapsed = ({ timestamp }: FrameData) => {
    const elapsed = timestamp - start

    if (elapsed >= timeout) {
      cancelFrame(checkElapsed)
      callback(elapsed - timeout)
    }
  }

  frame.read(checkElapsed, true)

  return () => cancelFrame(checkElapsed)
}
