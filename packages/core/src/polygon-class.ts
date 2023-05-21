import { isPoint } from './guards'
import {
  clampNumber,
  getNumber,
  neg,
  radians,
  round,
  spacingToRadius,
} from './utilities'

import { type Point, type Shape } from '.'

export interface PolygonCoreParameters {
  sides: number | string
  margin?: number | string
  borderWidth?: number | string
  hasChildren?: boolean
  padding?: number | string
  stable?: boolean
  rotate?: number | string
  center?: Point
  debug?: boolean
}

interface ShapeSlicePoint {
  y: number
  x: number[]
}

export class PolygonClass {
  // parameters
  private sides: number
  private margin: number
  private borderWidth: number
  private hasChildren: boolean
  private padding: number
  private stable: boolean
  private rotate: number
  private center: Point
  public debug: boolean

  // state
  public hasBorder: boolean
  private isEven: boolean
  private radiusMain: number
  private radiusBorder: number
  private radiusPadding: number

  // points
  private pointsMain: Point[]
  private pointsBorder: Point[]
  private pointsPadding: Point[]
  private pointsPaddingByY: Point[]

  // polygons
  public polygonMain: string
  public polygonBorder: string

  // outside shapes
  public outsideShapes: Shape[]
  public bufferTop: number
  public bufferBottom: number

  constructor({
    sides,
    margin,
    borderWidth,
    hasChildren,
    padding,
    stable,
    rotate,
    center,
    debug,
  }: PolygonCoreParameters) {
    // sanitise parameters
    this.sides = clampNumber(getNumber(sides), 3)
    this.margin = clampNumber(getNumber(margin), 0, 50)
    this.borderWidth = clampNumber(getNumber(borderWidth), 0, 50)
    this.hasChildren = typeof hasChildren === 'boolean' ? hasChildren : false
    this.padding = clampNumber(getNumber(padding), 0, 50)
    this.stable = typeof stable === 'boolean' ? stable : false
    this.rotate = getNumber(rotate)
    this.center = isPoint(center) ? center : { x: 50, y: 50 }
    this.debug = typeof debug === 'boolean' ? debug : false

    // evaluate state
    this.hasBorder = this.borderWidth > 0
    this.isEven = this.sides % 2 === 0
    this.radiusMain = Math.max(0, 50 - spacingToRadius(this.sides, this.margin))
    this.radiusBorder = Math.max(
      0,
      this.radiusMain - spacingToRadius(this.sides, this.borderWidth)
    )
    this.radiusPadding = Math.max(
      0,
      this.radiusBorder - spacingToRadius(this.sides, this.padding)
    )

    // points
    this.pointsMain = this.getPoints(this.radiusMain)
    this.pointsBorder = this.getPointsBorder()
    this.pointsPadding = this.hasChildren
      ? this.getPoints(this.radiusPadding)
      : []
    this.pointsPaddingByY = this.pointsPadding.sort((a, b) => a.y - b.y)

    // polygons
    this.polygonMain = this.pointsToPolygon(this.pointsMain)
    this.polygonBorder = this.pointsToPolygon(this.pointsBorder)

    // outside shapes
    this.outsideShapes = this.getOutsideShapes()
    this.bufferTop = this.hasChildren ? round(this.pointsPaddingByY[0].y) : 0
    this.bufferBottom = this.hasChildren
      ? round(100 - this.pointsPaddingByY[this.sides - 1].y)
      : 0
  }

  private getPoints = (radius: number) => {
    const baseAzimuth = 360 / this.sides
    const stableRotate = this.stable && this.isEven ? baseAzimuth / 2 : 0
    const safeRotate = (neg(this.rotate) % baseAzimuth) + stableRotate

    const points: Point[] = []

    for (let pointIndex = 0; pointIndex < this.sides; pointIndex++) {
      const azimuth = baseAzimuth * pointIndex + safeRotate + 90

      const point = { x: 0, y: 0 }
      switch (azimuth % 360) {
        case 0:
          point.x = radius
          break
        case 90:
          point.y = radius
          break
        case 180:
          point.x = neg(radius)
          break
        case 270:
          point.y = neg(radius)
          break
        default:
          point.x = radius * Math.cos(radians(azimuth))
          point.y = radius * Math.sin(radians(azimuth))
          break
      }

      points.push(point)
    }

    return points.map(({ x, y }) => ({
      x: round(x + this.center.x),
      y: round(neg(y) + this.center.y),
    }))
  }

  private getPointsBorder = () => {
    if (this.borderWidth < 0) {
      return []
    }

    const points = this.getPoints(this.radiusBorder)

    // Additional points invert the polygon
    points.push(
      { x: points[0].x, y: points[0].y },
      { x: points[0].x, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
      { x: points[0].x, y: 0 }
    )

    return points
  }

  private pointsToPolygon = (points?: Point[]) =>
    typeof points === 'undefined'
      ? ''
      : points.map(({ x, y }) => `${x}% ${y}%`).join(', ')

  private getOutsideShapes = () => {
    // Get the additional points required to build the outside shapes
    const shapeSlicePoints = this.pointsPaddingByY
      .reduce<ShapeSlicePoint[]>((acc, current) => {
        // Get the index of an existing y value
        const verticalPointIndex = acc.findIndex(
          (verticalPoint) => verticalPoint.y === current.y
        )

        if (verticalPointIndex === -1) {
          // Create a new y value
          acc.push({ y: current.y, x: [current.x] })
        } else {
          // Add another x value to an existing y value and sort x values
          acc[verticalPointIndex].x.push(current.x)
          acc[verticalPointIndex].x.sort()
        }

        return acc
      }, [])
      .map((current, index, slices) => {
        // Don't modify slices that already have two points
        if (current.x.length === 2) {
          return current
        }

        // Duplicate x value on first or last slice
        if (index === 0 || index === slices.length - 1) {
          return {
            ...current,
            x: [current.x[0], current.x[0]],
          }
        }

        // Get the last and next slices for use in calculations
        const last = slices[index - 1]
        const next = slices[index + 1]

        // Select the correct values for calculating x
        const indexX = current.x[0] > 50 || index === 1 ? 0 : 1

        // The intersection of the slice with the non-point side is in ratio
        const totalY = next.y - last.y
        const totalX = next.x[0] - last.x[indexX]
        const partialY = current.y - last.y
        const partialX = partialY * (totalX / totalY)

        // Add the new x value and sort x values
        current.x.push(round(last.x[indexX] + partialX))
        current.x.sort((a, b) => a - b)
        return current
      })

    // Construct the shapes
    return shapeSlicePoints.reduce<Shape[]>((acc, current, index) => {
      // Skip the first slice
      if (index === 0) {
        return acc
      }

      // Get the last slice
      const last = shapeSlicePoints[index - 1]

      // Height is common on left and right
      const height = current.y - last.y

      // Widths are the maximum length of x on each side
      const leftWidth = Math.max(last.x[0], current.x[0])
      const rightWidth = Math.max(100 - last.x[1], 100 - current.x[1])

      // Deal with the triangle edge case
      const margin =
        leftWidth + rightWidth > 100 ? 100 - leftWidth - rightWidth : 0

      // Calculate missing value for x on left
      let leftBx = 100
      let leftCx = 100
      if (current.x[0] < last.x[0]) {
        leftCx = 100 * (current.x[0] / last.x[0])
      } else if (current.x[0] > last.x[0]) {
        leftBx = 100 * (last.x[0] / current.x[0])
      }

      // Calculate missing value for x on right
      let rightAx = 0
      let rightDx = 0
      if (current.x[1] < last.x[1]) {
        rightAx = 100 - 100 * ((100 - last.x[1]) / (100 - current.x[1]))
      } else if (current.x[1] > last.x[1]) {
        rightDx = 100 - 100 * ((100 - current.x[1]) / (100 - last.x[1]))
      }

      // Define the shapes
      const shapeLeftPoints: Point[] = [
        { x: 0, y: 0 },
        { x: round(leftBx), y: 0 },
        { x: round(leftCx), y: 100 },
        { x: 0, y: 100 },
      ]
      const shapeLeft: Shape = {
        points: shapeLeftPoints,
        polygon: this.pointsToPolygon(shapeLeftPoints),
        height: round(height),
        width: round(leftWidth),
        float: 'left',
        marginRight: leftWidth > rightWidth ? margin : 0,
      }
      const shapeRightPoints: Point[] = [
        { x: round(rightAx), y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 100 },
        { x: round(rightDx), y: 100 },
      ]
      const shapeRight: Shape = {
        points: shapeRightPoints,
        polygon: this.pointsToPolygon(shapeRightPoints),
        height: round(height),
        width: round(rightWidth),
        float: 'right',
        marginLeft: leftWidth < rightWidth ? margin : 0,
      }

      // Add the shapes to the accumulator
      acc.push(shapeLeft, shapeRight)

      return acc
    }, [])
  }
}
