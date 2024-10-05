import { IKMotionConfigContext } from '#motion/context/MotionConfigContext'
import { smartInject } from '#motion/react/smartIP'
import { useReducedMotion } from '#motion/utils/reducedMotion/useReducedMotion'

export function useReducedMotionConfig() {
  const reducedMotionPreference = useReducedMotion()
  const { reducedMotion } = smartInject(IKMotionConfigContext)

  if (reducedMotion === 'never') {
    return false
  } else if (reducedMotion === 'always') {
    return true
  } else {
    return reducedMotionPreference
  }
}
