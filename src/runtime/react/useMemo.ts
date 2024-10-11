import type { Ref } from 'vue'

type EffectCallback<T> = () => T
type DependencyList = Ref<any>[]

export function useMemo<T>(fn: EffectCallback<T>, deps: DependencyList = []): Ref<T> {
  const memoizedValue = ref<T>() as Ref<T>

  memoizedValue.value = fn()

  watch(deps, () => {
    memoizedValue.value = fn()
  }, { deep: true })

  return memoizedValue
}
