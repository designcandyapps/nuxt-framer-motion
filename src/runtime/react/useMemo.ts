import type { ComputedRef, Ref } from 'vue'
import { computed, watch, isRef } from 'vue'

export function useMemo<T>(fn: () => T, deps: (any | Ref<any>)[]): ComputedRef<T> {
  const depsAreRefs = deps.every(dep => isRef(dep))

  let prevDeps = depsAreRefs ? deps.map(dep => dep.value) : deps

  const memoizedValue = computed(fn)

  if (depsAreRefs) {
    watch(deps, (newDeps) => {
      const hasChanged = newDeps.some((newDep, i) => newDep.value !== prevDeps[i])

      if (hasChanged) {
        prevDeps = newDeps.map(dep => dep.value)
        memoizedValue.value
      }
    })
  }

  return memoizedValue
}
