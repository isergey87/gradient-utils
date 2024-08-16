import {parseLinearGradient} from '../linear-gradient-parser'

describe('linear gradient incorrect input', () => {
  test('null check', () => {
    expect(parseLinearGradient(null)).toBe(null)
  })
  test('undefined check', () => {
    expect(parseLinearGradient(undefined)).toBe(null)
  })
  test('empty check', () => {
    expect(parseLinearGradient('')).toBe(null)
  })
  test('not valid check', () => {
    expect(parseLinearGradient('background: linear-gradient(#e66465, #9198e5);')).toBe(null)
    expect(parseLinearGradient('linear-gradient(#e66465, #9198e5);')).toBe(null)
  })
  test('comments', () => {
    expect(parseLinearGradient('linear-gradient(/* comment */#e66465, #9198e5)')).toEqual({
      angle: {
        degAngle: 180,
        sourceValue: '',
        unit: 'deg',
      },
      colorStops: [
        {
          color: '#e66465',
        },
        {
          color: '#9198e5',
        },
      ],
    })
    expect(parseLinearGradient('linear-gradient(red, /* currentColor */)')).toEqual({
      angle: {
        degAngle: 180,
        sourceValue: '',
        unit: 'deg',
      },
      colorStops: [
        {
          color: 'red',
        },
      ],
    })
    expect(
      parseLinearGradient('linear-gradient(rgb(10,20,30), hsl(10 20 30 / 50%) /* */)'),
    ).toEqual({
      angle: {
        degAngle: 180,
        sourceValue: '',
        unit: 'deg',
      },
      colorStops: [
        {
          color: 'rgb(10,20,30)',
        },
        {
          color: 'hsl(10 20 30 / 50%)',
        },
      ],
    })
  })
  test('without angle', () => {
    expect(parseLinearGradient('linear-gradient(#e66465, #9198e5)')).toEqual({
      angle: {
        degAngle: 180,
        sourceValue: '',
        unit: 'deg',
      },
      colorStops: [
        {
          color: '#e66465',
        },
        {
          color: '#9198e5',
        },
      ],
    })
    expect(parseLinearGradient('linear-gradient(red, currentColor)')).toEqual({
      angle: {
        degAngle: 180,
        sourceValue: '',
        unit: 'deg',
      },
      colorStops: [
        {
          color: 'red',
        },
        {
          color: 'currentColor',
        },
      ],
    })
    expect(parseLinearGradient('linear-gradient(rgb(10,20,30), hsl(10 20 30 / 50%))')).toEqual({
      angle: {
        degAngle: 180,
        sourceValue: '',
        unit: 'deg',
      },
      colorStops: [
        {
          color: 'rgb(10,20,30)',
        },
        {
          color: 'hsl(10 20 30 / 50%)',
        },
      ],
    })
  })
  test('check', () => {
    expect(parseLinearGradient('linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)')).toEqual({
      angle: {
        degAngle: 90,
        sourceValue: '0.25turn',
        unit: 'turn',
      },
      colorStops: [
        {
          color: '#3f87a6',
        },
        {
          color: '#ebf8e1',
        },
        {
          color: '#f69d3c',
        },
      ],
    })
    expect(
      parseLinearGradient('linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)'),
    ).toEqual({
      sideOrCorner: {
        top: false,
        bottom: false,
        left: true,
        right: false,
        sourceValue: 'to left',
      },
      colorStops: [
        {
          color: '#333',
        },
        {
          color: '#333',
          start: {
            value: 50,
            unit: '%',
            sourceValue: '50%',
          },
        },
        {
          color: '#eee',
          start: {
            value: 75,
            unit: '%',
            sourceValue: '75%',
          },
        },
        {
          color: '#333',
          start: {
            value: 75,
            unit: '%',
            sourceValue: '75%',
          },
        },
      ],
    })
    expect(
      parseLinearGradient(
        'linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%, #ffff)',
      ),
    ).toEqual({
      angle: {
        degAngle: 336,
        sourceValue: '336deg',
        unit: 'deg',
      },
      colorStops: [
        {
          color: 'rgba(0,0,255,.8)',
        },
        {
          color: 'rgba(0,0,255,0)',
          start: {
            value: 70.71,
            unit: '%',
            sourceValue: '70.71%',
          },
        },
        {
          color: '#fff',
          alpha: 1,
        },
      ],
    })
  })
})

describe('linear gradient parser common test', () => {
  test('linear-gradient(45deg, blue, red)', () => {
    expect(parseLinearGradient('linear-gradient(45deg, blue, red)')).toEqual({
      angle: {
        degAngle: 45,
        sourceValue: '45deg',
        unit: 'deg',
      },
      colorStops: [
        {
          color: 'blue',
        },
        {
          color: 'red',
        },
      ],
    })
  })
  test('linear-gradient(to left top, blue, red)', () => {
    expect(parseLinearGradient('linear-gradient(to left top, blue, red)')).toEqual({
      sideOrCorner: {
        top: true,
        bottom: false,
        left: true,
        right: false,
        sourceValue: 'to left top',
      },
      colorStops: [
        {
          color: 'blue',
        },
        {
          color: 'red',
        },
      ],
    })
  })
  test('linear-gradient(in oklab, blue, red)', () => {
    expect(parseLinearGradient('linear-gradient(in oklab, blue, red)')).toEqual({
      interpolation: 'oklab',
      colorStops: [
        {
          color: 'blue',
        },
        {
          color: 'red',
        },
      ],
    })
  })
  test('linear-gradient(in hsl, blue, red)', () => {
    expect(parseLinearGradient('linear-gradient(in hsl, blue, red)')).toEqual({
      interpolation: 'hsl',
      colorStops: [
        {
          color: 'blue',
        },
        {
          color: 'red',
        },
      ],
    })
  })
  test('linear-gradient(in hsl longer hue, blue, red)', () => {
    expect(parseLinearGradient('linear-gradient(in hsl longer hue,  blue, red)')).toEqual({
      interpolation: 'hsl longer hue',
      colorStops: [
        {
          color: 'blue',
        },
        {
          color: 'red',
        },
      ],
    })
  })
  test('linear-gradient(0deg, blue, green 40%, red)', () => {
    expect(parseLinearGradient('linear-gradient(0deg, blue, green 40%, red)')).toEqual({
      angle: {
        degAngle: 0,
        sourceValue: '0deg',
        unit: 'deg',
      },
      colorStops: [
        {
          color: 'blue',
        },
        {
          color: 'green',
          start: {
            value: 40,
            unit: '%',
            sourceValue: '40%',
          },
        },
        {
          color: 'red',
        },
      ],
    })
  })
  test('linear-gradient(.25turn, red, 10%, blue)', () => {
    expect(parseLinearGradient('linear-gradient(.25turn, red, 10%, blue)')).toEqual({
      angle: {
        degAngle: 90,
        sourceValue: '.25turn',
        unit: 'turn',
      },
      colorStops: [
        {
          color: 'red',
        },
        {
          value: 10,
          unit: '%',
          sourceValue: '10%',
        },
        {
          color: 'blue',
        },
      ],
    })
  })
  test('linear-gradient(45deg, red 0 50%, blue 50% 100%)', () => {
    expect(parseLinearGradient('linear-gradient(45deg, red 0 50%, blue 50% 100%)')).toEqual({
      angle: {
        degAngle: 45,
        sourceValue: '45deg',
        unit: 'deg',
      },
      colorStops: [
        {
          color: 'red',
          start: {
            value: 0,
            unit: '',
            sourceValue: '0',
          },
          end: {
            value: 50,
            unit: '%',
            sourceValue: '50%',
          },
        },
        {
          color: 'blue',
          start: {
            value: 50,
            unit: '%',
            sourceValue: '50%',
          },
          end: {
            value: 100,
            unit: '%',
            sourceValue: '100%',
          },
        },
      ],
    })
  })
})
