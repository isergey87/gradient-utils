declare module 'rollup-plugin-multi-input' {
  import type FastGlob from 'fast-glob'
  import type {Plugin} from 'rollup'
  export type MultiInputOptions = {
    glob?: FastGlob.Options
    relative?: string
    transformOutputPath?: (path: string, fileName: string) => string
  }

  const multiInput: {
    default: (options?: MultiInputOptions) => Plugin
  }
  export default multiInput
}
