import { cancelFrame, frame } from '#motion/frameloop'
import { useEffect } from '#motion/react/useEffect'
import {
  IKMotionConfigContext,
  type MotionConfigContext,
  motionConfigContextDefault
} from '#motion/context/MotionConfigContext'
import type { FrameData } from '#motion/frameloop/types'

export type FrameCallback = (timestamp: number, delta: number) => void

export function useAnimationFrame(callback: FrameCallback) {
  const initialTimestamp = ref(0)
  const { isStatic } = inject<MotionConfigContext>(IKMotionConfigContext, motionConfigContextDefault)

  useEffect(() => {
    if (isStatic) return

    const provideTimeSinceStart = ({ timestamp, delta }: FrameData) => {
      if (!initialTimestamp.value) initialTimestamp.value = timestamp

      callback(timestamp - initialTimestamp.value, delta)
    }

    frame.update(provideTimeSinceStart, true)
    return () => cancelFrame(provideTimeSinceStart)
  }, [callback])
}
