export interface Point {
  x: number
  y: number
}

export interface Shape {
  points: Point[]
  polygon: string
  height: number
  width: number
  float: 'left' | 'right'
  marginLeft?: number
  marginRight?: number
}
