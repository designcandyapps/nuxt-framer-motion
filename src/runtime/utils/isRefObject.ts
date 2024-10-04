import type { Ref } from 'vue'

export function isRefObject<E = any>(ref: any): ref is Ref<E> {
  return (
    ref
    && typeof ref === 'object'
    && Object.prototype.hasOwnProperty.call(ref, '_value')
  )
}
