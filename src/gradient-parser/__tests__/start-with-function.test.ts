import {extractStartWithFunction} from '../utils'

describe('start with function', () => {
  test('incorrect check', () => {
    expect(extractStartWithFunction('currentColor 50%')).toBe(null)
  })
  test('hex check', () => {
    expect(extractStartWithFunction('#fff')).toBe(null)
  })
  test('only function test', () => {
    expect(extractStartWithFunction('hsl(120deg 75% 25% / 0.6) 50%')).toEqual({
      function: 'hsl(120deg 75% 25% / 0.6)',
      source: '50%',
    })
  })
  test('only function test', () => {
    expect(extractStartWithFunction('color(srgb 0.5 0 0.5) 50%')).toEqual({
      function: 'color(srgb 0.5 0 0.5)',
      source: '50%',
    })
  })
  test('complex function test', () => {
    expect(
      extractStartWithFunction('hsl(120deg var(--test) calc(50% - var(--test)) / 0.6) 50%'),
    ).toEqual({
      function: 'hsl(120deg var(--test) calc(50% - var(--test)) / 0.6)',
      source: '50%',
    })
    expect(
      extractStartWithFunction(
        'hsl(120deg var(--test) calc(50% - var(--test)) / 0.6) 50% 10px var(--test2)',
      ),
    ).toEqual({
      function: 'hsl(120deg var(--test) calc(50% - var(--test)) / 0.6)',
      source: '50% 10px var(--test2)',
    })
  })
})
