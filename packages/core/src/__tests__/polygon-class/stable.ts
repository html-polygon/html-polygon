import { PolygonClass } from '../../polygon-class'

class TestPolygonClass extends PolygonClass {
  public getPrivate = (name: string) => this[name]
}

describe('core', () => {
  describe('polygon-class', () => {
    describe('constructor({ stable })', () => {
      it('defaults the stable flag to false', () => {
        const polygon = new TestPolygonClass({ sides: 3 })
        expect(polygon.getPrivate('stable')).toBe(false)
        expect(polygon.getPrivate('rotate')).toBe(0)
        expect(polygon.getPrivate('isEven')).toBe(false)
        expect(polygon.getPrivate('pointsMain')).toEqual(
          expect.arrayContaining([{ x: 50, y: 0 }]),
        )
      })

      it('correctly applies the stable flag of true when sides are odd', () => {
        const polygon = new TestPolygonClass({ sides: 3, stable: true })
        expect(polygon.getPrivate('stable')).toBe(true)
        expect(polygon.getPrivate('rotate')).toBe(0)
        expect(polygon.getPrivate('isEven')).toBe(false)
        expect(polygon.getPrivate('pointsMain')).toEqual(
          expect.arrayContaining([{ x: 50, y: 0 }]),
        )
      })

      it('correctly applies the stable flag of false when sides are odd', () => {
        const polygon = new TestPolygonClass({ sides: 3, stable: false })
        expect(polygon.getPrivate('stable')).toBe(false)
        expect(polygon.getPrivate('rotate')).toBe(0)
        expect(polygon.getPrivate('isEven')).toBe(false)
        expect(polygon.getPrivate('pointsMain')).toEqual(
          expect.arrayContaining([{ x: 50, y: 0 }]),
        )
      })

      it('correctly applies the stable flag of true when sides are even', () => {
        const polygon = new TestPolygonClass({ sides: 4, stable: true })
        expect(polygon.getPrivate('stable')).toBe(true)
        expect(polygon.getPrivate('rotate')).toBe(0)
        expect(polygon.getPrivate('isEven')).toBe(true)
        expect(polygon.getPrivate('pointsMain')).toEqual(
          expect.arrayContaining([{ x: 14.645, y: 14.645 }]),
        )
      })

      it('correctly applies the stable flag of false when sides are even', () => {
        const polygon = new TestPolygonClass({ sides: 4, stable: false })
        expect(polygon.getPrivate('stable')).toBe(false)
        expect(polygon.getPrivate('rotate')).toBe(0)
        expect(polygon.getPrivate('isEven')).toBe(true)
        expect(polygon.getPrivate('pointsMain')).toEqual(
          expect.arrayContaining([{ x: 50, y: 0 }]),
        )
      })
    })
  })
})
