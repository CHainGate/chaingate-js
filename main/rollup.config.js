import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import external from 'rollup-plugin-peer-deps-external'

const production = !process.env.ROLLUP_WATCH

export default [
    {
        input: 'src/mod.ts',
        plugins: [
            commonjs(),
            typescript({ tsconfig: './tsconfig.json', outputToFilesystem: false }),
            external()
        ],
        output: [
            {
                file: 'dist/mod.js',
                format: 'esm',
                sourcemap: true
            }
        ]
    }
]