import {ColorStop, CSSColor, LinearColorHint} from '../gradient-parser'
import {SVGColorStop} from './types'

const R = 360

/**
 * @param angle - deg angle
 * @param aspectRatio - width : height
 * @param start - first stop color offset in percent
 * @param end - last stop color offset in percent
 *
 * The SVG stop color offset cannot be less than 0 or greater than 100.
 * (x1; y1) point takes into account the start offset
 * (x2; y2) point takes into account the end offset
 * Therefore, the converted color offsets must be on a scale from 0 to 100.
 */
export const svgAngle = (
  angle: number,
  aspectRatio: number,
  start: number = 0,
  end: number = 100,
): {
  x1: string
  y1: string
  x2: string
  y2: string
} => {
  if (aspectRatio === 0 || !Number.isFinite(aspectRatio)) {
    return {
      x1: '0%',
      y1: '0%',
      x2: '0%',
      y2: '0%',
    }
  }

  start = start / 100
  end = end / 100

  if (end === start) {
    end = start + 0.000001
  }

  angle = ((angle % R) + R) % R
  const width = 300
  const height = width / aspectRatio
  const topQuadrant = angle > 90 && angle < 270
  const rightQuadrant = angle > 180 && angle < 360

  if (angle > 90 && angle < 180) {
    angle = angle - 90
  } else if (angle > 180 && angle < 270) {
    angle = angle - 180
  } else if (angle > 270 && angle < 360) {
    angle = angle - 270
  }

  const radAngle = (angle * Math.PI) / 180
  const DE = (0.5 * width - 0.5 * height * Math.tan(radAngle)) * Math.cos(radAngle)
  const DF = DE * Math.sin(radAngle)
  const DG = DE * Math.cos(radAngle)

  const x1 = rightQuadrant ? width - DG : DG
  const y1 = topQuadrant ? -DF : height + DF

  const x2 = rightQuadrant ? DG : width - DG
  const y2 = topQuadrant ? height + DF : -DF

  let xs
  let ys
  let xe
  let ye

  if (start !== 0) {
    if (start > 0) {
      const k = start
      xs = x1 + k * (x2 - x1)
      ys = y1 + k * (y2 - y1)
    } else {
      const k = 1 - start
      xs = x2 + k * (x1 - x2)
      ys = y2 + k * (y1 - y2)
    }
  } else {
    xs = x1
    ys = y1
  }

  if (end !== 0) {
    if (end > 1) {
      const k = end
      xe = x1 + k * (x2 - x1)
      ye = y1 + k * (y2 - y1)
    } else {
      const k = 1 - end
      xe = x2 + k * (x1 - x2)
      ye = y2 + k * (y1 - y2)
    }
  } else {
    xe = x2
    ye = y2
  }

  return {
    x1: `${(xs * 100) / width}%`,
    y1: `${(ys * 100) / height}%`,
    x2: `${(xe * 100) / width}%`,
    y2: `${(ye * 100) / height}%`,
  }
}

export const prepareColorStops = (
  colorStops: (ColorStop | LinearColorHint)[],
): {colorStops: ColorStop[]; start: number; end: number} | null => {
  const preparedColorStops: ColorStop[] = []
  let start = 0
  let end = 100
  let min = 0
  for (let i = 0; i < colorStops.length; i++) {
    const colorStop = checkSupportColorStop(colorStops[i])
    if (!colorStop) {
      return null
    }
    if (i === 0) {
      if (!colorStop.start) {
        colorStop.start = {
          value: 0,
          unit: '%',
          sourceValue: '',
        }
      }
      min = colorStop.start.value
      start = colorStop.start.value
    } else if (colorStop.start) {
      if (colorStop.start.value < min) {
        colorStop.start.value = min
      } else {
        min = colorStop.start.value
      }
      if (colorStop.end && colorStop.end.value < colorStop.start.value) {
        colorStop.end = undefined
      }
    }

    if (i === colorStops.length - 1) {
      if (!colorStop.start) {
        colorStop.start = {
          value: Math.max(min, 100),
          unit: '%',
          sourceValue: '',
        }
      }
      colorStop.end = undefined
      end = colorStop.start.value
    }
    preparedColorStops.push(colorStop)
  }
  return {
    colorStops: preparedColorStops,
    start,
    end,
  }
}

export const svgColorStops = (
  colorStops: ColorStop[],
  cssToSvgColor: (cssColor: CSSColor) => {
    color: string
    alpha: number | undefined
  } | null,
  start: number = 0,
  end: number = 100,
): SVGColorStop[] | null => {
  const offset = -start
  const multiplier = start === end ? 1 : 100 / Math.abs(end - start)

  const result: SVGColorStop[] = []
  let undefinedIndex = -1
  let undefinedFound = false
  let resultIndex = 0
  for (let i = 0; i < colorStops.length; i++) {
    const colorStop = colorStops[i]
    const svgColor = cssToSvgColor(colorStop.color)
    if (!svgColor) {
      return null
    }
    const {color: stopColor, alpha: stopOpacity} = svgColor
    const cssOffset = colorStop.start?.value
    if (cssOffset != null) {
      const svgOffset = (cssOffset + offset) * multiplier
      if (undefinedFound) {
        fillEqualOffset(result, undefinedIndex, svgOffset)
        undefinedFound = false
      }
      result.push({
        stopColor,
        stopOpacity,
        offset: svgOffset,
      })
    } else {
      result.push({
        stopColor,
        stopOpacity,
        offset: undefined,
      })
      if (!undefinedFound) {
        undefinedFound = true
        undefinedIndex = resultIndex
      }
    }
    resultIndex++
    if (colorStop.end) {
      result.push({
        stopColor,
        stopOpacity,
        offset: (colorStop.end.value + offset) * multiplier,
      })
      resultIndex++
    }
  }
  return result
}

const fillEqualOffset = (colorStops: SVGColorStop[], from: number, toOffset: number) => {
  const prevOffset = colorStops[from - 1]?.offset ?? 0
  const leftSpace = toOffset - prevOffset
  const items = colorStops.length - from + 1
  const length = leftSpace / items

  for (let i = from; i < colorStops.length; i++) {
    colorStops[i].offset = (colorStops[i - 1].offset || 0) + length
  }
}

export const checkSupportColorStop = (
  colorStop: ColorStop | LinearColorHint | undefined,
): ColorStop | null => {
  if (!colorStop) {
    console.warn('should be at least two color stops')
    return null
  }
  if (!isColorStop(colorStop)) {
    console.warn("don't support ColorHint")
    return null
  }
  if (colorStop.start && colorStop.start.unit !== '%' && colorStop.start.unit !== '') {
    console.warn(`unsupported offset unit ${colorStop.start.unit} (${colorStop.start.sourceValue})`)
    return null
  }
  if (colorStop.end && colorStop.end.unit !== '%' && colorStop.end.unit !== '') {
    console.warn(`unsupported offset end unit ${colorStop.end.unit} (${colorStop.end.sourceValue})`)
    return null
  }
  return {...colorStop}
}

export const getSvgColor = (
  cssColor: CSSColor,
): {
  color: string
  alpha: number | undefined
} | null => {
  let color = ''
  let alpha: number | undefined

  if (typeof cssColor === 'string') {
    color = cssColor
  } else {
    switch (cssColor.type) {
      case 'HEX':
      case 'RGB': {
        color = `rgb(${cssColor.R},${cssColor.G},${cssColor.B})`
        break
      }
      case 'HSL': {
        color = `hsl(${cssColor.H},${cssColor.S}%,${cssColor.L}%)`
        break
      }

      default: {
        console.warn(`unsupported color ${JSON.stringify(cssColor)}`)
        return null
      }
    }
    if (cssColor.alpha != null && typeof cssColor.alpha === 'number') {
      alpha = cssColor.alpha
    }
  }
  return {
    color,
    alpha,
  }
}

const isColorStop = (colorStop: ColorStop | LinearColorHint): colorStop is ColorStop =>
  'color' in colorStop
