Phaser 3 Inspector Plugin 🧐
=========================

- [Demos](http://phaser-plugin-inspector.surge.sh/index.html?dir=games/)

Install
-------

### Browser / UMD

Include Phaser, Tweakpane, and the plugin UMD script.

```html
<script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tweakpane@3.0.5/dist/tweakpane.js"></script>
<script src="https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.0.0/dist/phaser-plugin-inspector.umd.js"></script>
```

```js
/* global PhaserPluginInspector */
new Phaser.Game({
  plugins: PhaserPluginInspector.DefaultPluginsConfig
});
```

or

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

### Modules

```js
import { DefaultPluginsConfig } from 'phaser-plugin-inspector';

new Phaser.Game({
  plugins: DefaultPluginsConfig
});
```

or

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
    'https://cdn.jsdelivr.net/npm/tweakpane@3.0.5',
    'https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.0.0',
  ]);
  this.load.once('complete', () => {
    // eslint-disable-next-line no-undef
    PhaserPluginInspector.Install(this.plugins);
  });
}
```

Use
---

You can add your own controls like so:

```js
// In scene `create()`:
this.inspectorScene.folder.addInput(sprite, 'alpha');
```