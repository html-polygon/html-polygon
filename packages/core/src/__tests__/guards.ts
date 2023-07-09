import {
  isFiniteNumber,
  isNonEmptyString,
  isPoint,
  isSimpleObject,
} from '../guards'

describe('core', () => {
  describe('guards', () => {
    describe('isNonEmptyString()', () => {
      it('returns true when passed a non-empty string', () => {
        expect(isNonEmptyString('string')).toBe(true)
        expect(isNonEmptyString('a longer string')).toBe(true)
        expect(isNonEmptyString('   a trimable string    ')).toBe(true)
      })

      it('returns false when passed an empty string', () => {
        expect(isNonEmptyString('')).toBe(false)
      })

      it('returns false when passed a string of spaces', () => {
        expect(isNonEmptyString('     ')).toBe(false)
      })

      it('returns false when passed non-string values', () => {
        expect(isNonEmptyString(null)).toBe(false)
        expect(isNonEmptyString(undefined)).toBe(false)
        expect(isNonEmptyString(true)).toBe(false)
        expect(isNonEmptyString(1234)).toBe(false)
        expect(isNonEmptyString({ an: 'object' })).toBe(false)
        expect(isNonEmptyString(['an', 'array'])).toBe(false)
      })
    })

    describe('isFiniteNumber()', () => {
      it('returns true when passed a finite number', () => {
        expect(isFiniteNumber(1234)).toBe(true)
        expect(isFiniteNumber(1.234)).toBe(true)
        expect(isFiniteNumber(1_234)).toBe(true)
      })

      it('returns false when passed an infinite number', () => {
        expect(isFiniteNumber(Infinity)).toBe(false)
        expect(isFiniteNumber(-Infinity)).toBe(false)
        expect(isFiniteNumber(1 / 0)).toBe(false)
      })

      it('returns false when passed NaN', () => {
        expect(isFiniteNumber(NaN)).toBe(false)
      })

      it('returns false when passed non-number values', () => {
        expect(isFiniteNumber(null)).toBe(false)
        expect(isFiniteNumber(undefined)).toBe(false)
        expect(isFiniteNumber(true)).toBe(false)
        expect(isFiniteNumber('string')).toBe(false)
        expect(isFiniteNumber({ an: 'object' })).toBe(false)
        expect(isFiniteNumber(['an', 'array'])).toBe(false)
      })
    })

    describe('isSimpleObject()', () => {
      it('returns true when passed a simple object', () => {
        expect(isSimpleObject({})).toBe(true)
        expect(isSimpleObject({ an: 'object' })).toBe(true)
      })

      it('returns false when passed null', () => {
        expect(isSimpleObject(null)).toBe(false)
      })

      it('returns false when passed an array', () => {
        expect(isSimpleObject(['an', 'array'])).toBe(false)
      })

      it('returns false when passed non-object values', () => {
        expect(isSimpleObject(undefined)).toBe(false)
        expect(isSimpleObject(true)).toBe(false)
        expect(isSimpleObject(1234)).toBe(false)
        expect(isSimpleObject('string')).toBe(false)
      })
    })

    describe('isPoint()', () => {
      it('returns true when passed a complete point object', () => {
        expect(isPoint({ x: 1, y: 1 })).toBe(true)
        expect(isPoint({ y: 1, x: 1 })).toBe(true)
      })

      it('returns true when passed a complete point object with extra properties', () => {
        expect(isPoint({ x: 1, y: 1, z: false })).toBe(true)
      })

      it('returns false when passed an incomplete point object', () => {
        expect(isPoint({})).toBe(false)
        expect(isPoint({ x: 1 })).toBe(false)
        expect(isPoint({ y: 1 })).toBe(false)
      })

      it('returns false when passed non-point values', () => {
        expect(isPoint(null)).toBe(false)
        expect(isPoint(undefined)).toBe(false)
        expect(isPoint(true)).toBe(false)
        expect(isPoint(1234)).toBe(false)
        expect(isPoint('string')).toBe(false)
        expect(isPoint({ an: 'object' })).toBe(false)
        expect(isPoint(['an', 'array'])).toBe(false)
      })
    })
  })
})
