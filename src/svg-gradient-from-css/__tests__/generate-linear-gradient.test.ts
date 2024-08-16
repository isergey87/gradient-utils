import {generateLinearGradient} from '../generate-linear-gradient'

describe('generate-linear-gradient', () => {
  test('linear-gradient(0deg, red, green, black, yellow, blue 50%)', () => {
    expect(
      generateLinearGradient('linear-gradient(0deg, red, green, black, yellow, blue 50%)', 3),
    ).toEqual({
      colorStops: [
        {
          offset: 0,
          stopColor: 'red',
          stopOpacity: undefined,
        },
        {offset: 25, stopColor: 'green', stopOpacity: undefined},
        {
          offset: 50,
          stopColor: 'black',
          stopOpacity: undefined,
        },
        {offset: 75, stopColor: 'yellow', stopOpacity: undefined},
        {
          offset: 100,
          stopColor: 'blue',
          stopOpacity: undefined,
        },
      ],
      x1: '50%',
      x2: '50%',
      y1: '100%',
      y2: '50%',
    })
  })
  test('linear-gradient(418grad, red -15% 30%, green, black, yellow, blue 50%)', () => {
    expect(
      generateLinearGradient(
        'linear-gradient(418grad, red -15% 30%, green, black, yellow, blue 50%)',
        3,
      ),
    ).toEqual({
      colorStops: [
        {
          offset: 0,
          stopColor: 'red',
        },
        {
          offset: 69.23076923076924,
          stopColor: 'red',
        },
        {
          offset: 76.92307692307693,
          stopColor: 'green',
        },
        {
          offset: 84.61538461538463,
          stopColor: 'black',
        },
        {
          offset: 92.30769230769232,
          stopColor: 'yellow',
        },
        {
          offset: 100,
          stopColor: 'blue',
        },
      ],
      x1: '39.13586729987639%',
      x2: '50%',
      y1: '162.18377008926763%',
      y2: '49.99999999999999%',
    })
  })
  test('linear-gradient(418grad, red -15% 30%, green, black, yellow, blue 50%) 1:1', () => {
    expect(
      generateLinearGradient(
        'linear-gradient(418grad, red -15% 30%, green, black, yellow, blue 50%)',
        1,
      ),
    ).toEqual({
      colorStops: [
        {
          offset: 0,
          stopColor: 'red',
        },
        {
          offset: 69.23076923076924,
          stopColor: 'red',
        },
        {
          offset: 76.92307692307693,
          stopColor: 'green',
        },
        {
          offset: 84.61538461538463,
          stopColor: 'black',
        },
        {
          offset: 92.30769230769232,
          stopColor: 'yellow',
        },
        {
          offset: 100,
          stopColor: 'blue',
        },
      ],
      x1: '27.526286741998124%',
      x2: '50%',
      y1: '127.35502841563287%',
      y2: '50%',
    })
  })
  test('linear-gradient(#e66465, #9198e5)', () => {
    expect(generateLinearGradient('linear-gradient(#e66465, #9198e5)', 3)).toEqual({
      colorStops: [
        {
          offset: 0,
          stopColor: '#e66465',
        },
        {
          offset: 100,
          stopColor: '#9198e5',
        },
      ],
      x1: '50%',
      x2: '50%',
      y1: '1.8369701987210297e-14%',
      y2: '99.99999999999999%',
    })
  })
  test('linear-gradient(#e66465ff, #9198e5fe)', () => {
    expect(generateLinearGradient('linear-gradient(#e66465ff, #9198e533)', 3)).toEqual({
      colorStops: [
        {
          offset: 0,
          stopColor: '#e66465',
          stopOpacity: 1,
        },
        {
          offset: 100,
          stopColor: '#9198e5',
          stopOpacity: 0.2,
        },
      ],
      x1: '50%',
      x2: '50%',
      y1: '1.8369701987210297e-14%',
      y2: '99.99999999999999%',
    })
  })
  test('linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)', () => {
    expect(
      generateLinearGradient('linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)', 3),
    ).toEqual({
      colorStops: [
        {
          offset: 0,
          stopColor: '#3f87a6',
        },
        {
          offset: 50,
          stopColor: '#ebf8e1',
        },
        {
          offset: 100,
          stopColor: '#f69d3c',
        },
      ],
      x1: '-1.020538999289461e-15%',
      x2: '100%',
      y1: '50.00000000000001%',
      y2: '49.99999999999999%',
    })
  })
  test('linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%)', () => {
    expect(
      generateLinearGradient('linear-gradient(to left, #333, #333 50%, #eeef 75%, #333 75%)', 3),
    ).toEqual({
      colorStops: [
        {
          offset: 0,
          stopColor: '#333',
        },
        {
          offset: 66.66666666666666,
          stopColor: '#333',
        },
        {
          offset: 100,
          stopColor: '#eee',
          stopOpacity: 1,
        },
        {
          offset: 100,
          stopColor: '#333',
        },
      ],
      x1: '100%',
      x2: '24.999999999999993%',
      y1: '50.000000000000036%',
      y2: '49.99999999999998%',
    })
  })
  test('linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)', () => {
    expect(
      generateLinearGradient(
        'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%)',
        3,
      ),
    ).toEqual({
      colorStops: [
        {
          offset: 0,
          stopColor: 'rgba(255,0,0,.8)',
        },
        {
          offset: 100,
          stopColor: 'rgba(255,0,0,0)',
        },
      ],
      x1: '76.11958023739435%',
      x2: '39.18126986567126%',
      y1: '-53.98556109079889%',
      y2: '93.0708194038089%',
    })
  })
  test('linear-gradient(to right, red 20%, orange 20% 40%, yellow 40% 60%, green 60% 80%, blue 80%)', () => {
    expect(
      generateLinearGradient(
        'linear-gradient(to right, red 20%, orange 20% 40%, yellow 40% 60%, green 60% 80%, blue 80%)',
        3,
      ),
    ).toEqual({
      colorStops: [
        {
          offset: 0,
          stopColor: 'red',
        },
        {
          offset: 0,
          stopColor: 'orange',
        },
        {
          offset: 33.333333333333336,
          stopColor: 'orange',
        },
        {
          offset: 33.333333333333336,
          stopColor: 'yellow',
        },
        {
          offset: 66.66666666666667,
          stopColor: 'yellow',
        },
        {
          offset: 66.66666666666667,
          stopColor: 'green',
        },
        {
          offset: 100,
          stopColor: 'green',
        },
        {
          offset: 100,
          stopColor: 'blue',
        },
      ],
      x1: '20%',
      x2: '80%',
      y1: '50.00000000000001%',
      y2: '49.99999999999999%',
    })
  })
})
