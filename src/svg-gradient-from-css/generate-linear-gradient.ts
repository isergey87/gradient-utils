import {convertLinearGradient, SVGLinearGradient} from '../convert-css-gradient-to-svg'
import {parseLinearGradient} from '../gradient-parser'

export const generateLinearGradient = (
  gradient: string,
  aspectRatio: number,
): SVGLinearGradient | null => {
  const cssGradient = parseLinearGradient(gradient)
  if (cssGradient) {
    return convertLinearGradient(cssGradient, aspectRatio)
  }
  return null
}
