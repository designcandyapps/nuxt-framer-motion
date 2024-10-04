import { ref, watch, isRef, type Ref } from 'vue'

export function useCallback<T extends (...args: any[]) => any>(
  fn: T,
  dependencies: (Ref<any> | any)[]
): Ref<T> {
  const memoizedFn = ref(fn) as Ref<T>

  const depsAreRefs = dependencies.every(dep => isRef(dep))

  if (depsAreRefs) {
    watch(dependencies, () => {
      memoizedFn.value = fn
    })
  }

  return memoizedFn
}
