import { render } from '@testing-library/react'
import React from 'react'

import { Polygon } from '../../polygon'

describe('react', () => {
  describe('polygon', () => {
    it(`rotates 0`, () => {
      // render the polygon
      const result = render(<Polygon dataTestId='test' sides={3} rotate={0} />)

      // get the polygon node and the clip-path should start at a certain point
      const polygonNode = result.getByTestId('test')
      expect(polygonNode.getAttribute('style')).toMatch(
        /^clip-path:\spolygon\(50%\s0%,\s.+\);$/
      )
    })

    it(`rotates 0 and correctly applies buffers when there are childern`, () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} rotate={0}>
          Text
        </Polygon>
      )

      // get the polygon node and the clip-path should start at a certain point
      const polygonNode = result.getByTestId('test')
      expect(polygonNode.getAttribute('style')).toMatch(
        /^clip-path:\spolygon\(50%\s0%,\s.+\);$/
      )

      // there should not be a top buffer node
      const getTopBuffer = () => result.getByTestId('test-buffer-top')
      expect(getTopBuffer).toThrow()

      // there should be a bottom buffer node with styles
      const bufferBottomNode = result.getByTestId('test-buffer-bottom')
      expect(bufferBottomNode).not.toBeNull()
      expect(bufferBottomNode.getAttribute('style')).toMatch(/^height:\s/)

      // there should be two side buffer nodes with styles
      const positions = ['left', 'right']
      positions.forEach((position, key) => {
        const bufferSideNode = result.getByTestId(`test-buffer-side-${key}`)
        expect(bufferSideNode).not.toBeNull()
        expect(bufferSideNode.getAttribute('style')).toMatch(
          new RegExp(`^clear:\\s${position};`)
        )
        expect(bufferSideNode.getAttribute('style')).toMatch(/\swidth:\s/)
      })
    })

    it(`rotates 90`, () => {
      // render the polygon
      const result = render(<Polygon dataTestId='test' sides={3} rotate={90} />)

      // get the polygon node and the clip-path should start at a certain point
      const polygonNode = result.getByTestId('test')
      expect(polygonNode.getAttribute('style')).toMatch(
        /^clip-path:\spolygon\(100%\s50%,\s.+\);$/
      )
    })

    it(`rotates 180`, () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} rotate={180} />
      )

      // get the polygon node and the clip-path should end at a certain point
      const polygonNode = result.getByTestId('test')
      expect(polygonNode.getAttribute('style')).toMatch(
        /^clip-path:\spolygon\(.+,\s50%\s100%\);$/
      )
    })

    it(`rotates 180 and correctly applies buffers when there are childern`, () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} rotate={180}>
          Text
        </Polygon>
      )

      // get the polygon node and the clip-path should start at a certain point
      const polygonNode = result.getByTestId('test')
      expect(polygonNode.getAttribute('style')).toMatch(
        /^clip-path:\spolygon\(.+,\s50%\s100%\);$/
      )

      // there should be a top buffer node with styles
      const topBottomNode = result.getByTestId('test-buffer-top')
      expect(topBottomNode).not.toBeNull()
      expect(topBottomNode.getAttribute('style')).toMatch(/^height:\s/)

      // there should not be a bottom buffer node
      const getBottomBuffer = () => result.getByTestId('test-buffer-bottom')
      expect(getBottomBuffer).toThrow()

      // there should be two side buffer nodes with styles
      const positions = ['left', 'right']
      positions.forEach((position, key) => {
        const bufferSideNode = result.getByTestId(`test-buffer-side-${key}`)
        expect(bufferSideNode).not.toBeNull()
        expect(bufferSideNode.getAttribute('style')).toMatch(
          new RegExp(`^clear:\\s${position};`)
        )
        expect(bufferSideNode.getAttribute('style')).toMatch(/\swidth:\s/)
      })
    })

    it(`rotates 270`, () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} rotate={270} />
      )

      // get the polygon node and the clip-path should end at a certain point
      const polygonNode = result.getByTestId('test')
      expect(polygonNode.getAttribute('style')).toMatch(
        /^clip-path:\spolygon\(.+,\s0%\s50%,\s.+\);$/
      )
    })

    it(`rotates -90`, () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} rotate={-90} />
      )

      // get the polygon node and the clip-path should end at a certain point
      const polygonNode = result.getByTestId('test')
      expect(polygonNode.getAttribute('style')).toMatch(
        /^clip-path:\spolygon\(0%\s50%,\s.+\);$/
      )
    })

    it('applies right margin to side buffer 0 as appropriate', () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} rotate={45}>
          Text
        </Polygon>
      )

      // get the side buffer node 0
      const bufferSide0Node = result.getByTestId('test-buffer-side-0')
      expect(bufferSide0Node.getAttribute('style')).toMatch(/\smargin-right:\s/)
      expect(bufferSide0Node.getAttribute('style')).not.toMatch(
        /\smargin-right:\s0px;/
      )
    })

    it('applies left margin to side buffer 1 as appropriate', () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} rotate={-45}>
          Text
        </Polygon>
      )

      // get the side buffer node 0
      const bufferSide1Node = result.getByTestId('test-buffer-side-1')
      expect(bufferSide1Node.getAttribute('style')).toMatch(/\smargin-left:\s/)
      expect(bufferSide1Node.getAttribute('style')).not.toMatch(
        /\smargin-left:\s0px;/
      )
    })
  })
})
