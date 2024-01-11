import {convertLinearGradient, SVGLinearGradient} from '../convert-css-gradient-to-svg'
import {getSvgColor} from '../convert-css-gradient-to-svg/utils'
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
