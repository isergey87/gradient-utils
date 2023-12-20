import typescript from 'rollup-plugin-typescript2'
import clean from '@rollup-extras/plugin-clean'
import multiInput from 'rollup-plugin-multi-input'

export default {
  input: ['src/**/index.ts'],
  output: {
    format: 'cjs',
    dir: 'dist',
  },
  plugins: [
    typescript({
      exclude: '**/__tests__/**/*',
    }),
    clean(),
    multiInput.default(),
  ],
}
