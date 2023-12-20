/* eslint-disable @typescript-eslint/no-magic-numbers */
import {HSL, HWB, LAB, LCH, Oklab, Oklch, RGB} from '../types'
import {parseFunctionColor} from '../utils'

const toRGB = (source: string, withAlpha = false): RGB => ({
  type: 'RGB',
  R: 1,
  G: 25.5,
  B: 0.51,
  alpha: withAlpha ? 0.5 : undefined,
  source,
})

describe('parseFunctionColor RGB', () => {
  let source = ''
  test('legacy RGB - normal; number', () => {
    source = 'rgb(1, 2.55e1, 51e-2)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgb(1, 2.55e1, 51e-2, 0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(1, 2.55e1, 51e-2, 50%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('legacy RGB - spaces; number', () => {
    source = 'rgb(   1  ,  2.55e1  ,  51e-2   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgb(   1  ,  2.55e1  ,  51e-2, 0.5   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(   1  ,  2.55e1  ,  51e-2  , 50%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('legacy RGB - shrink; number', () => {
    source = 'rgb(1,2.55e1,51e-2)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgb(1,2.55e1,51e-2,0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(1,2.55e1,51e-2,50%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('legacy RGBA - normal; number', () => {
    source = 'rgba(1, 2.55e1, 51e-2)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgba(1, 2.55e1, 51e-2, 0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(1, 2.55e1, 51e-2, 50%)'
  })
  test('legacy RGBA - spaces; number', () => {
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(   1  ,  2.55e1  ,  51e-2   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgba(   1  ,  2.55e1  ,  51e-2, 0.5   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(   1  ,  2.55e1  ,  51e-2  , 50%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('legacy RGBA - shrink; number', () => {
    source = 'rgba(1,2.55e1,51e-2)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgba(1,2.55e1,51e-2,0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(1,2.55e1,51e-2,50%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('RGB - normal; number', () => {
    source = 'rgb(1 2.55e1 51e-2)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgb(1 2.55e1 51e-2 / 0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(1 2.55e1 51e-2 / 50%)'
  })
  test('RGB - spaces; number', () => {
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(   1        2.55e1     51e-2   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgb(   1        2.55e1     51e-2/0.5   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(   1        2.55e1     51e-2/50%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('RGBA - normal; number', () => {
    source = 'rgba(1 2.55e1 51e-2)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgba(1 2.55e1 51e-2 / 0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(1 2.55e1 51e-2 / 50%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('RGBA - spaces; number', () => {
    source = 'rgba(   1        2.55e1     51e-2   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgba(   1        2.55e1     51e-2/0.5   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(   1        2.55e1     51e-2/50%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('legacy RGB - normal; percent', () => {
    source = 'rgb(1, 1e1%, 20e-2%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgb(1, 1e1%, 20e-2%, 0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(1, 1e1%, 20e-2%, 50%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('legacy RGB - spaces; percent', () => {
    source = 'rgb(   1  ,  1e1%  ,  20e-2%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgb(   1  ,  1e1%  ,  20e-2%, 0.5   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(   1  ,  1e1%  ,  20e-2%  , 50%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('legacy RGB - shrink; percent', () => {
    source = 'rgb(1,1e1%,20e-2%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgb(1,1e1%,20e-2%,0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(1,1e1%,20e-2%,50%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('legacy RGBA - normal; percent', () => {
    source = 'rgba(1, 1e1%, 20e-2%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgba(1, 1e1%, 20e-2%, 0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(1, 1e1%, 20e-2%, 50%)'
  })
  test('legacy RGBA - spaces; percent', () => {
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(   1  ,  1e1%  ,  20e-2%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgba(   1  ,  1e1%  ,  20e-2%, 0.5   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(   1  ,  1e1%  ,  20e-2%  , 50%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('legacy RGBA - shrink; percent', () => {
    source = 'rgba(1,1e1%,20e-2%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgba(1,1e1%,20e-2%,0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(1,1e1%,20e-2%,50%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('RGB - normal; percent', () => {
    source = 'rgb(1 1e1% 20e-2%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgb(1 1e1% 20e-2% / 0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(1 1e1% 20e-2% / 50%)'
  })
  test('RGB - spaces; percent', () => {
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(   1        1e1%     20e-2%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgb(   1        1e1%     20e-2%   /   0.5   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgb(   1        1e1%     20e-2%   /   50%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('RGBA - normal; percent', () => {
    source = 'rgba(1 1e1% 20e-2%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgba(1 1e1% 20e-2% / 0.5)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(1 1e1% 20e-2% / 50%)'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
  test('RGBA - spaces; percent', () => {
    source = 'rgba(   1        1e1%     20e-2%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source))
    source = 'rgba(   1        1e1%     20e-2%   /   0.5   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
    source = 'rgba(   1        1e1%     20e-2%   /   50%   )'
    expect(parseFunctionColor(source)).toEqual(toRGB(source, true))
  })
})

const toHSL = (
  source: string,
  {H = 90, S = 20, L = 0.3, alpha = undefined}: Partial<HSL> = {},
): HSL => ({
  type: 'HSL',
  H,
  S,
  L,
  alpha,
  source,
})

describe('parseFunctionColor HSL', () => {
  let source = ''
  test('legacy HSL - normal', () => {
    source = 'hsl(90, 2e1%, 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsl(90, 2e1%, 30e-2%, 0.5)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsl(90, 2e1%, 30e-2%, 50%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsl(none, 2e1%, 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {H: 'none'}))
    source = 'hsl(90, none, 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {S: 'none'}))
    source = 'hsl(90, 2e1%, none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {L: 'none'}))
    source = 'hsl(90, 2e1%, 30e-2%, none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 'none'}))
    source = 'hsl(90deg, 2e1%, 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsl(0.25turn, 2e1%, 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsl(${Math.PI / 2}rad, 2e1%, 30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsl(100grad, 2e1%, 30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
  })
  test('legacy HSL - spaces', () => {
    source = 'hsl(   90  ,  2e1%  ,  30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsl(   90  ,  2e1%  ,  30e-2%  ,  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsl(   90  ,  2e1%  ,  30e-2%  ,  50%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsl(   none  ,  2e1%  ,  30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {H: 'none'}))
    source = 'hsl(   90  ,  none  ,  30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {S: 'none'}))
    source = 'hsl(   90  ,  2e1%  ,  none  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {L: 'none'}))
    source = 'hsl(   90  ,  2e1%  ,  30e-2%  ,  none  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 'none'}))
    source = 'hsl(   90deg  ,  2e1%  ,  30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsl(   0.25turn  ,  2e1%  ,  30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsl(   ${Math.PI / 2}rad  ,  2e1%  ,  30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsl(   100grad  ,  2e1%  ,  30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
  })
  test('legacy HSL - shrink', () => {
    source = 'hsl(90,2e1%,30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsl(90,2e1%,30e-2%,0.5)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsl(90,2e1%,30e-2%,50%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsl(none,2e1%,30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {H: 'none'}))
    source = 'hsl(90,none,30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {S: 'none'}))
    source = 'hsl(90,2e1%,none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {L: 'none'}))
    source = 'hsl(90,2e1%,30e-2%,none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 'none'}))
    source = 'hsl(90deg,2e1%,30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsl(0.25turn,2e1%,30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsl(${Math.PI / 2}rad,2e1%,30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsl(100grad,2e1%,30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
  })
  test('legacy HSLA - normal', () => {
    source = 'hsla(90, 2e1%, 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsla(none, 2e1%, 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {H: 'none'}))
    source = 'hsla(90, none, 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {S: 'none'}))
    source = 'hsla(90, 2e1%, none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {L: 'none'}))
    source = 'hsla(90, 2e1%, 30e-2%, none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 'none'}))
    source = 'hsla(90deg, 2e1%, 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsla(0.25turn, 2e1%, 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsla(${Math.PI / 2}rad, 2e1%, 30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsla(100grad, 2e1%, 30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
  })
  test('legacy HSLA - spaces', () => {
    source = 'hsla(   90  ,  2e1%  ,  30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsla(   none  ,  2e1%  ,  30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {H: 'none'}))
    source = 'hsla(   90  ,  none  ,  30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {S: 'none'}))
    source = 'hsla(   90  ,  2e1%  ,  none  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {L: 'none'}))
    source = 'hsla(   90  ,  2e1%  ,  30e-2%  ,  none  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 'none'}))
    source = 'hsla(   90deg  ,  2e1%  ,  30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsla(   0.25turn  ,  2e1%  ,  30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsla(   ${Math.PI / 2}rad  ,  2e1%  ,  30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsla(   100grad  ,  2e1%  ,  30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
  })
  test('legacy HSLA - shrink', () => {
    source = 'hsla(90,2e1%,30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsla(none,2e1%,30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {H: 'none'}))
    source = 'hsla(90,none,30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {S: 'none'}))
    source = 'hsla(90,2e1%,none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {L: 'none'}))
    source = 'hsla(90,2e1%,30e-2%,none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 'none'}))
    source = 'hsla(90deg,2e1%,30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsla(0.25turn,2e1%,30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsla(${Math.PI / 2}rad,2e1%,30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsla(100grad,2e1%,30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
  })
  test('HSL - normal', () => {
    source = 'hsl(90 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsl(90 2e1% 30e-2%/0.5)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsl(90 2e1% 30e-2%/50%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsl(none 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {H: 'none'}))
    source = 'hsl(90 none 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {S: 'none'}))
    source = 'hsl(90 2e1% none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {L: 'none'}))
    source = 'hsl(90 2e1% 30e-2%/none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 'none'}))
    source = 'hsl(90deg 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsl(0.25turn 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsl(${Math.PI / 2}rad 2e1% 30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsl(100grad 2e1% 30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
  })
  test('HSL - spaces', () => {
    source = 'hsl(   90   2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsl(   90    2e1%   30e-2%  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsl(   90   2e1%   30e-2%  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsl(   none    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {H: 'none'}))
    source = 'hsl(   90    none    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {S: 'none'}))
    source = 'hsl(   90    2e1%     /  none  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {L: 'none'}))
    source = 'hsl(   90    2e1%    30e-2%    none  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 'none'}))
    source = 'hsl(   90deg    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsl(   0.25turn    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsl(   ${Math.PI / 2}rad    2e1%    30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsl(   100grad    2e1%    30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
  })
  test('HSLA - normal', () => {
    source = 'hsla(90 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsla(90 2e1% 30e-2%/0.5)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsla(90 2e1% 30e-2%/50%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsla(none 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {H: 'none'}))
    source = 'hsla(90 none 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {S: 'none'}))
    source = 'hsla(90 2e1% none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {L: 'none'}))
    source = 'hsla(90 2e1% 30e-2% / none)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 'none'}))
    source = 'hsla(90deg 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsla(0.25turn 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsla(${Math.PI / 2}rad 2e1% 30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsla(100grad 2e1% 30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
  })
  test('HSLA - spaces', () => {
    source = 'hsla(   90    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsla(   90    2e1%   30e-2%  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsla(   90   2e1%   30e-2%  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 0.5}))
    source = 'hsla(   none    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {H: 'none'}))
    source = 'hsla(   90    none    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {S: 'none'}))
    source = 'hsla(   90    2e1%    none  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {L: 'none'}))
    source = 'hsla(   90    2e1%    30e-2%    /    none  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source, {alpha: 'none'}))
    source = 'hsla(   90deg    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = 'hsla(   0.25turn    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsla(   ${Math.PI / 2}rad    2e1%    30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
    source = `hsla(   100grad    2e1%    30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHSL(source))
  })
})

const toHWB = (
  source: string,
  {H = 90, W = 20, B = 0.3, alpha = undefined}: Partial<HWB> = {},
): HWB => ({
  type: 'HWB',
  H,
  W,
  B,
  alpha,
  source,
})

describe('parseFunctionColor HWB', () => {
  let source = ''
  test('HWB - normal', () => {
    source = 'hwb(90 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHWB(source))
    source = 'hwb(90 2e1% 30e-2%/0.5)'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {alpha: 0.5}))
    source = 'hwb(90 2e1% 30e-2%/50%)'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {alpha: 0.5}))
    source = 'hwb(none 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {H: 'none'}))
    source = 'hwb(90 none 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {W: 'none'}))
    source = 'hwb(90 2e1% none)'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {B: 'none'}))
    source = 'hwb(90 2e1% 30e-2%/none)'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {alpha: 'none'}))
    source = 'hwb(90deg 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHWB(source))
    source = 'hwb(0.25turn 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toHWB(source))
    source = `hwb(${Math.PI / 2}rad 2e1% 30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHWB(source))
    source = `hwb(100grad 2e1% 30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHWB(source))
  })
  test('HWB - spaces', () => {
    source = 'hwb(  90   2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHWB(source))
    source = 'hwb(  90    2e1%   30e-2%  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {alpha: 0.5}))
    source = 'hwb(  90   2e1%   30e-2%  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {alpha: 0.5}))
    source = 'hwb(  none    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {H: 'none'}))
    source = 'hwb(  90    none    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {W: 'none'}))
    source = 'hwb(  90    2e1%     none  )'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {B: 'none'}))
    source = 'hwb(  90    2e1%    30e-2%  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toHWB(source, {alpha: 'none'}))
    source = 'hwb(  90deg    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHWB(source))
    source = 'hwb(  0.25turn    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toHWB(source))
    source = `hwb(  ${Math.PI / 2}rad    2e1%    30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHWB(source))
    source = `hwb(  100grad    2e1%    30e-2%)`
    expect(parseFunctionColor(source)).toEqual(toHWB(source))
  })
})

const toLAB = (
  source: string,
  {L = 90, a = 25, b = 0.375, alpha = undefined}: Partial<LAB> = {},
): LAB => ({
  type: 'LAB',
  L,
  a,
  b,
  alpha,
  source,
})

describe('parseFunctionColor LAB', () => {
  let source = ''
  test('LAB - normal; percent', () => {
    source = 'lab(90 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source))
    source = 'lab(90 2e1% 30e-2%/0.5)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 0.5}))
    source = 'lab(90 2e1% 30e-2%/50%)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 0.5}))
    source = 'lab(none 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {L: 'none'}))
    source = 'lab(90 none 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {a: 'none'}))
    source = 'lab(90 2e1% none)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {b: 'none'}))
    source = 'lab(90 2e1% 30e-2%/none)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 'none'}))
  })
  test('LAB - spaces; percent', () => {
    source = 'lab(  90   2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source))
    source = 'lab(  90    2e1%   30e-2%  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 0.5}))
    source = 'lab(  90   2e1%   30e-2%  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 0.5}))
    source = 'lab(  none    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {L: 'none'}))
    source = 'lab(  90    none    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {a: 'none'}))
    source = 'lab(  90    2e1%      none  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {b: 'none'}))
    source = 'lab(  90    2e1%    30e-2%  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 'none'}))
  })
  test('LAB - normal; value', () => {
    source = 'lab(90 2.5e1 375e-3)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source))
    source = 'lab(90 2.5e1 375e-3/0.5)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 0.5}))
    source = 'lab(90 2.5e1 375e-3/50%)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 0.5}))
    source = 'lab(none 2.5e1 375e-3)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {L: 'none'}))
    source = 'lab(90 none 375e-3)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {a: 'none'}))
    source = 'lab(90 2.5e1 none)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {b: 'none'}))
    source = 'lab(90 2.5e1 375e-3/none)'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 'none'}))
  })
  test('LAB - spaces; value', () => {
    source = 'lab(  90   2.5e1    375e-3  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source))
    source = 'lab(  90    2.5e1   375e-3  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 0.5}))
    source = 'lab(  90   2.5e1   375e-3  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 0.5}))
    source = 'lab(  none    2.5e1    375e-3  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {L: 'none'}))
    source = 'lab(  90    none    375e-3  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {a: 'none'}))
    source = 'lab(  90    2.5e1   none  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {b: 'none'}))
    source = 'lab(  90    2.5e1    375e-3  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toLAB(source, {alpha: 'none'}))
  })
})

const toLCH = (
  source: string,
  {L = 0.3, C = 30, H = 90, alpha = undefined}: Partial<LCH> = {},
): LCH => ({
  type: 'LCH',
  L,
  C,
  H,
  alpha,
  source,
})

describe('parseFunctionColor LCH', () => {
  let source = ''
  test('LCH - normal; percent', () => {
    source = 'lch(30e-2% 2e1% 90)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source))
    source = 'lch(30e-2% 2e1% 90/0.5)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 0.5}))
    source = 'lch(30e-2% 2e1% 90/50%)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 0.5}))
    source = 'lch(none 2e1% 90)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {L: 'none'}))
    source = 'lch(30e-2% none 90)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {C: 'none'}))
    source = 'lch(30e-2% 2e1% none)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {H: 'none'}))
    source = 'lch(30e-2% 2e1% 90/none)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(30e-2% 2e1% 90deg/none)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(30e-2% 2e1% 0.25turn/none)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = `lch(30e-2% 2e1% ${Math.PI / 2}rad/none)`
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(30e-2% 2e1% 100grad/none)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
  })
  test('LCH - spaces; percent', () => {
    source = 'lch(  30e-2%   2e1%    90  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source))
    source = 'lch(  30e-2%    2e1%   90  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 0.5}))
    source = 'lch(  30e-2%   2e1%   90  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 0.5}))
    source = 'lch(  none    2e1%    90  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {L: 'none'}))
    source = 'lch(  30e-2%    none    90  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {C: 'none'}))
    source = 'lch(  30e-2%    2e1%   none  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {H: 'none'}))
    source = 'lch(  30e-2%    2e1%    90  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(  30e-2%   2e1%   90deg  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(  30e-2%   2e1%   0.25turn  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = `lch(  30e-2%   2e1%   ${Math.PI / 2}rad  /  none)`
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(  30e-2%   2e1%    100grad  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
  })
  test('LCH - normal; value', () => {
    source = 'lch(30e-2 3e1 90)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source))
    source = 'lch(30e-2 3e1 90/0.5)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 0.5}))
    source = 'lch(30e-2 3e1 90/50%)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 0.5}))
    source = 'lch(none 3e1 90)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {L: 'none'}))
    source = 'lch(30e-2 none 90)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {C: 'none'}))
    source = 'lch(30e-2 3e1 none)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {H: 'none'}))
    source = 'lch(30e-2 3e1 90/none)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(30e-2 3e1 90deg/none)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(30e-2 3e1 0.25turn/none)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = `lch(30e-2 3e1 ${Math.PI / 2}rad/none)`
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(30e-2 3e1 100grad/none)'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
  })
  test('LCH - spaces; value', () => {
    source = 'lch(  30e-2   3e1    90  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source))
    source = 'lch(  30e-2    3e1   90  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 0.5}))
    source = 'lch(  30e-2   3e1   90  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 0.5}))
    source = 'lch(  none    3e1    90  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {L: 'none'}))
    source = 'lch(  30e-2    none    90  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {C: 'none'}))
    source = 'lch(  30e-2    3e1   none  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {H: 'none'}))
    source = 'lch(  30e-2    3e1    90  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(  30e-2   3e1   90deg  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(  30e-2   3e1   0.25turn  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = `lch(  30e-2   3e1   ${Math.PI / 2}rad  /  none)`
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
    source = 'lch(  30e-2   3e1    100grad  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toLCH(source, {alpha: 'none'}))
  })
})

const toOklab = (
  source: string,
  {L = 0.9, a = 0.08, b = 0.0012, alpha = undefined}: Partial<Oklab> = {},
): Oklab => ({
  type: 'Oklab',
  L,
  a,
  b,
  alpha,
  source,
})
describe('parseFunctionColor Oklab', () => {
  let source = ''
  test('Oklab - normal; percent', () => {
    source = 'oklab(90% 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source))
    source = 'oklab(90% 2e1% 30e-2%/0.5)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 0.5}))
    source = 'oklab(90% 2e1% 30e-2%/50%)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 0.5}))
    source = 'oklab(none 2e1% 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {L: 'none'}))
    source = 'oklab(90% none 30e-2%)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {a: 'none'}))
    source = 'oklab(90% 2e1% none)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {b: 'none'}))
    source = 'oklab(90% 2e1% 30e-2%/none)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 'none'}))
  })
  test('Oklab - spaces; percent', () => {
    source = 'oklab(  90%   2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source))
    source = 'oklab(  90%    2e1%   30e-2%  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 0.5}))
    source = 'oklab(  90%   2e1%   30e-2%  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 0.5}))
    source = 'oklab(  none    2e1%    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {L: 'none'}))
    source = 'oklab(  90%    none    30e-2%  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {a: 'none'}))
    source = 'oklab(  90%    2e1%      none  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {b: 'none'}))
    source = 'oklab(  90%    2e1%    30e-2%  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 'none'}))
  })
  test('Oklab - normal; value', () => {
    source = 'oklab(0.9 8e-2 120e-5)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source))
    source = 'oklab(0.9 8e-2 120e-5/0.5)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 0.5}))
    source = 'oklab(0.9 8e-2 120e-5/50%)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 0.5}))
    source = 'oklab(none 8e-2 120e-5)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {L: 'none'}))
    source = 'oklab(0.9 none 120e-5)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {a: 'none'}))
    source = 'oklab(0.9 8e-2 none)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {b: 'none'}))
    source = 'oklab(0.9 8e-2 120e-5/none)'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 'none'}))
  })
  test('Oklab - spaces; value', () => {
    source = 'oklab(  0.9   8e-2    120e-5  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source))
    source = 'oklab(  0.9    8e-2   120e-5  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 0.5}))
    source = 'oklab(  0.9   8e-2   120e-5  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 0.5}))
    source = 'oklab(  none    8e-2    120e-5  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {L: 'none'}))
    source = 'oklab(  0.9    none    120e-5  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {a: 'none'}))
    source = 'oklab(  0.9    8e-2   none  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {b: 'none'}))
    source = 'oklab(  0.9    8e-2    120e-5  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toOklab(source, {alpha: 'none'}))
  })
})

const toOklch = (
  source: string,
  {L = 0.003, C = 0.08, H = 90, alpha = undefined}: Partial<Oklch> = {},
): Oklch => ({
  type: 'Oklch',
  L,
  C,
  H,
  alpha,
  source,
})

describe('parseFunctionColor OKLCH', () => {
  let source = ''
  test('OKLCH - normal; percent', () => {
    source = 'oklch(30e-2% 2e1% 90)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source))
    source = 'oklch(30e-2% 2e1% 90/0.5)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 0.5}))
    source = 'oklch(30e-2% 2e1% 90/50%)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 0.5}))
    source = 'oklch(none 2e1% 90)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {L: 'none'}))
    source = 'oklch(30e-2% none 90)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {C: 'none'}))
    source = 'oklch(30e-2% 2e1% none)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {H: 'none'}))
    source = 'oklch(30e-2% 2e1% 90/none)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(30e-2% 2e1% 90deg/none)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(30e-2% 2e1% 0.25turn/none)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = `oklch(30e-2% 2e1% ${Math.PI / 2}rad/none)`
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(30e-2% 2e1% 100grad/none)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
  })
  test('OKLCH - spaces; percent', () => {
    source = 'oklch(  30e-2%   2e1%    90  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source))
    source = 'oklch(  30e-2%    2e1%   90  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 0.5}))
    source = 'oklch(  30e-2%   2e1%   90  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 0.5}))
    source = 'oklch(  none    2e1%    90  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {L: 'none'}))
    source = 'oklch(  30e-2%    none    90  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {C: 'none'}))
    source = 'oklch(  30e-2%    2e1%   none  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {H: 'none'}))
    source = 'oklch(  30e-2%    2e1%    90  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(  30e-2%   2e1%   90deg  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(  30e-2%   2e1%   0.25turn  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = `oklch(  30e-2%   2e1%   ${Math.PI / 2}rad  /  none)`
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(  30e-2%   2e1%    100grad  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
  })
  test('OKLCH - normal; value', () => {
    source = 'oklch(30e-4 8e-2 90)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source))
    source = 'oklch(30e-4 8e-2 90/0.5)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 0.5}))
    source = 'oklch(30e-4 8e-2 90/50%)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 0.5}))
    source = 'oklch(none 8e-2 90)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {L: 'none'}))
    source = 'oklch(30e-4 none 90)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {C: 'none'}))
    source = 'oklch(30e-4 8e-2 none)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {H: 'none'}))
    source = 'oklch(30e-4 8e-2 90/none)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(30e-4 8e-2 90deg/none)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(30e-4 8e-2 0.25turn/none)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = `oklch(30e-4 8e-2 ${Math.PI / 2}rad/none)`
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(30e-4 8e-2 100grad/none)'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
  })
  test('OKLCH - spaces; value', () => {
    source = 'oklch(  30e-4   8e-2    90  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source))
    source = 'oklch(  30e-4    8e-2   90  /  0.5  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 0.5}))
    source = 'oklch(  30e-4   8e-2   90  /  50%  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 0.5}))
    source = 'oklch(  none    8e-2    90  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {L: 'none'}))
    source = 'oklch(  30e-4    none    90  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {C: 'none'}))
    source = 'oklch(  30e-4    8e-2   none  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {H: 'none'}))
    source = 'oklch(  30e-4    8e-2    90  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(  30e-4   8e-2   90deg  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(  30e-4   8e-2   0.25turn  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = `oklch(  30e-4   8e-2   ${Math.PI / 2}rad  /  none)`
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
    source = 'oklch(  30e-4   8e-2    100grad  /  none  )'
    expect(parseFunctionColor(source)).toEqual(toOklch(source, {alpha: 'none'}))
  })
})
