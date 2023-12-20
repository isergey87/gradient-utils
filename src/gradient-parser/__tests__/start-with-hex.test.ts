import {extractStartWithHex} from '../utils'

describe('start with hex', () => {
  test('incorrect check', () => {
    expect(extractStartWithHex('currentColor')).toBe(null)
  })
  test('hex check', () => {
    expect(extractStartWithHex('#fff;')).toEqual({
      type: 'HEX',
      r: 255,
      g: 255,
      b: 255,
      alpha: undefined,
      source: '#fff',
    })
    expect(extractStartWithHex('#ffff ')).toEqual({
      type: 'HEX',
      r: 255,
      g: 255,
      b: 255,
      alpha: 1,
      source: '#ffff',
    })
    expect(extractStartWithHex('#ffffff,')).toEqual({
      type: 'HEX',
      r: 255,
      g: 255,
      b: 255,
      alpha: undefined,
      source: '#ffffff',
    })
    expect(extractStartWithHex('#ffffffff)')).toEqual({
      type: 'HEX',
      r: 255,
      g: 255,
      b: 255,
      alpha: 1,
      source: '#ffffffff',
    })
    expect(extractStartWithHex('#30d;')).toEqual({
      type: 'HEX',
      r: 51,
      g: 0,
      b: 221,
      alpha: undefined,
      source: '#30d',
    })
    expect(extractStartWithHex('#30dc ')).toEqual({
      type: 'HEX',
      r: 51,
      g: 0,
      b: 221,
      alpha: 0.8,
      source: '#30dc',
    })
    expect(extractStartWithHex('#310498,')).toEqual({
      type: 'HEX',
      r: 49,
      g: 4,
      b: 152,
      alpha: undefined,
      source: '#310498',
    })
    expect(extractStartWithHex('#31049566')).toEqual({
      type: 'HEX',
      r: 49,
      g: 4,
      b: 149,
      alpha: 0.4,
      source: '#31049566',
    })
  })
})
