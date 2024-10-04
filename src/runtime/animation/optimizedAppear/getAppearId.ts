import { optimizedAppearDataAttribute } from '#motion/animation/optimizedAppear/dataId'
import type { WithAppearProps } from '#motion/animation/optimizedAppear/types'

export function getOptimisedAppearId(
  visualElement: WithAppearProps
): string | undefined {
  return visualElement.props[optimizedAppearDataAttribute]
}
