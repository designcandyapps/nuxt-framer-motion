import { featureDefinitions } from '#motion/motion/features/definitions'
import type { FeaturePackages } from '#motion/motion/features/types'

export function loadFeatures(features: FeaturePackages) {
  for (const key in features) {
    featureDefinitions[key as keyof typeof featureDefinitions] = {
      ...featureDefinitions[key as keyof typeof featureDefinitions],
      ...features[key as keyof typeof features]
    } as any
  }
}
