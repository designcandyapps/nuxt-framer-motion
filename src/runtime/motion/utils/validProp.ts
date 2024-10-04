import type { MotionProps } from '#motion/motion/types'

export const _validMotionProps = [
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transform-template',
  'custom',
  'inherit',
  'onBefore-layout-measure',
  'on-animation-start',
  'on-animation-complete',
  'onupdate',
  'on-dragStart',
  'on-drag',
  'on-dragEnd',
  'on-measure-drag-constraints',
  'on-direction-lock',
  'on-drag-transitionEnd',
  '_dragX',
  '_dragY',
  'on-hover-start',
  'on-hover-end',
  'on-viewport-enter',
  'on-viewport-leave',
  'global-tap-target',
  'ignore-strict',
  'viewport',
  'while-drag',
  'while-tap',
  'while-hover',
  'drag',
  'drag-direction-lock,',
  'drag-propagation,',
  'drag-constraints',
  'drag-elastic',
  'drag-momentum',
  'drag-transition',
  'drag-controls',
  'drag-snap-to-origin',
  'drag-listener'
]

/**
 * A list of all valid MotionProps.
 *
 * @privateRemarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */
const validMotionProps = new Set<keyof MotionProps>([
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transformTemplate',
  'custom',
  'inherit',
  'onBeforeLayoutMeasure',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDrag',
  'onDragEnd',
  'onMeasureDragConstraints',
  'onDirectionLock',
  'onDragTransitionEnd',
  '_dragX',
  '_dragY',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'globalTapTarget',
  'ignoreStrict',
  'viewport'
])

/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */
export function isValidMotionProp(key: string) {
  return (
    key.startsWith('while')
    || (key.startsWith('drag') && key !== 'draggable')
    || key.startsWith('layout')
    || key.startsWith('onTap')
    || key.startsWith('onPan')
    || key.startsWith('onLayout')
    || validMotionProps.has(key as keyof MotionProps)
  )
}
