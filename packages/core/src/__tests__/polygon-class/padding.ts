import { PolygonClass } from '../../polygon-class'

class TestPolygonClass extends PolygonClass {
  public getPrivate = (name: string) => this[name]
}

describe('core', () => {
  describe('polygon-class', () => {
    describe('constructor({ padding })', () => {
      it('deafults padding to 0', () => {
        const polygon = new TestPolygonClass({ sides: 3 })
        expect(polygon.getPrivate('padding')).toBe(0)
        expect(polygon.getPrivate('radiusPadding')).toBe(50)
      })

      it('correctly applies padding', () => {
        const polygon = new TestPolygonClass({ sides: 3, padding: 5 })
        expect(polygon.getPrivate('padding')).toBe(5)
        expect(polygon.getPrivate('radiusPadding')).toBe(40)
      })

      it('correctly applies padding with children on odd sided shape', () => {
        const polygon = new TestPolygonClass({
          sides: 3,
          padding: 5,
          hasChildren: true,
        })
        expect(polygon.outsideShapes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              float: 'left',
              height: 60,
              points: expect.arrayContaining([{ x: 30.718, y: 100 }]),
            }),
            expect.objectContaining({
              float: 'right',
              height: 60,
              points: expect.arrayContaining([{ x: 69.282, y: 100 }]),
            }),
          ])
        )
        expect(polygon.bufferTop).toBe(10)
        expect(polygon.bufferBottom).toBe(30)
        expect(polygon.getPrivate('hasChildren')).toBe(true)
        expect(polygon.getPrivate('padding')).toBe(5)
        expect(polygon.getPrivate('radiusPadding')).toBe(40)
        expect(polygon.getPrivate('pointsPadding')).toEqual(
          expect.arrayContaining([{ x: 50, y: 10 }])
        )
        expect(polygon.getPrivate('pointsPaddingByY')).toEqual(
          expect.arrayContaining([{ x: 50, y: 10 }])
        )
      })

      it('correctly applies padding with children on even sided shape', () => {
        const polygon = new TestPolygonClass({
          sides: 4,
          padding: 5,
          hasChildren: true,
        })
        expect(polygon.outsideShapes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              float: 'left',
              height: 42.929,
              points: expect.arrayContaining([{ x: 14.142, y: 100 }]),
            }),
            expect.objectContaining({
              float: 'right',
              height: 42.929,
              points: expect.arrayContaining([{ x: 85.858, y: 100 }]),
            }),
          ])
        )
        expect(polygon.bufferTop).toBe(7.071)
        expect(polygon.bufferBottom).toBe(7.071)
        expect(polygon.getPrivate('hasChildren')).toBe(true)
        expect(polygon.getPrivate('padding')).toBe(5)
        expect(polygon.getPrivate('radiusPadding')).toBe(42.928932188134524)
        expect(polygon.getPrivate('pointsPadding')).toEqual(
          expect.arrayContaining([{ x: 50, y: 7.071 }])
        )
        expect(polygon.getPrivate('pointsPaddingByY')).toEqual(
          expect.arrayContaining([{ x: 50, y: 7.071 }])
        )
      })

      it('correctly applies padding with children on odd sided shape with slight positive rotation', () => {
        const polygon = new TestPolygonClass({
          sides: 3,
          padding: 5,
          rotate: 5,
          hasChildren: true,
        })
        expect(polygon.outsideShapes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              float: 'left',
              height: 56.753,
              points: expect.arrayContaining([{ x: 25.704, y: 100 }]),
            }),
            expect.objectContaining({
              float: 'right',
              height: 56.753,
              points: expect.arrayContaining([{ x: 56.895, y: 100 }]),
            }),
          ])
        )
        expect(polygon.bufferTop).toBe(10.152)
        expect(polygon.bufferBottom).toBe(27.057)
        expect(polygon.getPrivate('hasChildren')).toBe(true)
        expect(polygon.getPrivate('padding')).toBe(5)
        expect(polygon.getPrivate('radiusPadding')).toBe(40)
        expect(polygon.getPrivate('pointsPadding')).toEqual(
          expect.arrayContaining([{ x: 53.486, y: 10.152 }])
        )
        expect(polygon.getPrivate('pointsPaddingByY')).toEqual(
          expect.arrayContaining([{ x: 53.486, y: 10.152 }])
        )
      })

      it('correctly applies padding with children on odd sided shape with slight negative rotation', () => {
        const polygon = new TestPolygonClass({
          sides: 3,
          padding: 5,
          rotate: -5,
          hasChildren: true,
        })
        expect(polygon.outsideShapes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              float: 'left',
              height: 56.753,
              points: expect.arrayContaining([{ x: 43.105, y: 100 }]),
            }),
            expect.objectContaining({
              float: 'right',
              height: 56.753,
              points: expect.arrayContaining([{ x: 74.296, y: 100 }]),
            }),
          ])
        )
        expect(polygon.bufferTop).toBe(10.152)
        expect(polygon.bufferBottom).toBe(27.057)
        expect(polygon.getPrivate('hasChildren')).toBe(true)
        expect(polygon.getPrivate('padding')).toBe(5)
        expect(polygon.getPrivate('radiusPadding')).toBe(40)
        expect(polygon.getPrivate('pointsPadding')).toEqual(
          expect.arrayContaining([{ x: 46.514, y: 10.152 }])
        )
        expect(polygon.getPrivate('pointsPaddingByY')).toEqual(
          expect.arrayContaining([{ x: 46.514, y: 10.152 }])
        )
      })
    })
  })
})
