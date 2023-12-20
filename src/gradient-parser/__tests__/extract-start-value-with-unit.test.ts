import {extractStartValueWithUnit} from '../utils'

describe('extractStartValueWithUnit', () => {
  test('not start check', () => {
    expect(extractStartValueWithUnit(',23deg')).toBe(null)
  })
  test('invalid patterns', () => {
    expect(extractStartValueWithUnit('23%%')).toBe(null)
    expect(extractStartValueWithUnit('23')).toBe(null)
    expect(extractStartValueWithUnit('23 deg')).toBe(null)
    expect(extractStartValueWithUnit('23ed3eg')).toBe(null)
  })
  test('zero without unit tests', () => {
    expect(extractStartValueWithUnit('0')).toEqual({
      value: 0,
      sourceValue: '0',
      source: '',
      unit: '',
    })
    expect(extractStartValueWithUnit('+.3434e-3434')).toEqual({
      value: 0,
      sourceValue: '+.3434e-3434',
      source: '',
      unit: '',
    })
    expect(extractStartValueWithUnit('0.00000')).toEqual({
      value: 0,
      sourceValue: '0.00000',
      source: '',
      unit: '',
    })
    expect(extractStartValueWithUnit('-0')).toEqual({
      value: -0,
      sourceValue: '-0',
      source: '',
      unit: '',
    })
  })
  test('zero with unit check', () => {
    expect(extractStartValueWithUnit('0deg')).toEqual({
      value: 0,
      sourceValue: '0deg',
      source: '',
      unit: 'deg',
    })
    expect(extractStartValueWithUnit('+.3434e-3434deg')).toEqual({
      value: 0,
      sourceValue: '+.3434e-3434deg',
      source: '',
      unit: 'deg',
    })
    expect(extractStartValueWithUnit('0.00000deg')).toEqual({
      value: 0,
      sourceValue: '0.00000deg',
      source: '',
      unit: 'deg',
    })
    expect(extractStartValueWithUnit('-0deg')).toEqual({
      value: -0,
      sourceValue: '-0deg',
      source: '',
      unit: 'deg',
    })
  })
  test('unit check', () => {
    expect(extractStartValueWithUnit('10deg')).toEqual({
      value: 10,
      sourceValue: '10deg',
      source: '',
      unit: 'deg',
    })
    expect(extractStartValueWithUnit('+.3434e3434deg')).toEqual({
      value: Number.MAX_VALUE,
      sourceValue: '+.3434e3434deg',
      source: '',
      unit: 'deg',
    })
    expect(extractStartValueWithUnit('10.0e-7deg')).toEqual({
      value: 0.000001,
      sourceValue: '10.0e-7deg',
      source: '',
      unit: 'deg',
    })
    expect(extractStartValueWithUnit('-.44deg')).toEqual({
      value: -0.44,
      sourceValue: '-.44deg',
      source: '',
      unit: 'deg',
    })
  })
})
