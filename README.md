Phaser 3 Inspector Plugin 🧐
=========================

View and change game properties, with [Tweakpane](https://github.com/cocopon/tweakpane).

Demos
-----

- [First Phaser 3 game](https://codepen.io/samme/pen/YzxbMBV?editors=0010) — simple game, helper functions
- [All the demos](https://codepen.io/collection/LPeVMY)

You can also paste the [Quick load](#quick-load) snippet into any of the [labs examples](https://labs.phaser.io).

Install
-------

The plugins add controls for the game and scene systems. If you don't need these, you can skip this step and use the [helper functions](#helper-functions) only.

### Browser / UMD

[First Phaser 3 game](https://codepen.io/samme/pen/YzxbMBV?editors=0010) shows this setup.

Include Phaser, [Tweakpane](https://cdn.jsdelivr.net/npm/tweakpane/), and [the plugin UMD script](https://cdn.jsdelivr.net/npm/phaser-plugin-inspector/) in this order. You can download the scripts or use the CDN links.

```html
<script src="https://cdn.jsdelivr.net/npm/phaser@3.87.0/dist/phaser.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tweakpane@3.1.10/dist/tweakpane.js"></script>
<script src="https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@2.6.0/dist/phaser-plugin-inspector.umd.js"></script>
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

This package has an ES module (`phaser-plugin-inspector.esm.js`, marked as `module`) and a CommonJS-compatible UMD module(`phaser-plugin-inspector.umd.js`, marked as `browser`). You should use the ES module, but some bundlers may pick the UMD module by default. Configure your bundler to use the `module` field, or add an alias to the ES module file, or import the ES module file directly.

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
    'https://cdn.jsdelivr.net/npm/tweakpane@3.1.10/dist/tweakpane.js',
    'https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@2.6.0/dist/phaser-plugin-inspector.umd.js',
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
  'https://cdn.jsdelivr.net/npm/tweakpane@3.1.10/dist/tweakpane.js',
  'https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@2.6.0/dist/phaser-plugin-inspector.umd.js',
]);
scene.load.once('complete', () => {
  PhaserPluginInspector.Install(game.plugins);
}).start();
```

Use
---

All of the “Print” buttons call `console.info()` or `console.table()`.

Beware that Tweakpane inputs (checkboxes, sliders, etc.) do not update their values automatically; use the pane's **Refresh** button.

Tweakpane monitors are updated automatically 5 times per second. For more precise work you may want to pause a scene or its systems.

You can inspect game objects using the **Display List: Inspect** and **Update List: Inspect** buttons in each scene. The new folder is added to the end of the inspector pane. Look in the console to confirm.

To step one frame at a time, use **Game → Loop → Sleep**, **Game → Step** (repeat), **Game → Loop → Wake**.

Helper functions
----------------

These create a set of controls for common Phaser objects.

You can use these functions with or without the plugins.

The `pane` argument is the Tweakpane pane or a folder in it. The `options` argument is options for the folder.

Each function creates a [folder](https://cocopon.github.io/tweakpane/ui-components.html#folder) and returns it.

If you've installed the plugins, then within a scene context (`this`)

- `this.inspectorGame.pane` or `this.inspectorScene.pane` is the main pane
- `this.inspectorGame.folder` is the “Game” folder
- `this.inspectorScene.folder` is the current scene's folder

See the [First Phaser 3 game](https://codepen.io/samme/pen/YzxbMBV?editors=0010) demo for this setup.

If you're not using the plugins, then you should create a pane yourself:

```js
const pane = new Tweakpane.Pane();
```

Some of these folders need to be disposed manually if you destroy the target object or stop the scene it belongs to. Use

```js
folder.dispose();
```

### AddActive(items, pane, options?) → folder

Adds a set of "active" toggles for any objects with an `active` property, identified by `name`.

### AddAlpha(items, pane, options?) → folder

Adds a set of "alpha" sliders for any objects with an `alpha` property, identified by `name`.

### AddAnimationState(animationState, pane, options?) → folder

Adds a folder for a sprite's animation state, e.g.,

    AddAnimationState(sprite.anims, pane);

### AddArcadeBody(body, pane, options?) → folder

Adds a folder for a game object's Arcade Physics body, e.g.,

    AddArcadeBody(sprite.body, pane);

### AddCamera(camera, pane) → folder

Adds a folder for a camera, e.g.,

    AddCamera(this.cameras.main, pane);

### AddChain(chain, pane, options?) → folder

Adds a folder for a [tween chain](https://docs.phaser.io/api-documentation/class/tweens-tweenchain).

Dispose this folder if you remove the tween chain.

### AddFXComponent(component, pane, options?) → folder

Adds a folder for a game object's [FX component](https://docs.phaser.io/api-documentation/class/gameobjects-components-fx), e.g.,

    AddFXComponent(sprite.preFX, pane);

Note that Post FX controllers are always [enabled](https://docs.phaser.io/api-documentation/class/gameobjects-components-fx#enabled).

### AddFXController(controller, pane, options?) → folder

Adds a folder for a game object's [FX controller](https://docs.phaser.io/api-documentation/class/fx-controller), e.g.,

    const barrelEffect = sprite.preFX.addBarrel();

    AddFXController(barrelEffect, pane);

Note that Post FX controllers are always [active](https://docs.phaser.io/api-documentation/class/fx-controller#active).

### AddGameObject(obj, pane, options?) → folder

Adds a folder for a game object (except group).

### AddGroup(group, pane, options?) → folder

Adds a folder for a group.

### AddInput(interactiveObject, pane, options?) → folder

Adds a folder for a game object's [interactive object](https://docs.phaser.io/api-documentation/typedef/types-input#interactiveobject), e.g.,

    AddInput(sprite.input, pane);

### AddKey(key, pane, options?) → folder

Adds a folder for a [keyboard key object](https://docs.phaser.io/api-documentation/class/input-keyboard-key).

Dispose this folder if you remove the key.

### AddKeys(keys, pane, options?) → folder

Adds a folder for an object map of [keyboard key objects](https://docs.phaser.io/api-documentation/class/input-keyboard-key), such as that returned by [addKeys()](https://docs.phaser.io/api-documentation/class/input-keyboard-keyboardplugin#addkeys).

Dispose this folder if you remove those keys.

### AddLight(light, pane, options?) → folder

Adds a folder for a [light](https://docs.phaser.io/api-documentation/class/gameobjects-light) (not point light).

### AddParticleEmitter(emitter, pane, options?) → folder

Adds a folder for a [particle emitter](https://docs.phaser.io/api-documentation/class/gameobjects-particles-particleemitter).

### AddScenes(scene, pane, options?) → folder

Adds a set of "visible" toggles for the scenes, e.g.,

    AddScenes(this.scene.manager.getScenes(false), pane);

### AddSound(sound, pane, options?) → folder

Adds a folder for a [sound](https://docs.phaser.io/api-documentation/class/sound-basesound).

### AddTimeline(timeline, pane, options?) → folder

Adds a folder for a [timeline](https://docs.phaser.io/api-documentation/class/time-timeline).

### AddTimerEvent(timerEvent, pane, options?) → folder

Adds a folder for a [timer event](https://docs.phaser.io/api-documentation/class/time-timerevent).

Dispose this folder if you remove the timer event.

### AddTween(tween, pane, options?) → folder

Adds a folder for a [tween](https://docs.phaser.io/api-documentation/class/tweens-tween).

### AddVideo(video, pane, options?) → folder

Adds a folder for a [Video game object](https://docs.phaser.io/api-documentation/class/gameobjects-video).

### AddVisible(items, pane, options?) → folder

Adds a set of "visible" toggles for any objects with an `visible` property, identified by `name`.

