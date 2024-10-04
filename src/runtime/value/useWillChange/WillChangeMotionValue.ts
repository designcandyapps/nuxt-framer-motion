import { addUniqueItem } from '#motion/utils/array'
import { MotionValue } from '#motion/value'
import { getWillChangeName } from '#motion/value/useWillChange/getWillChangeName'
import type { WillChange } from '#motion/value/useWillChange/types'

export class WillChangeMotionValue extends MotionValue implements WillChange {
  private values: string[] = []

  add(name: string) {
    const styleName = getWillChangeName(name)

    if (styleName) {
      addUniqueItem(this.values, styleName)
      this.update()
    }
  }

  private update() {
    this.set(this.values.length ? this.values.join(', ') : 'auto')
  }
}
