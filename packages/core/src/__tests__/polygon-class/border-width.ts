import { PolygonClass } from '../../polygon-class'

class TestPolygonClass extends PolygonClass {
  public getPrivate = (name: string) => this[name]
}

describe('core', () => {
  describe('polygon-class', () => {
    describe('constructor({ borderWidth })', () => {
      it('defaults to no border', () => {
        const polygon = new TestPolygonClass({ sides: 3 })
        expect(polygon.polygonBorder).toBe('')
        expect(polygon.getPrivate('borderWidth')).toBe(0)
        expect(polygon.getPrivate('hasBorder')).toBe(false)
        expect(polygon.getPrivate('radiusBorder')).toBe(50)
        expect(polygon.getPrivate('radiusPadding')).toBe(50)
        expect(polygon.getPrivate('pointsBorder')).toEqual([])
      })

      it('correctly applies a border', () => {
        const polygon = new TestPolygonClass({ sides: 3, borderWidth: 5 })
        expect(polygon.polygonBorder).toMatch(/^50%\s10%,\s/)
        expect(polygon.getPrivate('borderWidth')).toBe(5)
        expect(polygon.getPrivate('hasBorder')).toBe(true)
        expect(polygon.getPrivate('radiusBorder')).toBe(40)
        expect(polygon.getPrivate('radiusPadding')).toBe(40)
        expect(polygon.getPrivate('pointsBorder')).toEqual(
          expect.arrayContaining([
            { x: 50, y: 0 },
            { x: 50, y: 10 },
          ])
        )
      })
    })
  })
})
