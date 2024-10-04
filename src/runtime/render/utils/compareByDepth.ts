import type { VisualElement } from '#motion/render/VisualElement'

export interface WithDepth {
  depth: number
}

export const compareByDepth = (a: VisualElement, b: VisualElement) =>
  a.depth - b.depth
