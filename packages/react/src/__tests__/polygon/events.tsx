import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { Polygon } from '../../polygon'

describe('react', () => {
  describe('polygon', () => {
    it('correctly applies custom event handlers', () => {
      // define a generic event handler
      const handleEvent: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.currentTarget.setAttribute('data-lastevent', event.type)
      }

      // render the polygon
      const result = render(
        <Polygon
          dataTestId='test'
          sides={3}
          onClick={handleEvent}
          onMouseDown={handleEvent}
          onMouseUp={handleEvent}
          onMouseOver={handleEvent}
          onMouseOut={handleEvent}
        />
      )

      // get the polygon node and the data toggle should not be defined
      const polygonNode = result.getByTestId('test')
      expect(polygonNode.getAttribute('data-lastevent')).toBeNull()

      // click the polygon node and the last event should change to "click"
      fireEvent.click(polygonNode)
      expect(polygonNode.getAttribute('data-lastevent')).toEqual('click')

      // mouse down on the polygon node and the last event should change to
      // "mousedown"
      fireEvent.mouseDown(polygonNode)
      expect(polygonNode.getAttribute('data-lastevent')).toEqual('mousedown')

      // mouse up on the polygon node and the last event should change to
      // "mouseup"
      fireEvent.mouseUp(polygonNode)
      expect(polygonNode.getAttribute('data-lastevent')).toEqual('mouseup')

      // mouse over on the polygon node and the last event should change to
      // "mouseover"
      fireEvent.mouseOver(polygonNode)
      expect(polygonNode.getAttribute('data-lastevent')).toEqual('mouseover')

      // mouse out on the polygon node and the last event should change to
      // "mouseout"
      fireEvent.mouseOut(polygonNode)
      expect(polygonNode.getAttribute('data-lastevent')).toEqual('mouseout')
    })
  })
})
