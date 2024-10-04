import { IKMotionConfigContext, motionConfigContextDefault } from '#motion/context/MotionConfigContext'
import { useReducedMotion } from '#motion/utils/reducedMotion/useReducedMotion'

export function useReducedMotionConfig() {
  const reducedMotionPreference = useReducedMotion()
  const { reducedMotion } = inject(IKMotionConfigContext, motionConfigContextDefault)

  if (reducedMotion === 'never') {
    return false
  } else if (reducedMotion === 'always') {
    return true
  } else {
    return reducedMotionPreference
  }
}
