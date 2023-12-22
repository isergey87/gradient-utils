/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  AngleUnit,
  FunctionColor,
  HEX,
  LinearGradient,
  LinearGradientWithAngle,
  LinearGradientWithInterpolation,
  LinearGradientWithSideOrCorner,
  NamedColor,
} from './types'

export const NUMBER_REGEX =
  /[+-]?(?:[0-9]+(?:[.][0-9]+)?(?:[eE][+-]?[0-9]+)?|[.][0-9]+(?:[eE][+-]?[0-9]+)?)/
export const START_WITH_NUMBER_REGEX = new RegExp(`^${NUMBER_REGEX.source}`)
export const DELIMITER_REGEX = /(^$)|(^\W)/
export const UNIT_REGEX = /^(?<unit>[a-z]+|%)(?:$|[/s,); ])/

export const START_WITH_SIDE_OR_CORNER_REGEX =
  /^to\s+(?:(?:left|right)(?:\s+(?:top|bottom))?|(?:top|bottom)(?:\s+(?:right|left))?)/

export const START_WITH_INTERPOLATION = /^in\s+(?<interpolation>[a-z][^,]+),/

export const START_WITH_FUNCTION_REGEX = /^[a-z]+\(/

const DEGREE_REGEX = /(deg|grad|turn|rad)$/

export const START_NAMED_COLOR_REGEX = /^(?<color>[a-z]+|currentColor)(?:$|\W)/

export const START_HEX_REGEX =
  /^(?<color>#((?<short>[0-9a-f]{3})(?<shortA>[0-9a-f]{1})?|(?<long>[0-9a-f]{6})(?<longA>[0-9a-f]{2})?))(?:$|\W)/

export const ANGLE_UNITS: AngleUnit[] = ['deg', 'turn', 'grad', 'rad']

export const isAngleUnit = (unit: string): unit is AngleUnit =>
  ANGLE_UNITS.includes(unit as AngleUnit)
export const extractStartValueWithUnit = (
  source: string,
  zeroUnit = '',
): {
  value: number
  sourceValue: string
  source: string
  unit: string
} | null => {
  const match = source.match(START_WITH_NUMBER_REGEX)
  if (match && match[0]) {
    const sourceValue = match[0]
    let value = Number(sourceValue)
    if (value === Number.NEGATIVE_INFINITY) {
      value = -Number.MAX_VALUE
    } else if (value === Number.POSITIVE_INFINITY) {
      value = Number.MAX_VALUE
    }

    source = source.substring(sourceValue.length)
    const unitMatch = source.match(UNIT_REGEX)
    if (unitMatch && unitMatch.groups) {
      const unit = unitMatch.groups.unit
      return {
        value,
        sourceValue: sourceValue + unit,
        source: source.substring(unit.length).trim(),
        unit: unit,
      }
    }
    if (value === 0 && DELIMITER_REGEX.test(source)) {
      return {
        value,
        sourceValue: sourceValue,
        source: source.trim(),
        unit: zeroUnit,
      }
    }
  }
  return null
}

export const extractStartComma = (source: string): string | null => {
  source = source.trim()
  if (!source.startsWith(',')) {
    return null
  }
  return source.substring(1).trim()
}

const cssFunctionDelimiters = /[\s/,)]/
/** doesn't support other function inside like calc, var etc */
const simpleCSSFunctionParser = (source: string): string[] => {
  const result: string[] = []
  let index = source.indexOf('(')
  result.push(source.substring(0, index))
  source = source.substring(index + 1, source.length).trim()
  index = 0
  while (index < source.length) {
    if (source.charAt(index).match(cssFunctionDelimiters)) {
      const param = source.substring(0, index)
      if (param) {
        result.push(source.substring(0, index))
      }
      source = source.substring(index + 1, source.length).trim()
      index = 0
    } else {
      index++
    }
  }
  if (index > 0) {
    result.push(source.substring(0, index))
  }

  return result
}

export const extractStartWithFunction = (
  source: string,
): {
  function: string
  source: string
} | null => {
  const match = source.match(START_WITH_FUNCTION_REGEX)
  if (match) {
    let openedCount = 1
    let i = match[0].length
    while (i < source.length && openedCount > 0) {
      if (source.charAt(i) === '(') {
        openedCount++
      } else if (source.charAt(i) === ')') {
        openedCount--
      }
      i++
    }
    if (openedCount > 0) {
      return null
    }

    return {
      function: source.substring(0, i),
      source: source.substring(i),
    }
  }
  return null
}

export const extractStartWithHex = (source: string): HEX | null => {
  const match = source.match(START_HEX_REGEX)
  if (match && match.groups) {
    const alphaHex = match.groups.longA
      ? match.groups.longA
      : match.groups.shortA
        ? match.groups.shortA.repeat(2)
        : null
    const alpha = alphaHex ? parseInt(alphaHex, 16) / 255 : undefined

    let red: number
    let green: number
    let blue: number
    if (match.groups.short) {
      red = parseInt(`${match.groups.short.charAt(0)}${match.groups.short.charAt(0)}`, 16)
      green = parseInt(`${match.groups.short.charAt(1)}${match.groups.short.charAt(1)}`, 16)
      blue = parseInt(`${match.groups.short.charAt(2)}${match.groups.short.charAt(2)}`, 16)
    } else {
      red = parseInt(match.groups.long.substring(0, 2), 16)
      green = parseInt(match.groups.long.substring(2, 4), 16)
      blue = parseInt(match.groups.long.substring(4, 6), 16)
    }

    return {
      type: 'HEX',
      R: red,
      G: green,
      B: blue,
      alpha,
      source: match.groups.color,
    }
  }
  return null
}
export const extractStartNamedColor = (
  source: string,
): {
  color: NamedColor
  source: string
} | null => {
  const match = source.match(START_NAMED_COLOR_REGEX)
  if (match && match.groups) {
    return {
      color: match.groups.color,
      source: source.substring(match.groups.color.length, source.length).trim(),
    }
  }
  return null
}
export const angleToDeg = (angle: number, unit: AngleUnit): number => {
  switch (unit) {
    case 'deg':
      return angle
    case 'turn':
      return angle * 360
    case 'grad':
      return angle * 0.9
    case 'rad':
      return (angle * 180) / Math.PI
  }
}

const getDegreeUnit = (source: string): AngleUnit | null => {
  const match = source.match(DEGREE_REGEX)
  if (match) {
    return match[0] as AngleUnit
  }
  return null
}

const noneOrDegree = (source: string): 'none' | number => {
  if (source === 'none') {
    return 'none'
  }
  const value = parseFloat(source)
  const degreeUnit = getDegreeUnit(source)
  if (degreeUnit) {
    return angleToDeg(value, degreeUnit)
  }
  return value
}

const noneOrNumber = (source: string): 'none' | number =>
  source === 'none' ? source : parseFloat(source)

const percentToValue = (source: string, multiplier = 1): number => {
  const value = parseFloat(source)
  if (source.endsWith('%')) {
    return value * multiplier
  }
  return value
}
const percentToNoneValue = (source: string, multiplier = 1): 'none' | number => {
  if (source === 'none') {
    return 'none'
  }
  return percentToValue(source, multiplier)
}

export const parseFunctionColor = (source: string): FunctionColor => {
  const [functionName, ...params] = simpleCSSFunctionParser(source)

  try {
    switch (functionName) {
      case 'rgb':
      case 'rgba': {
        const [R, G, B, alpha] = params
        return {
          type: 'RGB',
          R: percentToValue(R, 2.55),
          G: percentToValue(G, 2.55),
          B: percentToValue(B, 2.55),
          alpha: alpha != null ? percentToValue(alpha, 0.01) : undefined,
          source,
        }
      }
      case 'hsl':
      case 'hsla': {
        const [H, S, L, alpha] = params
        return {
          type: 'HSL',
          H: noneOrDegree(H),
          S: noneOrNumber(S),
          L: noneOrNumber(L),
          alpha: alpha != null ? percentToNoneValue(alpha, 0.01) : undefined,
          source,
        }
      }
      case 'hwb': {
        const [H, W, B, alpha] = params
        return {
          type: 'HWB',
          H: noneOrDegree(H),
          W: noneOrNumber(W),
          B: noneOrNumber(B),
          alpha: alpha != null ? percentToNoneValue(alpha, 0.01) : undefined,
          source,
        }
      }
      case 'lab': {
        const [L, a, b, alpha] = params
        return {
          type: 'LAB',
          L: percentToNoneValue(L),
          a: percentToNoneValue(a, 1.25),
          b: percentToNoneValue(b, 1.25),
          alpha: alpha != null ? percentToNoneValue(alpha, 0.01) : undefined,
          source,
        }
      }
      case 'lch': {
        const [L, C, H, alpha] = params
        return {
          type: 'LCH',
          L: percentToNoneValue(L),
          C: percentToNoneValue(C, 1.5),
          H: noneOrDegree(H),
          alpha: alpha != null ? percentToNoneValue(alpha, 0.01) : undefined,
          source,
        }
      }
      case 'oklab': {
        const [L, a, b, alpha] = params
        return {
          type: 'Oklab',
          L: percentToNoneValue(L, 0.01),
          a: percentToNoneValue(a, 0.004),
          b: percentToNoneValue(b, 0.004),
          alpha: alpha != null ? percentToNoneValue(alpha, 0.01) : undefined,
          source,
        }
      }
      case 'oklch': {
        const [L, C, H, alpha] = params
        return {
          type: 'Oklch',
          L: percentToNoneValue(L, 0.01),
          C: percentToNoneValue(C, 0.004),
          H: noneOrDegree(H),
          alpha: alpha != null ? percentToNoneValue(alpha, 0.01) : undefined,
          source,
        }
      }
    }
  } catch (e) {
    /* empty */
  }

  return {
    type: 'UnknownColor',
    color: source,
  }
}

export const removeCSSComments = (source: string): string => {
  let start = source.indexOf('/*')
  while (start >= 0) {
    const end = source.indexOf('*/', start + 2)
    if (end < 0) {
      break
    }
    source = source.substring(0, start) + source.substring(end + 2, source.length)
    start = source.indexOf('/*')
  }

  return source
}

export const isLinearGradientWithAngle = (
  gradient: LinearGradient | null | undefined,
): gradient is LinearGradientWithAngle => gradient != null && 'angle' in gradient
export const isLinearGradientWithSideOrCorner = (
  gradient: LinearGradient | null | undefined,
): gradient is LinearGradientWithSideOrCorner => gradient != null && 'sideOrCorner' in gradient
export const isLinearGradientWithInterpolation = (
  gradient: LinearGradient | null | undefined,
): gradient is LinearGradientWithInterpolation => gradient != null && 'interpolation' in gradient
