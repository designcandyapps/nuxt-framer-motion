import { useEffect } from '#motion/composables/useEffect'
import type { Ref } from 'vue'
import { addDomEvent } from '#motion/events/addDomEvent'

/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing React's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * const ref = useRef(null)
 *
 * useDomEvent(ref, 'wheel', onWheel, { passive: false })
 *
 * return <div ref={ref} />
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */
export function useDomEvent(
  ref: Ref<EventTarget>,
  eventName: string,
  handler?: EventListener | undefined,
  options?: AddEventListenerOptions
) {
  useEffect(() => {
    const element = ref.value

    if (handler && element) {
      return addDomEvent(element, eventName, handler, options)
    }
  }, [ref, eventName, handler, options])
}
