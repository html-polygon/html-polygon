import { type Point } from '.'

export const isNonEmptyString = (maybe: unknown): maybe is string =>
  typeof maybe === 'string' && maybe.trim() !== ''

export const isFiniteNumber = (maybe: unknown): maybe is number =>
  typeof maybe === 'number' && Number.isFinite(maybe)

export const isSimpleObject = (maybe: unknown): maybe is object =>
  typeof maybe === 'object' && maybe !== null && !Array.isArray(maybe)

export const isPoint = (maybe: unknown): maybe is Point =>
  isSimpleObject(maybe) &&
  Reflect.has(maybe, 'x') &&
  typeof Reflect.get(maybe, 'y') === 'number' &&
  Reflect.has(maybe, 'x') &&
  typeof Reflect.get(maybe, 'y') === 'number'
