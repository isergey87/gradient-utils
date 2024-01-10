import {
  ColorStop,
  isLinearGradientWithAngle,
  isLinearGradientWithInterpolation,
  LinearGradient,
} from '../gradient-parser'
import {SVGLinearGradient} from './types'
import {checkSupportColorStop, svgAngle, svgColorStops} from './utils'

const radToDeg = (rad: number) => rad * (180 / Math.PI)

export const convertLinearGradient = (
  cssGradient: LinearGradient,
  aspectRatio: number,
): SVGLinearGradient | null => {
  if (cssGradient.repeatable) {
    console.warn("don't support repeatable gradient")
    return null
  }
  if (isLinearGradientWithInterpolation(cssGradient)) {
    console.warn("don't support gradient with interpolation")
    return null
  }
  let degAngle: number
  if (isLinearGradientWithAngle(cssGradient)) {
    degAngle = cssGradient.angle.degAngle
  } else {
    const {top, bottom, left, right} = cssGradient.sideOrCorner
    if (top) {
      if (left) {
        //to top left
        degAngle = 270 + radToDeg(Math.atan(aspectRatio))
      } else if (right) {
        //to top right
        degAngle = 90 - radToDeg(Math.atan(aspectRatio))
      } else {
        //to top
        degAngle = 0
      }
    } else if (bottom) {
      if (left) {
        //to bottom left
        degAngle = 270 - radToDeg(Math.atan(aspectRatio))
      } else if (right) {
        //to bottom right
        degAngle = 90 + radToDeg(Math.atan(aspectRatio))
      } else {
        //to bottom
        degAngle = 180
      }
    } else if (left) {
      //to left
      degAngle = 270
    } else {
      //to right
      degAngle = 90
    }
  }

  const start = checkSupportColorStop(cssGradient.colorStops[0])
  if (!start) {
    return null
  }
  const end = checkSupportColorStop(cssGradient.colorStops[cssGradient.colorStops.length - 1])
  if (!end) {
    return null
  }
  const result: SVGLinearGradient = {
    ...svgAngle(
      degAngle,
      aspectRatio,
      start.start?.value ?? 0,
      end.end?.value ?? end.start?.value ?? 100,
    ),
    colorStops: [],
  }

  const colorStops = svgColorStops(cssGradient.colorStops)
  if (colorStops === null) {
    console.warn("Can't get color stops")
    return null
  }
  result.colorStops = colorStops
  return result
}
