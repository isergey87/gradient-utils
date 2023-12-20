const R = 360
export const svgAngle = (
  angle: number,
  aspectRatio: number
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

  const width = 1
  const height = width / aspectRatio

  const rotatedAngle = 90 - angle
  const widthCenter = width / 2
  const heightCenter = height / 2
  const acuteAngle = ((rotatedAngle % R) + R) % R
  const radAngle = ((R - acuteAngle) * Math.PI) / 180
  const tangent = Math.tan(radAngle)
  let tx1: number | undefined
  let ty1: number | undefined
  let tx2: number | undefined
  let ty2: number | undefined
  const l = heightCenter - tangent * widthCenter
  let n = 0
  let o = 0
  if (acuteAngle === 0) {
    tx1 = width
    ty1 = heightCenter
    tx2 = 0
    ty2 = heightCenter
  } else if (acuteAngle < 90 || acuteAngle > 270) {
    n = width
  } else if (acuteAngle === 90) {
    tx1 = widthCenter
    ty1 = 0
    tx2 = widthCenter
    ty2 = height
  } else if (acuteAngle === 180) {
    tx1 = 0
    ty1 = heightCenter
    tx2 = width
    ty2 = heightCenter
  } else if (acuteAngle === 270) {
    tx1 = widthCenter
    ty1 = height
    tx2 = widthCenter
    ty2 = 0
  }
  if (acuteAngle > 180) {
    o = height
  }
  const m = o + n / tangent
  tx1 = tx1 == null ? (tangent * (m - l)) / (Math.pow(tangent, 2) + 1) : tx1
  ty1 = ty1 == null ? tangent * tx1 + l : ty1
  tx2 = tx2 == null ? width - tx1 : tx2
  ty2 = ty2 == null ? height - ty1 : ty2
  return {
    x1: (tx2 * 100) / width + '%',
    y1: (ty2 * 100) / height + '%',
    x2: (tx1 * 100) / width + '%',
    y2: (ty1 * 100) / height + '%',
  }
}
