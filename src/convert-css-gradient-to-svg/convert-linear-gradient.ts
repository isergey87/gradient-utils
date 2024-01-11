import {
  CSSColor,
  isLinearGradientWithAngle,
  isLinearGradientWithInterpolation,
  LinearGradient,
} from '../gradient-parser'
import {SVGLinearGradient} from './types'
import {getSvgColor, prepareColorStops, svgAngle, svgColorStops} from './utils'

const radToDeg = (rad: number) => rad * (180 / Math.PI)

export const convertLinearGradient = (
  cssGradient: LinearGradient,
  aspectRatio: number,
  cssToSvgColor: (cssColor: CSSColor) => {
    color: string
    alpha: number | undefined
  } | null = getSvgColor,
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

  const prepareResult = prepareColorStops(cssGradient.colorStops)
  if (!prepareResult) {
    return null
  }

  const {colorStops: rawColorStops, start, end} = prepareResult

  const result: SVGLinearGradient = {
    ...svgAngle(degAngle, aspectRatio, start, end),
    colorStops: [],
  }

  const colorStops = svgColorStops(rawColorStops, cssToSvgColor, start, end)
  if (colorStops === null) {
    console.warn("Can't get color stops")
    return null
  }
  result.colorStops = colorStops
  return result
}
