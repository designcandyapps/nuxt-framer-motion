import { AnimationFeature } from '#motion/motion/features/animation'
import { ExitAnimationFeature } from '#motion/motion/features/animation/exit'
import type { FeaturePackages } from '#motion/motion/features/types'

export const animations: FeaturePackages = {
  animation: {
    Feature: AnimationFeature
  },
  exit: {
    Feature: ExitAnimationFeature
  }
}
