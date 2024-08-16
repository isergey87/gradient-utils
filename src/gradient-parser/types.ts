export interface CommonLinearGradient {
  colorStops: (ColorStop | LinearColorHint)[]
  repeatable?: boolean
}

export interface LinearGradientWithAngle extends CommonLinearGradient {
  angle: AngleInfo
}

export interface LinearGradientWithSideOrCorner extends CommonLinearGradient {
  sideOrCorner: SideOrCorner
}

export interface LinearGradientWithInterpolation extends CommonLinearGradient {
  interpolation: string
}

export type LinearGradient =
  | LinearGradientWithAngle
  | LinearGradientWithSideOrCorner
  | LinearGradientWithInterpolation

export type AngleUnit = 'deg' | 'turn' | 'grad' | 'rad'

export interface AngleInfo {
  unit: AngleUnit
  sourceValue: string
  degAngle: number
}

export interface SideOrCorner {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
  sourceValue: string
}

export interface ColorStop {
  color: string
  alpha?: number
  start?: LengthPercentage
  end?: LengthPercentage
}

export interface LinearColorHint {
  value: number
  unit: '%'
  sourceValue: string
}

export interface LengthPercentage {
  value: number
  unit: string
  sourceValue: string
}
