import { commonPolygonProps, Polygon } from './polygon'

import { defineComponent, h } from 'vue'

const defineNamed = (name: string, sides: number) =>
  defineComponent({
    name,
    props: commonPolygonProps,
    setup(props, { slots }) {
      return () => {
        return h(Polygon, { ...props, sides }, slots.default && slots.default())
      }
    },
  })

export const Trigon = defineNamed('Trigon', 3)
export const Triangle = defineNamed('Triangle', 3)

export const Tetragon = defineNamed('Tetragon', 4)
export const Quadrilateral = defineNamed('Quadrilateral', 4)

export const Pentagon = defineNamed('Pentagon', 5)

export const Hexagon = defineNamed('Hexagon', 6)

export const Heptagon = defineNamed('Heptagon', 7)
export const Septagon = defineNamed('Septagon', 7)

export const Octagon = defineNamed('Octagon', 8)

export const Enneagon = defineNamed('Enneagon', 9)
export const Nonagon = defineNamed('Nonagon', 9)

export const Decagon = defineNamed('Decagon', 10)

export const Hendecagon = defineNamed('Hendecagon', 11)

export const Dodecagon = defineNamed('Dodecagon', 12)

export const Tridecagon = defineNamed('Tridecagon', 13)

export const Tetradecagon = defineNamed('Tetradecagon', 14)

export const Pentadecagon = defineNamed('Pentadecagon', 15)

export const Hexadecagon = defineNamed('Hexadecagon', 16)

export const Heptadecagon = defineNamed('Heptadecagon', 17)

export const Octadecagon = defineNamed('Octadecagon', 18)

export const Enneadecagon = defineNamed('Enneadecagon', 19)

export const Icosihenagon = defineNamed('Icosihenagon', 20)
