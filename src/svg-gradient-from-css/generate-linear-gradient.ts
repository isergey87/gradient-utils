import {convertLinearGradient, getSvgColor, SVGLinearGradient} from '../convert-css-gradient-to-svg'
import {CSSColor, parseLinearGradient} from '../gradient-parser'

export const generateLinearGradient = (
  gradient: string,
  aspectRatio: number,
  cssToSvgColor: (cssColor: CSSColor) => {
    color: string
    alpha: number | undefined
  } | null = getSvgColor,
): SVGLinearGradient | null => {
  const cssGradient = parseLinearGradient(gradient)
  if (cssGradient) {
    return convertLinearGradient(cssGradient, aspectRatio, cssToSvgColor)
  }
  return null
}
