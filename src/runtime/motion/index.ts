import { IKLayoutGroupContext } from '#motion/context/LayoutGroupContext'
import {
  IKMotionConfigContext
} from '#motion/context/MotionConfigContext'
import { IKMotionContext } from '#motion/context/MotionContext'
import { useCreateMotionContext } from '#motion/context/MotionContext/create'
import { featureDefinitions } from '#motion/motion/features/definitions'
import { loadFeatures } from '#motion/motion/features/loadFeatures'
import type { MotionProps } from '#motion/motion/types'
import { useVisualElement } from '#motion/motion/utils/useVisualElement'
import type { UseVisualState } from '#motion/motion/utils/useVisualState'
import { _validMotionProps } from '#motion/motion/utils/validProp'
import { smartInject, smartProvide } from '#motion/react/smartIP'
import { isBrowser } from '#motion/utils/isBrowser'
import type { DefineComponent } from 'vue'
import { defineComponent } from 'vue'
import type { FeatureBundle, RenderComponent } from '#motion/motion/features/types'
import type { CreateVisualElement } from '#motion/render/types'

export interface MotionComponentConfig<Instance, RenderState> {
  preloadedFeatures?: FeatureBundle
  createVisualElement?: CreateVisualElement<Instance>
  useRender: RenderComponent<Instance, RenderState>
  useVisualState: UseVisualState<Instance, RenderState>
  component: string | DefineComponent
}

export type MotionComponentProps<Props> = {
  [K in Exclude<keyof Props, keyof MotionProps>]?: Props[K]
} & MotionProps

/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 */
export function createRendererMotionComponent<
  Props extends {},
  Instance,
  RenderState
>({
  preloadedFeatures,
  createVisualElement,
  useRender,
  useVisualState,
  component
}: MotionComponentConfig<Instance, RenderState>) {
  preloadedFeatures && loadFeatures(preloadedFeatures)

  const MotionComponent = defineComponent(
    (props: MotionComponentProps<Props>, { slots }) => {
      /**
       * If we need to measure the element we load this functionality in a
       * separate class component in order to gain access to getSnapshotBeforeUpdate.
       */
      let MeasureLayout: undefined | DefineComponent

      const configAndProps = {
        ...smartInject(IKMotionConfigContext),
        ...props,
        layoutId: useLayoutId(props)
      }

      const { isStatic } = configAndProps

      const context = useCreateMotionContext<Instance>(props)

      smartProvide(IKMotionContext, context)

      const visualState = useVisualState(props, isStatic)

      const element = ref()
      if (!isStatic && isBrowser) {
        const layoutProjection = getProjectionFunctionality(configAndProps)
        MeasureLayout = layoutProjection.MeasureLayout // to be used later

        /**
         * Create a VisualElement for this component. A VisualElement provides a common
         * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
         * providing a way of rendering to these APIs outside of the React render loop
         * for more performant animations and interactions
         */
        context.value.visualElement = useVisualElement<Instance, RenderState>(
          component,
          element,
          visualState,
          configAndProps,
          createVisualElement,
          layoutProjection.ProjectionNode
        )
      }

      const children = () => slots.default ? slots.default() : []
      return () => (
        useRender(
          component,
          props,
          children,
          element,
          visualState,
          isStatic,
          context.value.visualElement
        )
      )
    })
  MotionComponent.props = _validMotionProps
  ;(MotionComponent as any).name = 'MotionComponent'

  return MotionComponent
}

function useLayoutId({ layoutId }: MotionProps) {
  const layoutGroupId = smartInject(IKLayoutGroupContext).id
  return layoutGroupId && layoutId !== undefined
    ? layoutGroupId + '-' + layoutId
    : layoutId
}

function getProjectionFunctionality(props: MotionProps) {
  const { drag, layout } = featureDefinitions

  if (!drag && !layout) return {}

  const combined = { ...drag, ...layout }

  return {
    MeasureLayout:
      drag?.isEnabled(props) || layout?.isEnabled(props)
        ? combined.MeasureLayout
        : undefined,
    ProjectionNode: combined.ProjectionNode
  }
}
