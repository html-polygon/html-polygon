import { PolygonClass } from '../../polygon-class'

class TestPolygonClass extends PolygonClass {
  public getPrivate = (name: string) => this[name]
}

describe('core', () => {
  describe('polygon-class', () => {
    describe('constructor({ center })', () => {
      it('defaults to a center at 50%', () => {
        const polygon = new TestPolygonClass({ sides: 3 })
        expect(polygon.polygonMain).toMatch(/^50%\s0%,\s/)
        expect(polygon.getPrivate('center')).toEqual({ x: 50, y: 50 })
        expect(polygon.getPrivate('pointsMain')).toEqual(
          expect.arrayContaining([{ x: 50, y: 0 }])
        )
      })

      it('correctly applies center', () => {
        const polygon = new TestPolygonClass({
          sides: 3,
          center: { x: 60, y: 60 },
        })
        expect(polygon.polygonMain).toMatch(/^60%\s10%,\s/)
        expect(polygon.getPrivate('center')).toEqual({ x: 60, y: 60 })
        expect(polygon.getPrivate('pointsMain')).toEqual(
          expect.arrayContaining([{ x: 60, y: 10 }])
        )
      })
    })
  })
})
