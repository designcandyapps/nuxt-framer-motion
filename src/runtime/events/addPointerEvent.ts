import { addDomEvent } from '#motion/events/addDomEvent'
import { addPointerInfo, type EventListenerWithPointInfo } from '#motion/events/eventInfo'

export function addPointerEvent(
  target: EventTarget,
  eventName: string,
  handler: EventListenerWithPointInfo,
  options?: AddEventListenerOptions
) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options)
}
