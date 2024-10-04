import type { DependencyList, EffectCallback } from '#motion/html'

export function useInsertionEffect(effect: EffectCallback, deps: DependencyList = []) {
  let cleanupFn

  const runEffect = () => {
    if (typeof cleanupFn === 'function') {
      cleanupFn()
    }

    cleanupFn = effect()
  }

  onBeforeMount(() => {
    runEffect()
  })

  onBeforeUnmount(() => {
    if (typeof cleanupFn === 'function') {
      cleanupFn()
    }
  })

  if (deps.length > 0) {
    watch(deps, () => {
      runEffect()
    }, { deep: true })
  }
}
