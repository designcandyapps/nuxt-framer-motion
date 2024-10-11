import { createBox } from '#motion/projection/geometry/models'
import type { ResolvedValues } from '#motion/types'
import { VisualElement } from '#motion/render/VisualElement'

interface ObjectRenderState {
  output: ResolvedValues
}
function isObjectKey(key: string, object: object): key is keyof object {
  return key in object
}
export class ObjectVisualElement extends VisualElement<
  object,
  ObjectRenderState
> {
  type = 'object'
  readValueFromInstance(instance: object, key: string) {
    if (isObjectKey(key, instance)) {
      const value = instance[key]
      if (typeof value === 'string' || typeof value === 'number') {
        return value
      }
    }
    return undefined
  }

  getBaseTargetFromProps() {
    return undefined
  }

  removeValueFromRenderState(
    key: string,
    renderState: ObjectRenderState
  ): void {
    delete renderState.output[key]
  }

  measureInstanceViewportBox() {
    return createBox()
  }

  build(renderState: ObjectRenderState, latestValues: ResolvedValues) {
    Object.assign(renderState.output, latestValues)
  }

  renderInstance(instance: object, { output }: ObjectRenderState) {
    Object.assign(instance, output)
  }

  sortInstanceNodePosition() {
    return 0
  }
}
