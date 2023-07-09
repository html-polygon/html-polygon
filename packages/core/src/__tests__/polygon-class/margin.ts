import { PolygonClass } from '../../polygon-class'

class TestPolygonClass extends PolygonClass {
  public getPrivate = (name: string) => this[name]
}

describe('core', () => {
  describe('polygon-class', () => {
    describe('constructor({ margin })', () => {
      it('defaults to a margin of 0', () => {
        const polygon = new TestPolygonClass({ sides: 3 })
        expect(polygon.polygonMain).toMatch(/^50%\s0%,\s/)
        expect(polygon.getPrivate('margin')).toBe(0)
        expect(polygon.getPrivate('radiusMain')).toBe(50)
        expect(polygon.getPrivate('radiusBorder')).toBe(50)
        expect(polygon.getPrivate('radiusPadding')).toBe(50)
        expect(polygon.getPrivate('pointsMain')).toEqual(
          expect.arrayContaining([{ x: 50, y: 0 }])
        )
      })

      it('correctly applies a margin', () => {
        const polygon = new TestPolygonClass({ sides: 3, margin: 5 })
        expect(polygon.polygonMain).toMatch(/^50%\s10%,\s/)
        expect(polygon.getPrivate('margin')).toBe(5)
        expect(polygon.getPrivate('radiusMain')).toBe(40)
        expect(polygon.getPrivate('radiusBorder')).toBe(40)
        expect(polygon.getPrivate('radiusPadding')).toBe(40)
        expect(polygon.getPrivate('pointsMain')).toEqual(
          expect.arrayContaining([{ x: 50, y: 10 }])
        )
      })
    })
  })
})
