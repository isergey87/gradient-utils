import {removeCSSComments} from '../utils'

describe('removeCSSComments', () => {
  test('removeCSSComments', () => {
    expect(removeCSSComments('test test')).toBe('test test')
    expect(removeCSSComments('test /*/ test')).toBe('test /*/ test')
    expect(removeCSSComments('test /* */ test')).toBe('test  test')
    expect(removeCSSComments('test /* test */ test')).toBe('test  test')
    expect(removeCSSComments('/* test */test /* test */ test/* test */')).toBe('test  test')
    expect(removeCSSComments('  /* test */test /* test */ test/* test */  ')).toBe('  test  test  ')
  })
})
