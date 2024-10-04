import { startWaapiAnimation } from '#motion/animation/animators/waapi/index'
import { createGeneratorEasing } from '#motion/easing/utils/createGeneratorEasing'
import type { ProgressTimeline } from '#motion/render/dom/scroll/observe'
import { browserNumberValueTypes } from '#motion/render/dom/valueTypes/numberBrowser'
import { invariant } from '#motion/utils/errors'
import { noop } from '#motion/utils/noop'
import {
  millisecondsToSeconds,
  secondsToMilliseconds
} from '#motion/utils/timeConversion'
import { isGenerator } from '#motion/animation/generators/utils/isGenerator'
import type {
  AnimationPlaybackControls,
  UnresolvedValueKeyframe,
  ValueAnimationOptions,
  ValueKeyframe,
  ValueKeyframesDefinition
} from '#motion/animation/types'
import { attachTimeline } from '#motion/animation/animators/waapi/utils/attachTimeline'
import { getFinalKeyframe } from '#motion/animation/animators/waapi/utils/getFinalKeyframe'
import { setCSSVar, setStyle } from '#motion/animation/animators/waapi/utils/style'
import { supportsLinearEasing } from '#motion/animation/animators/waapi/utils/supportsLinearEasing'
import { supportsPartialKeyframes } from '#motion/animation/animators/waapi/utils/supportsPartialKeyframes'
import { supportsWaapi } from '#motion/animation/animators/waapi/utils/supportsWaapi'

const state = new WeakMap<Element, Map<string, NativeAnimation>>()

function hydrateKeyframes(
  valueName: string,
  keyframes: ValueKeyframe[] | UnresolvedValueKeyframe[],
  read: () => ValueKeyframe
) {
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] === null) {
      keyframes[i] = i === 0 ? read() : keyframes[i - 1]
    }

    if (
      typeof keyframes[i] === 'number'
      && browserNumberValueTypes[valueName]
    ) {
      keyframes[i] = browserNumberValueTypes[valueName].transform!(
        keyframes[i]
      )
    }
  }

  if (!supportsPartialKeyframes() && keyframes.length < 2) {
    keyframes.unshift(read())
  }
}

const defaultEasing = 'easeOut'

function getElementAnimationState(element: Element) {
  const animationState
    = state.get(element) || new Map<string, NativeAnimation>()
  state.set(element, animationState)
  return state.get(element)!
}

export class NativeAnimation implements AnimationPlaybackControls {
  animation: Animation

  options: ValueAnimationOptions

  private pendingTimeline: ProgressTimeline | undefined

  // Resolve the current finished promise
  private resolveFinishedPromise: VoidFunction

  // A promise that resolves when the animation is complete
  private currentFinishedPromise: Promise<void>

  private setValue: (
    element: HTMLElement,
    name: string,
    value: string
  ) => void

  removeAnimation: VoidFunction

  constructor(
    element: Element,
    valueName: string,
    valueKeyframes: ValueKeyframesDefinition,
    options: ValueAnimationOptions
  ) {
    const isCSSVar = valueName.startsWith('--')
    this.setValue = isCSSVar ? setCSSVar : setStyle
    this.options = options
    this.updateFinishedPromise()

    invariant(
      typeof options.type !== 'string',
      `animateMini doesn't support "type" as a string. Did you mean to import { spring } from "framer-motion"?`
    )

    const existingAnimation
      = getElementAnimationState(element).get(valueName)
    existingAnimation && existingAnimation.stop()

    const readInitialKeyframe = () => {
      return valueName.startsWith('--')
        ? (element as HTMLElement).style.getPropertyValue(valueName)
        : window.getComputedStyle(element)[valueName as any]
    }

    if (!Array.isArray(valueKeyframes)) {
      valueKeyframes = [valueKeyframes]
    }

    hydrateKeyframes(valueName, valueKeyframes, readInitialKeyframe)

    if (isGenerator(options.type)) {
      const generatorOptions = createGeneratorEasing(
        options,
        100,
        options.type
      )

      options.ease = supportsLinearEasing()
        ? generatorOptions.ease
        : defaultEasing
      options.duration = secondsToMilliseconds(generatorOptions.duration)
      options.type = 'keyframes'
    } else {
      options.ease = options.ease || defaultEasing
    }

    this.removeAnimation = () => state.get(element)?.delete(valueName)

    const onFinish = () => {
      this.setValue(
        element as HTMLElement,
        valueName,
        getFinalKeyframe(valueKeyframes as string[], this.options)
      )
      this.cancel()
      this.resolveFinishedPromise()
    }

    if (!supportsWaapi()) {
      onFinish()
    } else {
      this.animation = startWaapiAnimation(
        element,
        valueName,
        valueKeyframes as string[],
        options
      )

      if (options.autoplay === false) {
        this.animation.pause()
      }

      this.animation.onfinish = onFinish

      if (this.pendingTimeline) {
        attachTimeline(this.animation, this.pendingTimeline)
      }

      getElementAnimationState(element).set(valueName, this)
    }
  }

  get duration() {
    return millisecondsToSeconds(this.options.duration || 300)
  }

  get time() {
    if (this.animation) {
      return millisecondsToSeconds(
        (this.animation?.currentTime as number) || 0
      )
    }
    return 0
  }

  set time(newTime: number) {
    if (this.animation) {
      this.animation.currentTime = secondsToMilliseconds(newTime)
    }
  }

  get speed() {
    return this.animation ? this.animation.playbackRate : 1
  }

  set speed(newSpeed: number) {
    if (this.animation) {
      this.animation.playbackRate = newSpeed
    }
  }

  get state() {
    return this.animation ? this.animation.playState : 'finished'
  }

  get startTime() {
    return this.animation ? (this.animation.startTime as number) : null
  }

  play() {
    if (this.state === 'finished') {
      this.updateFinishedPromise()
    }

    this.animation && this.animation.play()
  }

  pause() {
    this.animation && this.animation.pause()
  }

  stop() {
    if (
      !this.animation
      || this.state === 'idle'
      || this.state === 'finished'
    ) {
      return
    }

    if (this.animation.commitStyles) {
      this.animation.commitStyles()
    }
    this.cancel()
  }

  complete() {
    this.animation && this.animation.finish()
  }

  cancel() {
    this.removeAnimation()
    try {
      this.animation && this.animation.cancel()
    } catch (e) {}
  }

  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve: VoidFunction, reject?: VoidFunction) {
    return this.currentFinishedPromise.then(resolve, reject)
  }

  private updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((resolve) => {
      this.resolveFinishedPromise = resolve
    })
  }

  attachTimeline(timeline: any) {
    if (!this.animation) {
      this.pendingTimeline = timeline
    } else {
      attachTimeline(this.animation, timeline)
    }

    return noop()<void>
  }
}
