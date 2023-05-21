import {
  isFiniteNumber,
  isNonEmptyString,
  isSimpleObject,
  mergeClassNames,
  PolygonClass,
  type PolygonCoreParameters,
} from '@html-polygon/core'
import React, {
  type AriaAttributes,
  type AriaRole,
  type CSSProperties,
  type FunctionComponent,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactElement,
} from 'react'

export interface PolygonReactParameters
  extends PolygonCoreParameters,
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
}

export const Polygon: FunctionComponent<PolygonReactParameters> = ({
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
  role,
  children,
  ...ariaAttributes
}) => {
  const hasChildren =
    isSimpleObject(children) ||
    (isNonEmptyString(children) && children.trim() !== '') ||
    isFiniteNumber(children)

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
      `html-polygon-sides-${sides}`,
      className
    ),
    style: isSimpleObject(style) ? style : undefined,
    onMouseOver: typeof onMouseOver === 'function' ? onMouseOver : undefined,
    onMouseOut: typeof onMouseOut === 'function' ? onMouseOut : undefined,
    onMouseDown: typeof onMouseDown === 'function' ? onMouseDown : undefined,
    onMouseUp: typeof onMouseUp === 'function' ? onMouseUp : undefined,
    onClick: typeof onClick === 'function' ? onClick : undefined,
    role: isNonEmptyString(role) ? role : undefined,
  }

  // Construct the padding shapes if there are children to pad
  let paddedChildren: ReactElement | null = null
  if (hasChildren) {
    const topBufferHeight = polygon.bufferTop
    const topBuffer =
      topBufferHeight > 0 ? (
        <div
          id={`html-polygon-buffer-top${safe.idSuffix}`}
          className='html-polygon-buffer html-polygon-buffer-top'
          style={{
            height: `${topBufferHeight}%`,
            ...(polygon.debug
              ? {
                  boxSizing: 'border-box',
                  backgroundColor: 'rgba(0, 255, 0, 0.25)',
                  borderTop: '1px solid rgba(255, 0, 0, 0.5)',
                  borderBottom: '1px solid rgba(255, 0, 0, 0.5)',
                }
              : {}),
          }}
        ></div>
      ) : null

    // Build the bottom buffer
    const bottomBufferHeight = polygon.bufferBottom
    const bottomBuffer =
      bottomBufferHeight > 0 ? (
        <div
          id={`html-polygon-buffer-bottom${safe.idSuffix}`}
          className='html-polygon-buffer html-polygon-buffer-bottom'
          style={{
            height: `${bottomBufferHeight}%`,
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
        ></div>
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
              }}
            ></div>
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
    polygon.hasBorder || polygon.debug ? (
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
          ></div>
        ) : null}

        {/* Insert the border */}
        {polygon.hasBorder ? (
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
          ></div>
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
      role={safe.role}
      {...ariaAttributes}
    >
      {contentElement}
    </div>
  )
}
