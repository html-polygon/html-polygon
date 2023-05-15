/* eslint-disable import/no-unused-modules */

import { Polygon, type PolygonParameters } from './polygon'

export type NamedPolygonParameters = Omit<PolygonParameters, 'sides'>

export const Trigon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 3, ...opts })

export const Triangle = Trigon

export const Tetragon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 4, ...opts })

export const Quadrilateral = Tetragon

export const Pentagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 5, ...opts })

export const Hexagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 6, ...opts })

export const Heptagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 7, ...opts })

export const Septagon = Heptagon

export const Octagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 8, ...opts })

export const Enneagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 9, ...opts })

export const Nonagon = Enneagon

export const Decagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 10, ...opts })

export const Hendecagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 11, ...opts })

export const Dodecagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 12, ...opts })

export const Tridecagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 13, ...opts })

export const Tetradecagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 14, ...opts })

export const Pentadecagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 15, ...opts })

export const Hexadecagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 16, ...opts })

export const Heptadecagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 17, ...opts })

export const Octadecagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 18, ...opts })

export const Enneadecagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 19, ...opts })

export const Icosihenagon = (opts: NamedPolygonParameters) =>
  Polygon({ sides: 20, ...opts })
