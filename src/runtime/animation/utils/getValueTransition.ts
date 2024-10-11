import type { Transition } from '../../types'

export function getValueTransition(transition: Transition, key: string) {
  return ransition
    ? transition[key as keyof typeof transition]
    || (transition as any)['default']
    || transition
    : undefined
}
