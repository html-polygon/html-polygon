import {
  isNonEmptyString,
  isSimpleObject,
  mergeClassNames,
  type Point,
  PolygonClass,
} from '@html-polygon/core'
import {
  type CSSProperties,
  defineComponent,
  h,
  type PropType,
  type Slot,
  type VNode,
} from 'vue'

export const commonPolygonProps = {
  margin: [Number, String],
  borderWidth: [Number, String],
  borderColor: String,
  borderClass: String,
  borderStyle: Object as PropType<CSSProperties>,
  padding: [Number, String],
  stable: Boolean,
  rotate: [Number, String],
  center: Object as PropType<Point>,
  debug: Boolean,
  id: String,
  idSuffix: String,
}

const isSlot = (maybe: unknown): maybe is Slot => typeof maybe === 'function'

export const Polygon = defineComponent({
  name: 'Polygon',
  props: {
    sides: {
      type: [Number, String],
      required: true,
    },
    ...commonPolygonProps,
  },
  setup(props, { slots }) {
    return () => {
      // This does not currently check the validity of the children like the
      // React package does
      const hasChildren = isSlot(slots.default) && slots.default().length > 0

      const defaultSlot = isSlot(slots.default) && slots.default()[0]

      const polygon = new PolygonClass({
        sides: props.sides,
        margin: props.margin,
        borderWidth: props.borderWidth,
        hasChildren,
        padding: props.padding,
        stable: props.stable,
        rotate: props.rotate,
        center: props.center,
        debug: props.debug,
      })

      const safe = {
        borderColor: isNonEmptyString(props.borderColor)
          ? props.borderColor
          : undefined,
        borderClass: mergeClassNames('html-polygon-border', props.borderClass),
        borderStyle: isSimpleObject(props.borderStyle)
          ? props.borderStyle
          : undefined,
        idSuffix: isNonEmptyString(props.idSuffix) ? `-${props.idSuffix}` : '',
      }

      const paddedChildren: VNode[] = []

      if (hasChildren) {
        if (polygon.bufferTop > 0) {
          paddedChildren.push(
            h('div', {
              id: `html-polygon-buffer-top${safe.idSuffix}`,
              class: 'html-polygon-buffer html-polygon-buffer-top',
              style: {
                height: `${polygon.bufferTop}%`,
                ...(polygon.debug
                  ? {
                      boxSizing: 'border-box',
                      backgroundColor: 'rgba(0, 255, 0, 0.25)',
                      borderTop: '1px solid rgba(255, 0, 0, 0.5)',
                      borderBottom: '1px solid rgba(255, 0, 0, 0.5)',
                    }
                  : {}),
              },
            }),
          )
        }

        paddedChildren.push(
          ...polygon.outsideShapes.map((shape, key) => {
            const debugBackground = polygon.debug
              ? key % 2 === 0
                ? key % 4 === 0
                  ? 'rgba(255, 255, 0, 0.25)'
                  : 'rgba(0, 255, 255, 0.25)'
                : key % 4 === 1
                  ? 'rgba(255, 0, 255, 0.25)'
                  : 'rgba(0, 0, 255, 0.25)'
              : ''

            return h('div', {
              key: `shapeOutside-${key}`,
              id: `html-polygon-buffer-side-${key}${safe.idSuffix}`,
              class: 'html-polygon-buffer html-polygon-buffer-side',
              style: {
                clear: shape.float,
                float: shape.float,
                height: `${shape.height}%`,
                width: `${shape.width}%`,
                marginLeft: shape.marginLeft ? `${shape.marginLeft}%` : '0',
                marginRight: shape.marginRight ? `${shape.marginRight}%` : '0',
                shapeOutside: `polygon(${shape.polygon})`,
                ...(polygon.debug
                  ? {
                      boxSizing: 'border-box',
                      clipPath: `polygon(${shape.polygon})`,
                      backgroundColor: debugBackground,
                      borderTop: '1px solid rgba(255, 0, 0, 0.5)',
                      borderBottom: '1px solid rgba(255, 0, 0, 0.5)',
                    }
                  : {}),
              },
            })
          }),
        )

        if (polygon.bufferBottom > 0) {
          paddedChildren.push(
            h('div', {
              id: `html-polygon-buffer-bottom${safe.idSuffix}`,
              class: 'html-polygon-buffer html-polygon-buffer-bottom',
              style: {
                height: `${polygon.bufferBottom}%`,
                width: '100%',
                clear: 'left',
                float: 'left',
                shapeOutside: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                ...(polygon.debug
                  ? {
                      boxSizing: 'border-box',
                      backgroundColor: 'rgba(0, 255, 0, 0.25)',
                      borderTop: '1px solid rgba(255, 0, 0, 0.5)',
                      borderBottom: '1px solid rgba(255, 0, 0, 0.5)',
                    }
                  : {}),
              },
            }),
          )
        }

        if (defaultSlot !== false) {
          paddedChildren.push(defaultSlot)
        }
      }

      return h(
        'div',
        {
          id: `html-polygon${safe.idSuffix}`,
          class: `html-polygon html-polygon-sides-${polygon.sides}`,
          style: polygon.debug
            ? {}
            : { clipPath: `polygon(${polygon.polygonMain})` },
        },
        polygon.polygonBorder || polygon.debug
          ? h(
              'div',
              {
                id: `html-polygon-border-container${safe.idSuffix}`,
                class: 'html-polygon-border-container',
                style: {
                  position: 'relative',
                  height: '100%',
                  width: '100%',
                  overflow: 'hidden',
                },
              },
              [
                polygon.debug
                  ? h('div', {
                      id: `html-polygon-debug-clip${safe.idSuffix}`,
                      class: 'html-polygon-debug-clip',
                      style: {
                        position: 'absolute',
                        zIndex: 1,
                        height: '100%',
                        width: '100%',
                        clipPath: `polygon(${polygon.polygonMain})`,
                        backgroundColor: 'rgba(255, 0, 0, 0.25)',
                      },
                    })
                  : undefined,
                polygon.polygonBorder
                  ? h('div', {
                      id: `html-polygon-border${safe.idSuffix}`,
                      class: 'safe.borderClassName',
                      style: {
                        backgroundColor: safe.borderColor,
                        ...safe.borderStyle,
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        clipPath: `polygon(${polygon.polygonBorder})`,
                      },
                    })
                  : undefined,
                ...paddedChildren,
              ],
            )
          : paddedChildren,
      )
    }
  },
})
