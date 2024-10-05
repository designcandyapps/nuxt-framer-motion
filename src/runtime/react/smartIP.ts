import type { InjectionKey, Ref } from 'vue'

export interface SmartKey<T> {
  key: InjectionKey<Ref<T>>
  defaultValue: T
}

export function smartProvide<T>(smartKey: SmartKey<T>, providedValue: Ref<T>) {
  const currentValue = smartInject(smartKey)

  watch(providedValue, (value) => {
    if (value !== currentValue) {
      provide(smartKey.key, value)
    }
  }, { immediate: true, deep: true })

  return providedValue
}

export function smartInject<T>(smartKey: SmartKey<T>): T {
  return inject(smartKey.key, smartKey.defaultValue)
}

export function createSmartKey<T>(key: string, defaultValue: T): SmartKey<T> {
  return {
    key: Symbol(key),
    defaultValue
  }
}
