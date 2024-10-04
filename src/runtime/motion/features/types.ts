import type { Feature } from '#motion/motion/features/Feature'
import type MeasureLayout from '#motion/motion/features/layout/MeasureLayout.vue'
import type { MotionProps } from '#motion/motion/types'
import type { VisualState } from '#motion/motion/utils/useVisualState'
import type { CreateVisualElement } from '#motion/render/types'
import type { VisualElement } from '#motion/render/VisualElement'
import type { DefineComponent, Ref, VNode } from 'vue'

interface FeatureClass<Props = unknown> {
  new (props: Props): Feature<Props>
}

export type HydratedFeatureDefinition = {
  isEnabled: (props: MotionProps) => boolean
  Feature: FeatureClass<unknown>
  ProjectionNode?: any
  MeasureLayout?: typeof MeasureLayout
}

export interface HydratedFeatureDefinitions {
  animation?: HydratedFeatureDefinition
  exit?: HydratedFeatureDefinition
  drag?: HydratedFeatureDefinition
  tap?: HydratedFeatureDefinition
  focus?: HydratedFeatureDefinition
  hover?: HydratedFeatureDefinition
  pan?: HydratedFeatureDefinition
  inView?: HydratedFeatureDefinition
  layout?: HydratedFeatureDefinition
}

export type FeatureDefinition = {
  isEnabled: HydratedFeatureDefinition['isEnabled']
  Feature?: HydratedFeatureDefinition['Feature']
  ProjectionNode?: HydratedFeatureDefinition['ProjectionNode']
  MeasureLayout?: HydratedFeatureDefinition['MeasureLayout']
}

export type FeatureDefinitions = {
  [K in keyof HydratedFeatureDefinitions]: FeatureDefinition
}

export type FeaturePackage = {
  Feature?: HydratedFeatureDefinition['Feature']
  ProjectionNode?: HydratedFeatureDefinition['ProjectionNode']
  MeasureLayout?: HydratedFeatureDefinition['MeasureLayout']
}

export type FeaturePackages = {
  [K in keyof HydratedFeatureDefinitions]: FeaturePackage
}

export interface FeatureBundle extends FeaturePackages {
  renderer: CreateVisualElement<any>
}

export type LazyFeatureBundle = () => Promise<FeatureBundle>

export type RenderComponent<Instance, RenderState> = (
  component: string | DefineComponent,
  props: MotionProps,
  slots: () => VNode[],
  ref: Ref<Instance>,
  visualState: VisualState<Instance, RenderState>,
  isStatic: boolean,
  visualElement?: VisualElement<Instance>
) => any
