import React from 'react'
import { render } from '@testing-library/react'

import { Polygon } from '../../polygon'

describe('react', () => {
  describe('polygon', () => {
    it('correctly renders padding', () => {
      // render the polygon
      const result = render(<Polygon dataTestId='test' sides={3} padding={5} />)

      // there should be a polygon with a clip-path that is unaffected by the
      // padding
      const polygonNode = result.getByTestId('test')
      expect(polygonNode).not.toBeNull()
      expect(polygonNode.getAttribute('style')).toMatch(
        /^clip-path:\spolygon\(50%\s0%,\s/
      )
    })

    it('correctly renders the buffers when there are children', () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} padding={5}>
          Text
        </Polygon>
      )

      // there should be a top buffer node with styles
      const bufferTopNode = result.getByTestId('test-buffer-top')
      expect(bufferTopNode).not.toBeNull()
      expect(bufferTopNode.getAttribute('style')).toMatch(/^height:\s10%;/)

      // there should be a bottom buffer node with styles
      const bufferBottomNode = result.getByTestId('test-buffer-bottom')
      expect(bufferBottomNode).not.toBeNull()
      expect(bufferBottomNode.getAttribute('style')).toMatch(/^height:\s30%;/)

      // there should be two side buffer nodes with styles
      const positions = ['left', 'right']
      positions.forEach((position, key) => {
        const bufferSideNode = result.getByTestId(`test-buffer-side-${key}`)
        expect(bufferSideNode).not.toBeNull()
        expect(bufferSideNode.getAttribute('style')).toMatch(
          new RegExp(`^clear:\\s${position};`)
        )
        expect(bufferSideNode.getAttribute('style')).toMatch(/\swidth:\s50%;\s/)
      })
    })
  })
})
