import { frame, cancelFrame, frameData } from '#motion/frameloop'
import { time } from '#motion/frameloop/syncTime'
import type { FrameData } from '#motion/frameloop/types'
import type { Driver } from './types'

export const frameloopDriver: Driver = (update) => {
  const passTimestamp = ({ timestamp }: FrameData) => update(timestamp)

  return {
    start: () => frame.update(passTimestamp, true),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => (frameData.isProcessing ? frameData.timestamp : time.now())
  }
}
