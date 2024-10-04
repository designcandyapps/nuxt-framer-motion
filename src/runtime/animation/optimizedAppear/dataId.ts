import { camelToDash } from '#motion/render/dom/utils/camelToDash'

export const optimizedAppearDataId = 'framerAppearId'

export const optimizedAppearDataAttribute
  = 'data-' + camelToDash(optimizedAppearDataId) as 'data-framer-appear-id'
