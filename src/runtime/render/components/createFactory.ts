import { createRendererMotionComponent } from '#motion/motion'
import type { FeaturePackages } from '#motion/motion/features/types'
import type { DOMMotionComponents } from '#motion/render/dom/types'
import { createUseRender } from '#motion/render/dom/useRender'
import { isSVGComponent } from '#motion/render/dom/utils/isSVGComponent'
import { htmlMotionConfig } from '#motion/render/html/configMotion'
import { svgMotionConfig } from '#motion/render/svg/configMotion'
import type { CreateVisualElement } from '#motion/render/types'
import type { DefineComponent } from 'vue'

type MotionComponent<T> = T extends keyof DOMMotionComponents ? DOMMotionComponents[T] : DefineComponent

export function createMotionComponentFactory(
  preloadedFeatures?: FeaturePackages,
  createVisualElement?: CreateVisualElement<any>
) {
  return function createMotionComponent<
    Props,
    TagName extends keyof DOMMotionComponents | string = 'div'
  >(
    component: TagName | string | DefineComponent
  ) {
    const baseConfig = isSVGComponent(component)
      ? svgMotionConfig
      : htmlMotionConfig

    const config = {
      ...baseConfig,
      preloadedFeatures,
      useRender: createUseRender(),
      createVisualElement,
      component
    }

    return createRendererMotionComponent(config as any) as MotionComponent<
      TagName,
      Props
    >
  }
}
