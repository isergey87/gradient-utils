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
        degAngle: 0,
        sourceValue: '',
        unit: 'deg',
      },
      colorStops: [
        {
          color: {
            type: 'HEX',
            r: 230,
            g: 100,
            b: 101,
            alpha: undefined,
            source: '#e66465',
          },
        },
        {
          color: {
            type: 'HEX',
            r: 145,
            g: 152,
            b: 229,
            alpha: undefined,
            source: '#9198e5',
          },
        },
      ],
    })
    expect(parseLinearGradient('linear-gradient(red, /* currentColor */)')).toEqual({
      angle: {
        degAngle: 0,
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
        degAngle: 0,
        sourceValue: '',
        unit: 'deg',
      },
      colorStops: [
        {
          color: {
            type: 'RGB',
            R: 10,
            G: 20,
            B: 30,
            alpha: undefined,
            source: 'rgb(10,20,30)',
          },
        },
        {
          color: {
            type: 'HSL',
            H: 10,
            S: 20,
            L: 30,
            alpha: 0.5,
            source: 'hsl(10 20 30 / 50%)',
          },
        },
      ],
    })
  })
  test('without angle', () => {
    expect(parseLinearGradient('linear-gradient(#e66465, #9198e5)')).toEqual({
      angle: {
        degAngle: 0,
        sourceValue: '',
        unit: 'deg',
      },
      colorStops: [
        {
          color: {
            type: 'HEX',
            r: 230,
            g: 100,
            b: 101,
            alpha: undefined,
            source: '#e66465',
          },
        },
        {
          color: {
            type: 'HEX',
            r: 145,
            g: 152,
            b: 229,
            alpha: undefined,
            source: '#9198e5',
          },
        },
      ],
    })
    expect(parseLinearGradient('linear-gradient(red, currentColor)')).toEqual({
      angle: {
        degAngle: 0,
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
        degAngle: 0,
        sourceValue: '',
        unit: 'deg',
      },
      colorStops: [
        {
          color: {
            type: 'RGB',
            R: 10,
            G: 20,
            B: 30,
            alpha: undefined,
            source: 'rgb(10,20,30)',
          },
        },
        {
          color: {
            type: 'HSL',
            H: 10,
            S: 20,
            L: 30,
            alpha: 0.5,
            source: 'hsl(10 20 30 / 50%)',
          },
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
          color: {
            type: 'HEX',
            r: 63,
            g: 135,
            b: 166,
            alpha: undefined,
            source: '#3f87a6',
          },
        },
        {
          color: {
            type: 'HEX',
            r: 235,
            g: 248,
            b: 225,
            alpha: undefined,
            source: '#ebf8e1',
          },
        },
        {
          color: {
            type: 'HEX',
            r: 246,
            g: 157,
            b: 60,
            alpha: undefined,
            source: '#f69d3c',
          },
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
          color: {
            type: 'HEX',
            r: 51,
            g: 51,
            b: 51,
            alpha: undefined,
            source: '#333',
          },
        },
        {
          color: {
            type: 'HEX',
            r: 51,
            g: 51,
            b: 51,
            alpha: undefined,
            source: '#333',
          },
          start: {
            value: 50,
            unit: '%',
            sourceValue: '50%',
          },
        },
        {
          color: {
            type: 'HEX',
            r: 238,
            g: 238,
            b: 238,
            alpha: undefined,
            source: '#eee',
          },
          start: {
            value: 75,
            unit: '%',
            sourceValue: '75%',
          },
        },
        {
          color: {
            type: 'HEX',
            r: 51,
            g: 51,
            b: 51,
            alpha: undefined,
            source: '#333',
          },
          start: {
            value: 75,
            unit: '%',
            sourceValue: '75%',
          },
        },
      ],
    })
    expect(
      parseLinearGradient('linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)'),
    ).toEqual({
      angle: {
        degAngle: 336,
        sourceValue: '336deg',
        unit: 'deg',
      },
      colorStops: [
        {
          color: {
            type: 'RGB',
            R: 0,
            G: 0,
            B: 255,
            alpha: 0.8,
            source: 'rgba(0,0,255,.8)',
          },
        },
        {
          color: {
            type: 'RGB',
            R: 0,
            G: 0,
            B: 255,
            alpha: 0,
            source: 'rgba(0,0,255,0)',
          },
          start: {
            value: 70.71,
            unit: '%',
            sourceValue: '70.71%',
          },
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
