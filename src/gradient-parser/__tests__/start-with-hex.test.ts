import {extractStartWithHex} from '../utils'

describe('start with hex', () => {
  test('incorrect check', () => {
    expect(extractStartWithHex('currentColor')).toBe(null)
  })
  test('hex check', () => {
    expect(extractStartWithHex('#fff;')).toEqual({
      type: 'HEX',
      R: 255,
      G: 255,
      B: 255,
      alpha: undefined,
      source: '#fff',
    })
    expect(extractStartWithHex('#ffff ')).toEqual({
      type: 'HEX',
      R: 255,
      G: 255,
      B: 255,
      alpha: 1,
      source: '#ffff',
    })
    expect(extractStartWithHex('#ffffff,')).toEqual({
      type: 'HEX',
      R: 255,
      G: 255,
      B: 255,
      alpha: undefined,
      source: '#ffffff',
    })
    expect(extractStartWithHex('#ffffffff)')).toEqual({
      type: 'HEX',
      R: 255,
      G: 255,
      B: 255,
      alpha: 1,
      source: '#ffffffff',
    })
    expect(extractStartWithHex('#30d;')).toEqual({
      type: 'HEX',
      R: 51,
      G: 0,
      B: 221,
      alpha: undefined,
      source: '#30d',
    })
    expect(extractStartWithHex('#30dc ')).toEqual({
      type: 'HEX',
      R: 51,
      G: 0,
      B: 221,
      alpha: 0.8,
      source: '#30dc',
    })
    expect(extractStartWithHex('#310498,')).toEqual({
      type: 'HEX',
      R: 49,
      G: 4,
      B: 152,
      alpha: undefined,
      source: '#310498',
    })
    expect(extractStartWithHex('#31049566')).toEqual({
      type: 'HEX',
      R: 49,
      G: 4,
      B: 149,
      alpha: 0.4,
      source: '#31049566',
    })
  })
})
