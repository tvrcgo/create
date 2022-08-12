import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: '{{ moduleName }}',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    }
  ],
  watch: {
    include: 'src/**'
  },
  plugins: [
    typescript(),
    terser(),
  ]
}
