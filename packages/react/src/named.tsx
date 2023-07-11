import React, { forwardRef } from 'react'

import { Polygon, type PolygonReactParameters } from './polygon'

export type NamedPolygonReactParameters = Omit<PolygonReactParameters, 'sides'>

const namedFactory = (sides: number, name: string) => {
  const Named = forwardRef<HTMLDivElement, NamedPolygonReactParameters>(
    ({ children, ...opts }, ref) => (
      <Polygon sides={sides} ref={ref} {...opts}>
        {children}
      </Polygon>
    )
  )
  Named.displayName = name
  return Named
}

export const Trigon = namedFactory(3, 'Trigon')
export const Triangle = namedFactory(3, 'Triangle')

export const Tetragon = namedFactory(4, 'Tetragon')
export const Quadrilateral = namedFactory(4, 'Quadrilateral')

export const Pentagon = namedFactory(5, 'Pentagon')

export const Hexagon = namedFactory(6, 'Hexagon')

export const Heptagon = namedFactory(7, 'Heptagon')
export const Septagon = namedFactory(7, 'Septagon')

export const Octagon = namedFactory(8, 'Octagon')

export const Enneagon = namedFactory(9, 'Enneagon')
export const Nonagon = namedFactory(9, 'Nonagon')

export const Decagon = namedFactory(10, 'Decagon')

export const Hendecagon = namedFactory(11, 'Hendecagon')

export const Dodecagon = namedFactory(12, 'Dodecagon')

export const Tridecagon = namedFactory(13, 'Tridecagon')

export const Tetradecagon = namedFactory(14, 'Tetradecagon')

export const Pentadecagon = namedFactory(15, 'Pentadecagon')

export const Hexadecagon = namedFactory(16, 'Hexadecagon')

export const Heptadecagon = namedFactory(17, 'Heptadecagon')

export const Octadecagon = namedFactory(18, 'Octadecagon')

export const Enneadecagon = namedFactory(19, 'Enneadecagon')

export const Icosihenagon = namedFactory(20, 'Icosihenagon')
