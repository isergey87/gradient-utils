
export interface SVGColorStop {
  /** number in percent (0;100) */
  offset?: number
  stopColor: string
  stopOpacity?: number
}
export interface SVGLinearGradient {
  x1: string
  y1: string
  x2: string
  y2: string
  colorStops:SVGColorStop[]
}
