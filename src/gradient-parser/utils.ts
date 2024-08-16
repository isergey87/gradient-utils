/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  AngleUnit,
  LinearGradient,
  LinearGradientWithAngle,
  LinearGradientWithInterpolation,
  LinearGradientWithSideOrCorner,
} from './types'

export const NUMBER_REGEX =
  /[+-]?(?:[0-9]+(?:[.][0-9]+)?(?:[eE][+-]?[0-9]+)?|[.][0-9]+(?:[eE][+-]?[0-9]+)?)/
export const START_WITH_NUMBER_REGEX = new RegExp(`^${NUMBER_REGEX.source}`)
export const DELIMITER_REGEX = /(^$)|(^\W)/
export const UNIT_REGEX = /^(?<unit>[a-z]+|%)(?:$|[/s,); ])/

export const START_WITH_SIDE_OR_CORNER_REGEX =
  /^to\s+(?:(?:left|right)(?:\s+(?:top|bottom))?|(?:top|bottom)(?:\s+(?:right|left))?)/

export const START_WITH_INTERPOLATION = /^in\s+(?<interpolation>[a-z][^,]+),/

export const START_WITH_FUNCTION_REGEX = /^[a-z][a-z0-9-]+\(/

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
      source: source.substring(i).trim(),
    }
  }
  return null
}

export const extractStartWithHex = (
  source: string,
): {
  color: string
  alpha?: number
  source: string
} | null => {
  const match = source.match(START_HEX_REGEX)
  if (match && match.groups) {
    const alphaHex = match.groups.longA
      ? match.groups.longA
      : match.groups.shortA
        ? match.groups.shortA.repeat(2)
        : null
    const alpha = alphaHex ? parseInt(alphaHex, 16) / 255 : undefined
    const color = '#' + (match.groups.short || match.groups.long)

    return {
      color,
      alpha,
      source: source.substring(match.groups.color.length).trim(),
    }
  }
  return null
}
export const extractStartNamedColor = (
  source: string,
): {
  color: string
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

export const extractColor = (
  source: string,
): {
  color: string
  alpha?: number
  source: string
} | null => {
  const hexResult = extractStartWithHex(source)
  if (hexResult) {
    return hexResult
  }
  const functionResult = extractStartWithFunction(source)
  if (functionResult) {
    return {
      color: functionResult.function,
      source: functionResult.source,
    }
  }
  const colorResult = extractStartNamedColor(source)
  if (colorResult) {
    return colorResult
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
