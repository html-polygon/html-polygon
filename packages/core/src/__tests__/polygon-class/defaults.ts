import { PolygonClass } from '../../polygon-class'

class TestPolygonClass extends PolygonClass {
  public getPrivate = (name: string) => this[name]
}

describe('core', () => {
  describe('polygon-class', () => {
    describe('constructor()', () => {
      it('assigns default properties', () => {
        const polygon = new TestPolygonClass({ sides: 3 })
        expect(polygon.sides).toBe(3)
        expect(polygon.polygonMain).toMatch(/^50%\s0%,\s/)
        expect(polygon.outsideShapes).toEqual([])
        expect(polygon.bufferTop).toBe(0)
        expect(polygon.bufferBottom).toBe(0)
        expect(polygon.getPrivate('margin')).toBe(0)
        expect(polygon.getPrivate('borderWidth')).toBe(0)
        expect(polygon.getPrivate('hasChildren')).toBe(false)
        expect(polygon.getPrivate('padding')).toBe(0)
        expect(polygon.getPrivate('stable')).toBe(false)
        expect(polygon.getPrivate('rotate')).toBe(0)
        expect(polygon.getPrivate('center')).toEqual({ x: 50, y: 50 })
        expect(polygon.getPrivate('hasBorder')).toBe(false)
        expect(polygon.getPrivate('isEven')).toBe(false)
        expect(polygon.getPrivate('radiusMain')).toBe(50)
        expect(polygon.getPrivate('radiusBorder')).toBe(50)
        expect(polygon.getPrivate('radiusPadding')).toBe(50)
        expect(polygon.getPrivate('pointsMain')).toEqual(
          expect.arrayContaining([{ x: 50, y: 0 }])
        )
        expect(polygon.getPrivate('pointsBorder')).toEqual([])
        expect(polygon.getPrivate('pointsPadding')).toEqual([])
        expect(polygon.getPrivate('pointsPaddingByY')).toEqual([])
      })
    })
  })
})
