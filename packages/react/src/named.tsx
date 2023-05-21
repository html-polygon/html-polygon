import { Polygon, type PolygonReactParameters } from './polygon'

export type NamedPolygonReactParameters = Omit<PolygonReactParameters, 'sides'>

export const Trigon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 3, ...opts })

export const Triangle = Trigon

export const Tetragon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 4, ...opts })

export const Quadrilateral = Tetragon

export const Pentagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 5, ...opts })

export const Hexagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 6, ...opts })

export const Heptagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 7, ...opts })

export const Septagon = Heptagon

export const Octagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 8, ...opts })

export const Enneagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 9, ...opts })

export const Nonagon = Enneagon

export const Decagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 10, ...opts })

export const Hendecagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 11, ...opts })

export const Dodecagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 12, ...opts })

export const Tridecagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 13, ...opts })

export const Tetradecagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 14, ...opts })

export const Pentadecagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 15, ...opts })

export const Hexadecagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 16, ...opts })

export const Heptadecagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 17, ...opts })

export const Octadecagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 18, ...opts })

export const Enneadecagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 19, ...opts })

export const Icosihenagon = (opts: NamedPolygonReactParameters) =>
  Polygon({ sides: 20, ...opts })
