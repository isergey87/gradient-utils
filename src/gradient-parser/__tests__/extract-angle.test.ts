import {extractAngle, extractSideOrCorner} from '../linear-gradient-parser'

const toDefaultAngle = (gradientWithoutAngle: string): ReturnType<typeof extractAngle> => ({
  angle: {
    unit: 'deg',
    degAngle: 180,
    sourceValue: '',
  },
  gradientWithoutAngle,
})

describe('extract angle', () => {
  test('empty angle', () => {
    expect(extractAngle('')).toEqual(toDefaultAngle(''))
    expect(extractAngle('red, blue')).toEqual(toDefaultAngle('red, blue'))
    expect(extractAngle(', red, blue')).toEqual(toDefaultAngle(', red, blue'))
  })
  test('deg', () => {
    expect(extractAngle('0, red, blue')).toEqual({
      angle: {unit: 'deg', degAngle: 0, sourceValue: '0'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('0deg, red, blue')).toEqual({
      angle: {unit: 'deg', degAngle: 0, sourceValue: '0deg'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('0    , red, blue')).toEqual({
      angle: {unit: 'deg', degAngle: 0, sourceValue: '0'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('0deg    , red, blue')).toEqual({
      angle: {unit: 'deg', degAngle: 0, sourceValue: '0deg'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('-1e1deg, red, blue')).toEqual({
      angle: {unit: 'deg', degAngle: -10, sourceValue: '-1e1deg'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('+5.3deg, red, blue')).toEqual({
      angle: {unit: 'deg', degAngle: 5.3, sourceValue: '+5.3deg'},
      gradientWithoutAngle: 'red, blue',
    })
  })
  test('turn', () => {
    expect(extractAngle('0turn, red, blue')).toEqual({
      angle: {unit: 'turn', degAngle: 0, sourceValue: '0turn'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('0turn    , red, blue')).toEqual({
      angle: {unit: 'turn', degAngle: 0, sourceValue: '0turn'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('-25e-2turn, red, blue')).toEqual({
      angle: {unit: 'turn', degAngle: -90, sourceValue: '-25e-2turn'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('+2turn, red, blue')).toEqual({
      angle: {unit: 'turn', degAngle: 720, sourceValue: '+2turn'},
      gradientWithoutAngle: 'red, blue',
    })
  })
  test('grad', () => {
    expect(extractAngle('0grad, red, blue')).toEqual({
      angle: {unit: 'grad', degAngle: 0, sourceValue: '0grad'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('0grad    , red, blue')).toEqual({
      angle: {unit: 'grad', degAngle: 0, sourceValue: '0grad'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('4e1grad, red, blue')).toEqual({
      angle: {unit: 'grad', degAngle: 36, sourceValue: '4e1grad'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('-1e2grad, red, blue')).toEqual({
      angle: {unit: 'grad', degAngle: -90, sourceValue: '-1e2grad'},
      gradientWithoutAngle: 'red, blue',
    })
  })
  test('rad', () => {
    expect(extractAngle('0rad, red, blue')).toEqual({
      angle: {unit: 'rad', degAngle: 0, sourceValue: '0rad'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('0rad    , red, blue')).toEqual({
      angle: {unit: 'rad', degAngle: 0, sourceValue: '0rad'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('1rad, red, blue')).toEqual({
      angle: {unit: 'rad', degAngle: 57.29577951308232, sourceValue: '1rad'},
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractAngle('-1e2rad, red, blue')).toEqual({
      angle: {unit: 'rad', degAngle: -5729.5779513082325, sourceValue: '-1e2rad'},
      gradientWithoutAngle: 'red, blue',
    })
  })
})

describe('side or corner', () => {
  test('empty', () => {
    expect(extractSideOrCorner('')).toBe(null)
    expect(extractSideOrCorner('red, blue')).toBe(null)
    expect(extractSideOrCorner(', red, blue')).toBe(null)
    expect(extractSideOrCorner('to top-left, red, blue')).toBe(null)
    expect(extractSideOrCorner('to top bottom, red, blue')).toBe(null)
    expect(extractSideOrCorner('to bottom top, red, blue')).toBe(null)
    expect(extractSideOrCorner('to right left, red, blue')).toBe(null)
    expect(extractSideOrCorner('to left right, red, blue')).toBe(null)
  })
  test('correct', () => {
    expect(extractSideOrCorner('to top, red, blue')).toEqual({
      top: true,
      bottom: false,
      left: false,
      right: false,
      sourceValue: 'to top',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to top left   , red, blue')).toEqual({
      top: true,
      bottom: false,
      left: true,
      right: false,
      sourceValue: 'to top left',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to     top     right   , red, blue')).toEqual({
      top: true,
      bottom: false,
      left: false,
      right: true,
      sourceValue: 'to     top     right',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to bottom, red, blue')).toEqual({
      top: false,
      bottom: true,
      left: false,
      right: false,
      sourceValue: 'to bottom',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to bottom left   , red, blue')).toEqual({
      top: false,
      bottom: true,
      left: true,
      right: false,
      sourceValue: 'to bottom left',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to     bottom     right   , red, blue')).toEqual({
      top: false,
      bottom: true,
      left: false,
      right: true,
      sourceValue: 'to     bottom     right',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to left, red, blue')).toEqual({
      top: false,
      bottom: false,
      left: true,
      right: false,
      sourceValue: 'to left',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to left top   , red, blue')).toEqual({
      top: true,
      bottom: false,
      left: true,
      right: false,
      sourceValue: 'to left top',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to     left     bottom   , red, blue')).toEqual({
      top: false,
      bottom: true,
      left: true,
      right: false,
      sourceValue: 'to     left     bottom',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to right, red, blue')).toEqual({
      top: false,
      bottom: false,
      left: false,
      right: true,
      sourceValue: 'to right',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to right top   , red, blue')).toEqual({
      top: true,
      bottom: false,
      left: false,
      right: true,
      sourceValue: 'to right top',
      gradientWithoutAngle: 'red, blue',
    })
    expect(extractSideOrCorner('to     right     bottom   , red, blue')).toEqual({
      top: false,
      bottom: true,
      left: false,
      right: true,
      sourceValue: 'to     right     bottom',
      gradientWithoutAngle: 'red, blue',
    })
  })
})
