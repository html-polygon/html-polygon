import {
  isNonEmptyString,
  isSimpleObject,
  mergeClassNames,
  PolygonClass,
  type PolygonClassParameters,
} from '@html-polygon/core'
import React, {
  type AriaAttributes,
  type AriaRole,
  Children,
  type CSSProperties,
  forwardRef,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactElement,
} from 'react'

export interface PolygonReactParameters
  extends Omit<PolygonClassParameters, 'hasChildren'>,
    PropsWithChildren,
    AriaAttributes {
  borderColor?: string
  borderClassName?: string
  borderStyle?: CSSProperties
  idSuffix?: string
  className?: string
  style?: CSSProperties
  onMouseOver?: MouseEventHandler<HTMLDivElement>
  onMouseOut?: MouseEventHandler<HTMLDivElement>
  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onMouseUp?: MouseEventHandler<HTMLDivElement>
  onClick?: MouseEventHandler<HTMLDivElement>
  role?: AriaRole
  dataTestId?: string
}

const Polygon = forwardRef<HTMLDivElement, PolygonReactParameters>(
  (
    {
      sides,
      margin,
      borderWidth,
      borderColor,
      borderClassName,
      borderStyle,
      padding,
      stable,
      rotate,
      center,
      debug,
      idSuffix,
      className,
      style,
      onMouseOver,
      onMouseOut,
      onMouseDown,
      onMouseUp,
      onClick,
      dataTestId,
      role,
      children,
      ...ariaAttributes
    },
    ref
  ) => {
    let hasChildren = false
    Children.forEach(children, (child) => {
      if (hasChildren) {
        return
      }

      if (
        child === null ||
        typeof child === 'undefined' ||
        typeof child === 'boolean'
      ) {
        return
      }

      if (typeof child === 'string' && child.trim() === '') {
        return
      }

      hasChildren = true
    })

    const polygon = new PolygonClass({
      sides,
      margin,
      borderWidth,
      hasChildren,
      padding,
      stable,
      rotate,
      center,
      debug,
    })

    // Sanitise inputs
    const safe = {
      // Default border color to black
      borderColor: isNonEmptyString(borderColor) ? borderColor : 'rgb(0, 0, 0)',
      borderClassName: mergeClassNames('html-polygon-border', borderClassName),
      borderStyle: isSimpleObject(borderStyle) ? borderStyle : undefined,
      idSuffix: isNonEmptyString(idSuffix) ? `-${idSuffix}` : '',
      className: mergeClassNames(
        'html-polygon',
        `html-polygon-sides-${polygon.sides}`,
        className
      ),
      style: isSimpleObject(style) ? style : undefined,
      onMouseOver: typeof onMouseOver === 'function' ? onMouseOver : undefined,
      onMouseOut: typeof onMouseOut === 'function' ? onMouseOut : undefined,
      onMouseDown: typeof onMouseDown === 'function' ? onMouseDown : undefined,
      onMouseUp: typeof onMouseUp === 'function' ? onMouseUp : undefined,
      onClick: typeof onClick === 'function' ? onClick : undefined,
      role: isNonEmptyString(role) ? role : undefined,
      dataTestid: isNonEmptyString(dataTestId) ? dataTestId : undefined,
    }

    // Construct the padding shapes if there are children to pad
    let paddedChildren: ReactElement | null = null
    if (hasChildren) {
      const topBuffer =
        polygon.bufferTop > 0 ? (
          <div
            id={`html-polygon-buffer-top${safe.idSuffix}`}
            className='html-polygon-buffer html-polygon-buffer-top'
            style={{
              height: `${polygon.bufferTop}%`,
              ...(polygon.debug
                ? {
                    boxSizing: 'border-box',
                    backgroundColor: 'rgba(0, 255, 0, 0.25)',
                    borderTop: '1px solid rgba(255, 0, 0, 0.5)',
                    borderBottom: '1px solid rgba(255, 0, 0, 0.5)',
                  }
                : {}),
            }}
            data-testid={
              safe.dataTestid ? `${safe.dataTestid}-buffer-top` : undefined
            }
          />
        ) : null

      // Build the bottom buffer
      const bottomBuffer =
        polygon.bufferBottom > 0 ? (
          <div
            id={`html-polygon-buffer-bottom${safe.idSuffix}`}
            className='html-polygon-buffer html-polygon-buffer-bottom'
            style={{
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
            }}
            data-testid={
              safe.dataTestid ? `${safe.dataTestid}-buffer-bottom` : undefined
            }
          />
        ) : null

      paddedChildren = (
        <>
          {/* Insert the top buffer */}
          {topBuffer}

          {/* Insert the outside shapes */}
          {polygon.outsideShapes.map((shape, key) => {
            const debugBackground = polygon.debug
              ? key % 2 === 0
                ? key % 4 === 0
                  ? 'rgba(255, 255, 0, 0.25)'
                  : 'rgba(0, 255, 255, 0.25)'
                : key % 4 === 1
                ? 'rgba(255, 0, 255, 0.25)'
                : 'rgba(0, 0, 255, 0.25)'
              : ''

            return (
              <div
                key={`shapeOutside-${key}`}
                id={`html-polygon-buffer-side-${key}${safe.idSuffix}`}
                className='html-polygon-buffer html-polygon-buffer-side'
                style={{
                  clear: shape.float,
                  float: shape.float,
                  height: `${shape.height}%`,
                  width: `${shape.width}%`,
                  marginLeft: shape.marginLeft ? `${shape.marginLeft}%` : '0',
                  marginRight: shape.marginRight
                    ? `${shape.marginRight}%`
                    : '0',
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
                }}
                data-testid={
                  safe.dataTestid
                    ? `${safe.dataTestid}-buffer-side-${key}`
                    : undefined
                }
              />
            )
          })}

          {/* Insert the bottom buffer */}
          {bottomBuffer}

          {/* Insert the supplied children */}
          {children}
        </>
      )
    }

    const contentElement =
      polygon.polygonBorder || polygon.debug ? (
        <div
          id={`html-polygon-border-container${safe.idSuffix}`}
          className='html-polygon-border-container'
          // Use relative/absolute positioning to place the border and/or debug
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
          data-testid={
            safe.dataTestid ? `${safe.dataTestid}-border-container` : undefined
          }
        >
          {/* Visualise the polygon clip during debug */}
          {polygon.debug ? (
            <div
              id={`html-polygon-debug-clip${safe.idSuffix}`}
              className='html-polygon-debug-clip'
              style={{
                position: 'absolute',
                zIndex: 1,
                height: '100%',
                width: '100%',
                clipPath: `polygon(${polygon.polygonMain})`,
                backgroundColor: 'rgba(255, 0, 0, 0.25)',
              }}
              data-testid={
                safe.dataTestid ? `${safe.dataTestid}-debug-clip` : undefined
              }
            />
          ) : null}

          {/* Insert the border */}
          {polygon.polygonBorder ? (
            <div
              id={`html-polygon-border${safe.idSuffix}`}
              className={safe.borderClassName}
              style={{
                // The background color can be overriden by supplied styles
                backgroundColor: safe.borderColor,
                ...safe.borderStyle,
                // The below are critical for positioning and shape, so can not be
                // overriden in supplied styles
                position: 'absolute',
                height: '100%',
                width: '100%',
                clipPath: `polygon(${polygon.polygonBorder})`,
              }}
              data-testid={
                safe.dataTestid ? `${safe.dataTestid}-border` : undefined
              }
            />
          ) : null}

          {/* Add the padded children */}
          {paddedChildren}
        </div>
      ) : (
        paddedChildren
      )

    // Construct the polygon
    return (
      <div
        id={`html-polygon${safe.idSuffix}`}
        className={safe.className}
        style={{
          ...safe.style,
          // The clip path will override any supplied clip path
          clipPath: polygon.debug ? '' : `polygon(${polygon.polygonMain})`,
        }}
        onMouseOver={safe.onMouseOver}
        onMouseOut={safe.onMouseOut}
        onMouseDown={safe.onMouseDown}
        onMouseUp={safe.onMouseUp}
        onClick={safe.onClick}
        data-testid={safe.dataTestid}
        role={safe.role}
        {...ariaAttributes}
        ref={ref}
      >
        {contentElement}
      </div>
    )
  }
)
Polygon.displayName = 'Polygon'
export { Polygon }
