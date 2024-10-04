import { addUniqueItem, removeItem } from '#motion/utils/array'
import { compareByDepth, type WithDepth } from '#motion/render/utils/compareByDepth'

export class FlatTree {
  private children: WithDepth[] = []

  private isDirty: boolean = false

  add(child: WithDepth) {
    addUniqueItem(this.children, child)
    this.isDirty = true
  }

  remove(child: WithDepth) {
    removeItem(this.children, child)
    this.isDirty = true
  }

  forEach(callback: (child: WithDepth) => void) {
    this.isDirty && this.children.sort(compareByDepth)
    this.isDirty = false
    this.children.forEach(callback)
  }
}
