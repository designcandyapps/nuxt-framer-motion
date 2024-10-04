import { GroupPlaybackControls } from '#motion/animation/GroupPlaybackControls'
import { createAnimationsFromSequence } from '#motion/animation/sequence/create'
import type { AnimationSequence, SequenceOptions } from '#motion/animation/sequence/types'
import type { AnimationPlaybackControls } from '#motion/animation/types'
import { animateElements } from '#motion/animation/animators/waapi/animateElements'

export function animateSequence(
  definition: AnimationSequence,
  options?: SequenceOptions
) {
  const animations: AnimationPlaybackControls[] = []

  createAnimationsFromSequence(definition, options).forEach(
    ({ keyframes, transition }, element: Element) => {
      animations.push(...animateElements(element, keyframes, transition))
    }
  )

  return new GroupPlaybackControls(animations)
}
