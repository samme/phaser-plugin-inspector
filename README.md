Phaser 3 Inspector Plugin 🧐
=========================

View and change game properties, with [Tweakpane](https://cocopon.github.io/tweakpane/).

Demos
-----

- [Games](http://phaser-plugin-inspector.surge.sh/index.html?dir=games/) — early version of the plugin, many game features
- [First Phaser 3 game](https://codepen.io/samme/pen/YzxbMBV?editors=0010) — simple game

Install
-------

### Browser / UMD

[First Phaser 3 game](https://codepen.io/samme/pen/YzxbMBV?editors=0010) shows this setup.

Include Phaser, Tweakpane, and the plugin UMD script in this order. 

```html
<script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tweakpane@3.0.5/dist/tweakpane.js"></script>
<script src="https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.1.1/dist/phaser-plugin-inspector.umd.js"></script>
```

If this is the only plugin you're using then you can use the "default" configuration:

```js
/* global PhaserPluginInspector */

new Phaser.Game({
  plugins: PhaserPluginInspector.DefaultPluginsConfig
});
```

Or you can configure the plugins individually:

```js
/* global PhaserPluginInspector */

const { InspectorGlobalPlugin, InspectorScenePlugin } = PhaserPluginInspector;

new Phaser.Game({
  plugins: {
    global: [{ key: 'InspectorGlobalPlugin', plugin: InspectorGlobalPlugin, mapping: 'inspectorGame' }],
    scene: [{ key: 'InspectorScenePlugin', plugin: InspectorScenePlugin, mapping: 'inspectorScene' }]
  }
});
```

You can use any mapping, or `{ start: true }` for no mapping.

### Module

```sh
npm install phaser-plugin-inspector tweakpane
```

This package has an [ES module](dist/phaser-plugin-inspector.esm.js) (marked as `module`) and a [CommonJS-compatible UMD module](dist/phaser-plugin-inspector.umd.js) (marked as `browser`). You should use the ES module, but some bundlers may pick the UMD module by default. Configure your bundler to use the `module` field, or add an alias to the ES module file, or import the ES module file directly.

If this is the only plugin you're using then you can use the "default" configuration:

```js
import { DefaultPluginsConfig } from 'phaser-plugin-inspector';

new Phaser.Game({
  plugins: DefaultPluginsConfig
});
```

Or you can configure the plugins individually:

```js
import { InspectorGlobalPlugin, InspectorScenePlugin } from 'phaser-plugin-inspector';

new Phaser.Game({
  plugins: {
    global: [{ key: 'InspectorGlobalPlugin', plugin: InspectorGlobalPlugin, mapping: 'inspectorGame' }],
    scene: [{ key: 'InspectorScenePlugin', plugin: InspectorScenePlugin, mapping: 'inspectorScene' }]
  }
});
```

### Quick load

```js
function preload() {
  this.load.scripts('inspector', [
    'https://cdn.jsdelivr.net/npm/tweakpane@3.0.5/dist/tweakpane.js',
    'https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.1.1/dist/phaser-plugin-inspector.umd.js',
  ]);
  this.load.once('complete', () => {
    PhaserPluginInspector.Install(this.plugins);
  });
}
```

### Load from console

Given a `game` variable:

```js
const scene = game.scene.getScenes(true)[0];

scene.load.scripts('inspector', [
  'https://cdn.jsdelivr.net/npm/tweakpane@3.0.5/dist/tweakpane.js',
  'https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.1.1/dist/phaser-plugin-inspector.umd.js',
]);
scene.load.once('complete', () => {
  PhaserPluginInspector.Install(this.plugins);
}).start();
```

Use
---

All of the “Print” buttons use `console.info()` or `console.table()`.

You can add your own controls like so:

```js
const sprite = this.add.sprite(/*…*/);

this.inspectorScene.folder.addInput(sprite, 'alpha');
```