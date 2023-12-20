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
  color: CSSColor
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

export interface HEX {
  type: 'HEX'
  r: number
  g: number
  b: number
  /** number value (0;1) */
  alpha?: number
  source: string
}

export interface RGB {
  type: 'RGB'
  /** number value (0;255) */
  R: number
  /** number value (0;255) */
  G: number
  /** number value (0;255) */
  B: number
  /** number value (0;1) */
  alpha?: number
  source: string
}

export interface HSL {
  type: 'HSL'
  /** angle deg */
  H: number | 'none'
  S: number | 'none'
  L: number | 'none'
  /** number value (0;1) */
  alpha?: number | 'none'
  source: string
}

export interface HWB {
  type: 'HWB'
  /** angle deg */
  H: number | 'none'
  W: number | 'none'
  B: number | 'none'
  /** number value (0;1) */
  alpha?: number | 'none'
  source: string
}

export interface LAB {
  type: 'LAB'
  L: number | 'none'
  /** number value (-125;125) */
  a: number | 'none'
  /** number value (-125;125) */
  b: number | 'none'
  /** number value (0;1) */
  alpha?: number | 'none'
  source: string
}

export interface LCH {
  type: 'LCH'
  L: number | 'none'
  /** number value (0;150) */
  C: number | 'none'
  /** angle deg */
  H: number | 'none'
  /** number value (0;1) */
  alpha?: number | 'none'
  source: string
}

export interface Oklab {
  type: 'Oklab'
  /** number value (0;1) */
  L: number | 'none'
  /** number value (-0.4;0.4) */
  a: number | 'none'
  /** number value (-0.4;0.4) */
  b: number | 'none'
  /** number value (0;1) */
  alpha?: number | 'none'
  source: string
}

export interface Oklch {
  type: 'Oklch'
  /** number value (0;1) */
  L: number | 'none'
  /** number value (0;0.4) */
  C: number | 'none'
  /** angle deg */
  H: number | 'none'
  /** number value (0;1) */
  alpha?: number | 'none'
  source: string
}

export interface UnknownColor {
  type: 'UnknownColor'
  color: string
}

export type FunctionColor = RGB | HSL | HWB | LAB | LCH | Oklab | Oklch | UnknownColor

export type NamedColor = string

export type CSSColor = HEX | NamedColor | FunctionColor
