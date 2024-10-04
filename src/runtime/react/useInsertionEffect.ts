export function useInsertionEffect(effect) {
  onBeforeMount(() => {
    effect()
  })
}
