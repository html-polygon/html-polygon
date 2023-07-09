import React from 'react'
import { render } from '@testing-library/react'

import { Polygon } from '../../polygon'

describe('react', () => {
  describe('polygon', () => {
    it('renders a polygon with 3 sides', () => {
      // render the polygon
      const result = render(<Polygon dataTestId='test' sides={3} />)

      // get the polygon node and the classnames should include the the
      // correct classes
      const polygonNode = result.getByTestId('test')
      const classNames = Array.from(polygonNode.classList.values())
      expect(classNames).toEqual(['html-polygon', `html-polygon-sides-3`])
    })

    it('renders a polygon with 3 sides that has children', () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3}>
          Text
        </Polygon>
      )

      // get the polygon node and the classnames should include the the
      // correct classes
      const polygonNode = result.getByTestId('test')
      const classNames = Array.from(polygonNode.classList.values())
      expect(classNames).toEqual(['html-polygon', `html-polygon-sides-3`])

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

    it('applies a custom id suffix', () => {
      // render the polygon
      const result = render(
        <Polygon
          dataTestId='test'
          sides={3}
          borderWidth={5}
          idSuffix='testSuffix'
        />
      )

      // get the polygon node and the id should be suffixed
      const polygonNode = result.getByTestId('test')
      expect(polygonNode.id).toEqual('html-polygon-testSuffix')

      // get the border container node and the id should be suffixed
      const borderContainerNode = result.getByTestId('test-border-container')
      expect(borderContainerNode.id).toEqual(
        'html-polygon-border-container-testSuffix'
      )

      // get the border node and the id should be suffixed
      const borderNode = result.getByTestId('test-border')
      expect(borderNode.id).toEqual('html-polygon-border-testSuffix')

      // other nodes have the id suffix applied as well but these are not tested
    })

    it('correctly applies custom class names', () => {
      // render the polygon
      const result = render(
        <Polygon
          dataTestId='test'
          sides={3}
          className='my-class-one my-class-two'
        />
      )

      // get the polygon node and it should have the class names applied
      const polygonNode = result.getByTestId('test')
      expect(polygonNode).not.toBeNull()
      const classNames = Array.from(polygonNode.classList.values())
      expect(classNames).toEqual([
        'html-polygon',
        'html-polygon-sides-3',
        'my-class-one',
        'my-class-two',
      ])
    })

    it('correctly applies custom styles', () => {
      // render the polygon
      const result = render(
        <Polygon
          dataTestId='test'
          sides={3}
          style={{
            opacity: 0.5,
            outline: 'thick double red',
          }}
        />
      )

      // get the polygon node and it should have applied the styles
      const polygonNode = result.getByTestId('test')
      expect(polygonNode).not.toBeNull()
      expect(polygonNode.getAttribute('style')).toMatch(
        /^opacity:\s0.5;\soutline:\sthick\sdouble\sred;\s/
      )
    })

    it('correctly applies a custom role', () => {
      // render the polygon
      const result = render(<Polygon dataTestId='test' sides={3} role='tab' />)

      // get the polygon node and it should have a role of "tab"
      const polygonNode = result.getByTestId('test')
      expect(polygonNode).not.toBeNull()
      expect(polygonNode.getAttribute('role')).toEqual('tab')
    })

    it('does not define a data-testid attribute if not supplied', () => {
      // render the polygon
      const result = render(
        <Polygon sides={3} borderWidth={5} debug rotate={45}>
          Text
        </Polygon>
      )

      // get the fragment
      const fragment = result.asFragment()

      // make sure the data-testid attribute is not present on these elements
      const elementIds = [
        'html-polygon',
        'html-polygon-border-container',
        'html-polygon-debug-clip',
        'html-polygon-border',
        'html-polygon-buffer-top',
        'html-polygon-buffer-bottom',
        'html-polygon-buffer-side-0',
      ]
      elementIds.forEach((elementId) => {
        const element = fragment.getElementById(elementId)
        expect(element).not.toBeNull()
        expect(element?.getAttribute('data-testid')).toBeNull()
      })
    })
  })
})
