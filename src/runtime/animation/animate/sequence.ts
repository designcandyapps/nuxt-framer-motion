import { spring } from '#motion/animation/generators/spring'
import { createAnimationsFromSequence } from '#motion/animation/sequence/create'
import type { AnimationSequence, SequenceOptions } from '#motion/animation/sequence/types'
import type { AnimationPlaybackControls, AnimationScope } from '#motion/animation/types'
import { animateSubject } from './subject'

export function animateSequence(
  sequence: AnimationSequence,
  options?: SequenceOptions,
  scope?: AnimationScope
) {
  const animations: AnimationPlaybackControls[] = []
  const animationDefinitions = createAnimationsFromSequence(
    sequence,
    options,
    scope,
    { spring }
  )
  animationDefinitions.forEach(({ keyframes, transition }, subject) => {
    animations.push(...animateSubject(subject, keyframes, transition))
  })
  return animations
}
