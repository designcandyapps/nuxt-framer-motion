import { memo } from '#motion/utils/memo'

export const supportsScrollTimeline = memo(
  () => window.ScrollTimeline !== undefined
)
