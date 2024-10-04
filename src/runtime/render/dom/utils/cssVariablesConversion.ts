import { invariant } from '#motion/utils/errors'
import { isNumericalString } from '#motion/utils/isNumericalString'
import { type CSSVariableToken, isCSSVariableToken } from '#motion/render/dom/utils/isCSSVariable'

/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */
const splitCSSVariableRegex
  = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
export function parseCSSVariable(current: string) {
  const match = splitCSSVariableRegex.exec(current)
  if (!match) {
    return [,]
  }

  const [, token1, token2, fallback] = match
  return [`--${token1 ?? token2}`, fallback]
}

const maxDepth = 4
export function getVariableValue(
  current: CSSVariableToken,
  element: Element,
  depth = 1
): string | number | undefined {
  invariant(
    depth <= maxDepth,
    `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`
  )

  const [token, fallback] = parseCSSVariable(current)

  // No CSS variable detected
  if (!token) return

  // Attempt to read this CSS variable off the element
  const resolved = window.getComputedStyle(element).getPropertyValue(token)

  if (resolved) {
    const trimmed = resolved.trim()
    return isNumericalString(trimmed) ? Number.parseFloat(trimmed) : trimmed
  }

  return isCSSVariableToken(fallback)
    ? getVariableValue(fallback, element, depth + 1)
    : fallback
}
