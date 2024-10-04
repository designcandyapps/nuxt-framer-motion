import { ref } from 'vue'

export function useState<T>(initialValue: T) {
  const state = ref(initialValue)

  const setState = (newValue: T | ((prevState: T) => T)) => {
    if (typeof newValue === 'function') {
      state.value = (newValue as (prevState: T) => T)(state.value)
    } else {
      state.value = newValue
    }
  }

  return [state, setState] as const
}
