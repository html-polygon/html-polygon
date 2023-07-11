import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import * as named from '../named'
import { Polygon } from '../polygon'

const namedSides: [string, number][] = [
  ['Trigon', 3],
  ['Triangle', 3],
  ['Tetragon', 4],
  ['Quadrilateral', 4],
  ['Pentagon', 5],
  ['Hexagon', 6],
  ['Heptagon', 7],
  ['Septagon', 7],
  ['Octagon', 8],
  ['Enneagon', 9],
  ['Nonagon', 9],
  ['Decagon', 10],
  ['Hendecagon', 11],
  ['Dodecagon', 12],
  ['Tridecagon', 13],
  ['Tetradecagon', 14],
  ['Pentadecagon', 15],
  ['Hexadecagon', 16],
  ['Heptadecagon', 17],
  ['Octadecagon', 18],
  ['Enneadecagon', 19],
  ['Icosihenagon', 20],
]

describe('react', () => {
  describe('named', () => {
    namedSides.forEach(([name, sides]) => {
      describe(name, () => {
        it(`renders a polygon with ${sides} sides`, () => {
          // render the shape
          const Shape = named[name]
          const shapeResult = render(<Shape dataTestId={`test${name}`} />)

          // define the classes we expect to see
          const classes = ['html-polygon', `html-polygon-sides-${sides}`]

          // get the shape node and the classnames should include the the
          // correct classes
          const shapeNode = shapeResult.getByTestId(`test${name}`)
          const shapeClassNames = Array.from(shapeNode.classList.values())
          expect(shapeClassNames).toEqual(classes)

          // render the polygon
          const polygonResult = render(
            <Polygon dataTestId='testPolygon' sides={sides} />
          )

          // get the polygon node and the classnames should include the correct
          // classes
          const polygonNode = polygonResult.getByTestId('testPolygon')
          const polygonClassNames = Array.from(polygonNode.classList.values())
          expect(polygonClassNames).toEqual(classes)

          // empty the data test id attributes and compare the nodes
          shapeNode.setAttribute('data-testid', '')
          polygonNode.setAttribute('data-testid', '')
          expect(shapeNode).toEqual(polygonNode)
        })

        it('passes a ref to the polygon component', () => {
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
          const Shape = named[name]
          const shapeResult = render(
            <Shape
              dataTestId={`test${name}`}
              onClick={clickHandler}
              ref={ref}
            />
          )

          // get the shape node and the data toggle should not be defined
          const shapeNode = shapeResult.getByTestId(`test${name}`)
          expect(shapeNode.getAttribute('data-toggle')).toBeNull()

          // click the shape node and the data toggle should change to "on"
          fireEvent.click(shapeNode)
          expect(shapeNode.getAttribute('data-toggle')).toEqual('on')
        })
      })
    })
  })
})
