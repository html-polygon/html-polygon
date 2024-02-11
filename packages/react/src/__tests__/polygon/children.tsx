import { render } from '@testing-library/react'
import React from 'react'

import { Polygon } from '../../polygon'

describe('react', () => {
  describe('polygon', () => {
    it('ignores children if children is invalid', () => {
      const invalidChildren = [null, undefined, true, false, '']
      invalidChildren.forEach((invalidChild, key) => {
        // render the polygon
        const result = render(
          <Polygon
            dataTestId={`test${key}`}
            sides={3}
            children={invalidChild}
          />,
        )

        // get the polygon node
        const polygonNode = result.getByTestId(`test${key}`)
        expect(polygonNode).not.toBeNull()

        // there should not be any buffer nodes
        const bufferTestIds = [
          'test-buffer-top',
          'test-buffer-bottom',
          'test-buffer-side-0',
          'test-buffer-side-1',
        ]
        bufferTestIds.forEach((bufferTestId) => {
          const getBuffer = () => result.getByTestId(bufferTestId)
          expect(getBuffer).toThrow()
        })
      })
    })

    it('stops trying to detect children if it already found one', () => {
      // render the polygon
      const result = render(
        <Polygon dataTestId='test' sides={3}>
          <span>One</span>
          <span>Two</span>
        </Polygon>,
      )

      // get the polygon node
      const polygonNode = result.getByTestId('test')
      expect(polygonNode).not.toBeNull()

      // there should be buffer nodes
      const bufferTestIds = [
        'test-buffer-bottom',
        'test-buffer-side-0',
        'test-buffer-side-1',
      ]
      bufferTestIds.forEach((bufferTestId) => {
        const bufferNode = result.getByTestId(bufferTestId)
        expect(bufferNode).not.toBeNull()
      })
    })
  })
})
