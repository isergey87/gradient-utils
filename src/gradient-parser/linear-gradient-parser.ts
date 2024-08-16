import {
  AngleInfo,
  AngleUnit,
  ColorStop,
  LinearColorHint,
  LinearGradient,
  SideOrCorner,
} from './types'
import {
  angleToDeg,
  extractColor,
  extractStartComma,
  extractStartValueWithUnit,
  isAngleUnit,
  removeCSSComments,
  START_WITH_INTERPOLATION,
  START_WITH_SIDE_OR_CORNER_REGEX,
} from './utils'

const linearPrefix = 'linear-gradient('
const repeatingPrefix = 'repeating-linear-gradient('

export const parseLinearGradient = (gradient: string | null | undefined) =>
  linearGradientParser(gradient, linearPrefix)
export const parseRepeatingLinearGradient = (gradient: string | null | undefined) =>
  linearGradientParser(gradient, repeatingPrefix, true)

const linearGradientParser = (
  gradient: string | null | undefined,
  prefix: string,
  repeatable = false,
): LinearGradient | null => {
  if (!gradient) {
    return null
  }
  gradient = removeCSSComments(gradient).toLowerCase()
  //fix the casting toLowerCase. Otherwise, we can lose currentColor or should do insensitivity search every time
  gradient = gradient.replaceAll('currentcolor', 'currentColor')
  gradient = gradient.trim()
  if (!gradient.startsWith(prefix) || !gradient.endsWith(')')) {
    return null
  }
  gradient = gradient.substring(prefix.length, gradient.length - 1).trim()
  const extractAngleResult = extractAngle(gradient)
  if (!extractAngleResult) {
    return null
  }
  let linearGradient: LinearGradient
  if ('angle' in extractAngleResult) {
    linearGradient = {
      angle: extractAngleResult.angle,
      colorStops: [],
    }
  } else if ('sideOrCorner' in extractAngleResult) {
    linearGradient = {
      sideOrCorner: extractAngleResult.sideOrCorner,
      colorStops: [],
    }
  } else {
    linearGradient = {
      interpolation: extractAngleResult.interpolation,
      colorStops: [],
    }
  }

  gradient = extractAngleResult.gradientWithoutAngle
  const colorStops = parseColorStops(gradient)
  if (!colorStops) {
    return null
  }
  linearGradient.colorStops = colorStops
  if (repeatable) {
    linearGradient.repeatable = true
  }
  return linearGradient
}

export const extractAngle = (
  gradient: string,
):
  | ((
      | {
          angle: AngleInfo
        }
      | {
          sideOrCorner: SideOrCorner
        }
      | {
          interpolation: string
        }
    ) & {
      gradientWithoutAngle: string
    })
  | null => {
  const unit: AngleUnit = 'deg'
  let degAngle = 180
  let sourceValue = ''
  const angleUnit = extractStartValueWithUnit(gradient, unit)

  if (angleUnit && isAngleUnit(angleUnit.unit)) {
    degAngle = angleToDeg(angleUnit.value, angleUnit.unit)
    sourceValue = angleUnit.sourceValue
    const gradientWithoutAngle = extractStartComma(angleUnit.source)
    if (gradientWithoutAngle == null) {
      return null
    }
    return {
      angle: {
        unit: angleUnit.unit,
        degAngle,
        sourceValue,
      },
      gradientWithoutAngle,
    }
  }
  const sideOrCorner = extractSideOrCorner(gradient)
  if (sideOrCorner) {
    return {
      sideOrCorner: {
        top: sideOrCorner.top,
        bottom: sideOrCorner.bottom,
        left: sideOrCorner.left,
        right: sideOrCorner.right,
        sourceValue: sideOrCorner.sourceValue,
      },
      gradientWithoutAngle: sideOrCorner.gradientWithoutAngle,
    }
  }

  const interpolation = extractInterpolation(gradient)
  if (interpolation) {
    return interpolation
  }

  return {
    angle: {
      unit,
      degAngle,
      sourceValue,
    },
    gradientWithoutAngle: gradient,
  }
}

export const extractSideOrCorner = (
  source: string,
):
  | (SideOrCorner & {
      gradientWithoutAngle: string
    })
  | null => {
  const match = source.match(START_WITH_SIDE_OR_CORNER_REGEX)
  if (match) {
    const sourceValue = match[0]
    const top = sourceValue.includes('top')
    const bottom = sourceValue.includes('bottom')
    const left = sourceValue.includes('left')
    const right = sourceValue.includes('right')
    const gradientWithoutAngle = extractStartComma(source.substring(sourceValue.length))
    if (gradientWithoutAngle == null) {
      return null
    }
    return {
      top,
      bottom,
      left,
      right,
      sourceValue,
      gradientWithoutAngle,
    }
  }
  return null
}

export const extractInterpolation = (
  source: string,
): {
  interpolation: string
  gradientWithoutAngle: string
} | null => {
  const match = source.match(START_WITH_INTERPOLATION)
  if (match && match.groups) {
    return {
      interpolation: match.groups.interpolation,
      gradientWithoutAngle: source.substring(match[0].length).trim(),
    }
  }
  return null
}

const parseColorStop = (source: string): ColorStop | LinearColorHint | null => {
  let colorStop: ColorStop | LinearColorHint | null = null
  const colorResult = extractColor(source)
  if (colorResult) {
    source = colorResult.source
    colorStop = {
      color: colorResult.color,
      alpha: colorResult.alpha,
    }
  }
  let valueWithUnit = extractStartValueWithUnit(source)
  if (valueWithUnit) {
    source = valueWithUnit.source
    if (!colorStop && valueWithUnit.unit === '%') {
      colorStop = {
        value: valueWithUnit.value,
        unit: '%',
        sourceValue: valueWithUnit.sourceValue,
      }
    } else if (colorStop) {
      colorStop.start = {
        value: valueWithUnit.value,
        unit: valueWithUnit.unit,
        sourceValue: valueWithUnit.sourceValue,
      }
    }
  }
  valueWithUnit = extractStartValueWithUnit(source)
  if (valueWithUnit && colorStop && 'color' in colorStop) {
    colorStop.end = {
      value: valueWithUnit.value,
      unit: valueWithUnit.unit,
      sourceValue: valueWithUnit.sourceValue,
    }
  }

  return colorStop
}

export const parseColorStops = (source: string): (ColorStop | LinearColorHint)[] | null => {
  const result: (ColorStop | LinearColorHint)[] = []
  let i = 0
  let bracesCount = 0
  while (i < source.length) {
    if (source.charAt(i) === '(') {
      bracesCount++
    }
    if (source.charAt(i) === ')') {
      bracesCount--
    }
    const comma = source.charAt(i) === ','

    if ((comma || i === source.length - 1) && bracesCount === 0) {
      const colorStop = parseColorStop(source.substring(0, comma ? i : i + 1).trim())
      if (colorStop === null) {
        return null
      }
      result.push(colorStop)
      source = source.substring(i + 1, source.length).trim()
      i = 0
    }
    i++
  }
  return result
}
