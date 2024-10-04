import { useMemo } from '#motion/composables/useMemo'
import type { DefineComponent } from 'vue'
import type { MotionProps } from '#motion/motion/types'
import { copyRawValuesOnly } from '#motion/render/html/useProps'
import type { ResolvedValues } from '#motion/render/types'
import { buildSVGAttrs } from '#motion/render/svg/utils/buildAttrs'
import { createSvgRenderState } from '#motion/render/svg/utils/createRenderState'
import { isSVGTag } from '#motion/render/svg/utils/isSvgTag'

export function useSVGProps(
  props: MotionProps,
  visualState: ResolvedValues,
  _isStatic: boolean,
  component: string | DefineComponent
) {
  const visualProps = useMemo(() => {
    const state = createSvgRenderState()

    buildSVGAttrs(
      state,
      visualState,
      isSVGTag(component),
      props.transformTemplate
    )

    return {
      ...state.attrs,
      style: { ...state.style }
    }
  }, [visualState])

  if (props.style) {
    const rawStyles = {}
    copyRawValuesOnly(rawStyles, props.style as any, props)
    visualProps.style = { ...rawStyles, ...visualProps.style }
  }

  return visualProps
}
