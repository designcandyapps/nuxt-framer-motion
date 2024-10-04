let layoutEffectQueue = []
let effectQueue = []

export function queueLayoutEffect(effect) {
  layoutEffectQueue.push(effect)
}

export function queueEffect(effect) {
  effectQueue.push(effect)
}

export function flushEffects() {
  const layoutEffects = layoutEffectQueue
  const effects = effectQueue
  layoutEffectQueue = []
  effectQueue = []

  // Run layout effects synchronously
  layoutEffects.forEach(effect => effect())

  // Schedule normal effects to run asynchronously
  Promise.resolve().then(() => {
    effects.forEach(effect => effect())
  })
}
