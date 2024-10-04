import { memo } from '#motion/utils/memo'

export const supportsWaapi = /* @__PURE__ */ memo(() =>
  Object.hasOwnProperty.call(Element.prototype, 'animate')
)
