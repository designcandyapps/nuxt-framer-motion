<script lang="ts">
import type { MotionProps } from '#motion/motion/types'
import type { VisualElement } from '#motion/render/VisualElement'

interface MeasureContextProps {
  layoutGroup: LayoutGroupContextProps
  switchLayoutGroup?: SwitchLayoutGroupContext
  isPresent: boolean
  safeToRemove?: VoidFunction | null
}

type MeasureProps = MotionProps & MeasureContextProps & { visualElement: VisualElement }
</script>

<script setup lang="ts">
import { frame } from '#motion/frameloop'
import { microtask } from '#motion/frameloop/microtask'
import { globalProjectionState } from '#motion/projection/node/state'
import { correctBorderRadius } from '#motion/projection/styles/scaleBorderRadius'
import { correctBoxShadow } from '#motion/projection/styles/scaleBoxShadow'
import { addScaleCorrector } from '#motion/projection/styles/scaleCorrection'

const props = defineProps<MeasureProps>()

onMounted(() => {
  const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = props
  const { projection } = visualElement

  const defaultScaleCorrectors = {
    borderRadius: {
      ...correctBorderRadius,
      applyTo: [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius'
      ]
    },
    borderTopLeftRadius: correctBorderRadius,
    borderTopRightRadius: correctBorderRadius,
    borderBottomLeftRadius: correctBorderRadius,
    borderBottomRightRadius: correctBorderRadius,
    boxShadow: correctBoxShadow
  }

  addScaleCorrector(defaultScaleCorrectors)

  if (projection) {
    if (layoutGroup.group) layoutGroup.group.add(projection)

    if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
      switchLayoutGroup.register(projection)
    }

    projection.root!.didUpdate()
    projection.addEventListener('animationComplete', () => {
      this.safeToRemove()
    })
    projection.setOptions({
      ...projection.options,
      onExitComplete: () => _safeToRemove()
    })
  }

  globalProjectionState.hasEverUpdated = true
})

onUpdated(() => {
  const { projection } = props.visualElement
  if (projection) {
    projection.root!.didUpdate()

    microtask.postRender(() => {
      if (!projection.currentAnimation && projection.isLead()) {
        _safeToRemove()
      }
    })
  }
})

onBeforeUnmount(() => {
  const {
    visualElement,
    layoutGroup,
    switchLayoutGroup: promoteContext
  } = props
  const { projection } = visualElement

  if (projection) {
    projection.scheduleCheckAfterUnmount()
    if (layoutGroup && layoutGroup.group)
      layoutGroup.group.remove(projection)
    if (promoteContext && promoteContext.deregister)
      promoteContext.deregister(projection)
  }
})

watch(() => props, (_, prevProps) => {
  const { layoutDependency, visualElement, drag, isPresent } = props
  const projection = visualElement.projection

  if (!projection) return null

  /**
   * TODO: We use this data in relegate to determine whether to
   * promote a previous element. There's no guarantee its presence data
   * will have updated by this point - if a bug like this arises it will
   * have to be that we markForRelegation and then find a new lead some other way,
   * perhaps in didUpdate
   */
  projection.isPresent = isPresent

  if (
    drag
    || prevProps.layoutDependency !== layoutDependency
    || layoutDependency === undefined
  ) {
    projection.willUpdate()
  } else {
    this.safeToRemove()
  }

  if (prevProps.isPresent !== isPresent) {
    if (isPresent) {
      projection.promote()
    } else if (!projection.relegate()) {
      /**
       * If there's another stack member taking over from this one,
       * it's in charge of the exit animation and therefore should
       * be in charge of the safe to remove. Otherwise we call it here.
       */
      frame.postRender(() => {
        const stack = projection.getStack()
        if (!stack || !stack.members.length) {
          this.safeToRemove()
        }
      })
    }
  }

  return null
})

function _safeToRemove() {
  const { safeToRemove } = props
  safeToRemove && safeToRemove()
}
</script>
