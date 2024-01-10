import {svgAngle, svgAngle1, svgAngle2, svgColorStops} from '../utils'
import {parseLinearGradient} from '../../gradient-parser'
import {convertLinearGradient} from '../convert-linear-gradient'

describe('svgColorStops - check stops offset', () => {
  const g = parseLinearGradient('linear-gradient(90deg, red, blue 150%)')
  console.log(g && convertLinearGradient(g, 3))

  console.log(svgAngle2(5, 2, 0, 100))

  test('linear-gradient(red, blue)', () => {
    expect(
      svgColorStops([
        {
          color: 'red',
        },
        {
          color: 'blue',
        },
      ]),
    ).toEqual([
      {
        stopColor: 'red',
        offset: 0,
        stopOpacity: undefined,
      },
      {
        stopColor: 'blue',
        offset: 100,
        stopOpacity: undefined,
      },
    ])
  })
  test('linear-gradient(red, blue, green, black, yellow)', () => {
    expect(
      svgColorStops([
        {
          color: 'red',
        },
        {
          color: 'blue',
        },
        {
          color: 'green',
        },
        {
          color: 'black',
        },
        {
          color: 'yellow',
        },
      ]),
    ).toEqual([
      {
        stopColor: 'red',
        offset: 0,
        stopOpacity: undefined,
      },
      {
        stopColor: 'blue',
        offset: 25,
        stopOpacity: undefined,
      },
      {
        stopColor: 'green',
        offset: 50,
        stopOpacity: undefined,
      },
      {
        stopColor: 'black',
        offset: 75,
        stopOpacity: undefined,
      },
      {
        stopColor: 'yellow',
        offset: 100,
        stopOpacity: undefined,
      },
    ])
  })
  test('linear-gradient(red 20%, blue, green, black, yellow)', () => {
    expect(
      svgColorStops([
        {
          color: 'red',
          start: {
            value: 20,
            unit: '%',
            sourceValue: '20%',
          },
        },
        {
          color: 'blue',
        },
        {
          color: 'green',
        },
        {
          color: 'black',
        },
        {
          color: 'yellow',
        },
      ]),
    ).toEqual([
      {
        stopColor: 'red',
        offset: 20,
        stopOpacity: undefined,
      },
      {
        stopColor: 'blue',
        offset: 40,
        stopOpacity: undefined,
      },
      {
        stopColor: 'green',
        offset: 60,
        stopOpacity: undefined,
      },
      {
        stopColor: 'black',
        offset: 80,
        stopOpacity: undefined,
      },
      {
        stopColor: 'yellow',
        offset: 100,
        stopOpacity: undefined,
      },
    ])
  })
  test('linear-gradient(red 20%, blue, green 80%, black, yellow)', () => {
    expect(
      svgColorStops([
        {
          color: 'red',
          start: {
            value: 20,
            unit: '%',
            sourceValue: '20%',
          },
        },
        {
          color: 'blue',
        },
        {
          color: 'green',
          start: {
            value: 80,
            unit: '%',
            sourceValue: '80%',
          },
        },
        {
          color: 'black',
        },
        {
          color: 'yellow',
        },
      ]),
    ).toEqual([
      {
        stopColor: 'red',
        offset: 20,
        stopOpacity: undefined,
      },
      {
        stopColor: 'blue',
        offset: 50,
        stopOpacity: undefined,
      },
      {
        stopColor: 'green',
        offset: 80,
        stopOpacity: undefined,
      },
      {
        stopColor: 'black',
        offset: 90,
        stopOpacity: undefined,
      },
      {
        stopColor: 'yellow',
        offset: 100,
        stopOpacity: undefined,
      },
    ])
  })
})
