import { useCallback } from '#motion/react/useCallback'
import { useState } from '#motion/react/useState'
import { wrap } from '#motion/utils/wrap'

export type Cycle = (i?: number) => void

export type CycleState<T> = [T, Cycle]

/**
 * Cycles through a series of visual properties. Can be used to toggle between or cycle through animations. It works similar to `useState` in React. It is provided an initial array of possible states, and returns an array of two arguments.
 *
 * An index value can be passed to the returned `cycle` function to cycle to a specific index.
 *
 * ```jsx
 * import * as React from "react"
 * import { motion, useCycle } from "framer-motion"
 *
 * export const MyComponent = () => {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <motion.div
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @param items - items to cycle through
 * @returns [currentState, cycleState]
 *
 * @public
 */
export function useCycle<T>(...items: T[]): CycleState<T> {
  const index = ref(0)
  const [item, setItem] = useState(items[index.value])

  const runCycle = useCallback(
    (next?: number) => {
      index.value
        = typeof next !== 'number'
          ? wrap(0, items.length, index.value + 1)
          : next

      setItem(items[index.value])
    },
    // The array will change on each call, but by putting items.length at
    // the front of this array, we guarantee the dependency comparison will match up
    [items.length, ...items]
  )
  return [item, runCycle]
}
