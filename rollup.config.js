import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default [
  {
    external: ['phaser', 'tweakpane'],
    input: 'src/main.js',
    output: [
      {
        name: 'PhaserPluginInspector',
        file: pkg.browser,
        format: 'umd',
        globals: { phaser: 'Phaser', tweakpane: 'Tweakpane' }
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      resolve(),
      commonjs()
    ]
  }
];
