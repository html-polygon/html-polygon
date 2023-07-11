import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { Polygon } from '../../polygon'

describe('react', () => {
  describe('polygon', () => {
    it('passes a ref to the root div', () => {
      // construct an empty ref
      const ref: React.RefObject<HTMLDivElement> = {
        current: null,
      }

      // define a click handler that will use the ref to set the data toggle
      // attribute to "on"
      const clickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
        ref.current?.setAttribute('data-toggle', 'on')
      }

      // render the shape
      const result = render(
        <Polygon dataTestId='test' sides={3} onClick={clickHandler} ref={ref} />
      )

      // get the polygon node and the data toggle should not be defined
      const polygonNode = result.getByTestId(`test${name}`)
      expect(polygonNode.getAttribute('data-toggle')).toBeNull()

      // click the polygon node and the data toggle should change to "on"
      fireEvent.click(polygonNode)
      expect(polygonNode.getAttribute('data-toggle')).toEqual('on')
    })
  })
})
