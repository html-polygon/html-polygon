import { isFiniteNumber, isNonEmptyString } from './guards'

export const getNumber = (maybeNumber?: number | string): number => {
  if (isFiniteNumber(maybeNumber)) {
    return maybeNumber
  }

  if (isNonEmptyString(maybeNumber)) {
    const digits = maybeNumber.replace(/([^\d\\.xabcdef])/i, '').toLowerCase()
    const digitsNumber = Number(digits)

    if (isFiniteNumber(digitsNumber)) {
      return digitsNumber
    }
  }

  return 0
}

export const clampNumber = (
  value: number,
  min?: number,
  max?: number,
): number => {
  if (!isFiniteNumber(value)) {
    return value
  }

  if (isFiniteNumber(min) && value < min) {
    return min
  }

  if (isFiniteNumber(max) && value > max) {
    return max
  }

  return value
}

export const radians = (degrees: number): number => degrees * (Math.PI / 180)

export const round = (value: number): number => Math.round(value * 1000) / 1000

export const neg = (value: number): number => value * -1

export const spacingToRadius = (sides: number, spacing?: number): number => {
  if (!isFiniteNumber(spacing) || spacing === 0) {
    return 0
  }

  const angle = (180 - 360 / sides) / 2
  return spacing * (Math.sin(radians(90)) / Math.sin(radians(angle)))
}

export const mergeClassNames = (...classNames: unknown[]): string => {
  return classNames
    .filter((className): className is string => isNonEmptyString(className))
    .map((className) => className.trim())
    .join(' ')
}
