import { transformProps } from '#motion/render/html/utils/transform'

export const appearStoreId = (elementId: string, valueName: string) => {
  const key = transformProps.has(valueName) ? 'transform' : valueName

  return `${elementId}: ${key}`
}
