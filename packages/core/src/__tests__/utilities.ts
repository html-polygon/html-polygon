import {
  clampNumber,
  getNumber,
  mergeClassNames,
  neg,
  radians,
  round,
  spacingToRadius,
} from '../utilities'

describe('core', () => {
  describe('utilities', () => {
    describe('getNumber()', () => {
      it('returns a number when passed a finite number', () => {
        expect(getNumber(1234)).toBe(1234)
        expect(getNumber(1.234)).toBe(1.234)
        expect(getNumber(1_234)).toBe(1234)
        expect(getNumber(0xff)).toBe(255)
        expect(getNumber(0b11111111)).toBe(255)
        expect(getNumber(0.255e3)).toBe(255)
      })

      it('returns zero when passed a non-finite number', () => {
        expect(getNumber(Infinity)).toBe(0)
        expect(getNumber(-Infinity)).toBe(0)
        expect(getNumber(NaN)).toBe(0)
      })

      it('returns a number when passed a number-like string', () => {
        expect(getNumber('1234')).toBe(1234)
        expect(getNumber('1.234')).toBe(1.234)
        expect(getNumber('1_234')).toBe(1234)
        expect(getNumber('1,234')).toBe(1234)
        expect(getNumber('0xff')).toBe(255)
        expect(getNumber('0b11111111')).toBe(255)
        expect(getNumber('0.255e3')).toBe(255)
      })

      it('returns 0 when passed undefined', () => {
        expect(getNumber()).toBe(0)
        expect(getNumber(undefined)).toBe(0)
      })
    })

    describe('clampNumber()', () => {
      it('returns the value if the value is not a finite number', () => {
        expect(clampNumber(Infinity, 0, 10)).toBe(Infinity)
        expect(clampNumber(NaN, 0, 10)).toBe(NaN)
      })

      it('honours the max value', () => {
        expect(clampNumber(19, 10, 20)).toBe(19)
        expect(clampNumber(20, 10, 20)).toBe(20)
        expect(clampNumber(21, 10, 20)).toBe(20)
      })

      it('honours the max value, even when using negative values', () => {
        expect(clampNumber(-11, -20, -10)).toBe(-11)
        expect(clampNumber(-10, -20, -10)).toBe(-10)
        expect(clampNumber(-9, -20, -10)).toBe(-10)
      })

      it('honours the min value', () => {
        expect(clampNumber(9, 10, 20)).toBe(10)
        expect(clampNumber(10, 10, 20)).toBe(10)
        expect(clampNumber(11, 10, 20)).toBe(11)
      })

      it('honours the min value, even when using negative values', () => {
        expect(clampNumber(-21, -20, -10)).toBe(-20)
        expect(clampNumber(-20, -20, -10)).toBe(-20)
        expect(clampNumber(-19, -20, -10)).toBe(-19)
      })

      it('works with decimals', () => {
        expect(clampNumber(1.9, 1.0, 2.0)).toBe(1.9)
        expect(clampNumber(2.0, 1.0, 2.0)).toBe(2.0)
        expect(clampNumber(2.1, 1.0, 2.0)).toBe(2.0)
      })
    })

    describe('radians()', () => {
      it('returns the radian value for a given number', () => {
        expect(radians(0)).toBe(0)
        expect(radians(1)).toBe(Math.PI / 180)
        expect(radians(90)).toBe(1.5707963267948966)
        expect(radians(-90)).toBe(-1.5707963267948966)
      })
    })

    describe('round()', () => {
      it('rounds to the nearest 3 decimals', () => {
        expect(round(1)).toBe(1)
        expect(round(1.2)).toBe(1.2)
        expect(round(1.23)).toBe(1.23)
        expect(round(1.234)).toBe(1.234)
        expect(round(1.2345)).toBe(1.235)
      })
    })

    describe('neg()', () => {
      it('returns the negative of a given number', () => {
        expect(neg(0)).toBe(-0)
        expect(neg(1)).toBe(-1)
        expect(neg(1234)).toBe(-1234)
        expect(neg(1.234)).toBe(-1.234)
        expect(neg(1_234)).toBe(-1234)
        expect(neg(Infinity)).toBe(-Infinity)
        expect(neg(NaN)).toBe(NaN)
      })
    })

    describe('spacingToRadius()', () => {
      it('returns zero if spacing is not a finite number or zero', () => {
        expect(spacingToRadius(3)).toBe(0)
        expect(spacingToRadius(3, Infinity)).toBe(0)
        expect(spacingToRadius(3, NaN)).toBe(0)
        expect(spacingToRadius(3, 0)).toBe(0)
      })

      it('returns the correct radius', () => {
        expect(round(spacingToRadius(3, 5))).toBe(10)
        expect(round(spacingToRadius(4, 5))).toBe(7.071)
        expect(round(spacingToRadius(5, 5))).toBe(6.18)
        expect(round(spacingToRadius(3, 50))).toBe(100)
        expect(round(spacingToRadius(4, 50))).toBe(70.711)
        expect(round(spacingToRadius(5, 50))).toBe(61.803)
      })
    })

    describe('mergeClassNames()', () => {
      it('ignores empty strings and non strings', () => {
        expect(mergeClassNames('one', '', 'three')).toBe('one three')
        expect(mergeClassNames('one', '   ', 'three')).toBe('one three')
        expect(mergeClassNames('one', null, 'three')).toBe('one three')
        expect(mergeClassNames('one', true, 'three')).toBe('one three')
        expect(mergeClassNames('one', 1234, 'three')).toBe('one three')
        expect(mergeClassNames('one', { an: 'object' }, 'three')).toBe(
          'one three',
        )
      })

      it('trims class names', () => {
        expect(mergeClassNames('  one', 'two  ', '  three  ')).toBe(
          'one two three',
        )
      })
    })
  })
})
