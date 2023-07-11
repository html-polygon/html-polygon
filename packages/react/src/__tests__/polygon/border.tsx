import { render } from '@testing-library/react'
import React from 'react'

import { Polygon } from '../../polygon'

describe('react', () => {
  describe('polygon', () => {
    it('correctly renders a border with default style', () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} borderWidth={5} />
      )

      const borderNode = result.getByTestId('test-border')
      expect(borderNode).not.toBeNull()
      expect(borderNode.getAttribute('style')).toMatch(
        /^background-color:\srgb\(0,\s0,\s0\)/
      )
    })

    it('correctly renders a border with custom color', () => {
      // render the polygon
      const result = render(
        <Polygon
          dataTestId='test'
          sides={3}
          borderWidth={5}
          borderColor='red'
        />
      )

      const borderNode = result.getByTestId('test-border')
      expect(borderNode).not.toBeNull()
      expect(borderNode.getAttribute('style')).toMatch(
        /^background-color:\sred;\s/
      )
    })

    it('correctly applies custom border class names', () => {
      // render the polygon
      const result = render(
        <Polygon
          dataTestId='test'
          sides={3}
          borderWidth={5}
          borderClassName='my-border-class-one my-border-class-two'
        />
      )

      const borderNode = result.getByTestId('test-border')
      expect(borderNode).not.toBeNull()
      const classNames = Array.from(borderNode.classList.values())
      expect(classNames).toEqual([
        'html-polygon-border',
        'my-border-class-one',
        'my-border-class-two',
      ])
    })

    it('correctly applies custom border styles', () => {
      // render the polygon
      const result = render(
        <Polygon
          dataTestId='test'
          sides={3}
          borderWidth={5}
          borderStyle={{
            opacity: 0.5,
            outline: 'thick double red',
          }}
        />
      )

      const borderNode = result.getByTestId('test-border')
      expect(borderNode).not.toBeNull()
      expect(borderNode.getAttribute('style')).toMatch(
        /\sopacity:\s0.5;\soutline:\sthick\sdouble\sred;\s/
      )
    })

    it('correctly renders the buffers when there are children', () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3} borderWidth={5}>
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
