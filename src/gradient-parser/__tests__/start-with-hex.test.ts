import {extractStartWithHex} from '../utils'

describe('start with hex', () => {
  test('incorrect check', () => {
    expect(extractStartWithHex('currentColor')).toBe(null)
  })
  test('hex check', () => {
    expect(extractStartWithHex('#ff;')).toEqual(null)
    expect(extractStartWithHex('#fff;')).toEqual({
      color: '#fff',
      alpha: undefined,
      source: ';',
    })
    expect(extractStartWithHex('#ffff 50%')).toEqual({
      color: '#fff',
      alpha: 1,
      source: '50%',
    })
    expect(extractStartWithHex('#fffff;')).toEqual(null)
    expect(extractStartWithHex('#ffffff, #000')).toEqual({
      color: '#ffffff',
      alpha: undefined,
      source: ', #000',
    })
    expect(extractStartWithHex('#fffffff;')).toEqual(null)
    expect(extractStartWithHex('#ffffffff)')).toEqual({
      color: '#ffffff',
      alpha: 1,
      source: ')',
    })
  })
})
