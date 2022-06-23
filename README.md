Phaser 3 Inspector Plugin 🧐
=========================

View and change game properties, with [Tweakpane](https://cocopon.github.io/tweakpane/).

Demos
-----

- [Games](http://phaser-plugin-inspector.surge.sh/index.html?dir=games/) — early version of the plugin, many game features
- [First Phaser 3 game](https://codepen.io/samme/pen/YzxbMBV?editors=0010) — simple game, helper functions
- [All the demos](https://codepen.io/collection/LPeVMY)

You can also paste the [Quick load](#quick-load) snippet into any of the [labs examples](https://labs.phaser.io).

Install
-------

The plugins add controls for the game and scene systems. If you don't need these, you can skip this step and use the [helper functions](#helper-functions) only.

### Browser / UMD

[First Phaser 3 game](https://codepen.io/samme/pen/YzxbMBV?editors=0010) shows this setup.

Include Phaser, Tweakpane, and the plugin UMD script in this order. You can download the scripts or use the CDN links.

```html
<script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tweakpane@3.1.0/dist/tweakpane.js"></script>
<script src="https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.7.0/dist/phaser-plugin-inspector.umd.js"></script>
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

You can use any mapping, or `{ start: true }` for no mapping. If you don't want to add any controls, you don't need any mapping.

The helper functions are on the same namespace:

```js
/* global PhaserPluginInspector */

const { AddGameObject } = PhaserPluginInspector
```

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

You can import the helper functions as well:

```js
import { AddGameObject } from 'phaser-plugin-inspector';
```

### Quick load

```js
function preload() {
  this.load.scripts('inspector', [
    'https://cdn.jsdelivr.net/npm/tweakpane@3.1.0/dist/tweakpane.js',
    'https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.7.0/dist/phaser-plugin-inspector.umd.js',
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
  'https://cdn.jsdelivr.net/npm/tweakpane@3.1.0/dist/tweakpane.js',
  'https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.7.0/dist/phaser-plugin-inspector.umd.js',
]);
scene.load.once('complete', () => {
  PhaserPluginInspector.Install(game.plugins);
}).start();
```

Use
---

All of the “Print” buttons use `console.info()` or `console.table()`.

Beware that Tweakpane inputs (checkboxes, sliders, etc.) do not update their values automatically; use the pane's **Refresh** button.

Tweakpane monitors are updated automatically 5 times per second. For more precise work you may want to pause a scene or its systems.

You can inspect game objects using the “Inspect” buttons in the scene “Display List” and ”Update List” folders. The new folder is added to the end of the same scene folder. Look in the console to confirm.

Helper functions
----------------

These create a set of controls for common Phaser objects.

You can use these functions with or without the plugins.

- AddAnimationState(animationState, pane, options?) → folder
- AddArcadeBody(body, pane, options?) → folder
- AddGameObject(obj, pane, options?) → folder
- AddGroup(group, pane, options?) → folder
- AddInput(interactiveObject, pane, options?) → folder
- AddKey(key, pane, options?) → folder
- AddKeys(keys, pane, options?) → folder
- AddLight(light, pane, options?) → folder
- AddParticleEmitter(emitter, pane, options?) → folder
- AddSound(sound, pane, options?) → folder
- AddTimeline(timeline, pane, options?) → folder
- AddTimerEvent(timerEvent, pane, options?) → folder
- AddTween(tween, pane, options?) → folder

Each function creates a [folder](https://cocopon.github.io/tweakpane/ui-components.html#folder) and returns it. 

`pane` is the Tweakpane pane or a folder in it and `options` is the folder options.

If you've installed the plugins, then

- `this.inspectorGame.pane` or `this.inspectorScene.pane` is the main pane 
- `this.inspectorGame.folder` is the “Game” folder
- `this.inspectorScene.folder` is the current scene's folder

See the [First Phaser 3 game](https://codepen.io/samme/pen/YzxbMBV?editors=0010) demo for this setup.

If you're not using the plugins, then you should create a pane yourself:

```js
const pane = new Tweakpane.Pane();
```

You should remove any key, timeline, timer event, or tween folders yourself when done with those objects or stopping the scene:

```js
folder.dispose();
```
