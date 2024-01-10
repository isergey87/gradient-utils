import {ColorStop, LinearColorHint} from '../gradient-parser'
import {SVGColorStop} from './types'
import {ColorStops} from '../../dist/gradient-parser'

const R = 360

/**
 * @param angle - deg angle
 * @param aspectRatio - width : height
 * @param start - first stop color offset in percent
 * @param end - last stop color offset in percent
 */
export const svgAngle = (
  angle: number,
  aspectRatio: number,
  start: number,
  end: number,
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

  angle = ((angle % R) + R) % R
  const width = 300
  const height = width / aspectRatio
  const radAngle = (angle * Math.PI) / 180

  const DE = (0.5 * width - 0.5 * height * Math.tan(radAngle)) * Math.cos(radAngle)
  const DF = DE * Math.sin(radAngle)
  const DG = DE * Math.cos(radAngle)

  let x1 = DG
  let y1 = height + DF

  let x2 = width - DG
  let y2 = -DF

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

export const svgColorStops = (
  colorStops: (ColorStop | LinearColorHint)[],
): SVGColorStop[] | null => {
  let result: SVGColorStop[] = []
  let undefinedIndex = -1
  let definedOffset: undefined | number
  let undefinedFound = false
  let resultIndex = 0
  for (let i = 0; i < colorStops.length; i++) {
    const colorStop = checkSupportColorStop(colorStops[i])
    if (!colorStop) {
      return null
    }
    const svgColor = getSvgColor(colorStop)
    if (!svgColor) {
      return null
    }
    let offset = colorStop.start?.value
    const {color: stopColor, alpha: stopOpacity} = svgColor
    if (offset == null) {
      if (i === 0) {
        offset = 0
      } else if (i === colorStops.length - 1) {
        offset = 100
      } else {
        undefinedFound = true
        undefinedIndex = resultIndex
      }
    }
    if (colorStop.start) {
      if (undefinedFound) {
        fillEqualOffset(result, undefinedIndex, colorStop.start.value)
        undefinedFound = false
      }
    }
    result.push({
      stopColor,
      stopOpacity,
      offset,
    })
    resultIndex++
    if (colorStop.end) {
      result.push({
        stopColor,
        stopOpacity,
        offset: colorStop.end.value,
      })
      resultIndex++
    }
  }
  if (undefinedFound) {
    fillEqualOffset(result, undefinedIndex, 100)
  }

  return result
}

const fillEqualOffset = (colorStops: SVGColorStop[], from: number, toOffset: number) => {
  const prevOffset = from > 0 ? colorStops[from - 1].offset || 0 : 0
  const leftSpace = Math.max(toOffset - prevOffset, 0)
  const items = colorStops.length - from || 1
  const length = leftSpace / items

  for (let i = from; i < colorStops.length; i++) {
    colorStops[i].offset = (colorStops[i - 1].offset || 0) + length
  }
}

export const checkSupportColorStop = (colorStop: ColorStop | LinearColorHint | undefined): ColorStop | null => {
  if (!colorStop) {
    console.warn("should be at least two color stops")
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
  return colorStop
}

const getSvgColor = (colorStop: ColorStop): {color: string; alpha: number | undefined} | null => {
  let color = ''
  let alpha: number | undefined

  if (typeof colorStop.color === 'string') {
    color = colorStop.color
  } else {
    switch (colorStop.color.type) {
      case 'HEX':
      case 'RGB': {
        color = `rgb(${colorStop.color.R},${colorStop.color.G},${colorStop.color.B})`
        break
      }
      case 'HSL': {
        color = `hsl(${colorStop.color.H},${colorStop.color.S}%,${colorStop.color.L}%)`
        break
      }

      default: {
        console.warn(`unsupported color ${JSON.stringify(colorStop.color)}`)
        return null
      }
    }
    if (colorStop.color.alpha != null && typeof colorStop.color.alpha === 'number') {
      alpha = colorStop.color.alpha
    }
  }
  return {
    color,
    alpha,
  }
}

const isColorStop = (colorStop: ColorStop | LinearColorHint): colorStop is ColorStop =>
  'color' in colorStop
