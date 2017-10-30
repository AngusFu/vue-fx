import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      name: 'vuefx',
      format: 'umd'
    },
    {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    {
      file: 'dist/index.common.js',
      format: 'cjs'
    }
  ],
  context: 'window',
  sourceMap: false,
  plugins: [
    commonjs(),
    buble()
  ]
}
