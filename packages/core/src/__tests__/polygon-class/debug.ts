import { PolygonClass } from '../../polygon-class'

describe('core', () => {
  describe('polygon-class', () => {
    describe('constructor({ debug })', () => {
      it('defaults to a debug of false', () => {
        const polygon = new PolygonClass({ sides: 3 })
        expect(polygon.debug).toBe(false)
      })

      it('correctly applies a debug of true', () => {
        const polygon = new PolygonClass({ sides: 3, debug: true })
        expect(polygon.debug).toBe(true)
      })

      it('correctly applies a debug of false', () => {
        const polygon = new PolygonClass({ sides: 3, debug: false })
        expect(polygon.debug).toBe(false)
      })
    })
  })
})
