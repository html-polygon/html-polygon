import React from 'react'
import { render } from '@testing-library/react'

import { Polygon } from '../../polygon'

describe('react', () => {
  describe('polygon', () => {
    it('renders debug when there are no children', () => {
      // render the polygon
      const result = render(<Polygon dataTestId='test' sides={3} debug />)

      // there should be a debug clip node
      const debugClipNode = result.getByTestId('test-debug-clip')
      expect(debugClipNode).not.toBeNull()
    })

    it('renders buffer debug when there are children', () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} debug rotate={90}>
          Text
        </Polygon>
      )

      // there should be a debug clip node with styles
      const debugClipNode = result.getByTestId('test-debug-clip')
      expect(debugClipNode).not.toBeNull()
      expect(debugClipNode.getAttribute('style')).toMatch(/^position:\s/)

      // there should be a top buffer node with styles
      const bufferTopNode = result.getByTestId('test-buffer-top')
      expect(bufferTopNode).not.toBeNull()
      expect(bufferTopNode.getAttribute('style')).toMatch(/^height:\s/)

      // there should be a bottom buffer node with styles
      const bufferBottomNode = result.getByTestId('test-buffer-bottom')
      expect(bufferBottomNode).not.toBeNull()
      expect(bufferBottomNode.getAttribute('style')).toMatch(/^height:\s/)

      // there should be four side buffer nodes with styles
      const positions = ['left', 'right', 'left', 'right']
      positions.forEach((position, key) => {
        const bufferSideNode = result.getByTestId(`test-buffer-side-${key}`)
        expect(bufferSideNode).not.toBeNull()
        expect(bufferSideNode.getAttribute('style')).toMatch(
          new RegExp(`^clear:\\s${position};`)
        )
      })
    })
  })
})
